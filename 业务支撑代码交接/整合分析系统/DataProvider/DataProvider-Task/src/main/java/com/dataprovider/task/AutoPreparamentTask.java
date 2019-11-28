package com.dataprovider.task;

import com.baomidou.mybatisplus.mapper.Condition;
import com.dataprovider.core.model.InputModel;
import com.dataprovider.dao.DaoFactory;
import com.dataprovider.dao.entitys.Cache;
import com.dataprovider.dao.mappers.CacheMapper;
import com.xiaoleilu.hutool.crypto.SecureUtil;
import com.xiaoleilu.hutool.date.DateUnit;
import com.xiaoleilu.hutool.date.DateUtil;
import org.apache.ibatis.session.SqlSession;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by linlin.zhang on 2017/8/7.
 */
public class AutoPreparamentTask {
    private final static Pattern pattern  = Pattern.compile("[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}");

    public List<InputModel> getNext(){
        SqlSession session = DaoFactory.getInstance(0);
        CacheMapper cacheMapper = session.getMapper(CacheMapper.class);
        String start = DateUtil.formatDate(DateUtil.yesterday()),end = DateUtil.today();
        List<Cache> cacheList = cacheMapper.selectList(Condition.create().between("update_time",start,end).ge("update_count",20).orderBy("update_count"));
        List<InputModel> tasks = new ArrayList<InputModel>();
        for(int i = 0;i<cacheList.size();i++){
            String command = cacheList.get(i).getCommand();
            Matcher matcher = pattern.matcher(command);
            StringBuffer sb = new StringBuffer();
            while(matcher.find()) {
                String old = matcher.group();
                Calendar dateTime = Calendar.getInstance();
                dateTime.setTimeInMillis(DateUtil.parse(old).getTime());
                dateTime.add(Calendar.DATE,1);
                matcher.appendReplacement(sb, DateUtil.formatDate(dateTime.getTime()));
            }
            matcher.appendTail(sb);
            String nextCommand =  sb.toString();
            InputModel input = new InputModel();
            input.setExecuteCommand(nextCommand);
            input.setType(cacheList.get(i).getCacheType());
            input.setConnectionId(cacheList.get(i).getConnectionId());
            tasks.add(input);
        }
        return tasks;
    }
}
