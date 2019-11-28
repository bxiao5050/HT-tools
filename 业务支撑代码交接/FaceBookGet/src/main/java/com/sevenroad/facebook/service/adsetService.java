package com.sevenroad.facebook.service;

import com.facebook.ads.sdk.*;
import com.sevenroad.facebook.common.FaceBookException;
import com.sevenroad.facebook.common.FaceBookUtils;
import com.sevenroad.facebook.common.consts;
import com.sevenroad.facebook.entity.adSet;
import com.sevenroad.facebook.entity.app;
import com.sevenroad.facebook.entity.campaign;
import com.sevenroad.facebook.singleton.FBConfig;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/20.
 */
public class adsetService {
    Logger logger = LoggerFactory.getLogger(adsetService.class);
    public List<adSet> getAdSet(app app, campaign camp){
        List<adSet> result = new ArrayList<adSet>();
        try {
            Campaign campaign = new Campaign(camp.getCampaignId(), FBConfig.getContext(app.getToken()));
            APINodeList<AdSet> lAdSets = campaign.getAdSets().requestIdField().requestNameField()
                    .requestCreatedTimeField().requestStatusField().setParam("limit",500)
                    .requestPromotedObjectField().requestTargetingField()
                    .execute();
            while (lAdSets != null && !lAdSets.isEmpty()) {
                for (int i = 0; i < lAdSets.size(); i++) {
                    AdSet AdSet = lAdSets.get(i);
                    adSet model = new adSet();
                    AdPromotedObject adPromotedObject = AdSet.getFieldPromotedObject();
                    if (adPromotedObject == null
                            || adPromotedObject.getFieldApplicationId() == null) {
                        Targeting targeting = AdSet.getFieldTargeting();
                        if (targeting == null||targeting
                                .getFieldExcludedConnections() == null) {
                            continue;
                        } else {
                            model.setFbAppId( targeting
                                    .getFieldExcludedConnections().get(0)
                                    .getFieldId());
                            model.setUserOs( targeting.getFieldUserOs().get(0)
                                    .contains("Android") == true ? "1" : "0");
                        }
                    } else {
                        model.setFbAppId( adPromotedObject
                                .getFieldApplicationId());
                        model.setUserOs(adPromotedObject
                                .getFieldObjectStoreUrl().contains(
                                        "http://play.google.com/") == true ? "1"
                                : "0");
                    }
                    model.setAppId(app.getAppId());
                    model.setCampaignId(camp.getCampaignId());;
                    model.setAdsetId(AdSet.getFieldId());
                    model.setAdsetName(AdSet.getFieldName());
                    model.setCreateTime(new Date(DateUtil.parse(
                            AdSet.getFieldCreatedTime(), consts.UTCFormat).getTime()));
                    model.setStatus(AdSet.getFieldStatus().toString());
                    result.add(model);
                }
                lAdSets = lAdSets.nextPage();
            }
        }catch (APIException api){
            FaceBookUtils.ExceptionHandler(api,app);
            logger.error("campaignService error : {} ",ExceptionUtil.stacktraceToString(api));
            throw new FaceBookException(api.getMessage(), ExceptionUtil.stacktraceToString(api));
        }
        catch (Exception e){
            logger.error("campaignService error : {} ",e);
            throw new FaceBookException(e.getMessage(), ExceptionUtil.stacktraceToString(e));
        }
        return result;
    }


    public  List<adSet> getAdSet(app app, AdAccount camp){
        List<adSet> result = new ArrayList<adSet>();
        try {
            APINodeList<AdSet> lAdSets = camp.getAdSets().requestIdField().requestNameField()
                    .requestCreatedTimeField().requestStatusField().setParam("limit",500)
                    .requestCampaignIdField()
                    .requestPromotedObjectField().requestTargetingField()
                    .execute();
            while (lAdSets != null && !lAdSets.isEmpty()) {
                for (int i = 0; i < lAdSets.size(); i++) {
                    AdSet AdSet = lAdSets.get(i);
                    adSet model = new adSet();
                    AdPromotedObject adPromotedObject = AdSet.getFieldPromotedObject();
                    Targeting targeting = AdSet.getFieldTargeting();

                    if(adPromotedObject!= null && adPromotedObject
                            .getFieldApplicationId() != null){
                        try {
                            model.setFbAppId(adPromotedObject
                                    .getFieldApplicationId());

                            model.setUserOs(adPromotedObject
                                    .getFieldObjectStoreUrl().contains(
                                            "http://play.google.com/") == true ? "1"
                                    : "0");
                        }catch (Exception e){
                            logger.info("os not find - {} ",AdSet.toString());
                        }
                    }else {
                        continue;
                    }

                    model.setAppId(app.getAppId());
                    model.setCampaignId(AdSet.getFieldCampaignId());;
                    model.setAdsetId(AdSet.getFieldId());
                    model.setAdsetName(AdSet.getFieldName());
                    model.setCreateTime(new Date(DateUtil.parse(
                            AdSet.getFieldCreatedTime(), consts.UTCFormat).getTime()));
                    model.setStatus(AdSet.getFieldStatus().toString());
                    result.add(model);
                }
                lAdSets = lAdSets.nextPage();
            }
        }catch (APIException api){
            FaceBookUtils.ExceptionHandler(api,app);
            logger.error("campaignService error : {} ",ExceptionUtil.stacktraceToString(api));
            throw new FaceBookException(api.getMessage(), ExceptionUtil.stacktraceToString(api));
        }
        catch (Exception e){
            logger.error("campaignService error : {} ",e);
            throw new FaceBookException(e.getMessage(), ExceptionUtil.stacktraceToString(e));
        }
        return result;
    }
}
