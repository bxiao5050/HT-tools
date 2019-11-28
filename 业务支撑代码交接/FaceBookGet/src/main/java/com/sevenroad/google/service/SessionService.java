package com.sevenroad.google.service;

import com.google.api.ads.adwords.lib.client.AdWordsSession;
import com.google.api.ads.common.lib.auth.OfflineCredentials;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.*;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.sevenroad.google.common.googleException;
import com.sevenroad.google.entity.googleConfig;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import com.xiaoleilu.hutool.http.HttpRequest;
import com.xiaoleilu.hutool.http.HttpResponse;
import com.xiaoleilu.hutool.http.HttpUtil;
import org.apache.commons.configuration.BaseConfiguration;
import org.apache.commons.configuration.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by linlin.zhang on 2018/1/15.
 */
public class SessionService{
    public static final String ADWORDS_API_SCOPE = "https://www.googleapis.com/auth/adwords";
    private static final String CALLBACK_URL = "https://dongnanya-edb46.firebaseapp.com/__/auth/handler";
    private static final List<String> SCOPES = Arrays.asList(ADWORDS_API_SCOPE);
    private static Logger logger = LoggerFactory.getLogger(SessionService.class);


    private static ConcurrentHashMap<Integer,Credential> credentList = new ConcurrentHashMap<Integer, Credential>();
    public static AdWordsSession createSession(googleConfig config){
        try {
            if (credentList.containsKey(config.getId())) {
                return new AdWordsSession.Builder()
                        .from(getConfigure(config))
                        .withOAuth2Credential(credentList.get(config.getId()))
                        .build();
            }else {
                synchronized(credentList){
                    if (credentList.containsKey(config.getId())) {
                        return new AdWordsSession.Builder()
                                .from(getConfigure(config))
                                .withOAuth2Credential(credentList.get(config.getId()))
                                .build();
                    }else {
                        Credential credential = getCreential(getConfigure(config));
                        credentList.put(config.getId(),getCreential(getConfigure(config)));
                        return new AdWordsSession.Builder()
                                .from(getConfigure(config))
                                .withOAuth2Credential(credential)
                                .build();
                    }
                }
            }
        }catch (Exception e){
            logger.error("get session error : msg - {}",ExceptionUtil.stacktraceToString(e));
            throw new googleException();
        }
    }

    private static Credential getCreential(Configuration configuration){
        try {
            Credential oAuth2Credential = new OfflineCredentials.Builder()
                    .forApi(OfflineCredentials.Api.ADWORDS)
                    .from(configuration)
                    .build()
                    .generateCredential();
            return oAuth2Credential;
        }
        catch (Exception e){
            logger.error("get credential error : msg - {}", ExceptionUtil.stacktraceToString(e));
            throw new googleException();
        }
    }

    private static Configuration getConfigure(googleConfig googleConfig){
        try {
            Configuration configuration = new BaseConfiguration();
            configuration.addProperty("api.adwords.clientId", googleConfig.getClientId());
            configuration.addProperty("api.adwords.clientSecret", googleConfig.getClientSecrent());
            configuration.addProperty("api.adwords.clientCustomerId", googleConfig.getClientCustomId());
            configuration.addProperty("api.adwords.developerToken", googleConfig.getDeveloperToken());
            configuration.addProperty("api.adwords.refreshToken", googleConfig.getRefreshToken());
            configuration.addProperty("api.adwords.refreshOAuth2Token", true);
            return configuration;
        }catch (Exception e){
            logger.error("get configure error : msg - {}", ExceptionUtil.stacktraceToString(e));
            throw new googleException();
        }
    }

}
