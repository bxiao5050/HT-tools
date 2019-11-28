package com.sevenroad.oas.web.services;

import com.baomidou.mybatisplus.mapper.Condition;
import com.google.common.base.Joiner;
import com.google.common.base.Strings;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.DBModel;
import com.sevenroad.oas.dao.Utils;
import com.sevenroad.oas.dao.entity.Actor;
import com.sevenroad.oas.dao.entity.ActorPremiss;
import com.sevenroad.oas.dao.mapper.ActorMapper;
import com.sevenroad.oas.dao.mapper.ActorPremissMapper;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.dao.model.tables.UserMenusInfo;
import com.sevenroad.oas.dao.model.tables.UserPermissInfo;
import com.sevenroad.oas.dao.repository.PermissRepository;
import com.sevenroad.oas.dao.service.IActorPremissService;
import com.sevenroad.oas.userPermiss.model.ItemPermiss;
import com.sevenroad.oas.userPermiss.model.MenuLeafPermiss;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;
import com.sevenroad.oas.web.common.SystemLanguage;
import com.sevenroad.oas.web.model.MenuPremissDecorator;
import com.sevenroad.oas.web.model.consumer.GetItemPermissConsumer;
import com.sevenroad.oas.web.model.consumer.GetMenuItemPremissConsumer;
import com.sevenroad.oas.web.model.consumer.GetRootMenuConsumer;
import com.sevenroad.oas.web.model.consumer.GetZoneItemPremissConsumer;
import com.sevenroad.oas.web.model.editor.UserPermissInfoEditor;
import com.sevenroad.oas.web.utils.Consts;
import com.sevenroad.oas.web.utils.TreeUtils;
import com.xiaoleilu.hutool.util.CollectionUtil;
import com.xiaoleilu.hutool.util.StrUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.awt.*;
import java.util.*;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/6.
 */
@Service
public class ActorServices {
    @Autowired
    ActorMapper actorMapper;
    @Autowired
    IActorPremissService actorPremissService;
    @Autowired
    DataViewCache dataViewCache;
    @Autowired
    ConnectionManager connectionManager;
    @Autowired
    PermissRepository permissRepository;
    Logger logger = LoggerFactory.getLogger(ActorServices.class);
    Gson gson = new Gson();

    public Boolean addActor(String actorName,String description){
        Actor actor = new Actor();
        actor.setActorName(actorName);
        actor.setDescription(description);
        actorMapper.insert(actor);
        actor = actorMapper.selectOne(actor);
        List<ActorPremiss> actorPremisses = new ArrayList<>();
        for(int i = 1;i<=4;i++) {
            ActorPremiss menuPermiss = new ActorPremiss();
            menuPermiss.setActorId(actor.getActorId());
            menuPermiss.setPremissKeyId(1);
            menuPermiss.setPremissInfo("");
            menuPermiss.setPermissKeyExtraId(i);
            actorPremisses.add(menuPermiss);
        }
       return actorPremissService.insertBatch(actorPremisses);
    }


