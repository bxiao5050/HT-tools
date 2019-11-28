package com.sevenroad.oas.task;

import com.google.common.collect.Lists;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.sevenroad.oas.cache.Imp.ConnectionCache;
import com.sevenroad.oas.cache.Imp.GameZoneCache;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.entity.User;
import com.sevenroad.oas.dao.imp.SqlDbImp;
import com.sevenroad.oas.dao.mapper.UserMapper;
import com.sevenroad.oas.dao.model.tables.GameZoneInfo;
import com.sevenroad.oas.task.bean.YWUserInfo;
import com.xiaoleilu.hutool.http.HttpUtil;
import com.xiaoleilu.hutool.util.BeanUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import java.lang.reflect.Type;
import java.sql.Connection;
import java.util.List;
import java.util.Map;

/**
 * Created by linlin.zhang on 2017/5/17.
 */
@Service

public class TaskService {
    @Autowired
    UserMapper userMapper;
    Type type = new TypeToken<List<YWUserInfo>>() {}.getType();
    Gson gson = new Gson();

    @Scheduled(cron = "0 0/5 * * * ?")
    public  void updateUserInfo(){
        int maxId = userMapper.getMaxUserId();
        String url = "http://yw.7road-inc.com:8081/listUsers?maxUserId="+maxId;
        List<YWUserInfo> lsit = gson.fromJson(HttpUtil.get(url),type);
        for(YWUserInfo item : lsit){
            User user = new User();
            user.setUserId(item.getUserId());
            user.setUserName(item.getUserName());
            user.setUserType(1);
            userMapper.insert(user);
        }
    }
}
