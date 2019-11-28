package com.sevenroad.facebook.common;

import com.facebook.ads.sdk.APIException;
import com.google.gson.Gson;
import com.sevenroad.facebook.entity.app;
import com.sevenroad.facebook.service.dbService;
import com.sevenroad.services.serviceFactory;
import com.xiaoleilu.hutool.http.HttpUtil;

/**
 * Created by linlin.zhang on 2018/4/3/003.
 */
public class FaceBookUtils {
    static final String url = "https://graph.facebook.com/v2.12/oauth/access_token?client_id=%s&client_secret=%s&fb_exchange_token=%s&grant_type=fb_exchange_token";
    static Gson gson = new Gson();

    public static class RefreshAccessToken {
        private String access_token;
        private String token_type;
        private String expires_in;

        public String getAccess_token() {
            return access_token;
        }

        public void setAccess_token(String access_token) {
            this.access_token = access_token;
        }

        public String getToken_type() {
            return token_type;
        }

        public void setToken_type(String token_type) {
            this.token_type = token_type;
        }

        public String getExpires_in() {
            return expires_in;
        }

        public void setExpires_in(String expires_in) {
            this.expires_in = expires_in;
        }
    }
    static dbService service = serviceFactory.getDbService();
    public static RefreshAccessToken refreshAccessToken(app appinfo){
       return gson.fromJson(HttpUtil.get(String.format(url,appinfo.getAppId(),
               appinfo.getToken(),
               appinfo.getToken())),RefreshAccessToken.class);
    }

    public static void ExceptionHandler(APIException ex,app appinfo){
        int code = ex.getRawResponseAsJsonObject().get("error").getAsJsonObject().get("code").getAsInt();
        int sub = ex.getRawResponseAsJsonObject().get("error").getAsJsonObject().get("error_subcode").getAsInt();
        if(code == 190&& sub == 463){
            RefreshAccessToken newToken = refreshAccessToken(appinfo);
            appinfo.setToken(newToken.getAccess_token());
            service.updateAccessToken(appinfo);
        }
    }

}
