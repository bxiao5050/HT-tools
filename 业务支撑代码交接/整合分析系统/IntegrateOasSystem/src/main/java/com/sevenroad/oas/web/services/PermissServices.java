package com.sevenroad.oas.web.services;

import com.baomidou.mybatisplus.mapper.Condition;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.cache.Imp.PermissTransactionCache;
import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.Utils;
import com.sevenroad.oas.dao.entity.Actor;
import com.sevenroad.oas.dao.entity.TLUserAction;
import com.sevenroad.oas.dao.entity.UserActor;
import com.sevenroad.oas.dao.mapper.ActorMapper;
import com.sevenroad.oas.dao.mapper.TLUserActionMapper;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.EffectResult;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.dao.model.tables.UserMenusInfo;
import com.sevenroad.oas.dao.model.tables.UserPermissInfo;
import com.sevenroad.oas.dao.repository.PermissRepository;
import com.sevenroad.oas.dao.service.IUserActorService;
import com.sevenroad.oas.userPermiss.TransactionPermissProxy;
import com.sevenroad.oas.userPermiss.model.ItemPermiss;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;
import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.userPermiss.transaction.ActorPermissTransaction;
import com.sevenroad.oas.userPermiss.transaction.ChannelPermissTransaction;
import com.sevenroad.oas.web.model.WebSocketClientManage;
import com.sevenroad.oas.web.model.consumer.GetItemPermissConsumer;
import com.sevenroad.oas.web.model.consumer.GetRootMenuConsumer;
import com.sevenroad.oas.web.model.editor.UserPermissInfoEditor;
import com.sevenroad.oas.web.model.websoket.message;
import com.sevenroad.oas.web.model.websoket.notifyMessage;
import com.sevenroad.oas.web.utils.Consts;
import com.sevenroad.oas.web.utils.TreeUtils;
import java.util.*;

import com.sevenroad.oas.web.utils.imp.jsonResult;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import com.xiaoleilu.hutool.util.CollectionUtil;
import com.xiaoleilu.hutool.util.StrUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/25.
 */
