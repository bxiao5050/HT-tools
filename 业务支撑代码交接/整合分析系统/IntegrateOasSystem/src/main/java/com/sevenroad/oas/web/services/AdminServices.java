package com.sevenroad.oas.web.services;

import com.baomidou.mybatisplus.mapper.Condition;
import com.mysql.jdbc.Connection;
import com.sevenroad.oas.dao.entity.Actor;
import com.sevenroad.oas.dao.entity.User;
import com.sevenroad.oas.dao.entity.UserActor;
import com.sevenroad.oas.dao.mapper.ActorMapper;
import com.sevenroad.oas.dao.mapper.UserMapper;
import com.sevenroad.oas.dao.service.IUserActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/20.
 */
@Service
public class AdminServices {
    @Autowired
    IUserActorService userActorService;
    @Autowired
    ActorMapper actorMapper;
    @Autowired
    UserMapper userMapper;
    public Boolean grantUserToAcor(int userId,int actId){
        int count = userActorService.selectCount(Condition.create().eq("user_id",userId).eq("actor_id",actId));
        if(count > 0) return false;
        UserActor userActor = new UserActor();
        userActor.setUserId(userId);
        userActor.setActorId(actId);
        return userActorService.insert(userActor);
    }
    public Boolean unAuUserToAcor(int userId,int actId){
        return userActorService.delete(Condition.create().eq("user_id",userId).eq("actor_id",actId));
    }
    public List<Actor> actors(Integer userId){
        if(userId == -1)
            return  actorMapper.selectList(Condition.create().eq("state",1));
        else {
           return userMapper.getUserActor(userId);
        }
    }

    public List<User> users(){
        return userMapper.selectList(null);
    }
}
