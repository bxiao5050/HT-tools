package com.sevenroad.facebook.job;

import com.facebook.ads.sdk.AdAccount;
import com.sevenroad.facebook.common.FaceBookException;
import com.sevenroad.facebook.common.consts;
import com.sevenroad.facebook.entity.*;
import com.sevenroad.facebook.singleton.FBConfig;
import com.sevenroad.services.serviceFactory;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.concurrent.Callable;

/**
 * Created by linlin.zhang on 2017/7/21.
 */
public class levelJob implements Callable<job> {
    private app app;
    private job job;
    private com.sevenroad.facebook.service.dbService dbService = serviceFactory.getDbService();
    private com.sevenroad.facebook.service.campaignService campaignService = serviceFactory.getCampaignService();
    private com.sevenroad.facebook.service.adsetService adsetService = serviceFactory.getAdsetService();
    private com.sevenroad.facebook.service.adService adService = serviceFactory.getAdService();
    Logger logger = LoggerFactory.getLogger(levelJob.class);

    public levelJob(job job,app app) {
        this.job = job;
        this.app = app;
    }

    public job call() throws Exception {
            job item = job;
            long current = Calendar.getInstance().getTimeInMillis();
            long next = item.getNextTime().getTime();
            try {
                if (item.getJobType() == 2 && current > next && item.getStatus() == true
                        && (item.getJobStatus().equals(consts.jobSuccessState)||item.getJobStatus().equals(consts.jobFailureState))) {
                    logger.info("job - {} ,name - {} start", item.getJobId(), item.getJobName());
                    item.setJobStatus(consts.jobRunningState);
                    dbService.updateJob(item);
                    AdAccount adAccount = new AdAccount(app.getFbAccountId(), FBConfig.getContext(app.getToken()));
                    List<campaign> result = campaignService.getCampaigns(app, adAccount);
                    List<adSet> adSetList = new ArrayList<adSet>();
                    List<ad> adList = new ArrayList<ad>();
                    adSetList.addAll(adsetService.getAdSet(app, adAccount));
                    adList.addAll(adService.getAd(app,adAccount));
                    dbService.updateCampaign(app.getAppId(), result);
                    dbService.updateAdSet(app.getAppId(), adSetList);
                    dbService.updateAd(app.getAppId(), adList);

                    item.setJobStatus(consts.jobSuccessState);
                    current = Calendar.getInstance().getTime().getTime();
                    item.setJobTime(new java.sql.Timestamp(current));
                    item.setNextTime(new java.sql.Timestamp(current + item.getInterval()));
                    logger.info("job - {} ,name - {} success", item.getJobId(), item.getJobName());
                }
            }
            catch (Exception e) {
                item.setLogMessage( ExceptionUtil.getMessage(e)+ExceptionUtil.stacktraceToString(e));
                item.setJobStatus(consts.jobFailureState);
                logger.info("job - {} ,name - {} failure", item.getJobId(), item.getJobName());
            }
            finally {
                if(item.getJobStatus().equals(consts.jobRunningState)){
                    item.setJobStatus(consts.jobFailureState);
                }
                dbService.updateJob(item);
            }
            return job;
    }
}
