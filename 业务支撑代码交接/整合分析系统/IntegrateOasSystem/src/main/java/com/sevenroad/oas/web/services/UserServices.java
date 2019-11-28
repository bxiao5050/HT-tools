package com.sevenroad.oas.web.services;

import com.baomidou.mybatisplus.mapper.Condition;
import com.google.common.base.Joiner;
import com.google.common.base.Strings;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.cache.Imp.GameInfoCahe;
import com.sevenroad.oas.cache.model.TranslateProxy;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.Utils;
import com.sevenroad.oas.dao.entity.Game;
import com.sevenroad.oas.dao.entity.Indicators;
import com.sevenroad.oas.dao.entity.User;
import com.sevenroad.oas.dao.mapper.IndicatorsMapper;
import com.sevenroad.oas.dao.mapper.UserMapper;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.dao.model.tables.UserGameInfo;
import com.sevenroad.oas.dao.model.tables.UserMenusInfo;
import com.sevenroad.oas.dao.model.tables.UserPermissInfo;
import com.sevenroad.oas.dao.repository.PermissRepository;
import com.sevenroad.oas.userPermiss.model.GamePermiss;
import com.sevenroad.oas.userPermiss.model.ItemPermiss;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;
import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.common.SystemConfig;
import com.sevenroad.oas.web.model.Channel;
import com.sevenroad.oas.web.model.IndicatorItem;
import com.sevenroad.oas.web.model.MenuPremissDecorator;
import com.sevenroad.oas.web.model.consumer.GetGameInfoConsumer;
import com.sevenroad.oas.web.model.consumer.GetGamePermissConsumer;
import com.sevenroad.oas.web.model.consumer.GetItemPermissConsumer;
import com.sevenroad.oas.web.model.consumer.GetRootMenuConsumer;
import com.sevenroad.oas.web.model.editor.UserPermissInfoEditor;
import com.sevenroad.oas.web.utils.Consts;
import com.sevenroad.oas.web.utils.JsonPResult;
import com.sevenroad.oas.web.utils.JsonUtils;
import com.sevenroad.oas.web.utils.TreeUtils;
import com.sevenroad.oas.web.utils.imp.jsonResult;
import com.xiaoleilu.hutool.util.CollectionUtil;
import com.xiaoleilu.hutool.util.StrUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by linlin.zhang on 2017/5/24.
 */
@Service
public class UserServices {

    @Autowired
    DataViewCache dataViewCache;
    @Autowired
    PermissRepository permissRepository;
    @Autowired
    ConnectionManager connectionManager;
    @Autowired
    UserMapper userMapper;
    @Autowired
    GameInfoCahe gameInfoCahe;
    @Autowired
    IndicatorsMapper indicatorsMapper;
    @Autowired
    SystemConfig systemConfig;
    Gson gson = new Gson();

    Logger logger = LoggerFactory.getLogger(UserServices.class);

