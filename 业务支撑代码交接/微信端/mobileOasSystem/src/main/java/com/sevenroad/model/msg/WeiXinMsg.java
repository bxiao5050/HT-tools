package com.sevenroad.model.msg;

import com.github.sd4324530.fastweixin.api.entity.TemplateMsg;
import com.github.sd4324530.fastweixin.api.entity.TemplateParam;
import com.google.common.collect.Maps;
import com.sevenroad.dao.data.errorMessage;
import com.sevenroad.dao.data.userInfo;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.utils.config.systemConfig;

import java.net.URI;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by linlin.zhang on 2016/12/29.
 */
public class WeiXinMsg {
    private static final String RELEASE_USER = "9Z8OQuqyjjVUOn1h101yCWWZhkR6kXrDueDWd18vluM";
    private static final String BIND_NOTIFY = "1AsbyZpx9hboh1ZIbVZJ3p0r1i-HnrB-lnVnczR8pfE";
    private static final String BIND_SUCCESSED = "eMcodxTpmYdZxVS2iQZygx1p5u-3-hbjMOBYjiotyqg";
    private static final String SYSTEM_NOTIFY = "njc1IBdEGVuXiwZWvAv96jT6fANarSWiehH5XuGy1JA";

    private static final String SAFE_OPERA = "1AsbyZpx9hboh1ZIbVZJ3p0r1i-HnrB-lnVnczR8pfE";

    public static String getUrl(String url) throws Exception{
        //url = URLEncoder.encode(url,"utf-8");
        return url;//"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + systemConfig.getOtherConfig().wx_app_id +
                //"&redirect_uri=" + url +
               // "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
    }
    public static TemplateMsg createMsgFromReaseUser(String open_id,String user_name,String msgStr){
        TemplateMsg msg = new TemplateMsg();
        msg.setTemplateId(WeiXinMsg.RELEASE_USER);
        msg.setTouser(open_id);
        HashMap<String,TemplateParam> data = new HashMap<String,TemplateParam>();
        TemplateParam mode = new TemplateParam();
        mode.setValue("解除绑定成功");
        mode.setColor("#173177");
        data.put("first",mode);
        mode = new TemplateParam();
        mode.setValue(user_name);
        mode.setColor("#173177");
        data.put("keyword1",mode);

        mode = new TemplateParam();
        SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒");
        mode.setValue(format.format(Calendar.getInstance().getTime()));
        mode.setColor("#173177");
        data.put("keyword2",mode);

        mode = new TemplateParam();
        mode.setValue(msgStr);
        mode.setColor("#173177");
        data.put("remark",mode);

        msg.setData(data);
        msg.setTopcolor("#173177");
        msg.setUrl("");
        return msg;
    }

    public static TemplateMsg createMsgFromBindNotify(String old_open_id,String msgStr,String url) throws Exception{
        TemplateMsg msg = new TemplateMsg();
        userInfo oldUser = CacheSigleton.getUserInfoCache().getUserInfo(old_open_id);
        msg.setTopcolor("#173177");
        msg.setTouser(old_open_id);
        msg.setTemplateId(WeiXinMsg.BIND_NOTIFY);
        msg.setUrl(WeiXinMsg.getUrl(url));
        HashMap<String,TemplateParam> data = new HashMap<String,TemplateParam>();
        TemplateParam mode = new TemplateParam();
        mode.setValue("账号异地绑定通知");
        mode.setColor("#173177");
        data.put("first",mode);

        mode = new TemplateParam();
        mode.setValue(oldUser.getUserName());
        mode.setColor("#173177");
        data.put("keyword1",mode);

        mode = new TemplateParam();
        mode.setValue(msgStr);
        mode.setColor("#173177");
        data.put("keyword2",mode);

        mode = new TemplateParam();
        mode.setValue("请确保用户是否授权，点击将授权转移，有效期5分钟");
        mode.setColor("#173177");
        data.put("remark",mode);
        msg.setData(data);
        return msg;
    }

    public static TemplateMsg createMsgFromBindSuccessed(String open_id,String user_name,String Message,String url) throws Exception{
        TemplateMsg msg = new TemplateMsg();
        msg.setTopcolor("#173177");
        msg.setTouser(open_id);
        msg.setTemplateId(WeiXinMsg.BIND_SUCCESSED);
        msg.setUrl(WeiXinMsg.getUrl(url));
        HashMap<String,TemplateParam> data = new HashMap<String,TemplateParam>();
        TemplateParam mode = new TemplateParam();
        mode.setValue("你好，账号已绑定成功");
        mode.setColor("#333");
        data.put("first",mode);

        mode = new TemplateParam();
        mode.setValue(user_name);
        mode.setColor("#173177");
        data.put("keyword1",mode);

        mode = new TemplateParam();
        SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒");
        mode.setValue(format.format(Calendar.getInstance().getTime()));
        mode.setColor("#173177");
        data.put("keyword2",mode);
        msg.setData(data);
        return msg;
    }
    public static TemplateMsg createMsgFromBindFailed(String old_open_id,String msgStr,String url) throws Exception{
        TemplateMsg msg = new TemplateMsg();
        userInfo oldUser = CacheSigleton.getUserInfoCache().getUserInfo(old_open_id);
        msg.setTopcolor("#173177");
        msg.setTouser(old_open_id);
        msg.setTemplateId(WeiXinMsg.BIND_NOTIFY);
        msg.setUrl(WeiXinMsg.getUrl(url));
        HashMap<String,TemplateParam> data = new HashMap<String,TemplateParam>();
        TemplateParam mode = new TemplateParam();
        mode.setValue("账号绑定通知");
        mode.setColor("#173177");
        data.put("first",mode);

        mode = new TemplateParam();
        mode.setValue(oldUser.getUserName());
        mode.setColor("#173177");
        data.put("keyword1",mode);

        mode = new TemplateParam();
        mode.setValue(msgStr);
        mode.setColor("#173177");
        data.put("keyword2",mode);

        mode = new TemplateParam();
        mode.setValue("您的绑定请求已被拒绝，具体请联系账号拥有者！");
        mode.setColor("#173177");
        data.put("remark",mode);
        msg.setData(data);
        return msg;
    }

