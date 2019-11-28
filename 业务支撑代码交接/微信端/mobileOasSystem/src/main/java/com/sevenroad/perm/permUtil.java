package com.sevenroad.perm;

import com.sevenroad.cache.data.channelCache;
import com.sevenroad.cache.data.systemCache;
import com.sevenroad.dao.data.gameInfo;
import com.sevenroad.perm.model.userInfo;
import com.sevenroad.utils.config.systemConfig;
import com.sevenroad.utils.exception.severnroadException;
import com.sevenroad.utils.exception.userPermException;
import net.sf.json.JSONObject;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.*;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

/**
 * Created by linlin.zhang on 2016/10/31.
 */
public class permUtil {
    static String permissUrl = systemConfig.getOtherConfig().permUrl;
    public static userInfo getUserPermiss(String userName) throws Exception{
        try {
            CloseableHttpClient httpclient = HttpClients.createDefault();
            HttpGet httpget = new HttpGet(permissUrl+"&id="+userName);
            CloseableHttpResponse httpResponse = httpclient.execute(httpget);
           // BufferedReader in = new BufferedReader(new InputStreamReader(entity.getContent()));
            StringBuffer response = new StringBuffer();
            String inputLine = EntityUtils.toString(httpResponse.getEntity(), Charset.forName("utf-8"));
            httpResponse.close();
            if(inputLine.isEmpty() || inputLine.compareTo("null") == 0)
                throw new userPermException(userPermException.ERROR_USER_OR_PWD);
            JSONObject userJson = JSONObject.fromObject(inputLine);
            if(userJson.getInt("user_status") != 1)
                 throw new userPermException(userPermException.ERROR_USER_OR_PWD);
            userInfo user = new userInfo();
            user.setUsername(userJson.getString("user_name"));
            user.setPassword(userJson.getString("user_password"));
            user.setUsercomment(userJson.getString("user_comment"));
            user.setUserid(userJson.getInt("user_id"));
            Object[] configJson = userJson.getJSONArray("configs").toArray();
            HashMap<String,ArrayList<String>> permList = new HashMap<String,ArrayList<String>>();
            for(int i = 0;i<configJson.length;i++){
                JSONObject config = (JSONObject) configJson[i];
                String config_value = config.getString("config_item_name");
                if(systemConfig.getOtherConfig().permList.contains(config_value)) {
                    String permValue = config.getString("config_item_value");
                    if(!permValue.isEmpty()) {
                        if (permList.containsKey(config_value))
                            permList.get(config_value).addAll(Arrays.asList(permValue.split(",")));
                        else
                            permList.put(config_value, new ArrayList<String>(Arrays.asList(permValue.split(","))));
                    }
                }
            }
            user.setPermList(permList);
            return user;
        }
         catch (IOException ex){
             throw new severnroadException(severnroadException.CONNECTED_SERVER_TIMEOUT);
        }

    }
    public static String getNodePerm(String config_name,String game_id,String permNode) throws Exception {
        int s=0,g=0,a = 0,b=0,c=0;
        String result = "",sys = "",game = "";
        s = permNode.indexOf('s');
        g = permNode.indexOf('g');
        a = permNode.indexOf('a');
        b = permNode.indexOf('b');
        c = permNode.indexOf('c');
        if(g > 0) {
            if(a > 0)
            game = permNode.substring(g+1,a);
            else game = permNode.substring(g+1);
            if(game_id.compareTo(game) != 0) return "";
            if (c >= 0)
                return permNode.substring(c + 1);
            else if (b >= 0) return permNode.substring(b + 1);
            else if (a >= 0) return permNode.substring(a + 1);
            else {
                sys = permNode.substring(s + 1, g);
                game = permNode.substring(g + 1);
                systemCache cache = new systemCache();
                gameInfo gameInfo = cache.getSystemGame(Integer.parseInt(sys),Integer.parseInt(game));
                if(gameInfo != null)
                    switch (config_name)
                    {
                        case "mobileOasSystemWebAgent":return gameInfo.getTopAgent();
                        case "mobileOasSystemWebChannel":
                            channelCache channels = new channelCache();
                            return channels.getChannel(game_id);
                        case "mobileOasSystemWebMenu":return gameInfo.getTopMenus();
                        default:return "";
                    }
            }
        }
        else if(s >= 0) {
            sys = permNode.substring(s+1);
            systemCache cache = new systemCache();
            gameInfo gameInfo = cache.getSystemGame(Integer.parseInt(sys),Integer.parseInt(game_id));
            if(gameInfo != null)
                switch (config_name)
                {
                    case "mobileOasSystemWebAgent":return gameInfo.getTopAgent();
                    case "mobileOasSystemWebChannel":
                        channelCache channels = new channelCache();
                        return channels.getChannel(game_id);
                    case "mobileOasSystemWebMenu":return gameInfo.getTopMenus();
                    default:return "";
                }
        }
        return "";
    }
    public static String getGame(ArrayList<String> permList)throws Exception{
        StringBuilder sb = new StringBuilder();
        String item = "";
        for(int i = 0;i<permList.size();i++){
            item = getPermGame(permList.get(i));
            if(!item.isEmpty())
                    sb.append(item);
        }
        return sb.length() > 1 ?sb.substring(1):"";
    }
    public static String getGameMenu(int game_id,ArrayList<String> permList) throws Exception {
        StringBuilder sb = new StringBuilder();
        String item = "";
        for(int i = 0;i<permList.size();i++){
            item =  getNodePerm("mobileOasSystemWebMenu",String.valueOf(game_id),permList.get(i));
            if(!item.isEmpty())
                sb.append(","+item);
        }
        return sb.length() > 1 ?sb.substring(1):"";
    }
    public static String getGameAgent(int game_id, ArrayList<String> permList)throws Exception{
        StringBuilder sb = new StringBuilder();
        String item = "";
        for(int i = 0;i<permList.size();i++){
            item =  getNodePerm("mobileOasSystemWebAgent",String.valueOf(game_id),permList.get(i));
            if(!item.isEmpty())
                sb.append(","+item);
        }
        return sb.length() > 1 ?sb.substring(1):"";
    }
    public static String getPermGame(String permNode)throws Exception{
        int s=0,g=0,a = 0,b=0,c=0;
        String result = "",sys = "",game = "";
        s = permNode.indexOf('s');
        g = permNode.indexOf('g');
        a = permNode.indexOf('a');
        b = permNode.indexOf('b');
        c = permNode.indexOf('c');
        if(a > 0)
            return ","+permNode.substring(g+1,a);
        else if(g > 0) {
            return ","+permNode.substring(g+1);
        }
        else{
            sys = permNode.substring(s+1);
            systemCache cache = new systemCache();
           gameInfo[] gameInfos = cache.getSystemGame(Integer.parseInt(sys));
            String gameStr = "";
            for(int i = 0;i<gameInfos.length;i++){
                gameStr +="," + gameInfos[i].getGameid();
            }
            return gameStr;
        }
    }

    public static String getGameChannel(int game_id,ArrayList<String> permList) throws Exception {
        StringBuilder sb = new StringBuilder();
        String item = "";
        for(int i = 0;i<permList.size();i++){
            item =  getNodePerm("mobileOasSystemWebChannel",String.valueOf(game_id),permList.get(i));
            if(!item.isEmpty())
                sb.append(","+item);
        }
        return sb.length() > 1 ?sb.substring(1):"";
    }
}