    /**
     * 登录获取用户权限数据
     * @param userName
     * @param language
     * @return
     */
    public UserPermiss login(int userId ,String userName,String language){
        //用户是否存在
        User user = userMapper.selectById(userId);
        if(user == null) {
            user = new User();
            user.setUserId(userId);
            user.setUserName(userName);
            userMapper.insert(user);
        }
        //创建权限信息
        UserPermiss userPermiss = new UserPermiss();
        userPermiss.setUserId(userId);
        userPermiss.setUserName(userName);
        userPermiss.setLanguage(language);
        userPermiss.setUserType(user.getUserType());
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.STRING_PARAM,"user_name",userName));
        //获取权限数据
        List<UserPermissInfo> userPermissInfos = permissRepository.getPermissInfo(connectionManager.getConnection(0),
                dataViewCache.getSelectedCommand(Consts.DataViews.sysGetUserPermiss),params);
        userPermiss.setPermissList(userPermissInfos);
        return userPermiss;
    }


    /**
     * OA登陆接口
     * @param userName
     * @param language
     * @return
     */
    public UserPermiss OALogin(int userId,String userName,String language){
        //创建权限信息
        User user = userMapper.selectById(userId);
        if(user == null) {
            user = new User();
            user.setUserId(userId);
            user.setUserName(userName);
            userMapper.insert(user);
        }
        UserPermiss userPermiss = new UserPermiss();
        userPermiss.setUserId(userId);
        userPermiss.setUserName(userName);
        userPermiss.setLanguage(language);
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.STRING_PARAM,"user_name",userName));
        //获取权限数据
        List<UserPermissInfo> userPermissInfos = permissRepository.getPermissInfo(connectionManager.getConnection(0),
                dataViewCache.getSelectedCommand(Consts.DataViews.sysGetUserPermiss),params);
        userPermiss.setPermissList(userPermissInfos);
        return userPermiss;
    }

    /**
     * 获取用户游戏权限数据
     * @param userPermiss
     * @return
     */
    public List<UserGameInfo> getGameInfo(UserPermiss userPermiss){
        //获取用户菜单查询的权限，根据这个权限来判断是否具有游戏权限
        List<UserPermissInfo> userPermissInfos = userPermiss.getPermissList();
        GetGamePermissConsumer gamePermissConsumer = new GetGamePermissConsumer();
        CollectionUtil.forEach(userPermissInfos.iterator(),gamePermissConsumer);
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.STRING_PARAM,"gameId", gamePermissConsumer.getResult()));
        params.add(new DBParam(DBParam.STRING_PARAM,"language",userPermiss.getLanguage()));
        List<UserGameInfo> userGameInfo = permissRepository.GetPermissGameInfo(connectionManager.getConnection(0),
                dataViewCache.getSelectedCommand(Consts.DataViews.sysGetGame),params);
        //生成游戏权限信息
        GetGameInfoConsumer gameInfoConsumer = new GetGameInfoConsumer();
        CollectionUtil.forEach(userGameInfo.iterator(),gameInfoConsumer);
        List<GamePermiss> gamePermisses = gameInfoConsumer.getResult();
        userPermiss.setGamePermisses(gamePermisses);
        return userGameInfo;
    }

    /**
     * OA游戏数据
     * @param userPermiss
     * @return
     */
    public ExcuteModel getOAGamInfo(UserPermiss userPermiss){
        //获取用户菜单查询的权限，根据这个权限来判断是否具有游戏权限
        List<UserPermissInfo> userPermissInfos = userPermiss.getPermissList();
        GetGamePermissConsumer gamePermissConsumer = new GetGamePermissConsumer();
        CollectionUtil.forEach(userPermissInfos.iterator(),gamePermissConsumer);
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.STRING_PARAM,"gameId", gamePermissConsumer.getResult()));
        params.add(new DBParam(DBParam.STRING_PARAM,"language",userPermiss.getLanguage()));
        List<UserGameInfo> userGameInfo = permissRepository.GetPermissGameInfo(connectionManager.getConnection(0),
                dataViewCache.getSelectedCommand(Consts.DataViews.sysGetGame),params);
        //生成游戏权限信息
        GetGameInfoConsumer gameInfoConsumer = new GetGameInfoConsumer();
        CollectionUtil.forEach(userGameInfo.iterator(),gameInfoConsumer);
        List<GamePermiss> gamePermisses = gameInfoConsumer.getResult();
        userPermiss.setGamePermisses(gamePermisses);
        ExcuteModel model = new ExcuteModel(dataViewCache.getCache(Consts.DataViews.sysGetPermissGames),0,null);
        model.setConnection(connectionManager.getConnection(0));
        return model;
    }

    public GamePermiss OAChange(int SystemId,int gameId){
        Game game = gameInfoCahe.getCache(gameId);
        if(game == null) return null;

        GamePermiss gamePermiss = new GamePermiss();
        gamePermiss.setSystemId(SystemId);
        gamePermiss.setGameName(game.getGameName());
        gamePermiss.setGameId(game.getGameId());
        gamePermiss.setMainGameId(game.getMainGameId());
        return gamePermiss;
    }

    public ExcuteModel getOAMenus(int SystemId,int gameId,String language){
        Game game = gameInfoCahe.getCache(gameId);
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.STRING_PARAM,"game_id", String.valueOf(gameId)));
        params.add(new DBParam(DBParam.STRING_PARAM,"language",language));
        params.add(new DBParam(DBParam.STRING_PARAM,"system_id",String.valueOf(SystemId)));
        ExcuteModel model = new ExcuteModel(dataViewCache.getCache(Consts.DataViews.sysGetPermissMenus),0,params);
        model.setConnection(connectionManager.getConnection(0));
        return model;
    }




    Joiner joiner = Joiner.on(",").skipNulls();
    /**
     * 获取游戏下菜单权限数据
     * @param userPermiss
     * @return
     */
    public List<MenuPermiss> getMenus(UserPermiss userPermiss){
        int gameId = userPermiss.getCurrentGame().getGameId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        String language = userPermiss.getLanguage();
        Collection<UserPermissInfo> userPermissInfos = CollectionUtil.filter(userPermiss.getPermissList(), new UserPermissInfoEditor(Consts.PermissKey.OAS_MENU));
        //汇总同类型的菜单权限
        Map<Integer,List<String>> catagoryPermissInfo = new HashMap<>();
        Iterator<UserPermissInfo> infoIterator = userPermissInfos.iterator();

        while (infoIterator.hasNext()) {
            UserPermissInfo userPermissInfo = infoIterator.next();
            List<ItemPermiss> gameList = gson.fromJson(userPermissInfo.getPremissInfo(),
                    new TypeToken<List<ItemPermiss>>() {
                    }.getType());
            if(gameList == null) continue;

            //只获取当前游戏下的菜单权限
            for(int i = 0;i<gameList.size();i++){
                if(gameList.get(i).getItemId() == gameId){
                    if(catagoryPermissInfo.containsKey(userPermissInfo.getPremissExtraId())){
                        catagoryPermissInfo.get(userPermissInfo.getPremissExtraId()).add(gameList.get(i).getPermissInfo());
                    }else {
                        List<String> list = new ArrayList<>();
                        list.add(gameList.get(i).getPermissInfo());
                        catagoryPermissInfo.put(userPermissInfo.getPremissExtraId(),list);
                    }
                    break;
                }
            }
        }

        Hashtable<Integer, List<UserMenusInfo>> userMenusInfos = new Hashtable<Integer, List<UserMenusInfo>>();
        for(int i = 1;i<=4;i++){
            if(catagoryPermissInfo.containsKey(i)){

                String menuIds =  joiner.join(catagoryPermissInfo.get(i));
                if(StrUtil.isNotEmpty(menuIds)){
                    String sql = dataViewCache.getSelectedCommand(Consts.DataViews.sysGetUserMenuDetails);
                    List<DBParam> params = new ArrayList<DBParam>();
                    params.add(new DBParam(DBParam.STRING_PARAM, "menu_ids",menuIds));
                    params.add(new DBParam(DBParam.INT_PARAM, "game_id", String.valueOf(gameId)));
                    params.add(new DBParam(DBParam.INT_PARAM, "system_id", String.valueOf(systemId)));
                    params.add(new DBParam(DBParam.STRING_PARAM,"language",language));
                    List<UserMenusInfo> list = permissRepository.getPermissMenuInfo(connectionManager.getConnection(0), Utils.sqlGenerate(sql, params));
                    userMenusInfos.put(i, list);
                }
            }
        }
        MenuPremissDecorator decorator = new MenuPremissDecorator(userMenusInfos);
        return decorator.getTree();
    }


    /**
     * 获取游戏下区服权限数据
     * @param userPermiss
     * @return
     */
    public ExcuteModel getZone(UserPermiss userPermiss){
        int systemId = userPermiss.getCurrentGame().getSystemId();
        int gameId = userPermiss.getCurrentGame().getGameId();
        int mainGameId = userPermiss.getCurrentGame().getMainGameId();
        String language = userPermiss.getLanguage();
        Collection<UserPermissInfo> userPermissInfos = CollectionUtil.filter(userPermiss.getPermissList(), new UserPermissInfoEditor(Consts.PermissKey.OAS_ZONE));
        Iterator<UserPermissInfo> nextPermissInfo = userPermissInfos.iterator();
        List<ItemPermiss> retList = new ArrayList<ItemPermiss>();
        while (nextPermissInfo.hasNext()) {
            List<ItemPermiss> lsit = gson.fromJson(nextPermissInfo.next().getPremissInfo(),
                    new TypeToken<List<ItemPermiss>>() {
                    }.getType());
            retList.addAll(lsit);
        }
        GetItemPermissConsumer getItemPermissEditor = new GetItemPermissConsumer(gameId);
        CollectionUtil.forEach(retList.iterator(), getItemPermissEditor);
        String zoneIds = getItemPermissEditor.getResult();
        if (Strings.isNullOrEmpty(zoneIds))
            return null;
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.INT_PARAM, "gameId", String.valueOf(mainGameId)));
        params.add(new DBParam(DBParam.INT_PARAM, "systemId", String.valueOf(systemId)));
        params.add(new DBParam(DBParam.STRING_PARAM, "language", language));
        params.add(new DBParam(DBParam.STRING_PARAM,"userName",userPermiss.getUserName()));
        params.add(new DBParam(DBParam.INT_PARAM,"userId",String.valueOf(userPermiss.getUserId())));
        params.add(new DBParam(DBParam.STRING_PARAM, "zoneId", zoneIds));
        DataView dataView = null;
        if (systemId == 3)
            dataView = dataViewCache.getCache(Consts.DataViews.sysGet88BoxZone);
        else dataView = dataViewCache.getCache(Consts.DataViews.sysGetUserZone);
        return new ExcuteModel(dataView, gameId, params);
    }

    /**
     * 获取游戏下渠道数据
     * @param userPermiss
     * @return
     */
    public ExcuteModel getChannel(UserPermiss userPermiss){
        int systemId = userPermiss.getCurrentGame().getSystemId();
        int gameId = userPermiss.getCurrentGame().getGameId();
        int mainGameId = userPermiss.getCurrentGame().getMainGameId();
        String language = userPermiss.getLanguage();
        Collection<UserPermissInfo> userPermissInfos = CollectionUtil.filter(userPermiss.getPermissList(), new UserPermissInfoEditor(Consts.PermissKey.OAS_CHANNEL));
        Iterator<UserPermissInfo> nextPermissInfo = userPermissInfos.iterator();
        List<ItemPermiss> retList = new ArrayList<ItemPermiss>();
        while (nextPermissInfo.hasNext()) {
            List<ItemPermiss> lsit = gson.fromJson(nextPermissInfo.next().getPremissInfo(),
                    new TypeToken<List<ItemPermiss>>() {
                    }.getType());
            retList.addAll(lsit);
        }
        GetItemPermissConsumer getItemPermissEditor = new GetItemPermissConsumer(gameId);
        CollectionUtil.forEach(retList.iterator(), getItemPermissEditor);
        String zoneIds = getItemPermissEditor.getResult();
       // if (Strings.isNullOrEmpty(zoneIds)) return null;
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.INT_PARAM, "gameId", String.valueOf(mainGameId)));
        params.add(new DBParam(DBParam.INT_PARAM, "systemId", String.valueOf(systemId)));
        params.add(new DBParam(DBParam.STRING_PARAM, "language", language));
        params.add(new DBParam(DBParam.STRING_PARAM, "channelIds", zoneIds));
        DataView dataView = null;
        if (systemId == 3)
            dataView = dataViewCache.getCache(Consts.DataViews.sysGet88BoxChannel);
        else if(systemId == 2) dataView = dataViewCache.getCache(Consts.DataViews.sysGetUserChannel);
        else  {
            params.add(new DBParam(DBParam.INT_PARAM, "type", "1"));
            dataView = dataViewCache.getCache(Consts.DataViews.sysGetZiyanUserChannel);
        }

       return new ExcuteModel(dataView, gameId, params);
    }

    /**
     * 获取游戏下付费渠道数据
     * @param userPermiss
     * @return
     */
    public ExcuteModel getPayChannel(UserPermiss userPermiss){
        int systemId = userPermiss.getCurrentGame().getSystemId();
        int gameId = userPermiss.getCurrentGame().getGameId();
        int mainGameId = userPermiss.getCurrentGame().getMainGameId();
        String language = userPermiss.getLanguage();
        Collection<UserPermissInfo> userPermissInfos = CollectionUtil.filter(userPermiss.getPermissList(), new UserPermissInfoEditor(Consts.PermissKey.OAS_PAYCHANNEL));
        Iterator<UserPermissInfo> nextPermissInfo = userPermissInfos.iterator();
        List<ItemPermiss> retList = new ArrayList<ItemPermiss>();
        while (nextPermissInfo.hasNext()) {
            List<ItemPermiss> lsit = gson.fromJson(nextPermissInfo.next().getPremissInfo(),
                    new TypeToken<List<ItemPermiss>>() {
                    }.getType());
            retList.addAll(lsit);
        }
        GetItemPermissConsumer getItemPermissEditor = new GetItemPermissConsumer(gameId);
        CollectionUtil.forEach(retList.iterator(), getItemPermissEditor);
        String zoneIds = getItemPermissEditor.getResult();
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.INT_PARAM, "gameId", String.valueOf(mainGameId)));
        params.add(new DBParam(DBParam.INT_PARAM, "systemId", String.valueOf(systemId)));
        params.add(new DBParam(DBParam.STRING_PARAM, "language", language));
        params.add(new DBParam(DBParam.STRING_PARAM, "channelIds", zoneIds));
        DataView dataView = null;
        if (systemId == 3)
            dataView = dataViewCache.getCache(Consts.DataViews.sysGet88BoxPayChannel);
        else if(systemId == 2) dataView = dataViewCache.getCache(Consts.DataViews.sysGetPayChannel);
        else {
            params.add(new DBParam(DBParam.INT_PARAM, "type", "2"));
            dataView = dataViewCache.getCache(Consts.DataViews.sysGetZiyanUserChannel);
        }
        return new ExcuteModel(dataView, gameId, params);
    }

    Joiner joinerTranlate = Joiner.on("/n").skipNulls();
    public List<IndicatorItem> getIndicators(int gameId,int menuId,String language){
        List<Indicators> result = indicatorsMapper.selectList(new Condition().eq("state", 1).eq("game_id", gameId).eq("menu_id", menuId).orderBy("sort"));
        List<String> srcIndicator = new ArrayList<>();
        for(int i = 0;i<result.size();i++){
            String name = result.get(i).getIndicateName().replace("\r\n","\\n").replace("\n","\\n");
            String description = result.get(i).getIndicateDescription().replace("\r\n","\\n").replace("\n","\\n");
            result.get(i).setIndicateName(name);
            result.get(i).setIndicateDescription(description);
            srcIndicator.add(name);
            srcIndicator.add(description);
        }
        String url = systemConfig.getTranslateUrl(language);
        String originStr = joinerTranlate.join(srcIndicator);
        TranslateProxy proxy = new TranslateProxy(originStr,url);
        Map<String,String> translateMap = proxy.translate();
        List<IndicatorItem> indicatorItems = new ArrayList<>();
        for(int i = 0;i<result.size();i++){
            IndicatorItem item = new IndicatorItem();
            if(translateMap.containsKey(result.get(i).getIndicateName())){
                item.setIndicatorName(translateMap.get(result.get(i).getIndicateName()));
            }else{
                item.setIndicatorName(result.get(i).getIndicateName());
            }
            if(translateMap.containsKey(result.get(i).getIndicateDescription())){
                item.setGetIndicatorDescription(translateMap.get(result.get(i).getIndicateDescription()));
            }else{
                item.setGetIndicatorDescription(result.get(i).getIndicateDescription());
            }
            indicatorItems.add(item);
        }
        return indicatorItems;
    }
    /**
     * @param userPermiss 用户权限   tableResult过滤结果
     * @desc  通过用户名来过滤是否返回game182渠道
     * @author qinglong.luo
     * @date 2018/7/23 19:44
     */
    public String getOasChannel(UserPermiss userPermiss, String tableResult) {
        if (!userPermiss.getUserName().equals("eva.xu")&&tableResult.contains("[[{")&&tableResult.contains("game182")) {
            String substring = tableResult.substring(1, tableResult.length() - 1);
            List<Channel> json = JsonUtils.jsonToList(substring, Channel.class);
            for (int i = 0; i < json.size(); i++) {
                if (json.get(i).getChannel_name().equals("game182"))
                    json.remove(i);
            }
            tableResult = "["+JsonUtils.objectToJson(json)+"]";
        }
        return tableResult;
    }
}
