package com.sevenroad.facebook.mapper;

import com.sevenroad.facebook.entity.ad;
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
public interface adMapper {
    @Delete("delete from sc_osa_db_fb_ad.t_e_ad where app_id = #{appId}")
    int deleteAd(int appId);
    @InsertProvider(type = adPovider.class,method = "inserAll")
    int addAd(List<ad> list);
    public class adPovider {
        public String inserAll(Map<String, List<ad>> map) {
            List<ad> list = map.get("list");
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("INSERT INTO sc_osa_db_fb_ad.t_e_ad (app_id,adset_id,ad_id,ad_name,creative_id,image_url,create_time,status)values");
            MessageFormat messageFormat = new MessageFormat("(#'{'list[{0}].appId},#'{'list[{0}].adSetId},#'{'list[{0}].adId},#'{'list[{0}].adName}" +
                    ",#'{'list[{0}].creativeId},#'{'list[{0}].imageUrl},#'{'list[{0}].createTime},#'{'list[{0}].status})");
            for (int i = 0; i < list.size(); i++) {
                stringBuilder.append(messageFormat.format(new String[]{String.valueOf(i)}));
                stringBuilder.append(",");
            }
            stringBuilder.setLength(stringBuilder.length()-1);
            return stringBuilder.toString();
        }
    }
}
