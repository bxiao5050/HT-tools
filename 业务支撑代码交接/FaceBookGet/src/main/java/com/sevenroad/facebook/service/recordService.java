package com.sevenroad.facebook.service;

import com.facebook.ads.sdk.*;
import com.sevenroad.facebook.common.FaceBookException;
import com.sevenroad.facebook.common.FaceBookUtils;
import com.sevenroad.facebook.common.consts;
import com.sevenroad.facebook.entity.app;
import com.sevenroad.facebook.entity.record;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/21.
 */
public class recordService {
    private Logger logger = LoggerFactory.getLogger(recordService.class);
    public List<record> getRecord(app app, AdAccount account,Date countDate){
        ArrayList<record> records = new ArrayList<record>();
        try {
            ArrayList<AdsInsights.EnumActionBreakdowns> acList = new ArrayList<AdsInsights.EnumActionBreakdowns>();
            acList.add(AdsInsights.EnumActionBreakdowns.VALUE_ACTION_TYPE);
            ArrayList<AdsInsights.EnumBreakdowns> bkList = new ArrayList<AdsInsights.EnumBreakdowns>();
            bkList.add(AdsInsights.EnumBreakdowns.VALUE_COUNTRY);
//            bkList.add(AdsInsights.EnumBreakdowns.VALUE_REGION);
            List<String> fields = Arrays.asList(consts.fbField);

            HashMap<String, String> timeRange = new HashMap<String, String>();
            String begin = DateUtil.formatDate(countDate);
            timeRange.put("since", begin);
            timeRange.put("until", begin);
            APINodeList<AdsInsights> lInsights = null;
            lInsights = account.getInsights().setLevel(AdsInsights.EnumLevel.VALUE_AD)
                    .setActionBreakdowns(acList)
                    .setTimeRange(timeRange)
                    .setParam("limit",500)
                    .setBreakdowns(bkList)
                    .requestFields(fields)
                    .execute();
            while (!lInsights.isEmpty()) {
                for (int i = 0; i < lInsights.size(); i++) {
                    AdsInsights insights = lInsights.get(i);
                    record itemAdRecord = new record();
                    itemAdRecord.setCountDate(countDate);
                    itemAdRecord.setAppId(app.getAppId());
                    itemAdRecord.setAdId(insights.getFieldAdId());
                    itemAdRecord.setAdName(insights.getFieldAdName());
                    itemAdRecord.setAdSetId(insights.getFieldAdsetId());
                    itemAdRecord.setAdSetName(insights.getFieldAdsetName());
                    itemAdRecord.setCampaignId(insights.getFieldCampaignId());
                    itemAdRecord.setCampaignName(insights.getFieldCampaignName());
                    itemAdRecord.setCountry(insights.getRawResponseAsJsonObject().get("country").getAsString());
                    itemAdRecord.setImpressions(Integer.parseInt(insights.getFieldImpressions()));
//                    itemAdRecord.setRegion( insights.getRawResponseAsJsonObject().get("region").getAsString());
                    java.util.List<AdsActionStats> actionsList = insights.getFieldActions();
                    if (actionsList != null && !actionsList.isEmpty())
                        for (int j = 0; j < actionsList.size(); j++) {
                            AdsActionStats aStats = actionsList.get(j);
                            if (aStats.getFieldActionType().equals("app_install")) {
                                itemAdRecord.setMobileAppInstall(Integer.parseInt(aStats.getFieldValue()));
                                itemAdRecord.setMobileAppRegistration(Integer.parseInt(aStats.getFieldValue()));
                            } else if (aStats.getFieldActionType().equals("mobile_app_install")) {
                                itemAdRecord.setMobileAppInstall(Integer.parseInt(aStats.getFieldValue()));
                            } else if (aStats.getFieldActionType().equals("app_custom_event.fb_mobile_complete_registration")) {
                                itemAdRecord.setMobileAppRegistration(Integer.parseInt(aStats.getFieldValue()));
                            }
                        }
                    itemAdRecord.setSpend(Double.parseDouble(insights.getFieldSpend()));//.doubleValue();
                    itemAdRecord.setClicks(Integer.parseInt(insights.getFieldClicks()));//.intValue();
                    itemAdRecord.setUniqueImpressions(Integer.parseInt(insights.getFieldReach()));//.intValue();
                    records.add(itemAdRecord);
                }
                lInsights = lInsights.nextPage();
            }

        }catch (APIException api){
            FaceBookUtils.ExceptionHandler(api,app);
            logger.error("campaignService error : {} ",ExceptionUtil.stacktraceToString(api));
            throw new FaceBookException(api.getMessage(), ExceptionUtil.stacktraceToString(api));
        }
        catch (Exception e){
            logger.error("recordService error : {} ",e);
            throw new FaceBookException(e.getMessage(), ExceptionUtil.stacktraceToString(e));
        }
        return records;
    }
}
