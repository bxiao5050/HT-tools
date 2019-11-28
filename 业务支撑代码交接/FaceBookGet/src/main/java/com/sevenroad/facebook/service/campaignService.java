package com.sevenroad.facebook.service;

import com.facebook.ads.sdk.*;
import com.sevenroad.facebook.common.FaceBookException;
import com.sevenroad.facebook.common.FaceBookUtils;
import com.sevenroad.facebook.common.consts;
import com.sevenroad.facebook.entity.app;
import com.sevenroad.facebook.entity.campaign;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/20.
 */
public class campaignService {
    Logger logger = LoggerFactory.getLogger(campaignService.class);
    public List<campaign> getCampaigns(app app, AdAccount account){
        try {

            APINodeList<Campaign> lCampaigns = account.getCampaigns().requestIdField()
                    .requestNameField().requestCreatedTimeField().setParam("limit",500)
                    .requestStatusField().requestObjectiveField().execute();
            List<campaign> result = new ArrayList<campaign>();
            while (!lCampaigns.isEmpty()) {
                for (Campaign campaign : lCampaigns) {
                    String fieldObjective   = campaign.getFieldObjective();
                    if(fieldObjective.equals("APP_INSTALLS") ||fieldObjective.equals("MOBILE_APP_INSTALLS") || fieldObjective.equals("CANVAS_APP_INSTALLS")){
                        campaign itemAdCampaign = new campaign();
                        itemAdCampaign.setAppId(app.getAppId());
                        itemAdCampaign.setCampaignId( campaign.getFieldId());
                        itemAdCampaign.setCampaignName(campaign.getFieldName());
                        itemAdCampaign.setCreateTime(new Date(DateUtil.parse(campaign.getFieldCreatedTime(), consts.UTCFormat).getTime()));
                        itemAdCampaign.setStatus(campaign.getFieldStatus().toString());
                        result.add(itemAdCampaign);
                    }
                }
                lCampaigns = lCampaigns.nextPage();
            }
            return result;
        }
        catch (APIException api){
            FaceBookUtils.ExceptionHandler(api,app);
            logger.error("campaignService error : {} ",ExceptionUtil.stacktraceToString(api));
            throw new FaceBookException(api.getMessage(), ExceptionUtil.stacktraceToString(api));
        }
        catch (Exception e){
            logger.error("campaignService error : {} ",e);
            throw new FaceBookException(e.getMessage(), ExceptionUtil.stacktraceToString(e));
        }

    }
}