    public ExcuteModel actorZones(int actorId,int systemId,int gameId,int mainGameId,String language){
        List<ActorPremiss> premissList = actorPremissService.selectList(Condition.create().eq("actor_id",actorId).eq("premiss_key_id",2));
        String zoneIds = "";
        for(int i = 0;i<premissList.size();i++){
            GetItemPermissConsumer getItemPermissEditor = new GetItemPermissConsumer(gameId);
            List<ItemPermiss> lsit = gson.fromJson(premissList.get(i).getPremissInfo(),
                    new TypeToken<List<ItemPermiss>>() {
                    }.getType());
            CollectionUtil.forEach(lsit.iterator(), getItemPermissEditor);
            zoneIds = getItemPermissEditor.getResult();
        }
        if (Strings.isNullOrEmpty(zoneIds))
             zoneIds = "";
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.INT_PARAM, "game_id", String.valueOf(mainGameId)));
        params.add(new DBParam(DBParam.INT_PARAM, "systemId", String.valueOf(systemId)));
        params.add(new DBParam(DBParam.STRING_PARAM, "language", language));
        params.add(new DBParam(DBParam.STRING_PARAM, "userZones", zoneIds));
        DataView dataView = null;
        if (systemId == 3)
            dataView = dataViewCache.getCache(Consts.DataViews.permissGet88BoxGameZone);
        else dataView = dataViewCache.getCache(Consts.DataViews.permissGetGameZone);
        return new ExcuteModel(dataView, gameId, params);

    }
    Joiner joiner = Joiner.on(",").skipNulls();
    public List<MenuPermiss> getAcotrMenus(int actorId,int gameId,int systemId,String language){
        List<ActorPremiss> premissList = actorPremissService.selectList(Condition.create().eq("actor_id",actorId).eq("premiss_key_id",1));
        //汇总同类型的菜单权限
        Map<Integer,List<String>> catagoryPermissInfo = new HashMap<>();
        Iterator<ActorPremiss> infoIterator = premissList.iterator();

        while (infoIterator.hasNext()) {
            ActorPremiss userPermissInfo = infoIterator.next();
            List<ItemPermiss> gameList = gson.fromJson(userPermissInfo.getPremissInfo(),
                    new TypeToken<List<ItemPermiss>>() {
                    }.getType());
            if(gameList == null) continue;

            //只获取当前游戏下的菜单权限
            for(int i = 0;i<gameList.size();i++){
                if(gameList.get(i).getItemId() == gameId){
                    if(catagoryPermissInfo.containsKey(userPermissInfo.getPermissKeyExtraId())){
                        catagoryPermissInfo.get(userPermissInfo.getPermissKeyExtraId()).add(gameList.get(i).getPermissInfo());
                    }else {
                        List<String> list = new ArrayList<>();
                        list.add(gameList.get(i).getPermissInfo());
                        catagoryPermissInfo.put(userPermissInfo.getPermissKeyExtraId(),list);
                    }
                    break;
                }
            }
        }

        //获取所有权限
        String sql = dataViewCache.getSelectedCommand(Consts.DataViews.permissGetGameMenus);
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.INT_PARAM, "game_id", String.valueOf(gameId)));
        params.add(new DBParam(DBParam.INT_PARAM, "system_id", String.valueOf(systemId)));
        params.add(new DBParam(DBParam.STRING_PARAM, "language", language));
        List<UserMenusInfo> allMenu = permissRepository.getPermissMenuInfo(connectionManager.getConnection(0), Utils.sqlGenerate(sql, params));

        //获取角色权限
        Hashtable<Integer, List<UserMenusInfo>> userMenusInfos = new Hashtable<Integer, List<UserMenusInfo>>();
        for(int i = 1;i<=4;i++){
            if(catagoryPermissInfo.containsKey(i)){

                String menuIds =  joiner.join(catagoryPermissInfo.get(i));
                if(StrUtil.isNotEmpty(menuIds)){
                    sql = dataViewCache.getSelectedCommand(Consts.DataViews.sysGetUserMenuDetails);
                    params.clear();
                    params.add(new DBParam(DBParam.STRING_PARAM, "menu_ids",menuIds));
                    params.add(new DBParam(DBParam.INT_PARAM, "game_id", String.valueOf(gameId)));
                    params.add(new DBParam(DBParam.INT_PARAM, "system_id", String.valueOf(systemId)));
                    params.add(new DBParam(DBParam.STRING_PARAM,"language",language));
                    List<UserMenusInfo> list = permissRepository.getPermissMenuInfo(connectionManager.getConnection(0), Utils.sqlGenerate(sql, params));
                    userMenusInfos.put(i, list);
                }
            }
        }

        MenuPremissDecorator all = new MenuPremissDecorator();
        MenuPremissDecorator user = new MenuPremissDecorator(userMenusInfos);

        List<MenuPermiss> allPermiss = all.getTree(allMenu),userPermiss = user.getTree();
        for(int i = 0;i<allPermiss.size();i++){
            List<MenuLeafPermiss> leaf = allPermiss.get(i).getChildrenMenu();
            Boolean isPermiss = allPermiss.get(i).isPermiss(userPermiss);
            if(isPermiss) {
                for (int j = 0; j < leaf.size(); j++) {
                    leaf.get(j).isPermiss(userPermiss);
                }
            }
        }
        return allPermiss;
    }

    public ExcuteModel actorChannel(int actorId,int systemId,int gameId,int mainGameId,String language){
        List<ActorPremiss> premissList = actorPremissService.selectList(Condition.create().eq("actor_id",actorId).eq("premiss_key_id",3));
        String zoneIds = "";
        for(int i = 0;i<premissList.size();i++){
            GetItemPermissConsumer getItemPermissEditor = new GetItemPermissConsumer(gameId);
            List<ItemPermiss> lsit = gson.fromJson(premissList.get(i).getPremissInfo(),
                    new TypeToken<List<ItemPermiss>>() {
                    }.getType());
            CollectionUtil.forEach(lsit.iterator(), getItemPermissEditor);
            zoneIds = getItemPermissEditor.getResult();
        }
        if (Strings.isNullOrEmpty(zoneIds))
            zoneIds = "";
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.INT_PARAM, "game_id", String.valueOf(mainGameId)));
        params.add(new DBParam(DBParam.INT_PARAM, "systemId", String.valueOf(systemId)));
        params.add(new DBParam(DBParam.STRING_PARAM, "language", language));
        params.add(new DBParam(DBParam.STRING_PARAM, "userChannels", zoneIds));
        DataView dataView = null;
        if (systemId == 3)
            dataView = dataViewCache.getCache(Consts.DataViews.permissGet88BoxGameChannels);
        else dataView = dataViewCache.getCache(Consts.DataViews.permissGetGameChannels);
        return new ExcuteModel(dataView, gameId, params);
    }

    public ExcuteModel actorPayChannel(int actorId,int systemId,int gameId,int mainGameId,String language){
        List<ActorPremiss> premissList = actorPremissService.selectList(Condition.create().eq("actor_id",actorId).eq("premiss_key_id",4));
        String zoneIds = "";
        for(int i = 0;i<premissList.size();i++){
            GetItemPermissConsumer getItemPermissEditor = new GetItemPermissConsumer(gameId);
            List<ItemPermiss> lsit = gson.fromJson(premissList.get(i).getPremissInfo(),
                    new TypeToken<List<ItemPermiss>>() {
                    }.getType());
            CollectionUtil.forEach(lsit.iterator(), getItemPermissEditor);
            zoneIds = getItemPermissEditor.getResult();
        }
        if (Strings.isNullOrEmpty(zoneIds))
            zoneIds = "";
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.INT_PARAM, "game_id", String.valueOf(mainGameId)));
        params.add(new DBParam(DBParam.INT_PARAM, "systemId", String.valueOf(systemId)));
        params.add(new DBParam(DBParam.STRING_PARAM, "language", language));
        params.add(new DBParam(DBParam.STRING_PARAM, "userChannels", zoneIds));
        DataView dataView = null;
        if (systemId == 3)
            dataView = dataViewCache.getCache(Consts.DataViews.permissGet88BoxPayChannels);
        else dataView = dataViewCache.getCache(Consts.DataViews.permissGetGamePayChannels);
        return new ExcuteModel(dataView, gameId, params);
    }

    public Boolean grantMenu(int actorId,int gameId,String menuId1,String menuId2,String menuId3,String menuId4){
        List<ActorPremiss> premissList = actorPremissService.selectList(Condition.create().eq("actor_id", actorId).eq("premiss_key_id", 1));
        //创建模板权限数据
        for(int i = 1;i<=4;i++){
            boolean isExit = false;
            for(int j = 0;j<premissList.size();j++){
                if(premissList.get(j).getPermissKeyExtraId() == i){
                    isExit = true;
                    List<ItemPermiss> list = gson.fromJson(premissList.get(j).getPremissInfo(),
                            new TypeToken<List<ItemPermiss>>() {
                            }.getType());
                    boolean gameExit = false;
                    if(list == null)  list = new ArrayList<>();
                    for(int z = 0;z<list.size();z++){
                        if(list.get(z).getItemId() == gameId){
                            switch(i)
                            {
                                case 1:list.get(z).setPermissInfo(menuId1);break;
                                case 2:list.get(z).setPermissInfo(menuId2);break;
                                case 3:list.get(z).setPermissInfo(menuId3);break;
                                case 4:list.get(z).setPermissInfo(menuId4);break;
                            }
                            gameExit = true;
                        }
                    }
                    if(gameExit == false){
                        ItemPermiss newItem = new ItemPermiss();
                        newItem.setItemId(gameId);
                        switch(i)
                        {
                            case 1:newItem.setPermissInfo(menuId1);break;
                            case 2:newItem.setPermissInfo(menuId2);break;
                            case 3:newItem.setPermissInfo(menuId3);break;
                            case 4:newItem.setPermissInfo(menuId4);break;
                        }
                        list.add(newItem);
                    }
                    premissList.get(j).setPremissInfo(gson.toJson(list));
                }
            }
            if(isExit == false){
                ActorPremiss newPremiss = new ActorPremiss();
                newPremiss.setPermissKeyExtraId(i);
                newPremiss.setPremissKeyId(1);
                newPremiss.setActorId(actorId);
                ItemPermiss newItem = new ItemPermiss();
                newItem.setItemId(gameId);
                switch(i)
                {
                    case 1:newItem.setPermissInfo(menuId1);break;
                    case 2:newItem.setPermissInfo(menuId2);break;
                    case 3:newItem.setPermissInfo(menuId3);break;
                    case 4:newItem.setPermissInfo(menuId4);break;
                }
                List<ItemPermiss> list = new ArrayList<>();
                list.add(newItem);
                newPremiss.setPremissInfo(gson.toJson(list));
                premissList.add(newPremiss);
            }
        }
        actorPremissService.delete(Condition.create().eq("actor_id", actorId).eq("premiss_key_id", 1));
        return actorPremissService.insertBatch(premissList);
    }

    public Boolean grantZones(int actorId,int gameId,String zones){
        try {
            List<ActorPremiss> premissList = actorPremissService.selectList(Condition.create().eq("actor_id", actorId).eq("premiss_key_id", 2));
            List<UserPermissInfo> actorPermissInfo = new ArrayList<>();
            if(premissList.size() == 0){
                actorPermissInfo.add(new UserPermissInfo());
            }
            else {
                for (int i = 0; i < premissList.size(); i++) {
                    UserPermissInfo item = new UserPermissInfo();
                    //item.setPremissExtraId(premissList.get(i).getPermissKeyExtraId());
                    item.setPremissInfo(premissList.get(i).getPremissInfo());
                    actorPermissInfo.add(item);
                }
            }
            Iterator<UserPermissInfo> nextPermissInfo = actorPermissInfo.iterator();

            GetZoneItemPremissConsumer consumer = new GetZoneItemPremissConsumer(new Gson(), gameId, zones);
            CollectionUtil.forEach(nextPermissInfo, consumer);
            List<ActorPremiss> insertEntity = new ArrayList<>();
            for (int i = 0; i < actorPermissInfo.size(); i++) {
                ActorPremiss item = new ActorPremiss();
                item.setPremissInfo(consumer.getPremissInfo());
                item.setPremissKeyId(2);
                item.setActorId(actorId);
                insertEntity.add(item);
            }
            actorPremissService.delete(Condition.create().eq("actor_id", actorId).eq("premiss_key_id", 2));
            return actorPremissService.insertBatch(insertEntity);
        }
        catch (Exception e) {
            logger.error("grantZone error : {}", e);
            return false;
        }
    }


    public Boolean grantChannel(int actorId,int gameId,String channels){
        try {
            List<ActorPremiss> premissList = actorPremissService.selectList(Condition.create().eq("actor_id", actorId).eq("premiss_key_id", 3));
            List<UserPermissInfo> actorPermissInfo = new ArrayList<>();
            if(premissList.size() == 0){
                actorPermissInfo.add(new UserPermissInfo());
            }
            else {
                for (int i = 0; i < premissList.size(); i++) {
                    UserPermissInfo item = new UserPermissInfo();
                    // item.setPremissExtraId(premissList.get(i).getPermissKeyExtraId());
                    item.setPremissInfo(premissList.get(i).getPremissInfo());
                    actorPermissInfo.add(item);
                }
            }
            Iterator<UserPermissInfo> nextPermissInfo = actorPermissInfo.iterator();

            GetZoneItemPremissConsumer consumer = new GetZoneItemPremissConsumer(new Gson(), gameId, channels);
            CollectionUtil.forEach(nextPermissInfo, consumer);
            List<ActorPremiss> insertEntity = new ArrayList<>();
            for (int i = 0; i < actorPermissInfo.size(); i++) {
                ActorPremiss item = new ActorPremiss();
                item.setPremissInfo(consumer.getPremissInfo());
                item.setPremissKeyId(3);
                item.setActorId(actorId);
                insertEntity.add(item);
            }
            actorPremissService.delete(Condition.create().eq("actor_id", actorId).eq("premiss_key_id", 3));
            return actorPremissService.insertBatch(insertEntity);
        }
        catch (Exception e) {
            logger.error("grantChannel error : {}", e);
            return false;
        }
    }
    public Boolean grantPayChannel(int actorId,int gameId,String channels){
        try {
            List<ActorPremiss> premissList = actorPremissService.selectList(Condition.create().eq("actor_id", actorId).eq("premiss_key_id", 4));
            List<UserPermissInfo> actorPermissInfo = new ArrayList<>();
            if(premissList.size() == 0){
                actorPermissInfo.add(new UserPermissInfo());
            }
            else {
                for (int i = 0; i < premissList.size(); i++) {
                    UserPermissInfo item = new UserPermissInfo();
                    item.setPremissInfo(premissList.get(i).getPremissInfo());
                    actorPermissInfo.add(item);
                }
            }
            Iterator<UserPermissInfo> nextPermissInfo = actorPermissInfo.iterator();

            GetZoneItemPremissConsumer consumer = new GetZoneItemPremissConsumer(new Gson(), gameId, channels);
            CollectionUtil.forEach(nextPermissInfo, consumer);
            List<ActorPremiss> insertEntity = new ArrayList<>();
            for (int i = 0; i < actorPermissInfo.size(); i++) {
                ActorPremiss item = new ActorPremiss();
                item.setPremissInfo(consumer.getPremissInfo());
                item.setPremissKeyId(4);
                item.setActorId(actorId);
                insertEntity.add(item);
            }
            actorPremissService.delete(Condition.create().eq("actor_id", actorId).eq("premiss_key_id", 4));
            return actorPremissService.insertBatch(insertEntity);
        }
        catch (Exception e) {
            logger.error("grantChannel error : {}", e);
            return false;
        }
    }
}