@Service
public class PermissServices {
    @Autowired
    ConnectionManager connectionManager;
    @Autowired
    PermissRepository permissRepository;
    @Autowired
    DataViewCache dataViewCache;
    @Autowired
    PermissTransactionCache permissTransactionCache;
    @Autowired
    TableResultCache tableResultCache;
    @Autowired
    IUserActorService userActorService;
    @Autowired
    ActorMapper actorMapper;
    @Autowired
    PermissServices permissServices;
    @Autowired
    WebSocketClientManage webSocketClientManage;
    @Autowired
    TLUserActionMapper userActionMapper;
    Logger logger = LoggerFactory.getLogger(PermissServices.class);
    Gson gson = new Gson();
    public List<MenuPermiss> userMenus(UserPermiss userPermiss){
        String language = userPermiss.getLanguage();
        int gameId = userPermiss.getCurrentGame().getGameId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        String sql = dataViewCache.getSelectedCommand(Consts.DataViews.permissGetGameMenus);
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.INT_PARAM, "game_id", String.valueOf(gameId)));
        params.add(new DBParam(DBParam.INT_PARAM, "system_id", String.valueOf(systemId)));
        params.add(new DBParam(DBParam.STRING_PARAM, "language", language));
        List<UserMenusInfo> list = permissRepository.getPermissMenuInfo(connectionManager.getConnection(0), Utils.sqlGenerate(sql, params));
        GetRootMenuConsumer editor = new GetRootMenuConsumer();
        CollectionUtil.forEach(list.iterator(), editor);
        List<MenuPermiss> menuPermisses = userPermiss.getCurrentGame().getMenuPermisses();
        return TreeUtils.generalMenuTree(editor.getResult(), list,menuPermisses);

    }

    public ExcuteModel userZones(UserPermiss userPermiss){
        int gameId = userPermiss.getCurrentGame().getGameId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        String userName = userPermiss.getUserName();
        String language = userPermiss.getLanguage();
        //获取用户权限信息
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.STRING_PARAM,"user_name",userName));
        List<UserPermissInfo> userPermissInfos = permissRepository.getPermissInfo(connectionManager.getConnection(0),
                dataViewCache.getSelectedCommand(Consts.DataViews.sysGetUserPermiss),params);
        Iterator<UserPermissInfo> nextPermissInfo = CollectionUtil.filter(userPermissInfos, new UserPermissInfoEditor(Consts.PermissKey.OAS_ZONE)).iterator();
        List<ItemPermiss> retList = new ArrayList<ItemPermiss>();
        while(nextPermissInfo.hasNext()){
            List<ItemPermiss> lsit = gson.fromJson(nextPermissInfo.next().getPremissInfo(),
                    new TypeToken<List<ItemPermiss>>() {
                    }.getType());
            retList.addAll(lsit);
        }
        GetItemPermissConsumer getItemPermissEditor = new GetItemPermissConsumer(gameId);
        CollectionUtil.forEach(retList.iterator(),getItemPermissEditor);
        //从数据库里关联出区服数据
        params.clear();
        params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.INT_PARAM, "game_id", String.valueOf(userPermiss.getCurrentGame().getMainGameId())));
        params.add(new DBParam(DBParam.STRING_PARAM,"userZones",getItemPermissEditor.getResult()));
        params.add(new DBParam(DBParam.INT_PARAM, "system_id", String.valueOf(systemId)));
        params.add(new DBParam(DBParam.STRING_PARAM, "language", language));
        DataView dataView = null;
        if(systemId == 3)
            //efunfun&&88box
            dataView = dataViewCache.getCache(Consts.DataViews.permissGet88BoxGameZone);
        else
            //海外发行
            dataView = dataViewCache.getCache(Consts.DataViews.permissGetGameZone);
        return new ExcuteModel(dataView, gameId,params);
    }

    public ExcuteModel userChannels(UserPermiss userPermiss){
        int gameId = userPermiss.getCurrentGame().getGameId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        String userName = userPermiss.getUserName();
        String language = userPermiss.getLanguage();
        //获取用户权限信息
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.STRING_PARAM,"user_name",userName));
        List<UserPermissInfo> userPermissInfos = permissRepository.getPermissInfo(connectionManager.getConnection(0),
                dataViewCache.getSelectedCommand(Consts.DataViews.sysGetUserPermiss),params);
        Iterator<UserPermissInfo> nextPermissInfo = CollectionUtil.filter(userPermissInfos, new UserPermissInfoEditor(Consts.PermissKey.OAS_CHANNEL)).iterator();
        List<ItemPermiss> retList = new ArrayList<ItemPermiss>();
        while(nextPermissInfo.hasNext()){
            List<ItemPermiss> lsit = gson.fromJson(nextPermissInfo.next().getPremissInfo(),
                    new TypeToken<List<ItemPermiss>>() {
                    }.getType());
            retList.addAll(lsit);
        }
        GetItemPermissConsumer getItemPermissEditor = new GetItemPermissConsumer(gameId);
        CollectionUtil.forEach(retList.iterator(),getItemPermissEditor);
        //从数据库里关联出区服数据
        params.clear();
        params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.INT_PARAM, "game_id", String.valueOf(userPermiss.getCurrentGame().getMainGameId())));
        params.add(new DBParam(DBParam.STRING_PARAM,"userChannels",getItemPermissEditor.getResult()));
        params.add(new DBParam(DBParam.INT_PARAM, "system_id", String.valueOf(systemId)));
        params.add(new DBParam(DBParam.STRING_PARAM, "language", language));
        DataView dataView = null;
        if(systemId == 3) dataView = dataViewCache.getCache(Consts.DataViews.permissGet88BoxGameChannels);
        else  dataView = dataViewCache.getCache(Consts.DataViews.permissGetGameChannels);
        return new ExcuteModel(dataView, gameId,params);
    }

    public ExcuteModel userPayChannels(UserPermiss userPermiss){
        int gameId = userPermiss.getCurrentGame().getGameId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        String userName = userPermiss.getUserName();
        String language = userPermiss.getLanguage();
        //获取用户权限信息
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.STRING_PARAM,"user_name",userName));
        List<UserPermissInfo> userPermissInfos = permissRepository.getPermissInfo(connectionManager.getConnection(0),
                dataViewCache.getSelectedCommand(Consts.DataViews.sysGetUserPermiss),params);
        Iterator<UserPermissInfo> nextPermissInfo = CollectionUtil.filter(userPermissInfos, new UserPermissInfoEditor(Consts.PermissKey.OAS_PAYCHANNEL)).iterator();
        List<ItemPermiss> retList = new ArrayList<ItemPermiss>();
        while(nextPermissInfo.hasNext()){
            List<ItemPermiss> lsit = gson.fromJson(nextPermissInfo.next().getPremissInfo(),
                    new TypeToken<List<ItemPermiss>>() {
                    }.getType());
            retList.addAll(lsit);
        }
        GetItemPermissConsumer getItemPermissEditor = new GetItemPermissConsumer(gameId);
        CollectionUtil.forEach(retList.iterator(),getItemPermissEditor);
        //从数据库里关联出区服数据
        params.clear();
        params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.INT_PARAM, "game_id", String.valueOf(userPermiss.getCurrentGame().getMainGameId())));
        params.add(new DBParam(DBParam.STRING_PARAM,"userChannels",getItemPermissEditor.getResult()));
        params.add(new DBParam(DBParam.INT_PARAM, "system_id", String.valueOf(systemId)));
        params.add(new DBParam(DBParam.STRING_PARAM, "language", language));
        DataView dataView = null;
        if(systemId == 3) dataView = dataViewCache.getCache(Consts.DataViews.permissGet88BoxPayChannels);
        else  dataView = dataViewCache.getCache(Consts.DataViews.permissGetGamePayChannels);
        return new ExcuteModel(dataView, gameId,params);
    }

    public List<EffectResult> userPromise(String oaId){
        Map<String,String> permissList = permissTransactionCache.getPermissList(oaId);
        List<TransactionPermissProxy> transactionPermissProxyList = new ArrayList<>();
        for(String val : permissList.values()) {
            transactionPermissProxyList.add(gson.fromJson(val,TransactionPermissProxy.class));
        }
        Collections.sort(transactionPermissProxyList);
        String userName = "";
        List<String> powerList = new ArrayList<>();
        List<EffectResult> result = new ArrayList<>();
        for(TransactionPermissProxy proxy : transactionPermissProxyList){
            TLUserAction userAction = new TLUserAction();
            userAction.setConnectionId(0);
            userAction.setGameId(proxy.getGameId());
            userAction.setMessage(proxy.getDescrption());
            userAction.setDataviewName(proxy.getType());
            userAction.setUserName(proxy.getUserName());
            userAction.setCountDate(DateUtil.parseDate(proxy.getCreateTime()));
            try {
                List<DBParam> params = new ArrayList<DBParam>();
                params.add(new DBParam(DBParam.STRING_PARAM, "user_name", proxy.getUserName()));
                powerList.add(proxy.getDescrption());
                if (StrUtil.isEmpty(userName)) userName = proxy.getUserName();
                List<UserPermissInfo> userPermissInfos = permissRepository.getPermissInfo(connectionManager.getConnection(0),
                        dataViewCache.getCache(Consts.DataViews.sysGetUserPermiss).getExportCommand(), params);
                proxy.setPermissInfoList(userPermissInfos);
                ExcuteModel excuteModel = proxy.execute(gson, dataViewCache);
                excuteModel.setConnection(this.connectionManager.getConnection(0));
                result.addAll(this.tableResultCache.getEffectResult(excuteModel));
                userAction.setStatus(1);
                userAction.setParams(proxy.getDescrption());
                userActionMapper.insert(userAction);

            }catch (Exception e){
                userAction.setStatus(0);
                userAction.setMessage(ExceptionUtil.getMessage(e) + ExceptionUtil.stacktraceToString(e));
                userActionMapper.insert(userAction);
            }
        }
        notifyMessage promise = new notifyMessage();
        promise.setDate(DateUtil.formatDateTime(DateUtil.date()));
        promise.setUserName(userName);
        promise.setMessageList(powerList);
        try {
            webSocketClientManage.sendMessage(userName, promise);
        }catch (Exception e){
            logger.info("send Message exception : {}", ExceptionUtil.getMessage(e));
        }
        permissTransactionCache.removeCahce(oaId);
        return result;
    }

    public void removePromise(String oaId,int gameId,String type){
        Map<String,String> permissList = permissTransactionCache.getPermissList(oaId);
        List<TransactionPermissProxy> transactionPermissProxyList = new ArrayList<>();
        for(Map.Entry<String,String> val : permissList.entrySet()) {
            TransactionPermissProxy proxy =  gson.fromJson(val.getValue(),TransactionPermissProxy.class);
            if(proxy.getGameId() == gameId && proxy.getType().equals(type)){
                permissTransactionCache.removePermiss(oaId,val.getKey());
            }
        }

    }

    public void userReject(String oaId){
        Map<String,String> permissList = permissTransactionCache.getPermissList(oaId);
        List<TransactionPermissProxy> transactionPermissProxyList = new ArrayList<>();
        for(Map.Entry<String,String> val : permissList.entrySet()) {
            TransactionPermissProxy proxy =  gson.fromJson(val.getValue(),TransactionPermissProxy.class);
            TLUserAction userAction = new TLUserAction();
            userAction.setConnectionId(0);
            userAction.setStatus(0);
            userAction.setUserName(proxy.getUserName());
            userAction.setGameId(proxy.getGameId());
            userAction.setParams(proxy.getDescrption());
            userAction.setDataviewName(proxy.getType());
            userAction.setCountDate(DateUtil.parseDate(proxy.getCreateTime()));
            userActionMapper.insert(userAction);
        }
        permissTransactionCache.removeCahce(oaId);

    }

    public List<Actor> userActor(int userId){
       List<UserActor> actors = userActorService.selectList(Condition.create().eq("user_id",userId));
        Object[] actId = new Object[actors.size()];
        for(int i = 0;i<actors.size();i++){
            actId[i] = actors.get(i).getActorId();
        }
        return actorMapper.selectList(Condition.create().in("act_id",actId));
    }

    public Boolean grantUserActor(String oaId, int systemId, int gameId, int userId, String userName, String actorId) {
        try {
            permissServices.removePromise(oaId, gameId, Consts.PermissKey.OAS_CHANNEL);
            List<Actor> actors = actorMapper.selectList(Condition.create().in("actorId", StrUtil.split(actorId, ",")));
            String zoneName = "";
            for (int i = 0; i < actors.size(); i++) zoneName += actors.get(i).getActorName();
            TransactionPermissProxy proxy = new TransactionPermissProxy();
            String nowDate = DateUtil.format(Calendar.getInstance().getTime(), DateUtil.NORM_DATETIME_PATTERN);
            proxy.setUserName(userName);
            proxy.setGameId(gameId);
            proxy.setType(Consts.PermissKey.OAS_CHANNEL);
            proxy.setDescrption(String.format("角色 - %s ：%s", zoneName));
            proxy.setCreateTime(nowDate);
            ActorPermissTransaction transaction = new ActorPermissTransaction();
            transaction.setGameId(gameId);
            transaction.setSystemId(systemId);
            transaction.setUserId(userId);
            transaction.setOaId(oaId);
            transaction.setCreateTime(nowDate);
            String transactionId = UUID.randomUUID().toString();
            transaction.setTransactionId(transactionId);
            transaction.setUserName(userName);
            transaction.setActorId(actorId);
            proxy.setTransactionPermiss(gson.toJson(transaction));
            permissTransactionCache.addPermiss(oaId, transactionId, gson.toJson(proxy));
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

}