    public static TemplateMsg createMsgFromSystemNotify( errorMessage error) throws Exception{
        TemplateMsg msg = new TemplateMsg();
        userInfo oldUser = CacheSigleton.getUserInfoCache().getUserInfo(error.getUnite_id());
        if(oldUser != null)
        msg.setTopcolor("#173177");
        msg.setTouser(oldUser.getOpenId());
        msg.setUrl("");
        msg.setTemplateId(WeiXinMsg.SYSTEM_NOTIFY);
        HashMap<String,TemplateParam> data = new HashMap<String,TemplateParam>();
        TemplateParam mode = new TemplateParam();
        mode.setValue("系统故障告警");
        mode.setColor("#173177");
        data.put("first",mode);

        mode = new TemplateParam();
        mode.setValue(error.getWx_user_name()+"("+error.getUser_name()+")");
        mode.setColor("#173177");
        data.put("keyword1",mode);

        mode = new TemplateParam();
        SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒");
        mode.setValue(format.format(new Date(error.getError_date().getTime())));
        mode.setColor("#173177");
        data.put("keyword2",mode);

        mode = new TemplateParam();
        mode.setValue(error.getMessage_type()+"-"+error.getError_message());
        mode.setColor("#173177");
        data.put("keyword3",mode);

        mode = new TemplateParam();
        mode.setValue("请及时联系管理员");
        mode.setColor("#173177");
        data.put("remark",mode);
        msg.setData(data);
        return msg;
    }


    public static TemplateMsg createMsgFromSafeOpera(errorMessage error) throws Exception{
        TemplateMsg msg = new TemplateMsg();
        msg.setTopcolor("#173177");
        msg.setTouser(error.getUnite_id());
        msg.setTemplateId(WeiXinMsg.SAFE_OPERA);
        HashMap<String,TemplateParam> data = new HashMap<String,TemplateParam>();
        TemplateParam mode = new TemplateParam();
        mode.setValue(error.getMessage_type());
        mode.setColor("#173177");
        data.put("first",mode);

        mode = new TemplateParam();
        mode.setValue(error.getWx_user_name()+"("+error.getUser_name()+")");
        mode.setColor("#173177");
        data.put("keyword1",mode);

        mode = new TemplateParam();
        mode.setValue(error.getError_message());
        mode.setColor("#173177");
        data.put("keyword2",mode);

        mode = new TemplateParam();
        mode.setValue("请确认是否由你本人操作！");
        mode.setColor("#173177");
        data.put("remark",mode);
        msg.setData(data);
        return msg;
    }

    public static TemplateMsg createReportMsg(String title, Map<String,String> rows ){
        TemplateMsg msg = new TemplateMsg();
        msg.setTemplateId("974zDGtTTrlcsR0NcJKOx6SS5xhCb8IBjNrACfPQG8k");

        Map<String,TemplateParam> data = Maps.newHashMap();
        msg.setData(data);
        //标志
        data.put("first",new TemplateParam(title,"#173177"));
        StringBuilder sb = new StringBuilder();
        for(Map.Entry<String, String> item : rows.entrySet()){
            if(item.getKey().equals("agent_name")){
                data.put("keyword1",new TemplateParam(item.getValue()));
            }else {
                if("".equals(sb.toString())) {
                    sb.append(item.getKey() + ":" + item.getValue() + "\n");
                }else {
                    sb.append("\t\t"+item.getKey() + ":" + item.getValue() + "\n");
                }
            }
        }
        data.put("keyword2",new TemplateParam(sb.toString()));
        return msg;

    }


    public static TemplateMsg createWeekAndMonthReportMsg(String title,String url,Map<String,String> rows ,String firstColor){
        TemplateMsg msg = new TemplateMsg();
        msg.setTemplateId("974zDGtTTrlcsR0NcJKOx6SS5xhCb8IBjNrACfPQG8k");

        Map<String,TemplateParam> data = Maps.newHashMap();
        msg.setData(data);
        //标志
        data.put("first",new TemplateParam(title,firstColor));
        StringBuilder sb = new StringBuilder();
        for(Map.Entry<String, String> item : rows.entrySet()){
            if(item.getKey().equals("agent_name")){
                data.put("keyword1",new TemplateParam(item.getValue()));
            }else {
                if("".equals(sb.toString())) {
                    sb.append(item.getKey() + ":" + item.getValue() + "\n");
                }else {
                    sb.append("\t\t"+item.getKey() + ":" + item.getValue() + "\n");
                }
            }
        }
        data.put("keyword2",new TemplateParam(sb.toString()));
        msg.setUrl(url);
        return msg;
    }
}
