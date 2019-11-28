package com.sevenroad.facebook.mapper;

import com.sevenroad.facebook.entity.campaign;
import com.sevenroad.facebook.entity.record;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.Param;

import java.sql.Date;
import java.text.MessageFormat;
import java.util.List;
import java.util.Map;

/**
 * Created by linlin.zhang on 2017/7/21.
 */
public interface recordMapper extends baseMapper<record>  {
    @Delete("delete from sc_osa_db_fb_ad.t_p_fb_app_data where app_id = #{appId} and count_date = #{date}")
    int deleteRecord(@Param("appId")int appId,@Param("date") Date date);
    @InsertProvider(type = recordPovider.class,method = "inserAll")
    int addRecord(List<record> list);
    public class recordPovider {
        public String inserAll(Map<String, List<record>> map) {
            List<record> list = map.get("list");
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("INSERT INTO sc_osa_db_fb_ad.t_p_fb_app_data (count_date, app_id, ad_id, ad_name, adset_id, adset_name, campaign_id, campaign_name, country, mobile_app_install, mobile_app_registration, spend, impressions, unique_impressions, clicks)values");
            MessageFormat messageFormat = new MessageFormat("(#'{'list[{0}].countDate},#'{'list[{0}].appId},#'{'list[{0}].adId},#'{'list[{0}].adName},#'{'list[{0}].adSetId},#'{'list[{0}].adSetName}," +
                        "#'{'list[{0}].campaignId},#'{'list[{0}].campaignName},#'{'list[{0}].country},#'{'list[{0}].mobileAppInstall},#'{'list[{0}].mobileAppRegistration},#'{'list[{0}].spend},#'{'list[{0}].impressions},#'{'list[{0}].uniqueImpressions},#'{'list[{0}].clicks})");
                for (int i = 0; i < list.size(); i++) {
                    stringBuilder.append(messageFormat.format(new String[]{String.valueOf(i)}));
                    stringBuilder.append(",");
            }
            stringBuilder.setLength(stringBuilder.length()-1);
            return stringBuilder.toString();
        }
    }
}
