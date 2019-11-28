package com.sevenroad.google;

import com.google.api.ads.adwords.axis.factory.AdWordsServices;
import com.google.api.ads.adwords.axis.v201710.cm.Campaign;
import com.google.api.ads.adwords.axis.v201710.cm.CampaignPage;
import com.google.api.ads.adwords.axis.v201710.cm.CampaignServiceInterface;
import com.google.api.ads.adwords.lib.client.AdWordsSession;
import com.google.api.ads.adwords.lib.factory.AdWordsServicesInterface;
import com.google.api.ads.common.lib.auth.GoogleClientSecretsBuilder;
import com.google.api.ads.common.lib.auth.OfflineCredentials;
import com.google.api.ads.common.lib.exception.ValidationException;
import com.google.api.ads.common.lib.factory.AdsServicesInterface;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.*;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.sevenroad.facebook.mainServer;

import com.sevenroad.google.job.countryTask;
import com.sevenroad.google.job.recordTask;
import com.xiaoleilu.hutool.http.HttpRequest;
import com.xiaoleilu.hutool.http.HttpResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

/**
 * Created by linlin.zhang on 2018/1/12.
 */
public class miainServer {
    static Logger logger = LoggerFactory.getLogger(mainServer.class);



    public static void main(String[] args) throws Exception {

        countryTask task = new countryTask();
        recordTask task1 = new recordTask();
        task1.execute(null);
    }
}
