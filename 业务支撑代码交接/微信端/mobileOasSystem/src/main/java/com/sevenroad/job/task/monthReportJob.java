package com.sevenroad.job.task;

import com.github.sd4324530.fastweixin.api.entity.TemplateMsg;
import com.github.sd4324530.fastweixin.api.entity.TemplateParam;
import com.github.sd4324530.fastweixin.api.response.SendTemplateResponse;
import com.google.common.base.Splitter;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.sevenroad.dao.connection.SystemConnection;
import com.sevenroad.dao.connection.connectionFactory;
import com.sevenroad.dao.data.errorMessage;
import com.sevenroad.dao.data.jobItem;
import com.sevenroad.job.task.bean.executeCommand;
import com.sevenroad.job.task.bean.weekReport;
import com.sevenroad.model.msg.WeiXinMsg;
import com.sevenroad.singleton.wxConfigSigleton;
import com.sevenroad.utils.FreeMarkInstance;
import com.sevenroad.utils.Logger;
import com.sevenroad.utils.config.systemConfig;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import freemarker.template.Template;

import java.io.File;
import java.io.FileWriter;
import java.io.Writer;
import java.sql.Timestamp;
import java.util.*;

/**
 * Created by linlin.zhang on 2018/4/11/011.
 */
public class monthReportJob extends dayReportJob {
    public monthReportJob(jobItem job){
        super(job);
    }

    @Override
    public void run() {
        try {
            String range  = "",title = "",firstColor = "#173177";
            if(job.getInterval() == 7) {
                range = String.format("%s-%s", DateUtil.formatDate(geLastWeekMonday(DateUtil.date())), DateUtil.formatDate(geLastWeekSunDay(DateUtil.date())));
            }else {
                range = String.format("%s-%s", DateUtil.formatDate(getLastMonth(DateUtil.date())), DateUtil.formatDate(getThisMonth(DateUtil.date())));
            }
            weekReport re = new weekReport();
            re.setCountDate(DateUtil.formatDate(DateUtil.yesterday()));

            if(job.getInterval() == 7) {
                firstColor = "#F75303";
                title = ("游戏-周关键指标数据");
            }
            else {
                firstColor = "#419741";
                title = ("游戏-月关键指标数据");
            }
            re.setTitle(title);
            List<executeCommand> list = getExecuteCommand(job.getJobId());
            Template template = FreeMarkInstance.GetInstance().getTemplate("weekReport.html");
            String countDate = DateUtil.formatDate(DateUtil.yesterday());
            List<List<Map<String, String>>> reportList = Lists.newArrayList();

            for(executeCommand item : list){
                reportList.add(getReport(item.getConnectionId(),item.getCommand()));
            }
            List<weekReport.GameData> gamelist = Lists.newArrayList();
            Splitter splitter = Splitter.on(",");
            for (int i = 0; i < list.size(); i++) {
                executeCommand command = list.get(i);
                Logger.getInstance().Info("monthReportJob report : " + command.getTaskName());

                List<Map<String,String>> reportInfo = reportList.get(i);
                for (Map<String,String> item : reportInfo) {
                    gamelist.add(new weekReport.GameData(item.get("agent_name"),item));
                }
            }
            re.setGameData(gamelist);
            String name = String.format("%s-%s.html",countDate,job.getJobId());
            String url = systemConfig.getOtherConfig().exportReport + name;
            Writer out = new FileWriter(new File(url));
            Map<String,Object> root = Maps.newHashMap();
            root.put("report", re);
            template.process(root, out);
            out.flush();
            out.close();
            List<String> user = splitter.splitToList(job.getSql());
            TemplateMsg msg = WeiXinMsg.createWeekAndMonthReportMsg( title+ "（"+ range+"）"
                        ,systemConfig.getOtherConfig().exportUrl + name ,gamelist.get(0).getGameData(),firstColor);

            for(int i = 0;i<user.size();i++) {
                msg.setTouser(user.get(i));
                SendTemplateResponse SendTemplateResponse = wxConfigSigleton.getTemplateAPI().send(msg);
                System.out.print(SendTemplateResponse.toJsonString());
            }



        }catch (Exception e){
            System.out.print(ExceptionUtil.stacktraceToString(e));
        }
    }

    public static Date geLastWeekMonday(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(getThisWeekMonday(date));
        cal.add(Calendar.DATE, -7);
        return cal.getTime();
    }

    public static Date geLastWeekSunDay(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(getThisWeekMonday(date));
        cal.add(Calendar.DATE, -1);
        return cal.getTime();
    }

    public static Date getThisWeekMonday(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        // 获得当前日期是一个星期的第几天
        int dayWeek = cal.get(Calendar.DAY_OF_WEEK);
        if (1 == dayWeek) {
            cal.add(Calendar.DAY_OF_MONTH, -1);
        }
        // 设置一个星期的第一天，按中国的习惯一个星期的第一天是星期一
        cal.setFirstDayOfWeek(Calendar.MONDAY);
        // 获得当前日期是一个星期的第几天
        int day = cal.get(Calendar.DAY_OF_WEEK);
        // 根据日历的规则，给当前日期减去星期几与一个星期第一天的差值
        cal.add(Calendar.DATE, cal.getFirstDayOfWeek() - day);
        return cal.getTime();
    }

    public static Date getThisMonth(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        // 获得当前日期是一个星期的第几天
        int day = cal.get(Calendar.DAY_OF_MONTH);
        // 根据日历的规则，给当前日期减去星期几与一个星期第一天的差值
        cal.add(Calendar.DATE, -day+1);
        return cal.getTime();
    }
    public static Date getLastMonth(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(getThisMonth(date));
        cal.add(Calendar.MONTH, -1);
        return cal.getTime();
    }
    public static void main(String[] args){
        connectionFactory.initail("com.mysql.jdbc.Driver",
                "jdbc:mysql://121.10.140.56/mobile_oas_system",
                "root",
                "love7road!");
        connectionFactory.initailGameDS();
        jobItem item = new jobItem();
        item.setJobId(9);
        item.setInterval(7);
//        ozhDDwm3LkszZ4hpkCkV22yWrRS0  ozhDDwq7J9-STLP0jL1Bmr73CjT4
        item.setSql("ozhDDwm3LkszZ4hpkCkV22yWrRS0");
        monthReportJob job = new monthReportJob(item);
//        job.run();
//        item.setJobId(10);
//        item.setInterval(30);
        job.run();
//        System.out.print(DateUtil.formatDate(monthReportJob.getLastMonth(DateUtil.date())));


    }
}
