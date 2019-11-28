package com.dataprovider.premiss.mappers;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.dataprovider.premiss.entitys.Resource;
import com.dataprovider.premiss.entitys.User;
import com.dataprovider.premiss.entitys.UserGroup;
import com.google.common.base.Joiner;
import com.google.common.base.Splitter;
import org.apache.ibatis.annotations.*;

import java.util.*;


/**
 * Created by linlin.zhang on 2017/8/21.
 */
public interface UserMapper  extends BaseMapper<User> {

    @Select("select c.* from t_e_user_resource b \n" +
            "join t_e_resource c on and a.status = 1 and b.resource_id = c.id and b.user_id = #{userId}")
    List<Resource> getUserResource(int userId);

    @Select("select DISTINCT b.* from (\n" +
            "select resource_id from t_e_user_resource where status = 1 and  user_id = #{userId}\n" +
            "union \n" +
            "select resource_id from t_e_role_resource a join t_e_user_role b " +
            " on a.status = 1 and b.status = 1 and  a.actor_id = b.actor_id and b.user_id = #{userId}\n" +
            "union \n" +
            "select resource_id from t_e_user_group_map a join t_e_usergroup_resource b " +
            " on a.status = 1 and b.status = 1 and a.group_id = b.user_group_id and  b.user_id = #{userId}\n" +
            ") a join t_e_resource b on a.resource_id = b.id  ")
    @Results({
            @Result(property = "resourceId",column = "resource_id"),
            @Result(property = "resourceName",column = "resource_name"),
            @Result(property = "gameId",column = "game_id"),
            @Result(property = "resourceType",column = "resource_type"),
            @Result(property = "parentId",column = "parent_id"),
    })
    List<Resource> getAllResource(@Param("userId") int userId);

    @Select("select DISTINCT b.* from (\n" +
            " select resource_id from t_e_user_resource where status = 1 and  user_id = #{userId}\n " +
            " union \n" +
            " select resource_id from t_e_role_resource a join t_e_user_role b " +
            " on  a.status = 1 and b.status = 1 and a.actor_id = b.actor_id and b.user_id = #{userId}\n " +
            ") a join t_e_resource b on a.resource_id = b.id where b.resource_type = #{type} and game_id = #{gameId}  ")
    @Results({
            @Result(property = "resourceId",column = "resource_id"),
            @Result(property = "resourceName",column = "resource_name"),
            @Result(property = "gameId",column = "game_id"),
            @Result(property = "resourceType",column = "resource_type"),
            @Result(property = "parentId",column = "parent_id")
    })
    List<Resource> getResourceByTypeAndGameId(@Param("userId") int userId,@Param("type") String type,@Param("gameId") int gameId);


    @Select("select DISTINCT b.* from (\n" +
            " select resource_id from t_e_user_resource where status = 1 and user_id = #{userId}\n " +
            " union \n" +
            " select resource_id from t_e_role_resource a join t_e_user_role b " +
            " on a.status = 1 and b.status = 1 and a.actor_id = b.actor_id and b.user_id = #{userId}\n " +
            ") a join t_e_resource b on a.resource_id = b.id where b.resource_type = #{type} and b.game_id = #{gameId}  ")
    @Results({
            @Result(property = "resourceId",column = "resource_id"),
            @Result(property = "resourceName",column = "resource_name"),
            @Result(property = "gameId",column = "game_id"),
            @Result(property = "resourceType",column = "resource_type"),
            @Result(property = "parentId",column = "parent_id")
    })
    List<Resource> getResourceByType(@Param("userId") int userId,@Param("type") String type,@Param("gameId") int gameId);





    @Select("select b.* from t_e_user_group_map a " +
            "join t_e_usergroup b on a.status = 1 and a.group_id = b.id and a.user_id = #{userId}")
    @Results({
            @Result(property = "groupName",column = "group_name"),
            @Result(property = "groupDescription",column = "group_description"),
            @Result(property = "parentId",column = "parent_id"),
            @Result(property = "path",column = "path")
    })
    UserGroup getUserGroupsLevel(int userId);





}
