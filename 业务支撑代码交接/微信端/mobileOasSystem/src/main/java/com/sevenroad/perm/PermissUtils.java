package com.sevenroad.perm;

import com.google.gson.Gson;
import com.sevenroad.perm.model.*;
import com.sevenroad.utils.config.systemConfig;
import com.sevenroad.utils.exception.severnroadException;
import com.sevenroad.utils.exception.userPermException;
import com.xiaoleilu.hutool.convert.Convert;
import com.xiaoleilu.hutool.http.HttpUtil;
import net.sf.json.JSONObject;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

/**
 * Created by linlin.zhang on 2018/2/26/026.
 */
public class PermissUtils {
    static String permissUrl = systemConfig.getOtherConfig().PermissUrl; //"http://172.16.1.171:8080/permiss/user/fromGameAndType?userId=%d&type=%s";

    static String userInfo = systemConfig.getOtherConfig().permUrl;

    public static userInfo getUserPermiss(String userName) throws Exception {
        try {
            CloseableHttpClient httpclient = HttpClients.createDefault();
            HttpGet httpget = new HttpGet(userInfo + "&id=" + userName);
            CloseableHttpResponse httpResponse = httpclient.execute(httpget);
            // BufferedReader in = new BufferedReader(new InputStreamReader(entity.getContent()));
            StringBuffer response = new StringBuffer();
            String inputLine = EntityUtils.toString(httpResponse.getEntity(), Charset.forName("utf-8"));
            httpResponse.close();
            if (inputLine.isEmpty() || inputLine.compareTo("null") == 0)
                throw new userPermException(userPermException.ERROR_USER_OR_PWD);
            JSONObject userJson = JSONObject.fromObject(inputLine);
            if (userJson.getInt("user_status") != 1)
                throw new userPermException(userPermException.ERROR_USER_OR_PWD);
            userInfo user = new userInfo();
            user.setUsername(userJson.getString("user_name"));
            user.setPassword(userJson.getString("user_password"));
            user.setUsercomment(userJson.getString("user_comment"));
            user.setUserid(userJson.getInt("user_id"));
            return user;
        } catch (IOException ex){
            throw new severnroadException(severnroadException.CONNECTED_SERVER_TIMEOUT);
        }
    }

    static Gson gson = new Gson();
    public static PermissResult GetPermiss(int userId,int gameId,String permissType){
        HashMap<String,Object> params = new HashMap<>();
        params.put("gameId",gameId);
        params.put("userId",userId);
        params.put("type",permissType);
        return gson.fromJson(HttpUtil.post(permissUrl,params),PermissResult.class);
    }

    public static List<SystemGame> GetUserGames(List<PermissResource> list){
        List<SystemGame> systemGames = new ArrayList<>(10);
        int i = 1;
        for(PermissResource sys :list){
            for(PermissResource game : sys.getChildren()){
                SystemGame systemGame = new SystemGame();
                systemGame.setGame_id(Convert.toInt(game.getResourceId()));
                systemGame.setGame_name(game.getResourceName());
                systemGame.setSystem_id(Convert.toInt(sys.getResourceId()));
                systemGame.setSystem_name(sys.getResourceName());
                systemGame.setSort(i++);
                systemGame.setImage_url(game.getUrl());
                systemGames.add(systemGame);
            }
        }
        return systemGames;
    }

    public static void GetGameAgent(String top,List<PermissResource> list,List<GameAgent> result){
        if("0".equals(top)){
            for (PermissResource agent1 : list) {
                GameAgent agent = new GameAgent();
                agent.setAGENT_ID(Convert.toInt(agent1.getResourceId()));
                agent.setAGENT_NAME(agent1.getResourceName());
                agent.setAGENT_PID(top);
                result.add(agent);
            }
        }else {
            for (PermissResource agent1 : list) {
                if (agent1.getResourceId().equals(top)) {
                    for (PermissResource item : agent1.getChildren()) {
                        GameAgent agent = new GameAgent();
                        agent.setAGENT_ID(Convert.toInt(item.getResourceId()));
                        agent.setAGENT_NAME(item.getResourceName());
                        agent.setAGENT_PID(top);
                        result.add(agent);
                    }
                }
                GetGameAgent(top, agent1.getChildren(), result);
            }
        }
    }

    public static  List<SystemChannel> GetGameChannel(List<PermissResource> list){
        List<SystemChannel> systemChannels = new ArrayList<>();
        for(PermissResource level1 : list){
            SystemChannel channel = new SystemChannel();
            channel.setCHANNEL_ID(Convert.toInt(level1.getResourceId()));
            channel.setCHANNEL_NAME(level1.getResourceName());
            channel.setCHANNEL_PID(0);
            systemChannels.add(channel);
            for(PermissResource level2 : level1.getChildren()){
                channel = new SystemChannel();
                channel.setCHANNEL_ID(Convert.toInt(level2.getResourceId()));
                channel.setCHANNEL_NAME(level2.getResourceName());
                channel.setCHANNEL_PID(Convert.toInt(level1.getResourceId()));
                systemChannels.add(channel);
                for(PermissResource level3 : level2.getChildren()){
                    channel = new SystemChannel();
                    channel.setCHANNEL_ID(Convert.toInt(level3.getResourceId()));
                    channel.setCHANNEL_NAME(level3.getResourceName());
                    channel.setCHANNEL_PID(Convert.toInt(level2.getResourceId()));
                    systemChannels.add(channel);
                }
            }
        }
        return systemChannels;
    }


    public static List<GameMenu> GetGameMenus(int gameId,List<PermissResource> list){
        String strGameId = Convert.toStr(gameId);
        List<GameMenu> result = new ArrayList<>(10);
        for(PermissResource level1 : list){
            for(PermissResource level2 : level1.getChildren()){
                if(level2.getResourceId().equals(strGameId)){

                    for(PermissResource level3 : level2.getChildren()){
                        GameMenu item = new GameMenu();
                        item.setId(Convert.toInt(level3.getResourceId()));
                        item.setMenu_name(level3.getResourceName());
                        item.setMenu_url(level3.getUrl());
                        result.add(item);
                    }
                    Collections.sort(result);
                    return result;
                }
            }
        }
        return result;
    }
}
