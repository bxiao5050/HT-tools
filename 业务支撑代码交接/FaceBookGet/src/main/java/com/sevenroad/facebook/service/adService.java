package com.sevenroad.facebook.service;

import com.facebook.ads.sdk.*;
import com.sevenroad.facebook.common.FaceBookException;
import com.sevenroad.facebook.common.FaceBookUtils;
import com.sevenroad.facebook.common.consts;
import com.sevenroad.facebook.entity.ad;
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
public class adService {
    Logger logger = LoggerFactory.getLogger(adService.class);
    public List<ad> getAd(app app, adSet adSet){
        List<ad> result = new ArrayList<ad>();
        try {
            AdSet fbAdSet = new AdSet(adSet.getAdsetId(), FBConfig.getContext(app.getToken()));
            APINodeList<Ad> lAdSets = fbAdSet.getAds()
                    .requestIdField()
                    .setParam("limit",500)
                    .requestNameField()
                    .requestCreatedTimeField()
                    .requestStatusField()
                    .execute();
            while(!lAdSets.isEmpty()){
                for (int i = 0; i < lAdSets.size(); i++) {
                    Ad Aditem = lAdSets.get(i);
                    ad model = new ad();
                    model.setAdId(Aditem.getFieldId());
                    model.setAdSetId(adSet.getAdsetId());
                    model.setAppId(app.getAppId());
                    model.setAdName(Aditem.getFieldName());
                    model.setCreateTime(new Date(DateUtil.parse(Aditem.getFieldCreatedTime(), consts.UTCFormat).getTime()));
                    model.setStatus(Aditem.getFieldStatus().toString());
//                    getImageUrl(Aditem,model);
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
            logger.error("adService error : {} ",e);
            throw new FaceBookException(e.getMessage(), ExceptionUtil.stacktraceToString(e));
        }
        return result;
    }


    public List<ad> getAd(app app,AdAccount camp){
        List<ad> result = new ArrayList<ad>();
        try {
            APINodeList<Ad> lAdSets =  camp.getAds().requestIdField()
                    .setParam("limit",1000)
                    .requestNameField()
                    .requestCreatedTimeField()
                    .requestAdsetIdField()
                    .requestStatusField()
                    .execute();
            while(!lAdSets.isEmpty()){
                for (int i = 0; i < lAdSets.size(); i++) {
                    Ad Aditem = lAdSets.get(i);
                    ad model = new ad();
                    model.setAdId(Aditem.getFieldId());
                    model.setAdSetId(Aditem.getFieldAdsetId());
                    model.setAppId(app.getAppId());
                    model.setAdName(Aditem.getFieldName());
                    model.setCreateTime(new Date(DateUtil.parse(Aditem.getFieldCreatedTime(), consts.UTCFormat).getTime()));
                    model.setStatus(Aditem.getFieldStatus().toString());
                    model.setCreativeId("unknow");
                    model.setImageUrl("unknow");
//                    getImageUrl(Aditem,model);
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
            logger.error("adService error : {} ",e);
            throw new FaceBookException(e.getMessage(), ExceptionUtil.stacktraceToString(e));
        }
        return result;
    }
}
