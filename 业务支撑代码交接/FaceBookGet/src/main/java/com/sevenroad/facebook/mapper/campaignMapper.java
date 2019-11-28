package com.sevenroad.facebook.mapper;

import com.sevenroad.facebook.entity.campaign;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.jdbc.SQL;

import java.text.MessageFormat;
import java.util.*;

/**
 * Created by linlin.zhang on 2017/7/20.
 */
public interface campaignMapper extends baseMapper<campaign> {
    @Delete("delete from sc_osa_db_fb_ad.t_e_campaign where app_id = #{appId}")
    int deleteCampaign(int appId);
    @InsertProvider(type = campaignPovider.class,method = "inserAll")
    int addCompaign(List<campaign> list);
    public class campaignPovider {
        public String inserAll(Map<String, List<campaign>> map) {
            List<campaign> list = map.get("list");
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("INSERT INTO sc_osa_db_fb_ad.t_e_campaign (app_id,campaign_id,campaign_name,create_time,status)values");
            MessageFormat messageFormat = new MessageFormat("(#'{'list[{0}].appId},#'{'list[{0}].campaignId},#'{'list[{0}].campaignName},#'{'list[{0}].createTime},#'{'list[{0}].status})");
            for (int i = 0; i < list.size(); i++) {
                stringBuilder.append(messageFormat.format(new String[]{String.valueOf(i)}));
                stringBuilder.append(",");
            }
            stringBuilder.setLength(stringBuilder.length()-1);
            return stringBuilder.toString();
        }
    }

}
