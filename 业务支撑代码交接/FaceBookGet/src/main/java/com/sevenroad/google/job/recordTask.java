package com.sevenroad.google.job;

import com.google.api.ads.adwords.axis.factory.AdWordsServices;
import com.google.api.ads.adwords.axis.v201710.cm.AdGroupAdService;
import com.google.api.ads.adwords.axis.v201710.cm.AdGroupAdServiceInterface;
import com.google.api.ads.adwords.lib.client.AdWordsSession;
import com.google.api.ads.adwords.lib.factory.AdWordsServicesInterface;
import com.google.api.ads.adwords.lib.utils.v201710.ReportDownloaderInterface;
import com.sevenroad.google.common.consts;
import com.sevenroad.google.entity.googleConfig;
import com.sevenroad.google.service.AdsWordService;
import com.sevenroad.google.service.SessionService;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

/**
 * Created by linlin.zhang on 2018/1/15.
 */
public class recordTask implements Job {

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        googleConfig config = new googleConfig();
        config.setAppId(10002);
        config.setClientCustomId("941-495-5322");
        config.setClientSecrent("KUloP0ahtBohVwMX7jTH26SZ");
        config.setDeveloperToken("xxIlDWvAnawIzXCXYWEwzw");
        config.setId(1);
        config.setClientId("597553032007-eiov69atv2u4bcpknu9ov0c159he6hgo.apps.googleusercontent.com");
        config.setRefreshToken("1/ydSVTTQkln1U5NWny8Ele6rt0n4kqmqweoIXqWZKmBY");
        AdWordsSession session = SessionService.createSession(config);
        AdWordsServicesInterface adWordsServices = AdWordsServices.getInstance();
        AdsWordService service = new AdsWordService();
        service.report(adWordsServices,session);
    }
}
