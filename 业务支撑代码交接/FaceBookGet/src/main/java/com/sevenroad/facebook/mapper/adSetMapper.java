package com.sevenroad.facebook.mapper;

import com.sevenroad.facebook.entity.adSet;
import com.sevenroad.facebook.entity.campaign;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.InsertProvider;

import java.text.MessageFormat;
import java.util.List;
import java.util.Map;

/**
 * Created by linlin.zhang on 2017/7/20.
 */
public interface adSetMapper {
    @Delete("delete from sc_osa_db_fb_ad.t_e_adset where app_id = #{appId}")
    int deleteAdSet(int appId);
    @InsertProvider(type = adSetMapper.adSetPovider.class,method = "inserAll")
    int addAdSet(List<adSet> list);
    public class adSetPovider {
        public String inserAll(Map<String, List<adSet>> map) {
            List<adSet> list = map.get("list");
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("INSERT INTO sc_osa_db_fb_ad.t_e_adset (app_id,campaign_id,fb_app_id,user_os,adset_id,adset_name,create_time,status)values");
            MessageFormat messageFormat = new MessageFormat("(#'{'list[{0}].appId},#'{'list[{0}].campaignId},#'{'list[{0}].fbAppId},#'{'list[{0}].userOs}" +
                    ",#'{'list[{0}].adsetId},#'{'list[{0}].adsetName},#'{'list[{0}].createTime},#'{'list[{0}].status})");
            for (int i = 0; i < list.size(); i++) {
                stringBuilder.append(messageFormat.format(new String[]{String.valueOf(i)}));
                stringBuilder.append(",");
            }
            stringBuilder.setLength(stringBuilder.length() - 1);
            return stringBuilder.toString();
        }
    }
}
