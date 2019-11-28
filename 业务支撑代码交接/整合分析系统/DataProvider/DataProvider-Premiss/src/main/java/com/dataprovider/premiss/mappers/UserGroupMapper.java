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
 * Created by linlin.zhang on 2017/8/11.
 */
public interface UserGroupMapper extends BaseMapper<UserGroup> {

    @Select("select c.* from t_e_usergroup_resource a join\n" +
            "join t_e_resource b on a.status = 1 and  b.resource_id = c.id and a.user_group_id = #{groupId}")
    @Results({
            @Result(property = "resourceId",column = "resource_id"),
            @Result(property = "resourceName",column = "resource_name"),
            @Result(property = "gameId",column = "game_id"),
            @Result(property = "resourceType",column = "resource_type"),
            @Result(property = "parentId",column = "parent_id"),
    })
    List<Resource> getUserGroupResource(int groupId);
    @Select("select max(id) from t_e_usergroup")
    int getMaxId();

    @Select("select b.* from t_e_user_group_map a join t_e_user b on a.status = 1 and a.user_id = b.id and group_id = #{groupId} where a.status = 1 and b.user_state = 1")
    @Results({
            @Result(property = "userId",column = "id"),
            @Result(property = "userName",column = "user_name"),
            @Result(property = "userDescription",column = "user_description"),
            @Result(property = "status",column = "user_state")
    })
    List<User> getGroupUser(int groupId);

    @SelectProvider(type = UserGroupMapper.UserGroupProvider.class,method = "getUserGroupLevel")
    List<Resource> getUserGroupLevelPath(@Param("group") UserGroup group);

    @SelectProvider(type = UserGroupMapper.UserGroupProvider.class,method = "getUserGroupLevelByGameId")
    List<Resource> getUserGroupLevelPathByGameId(@Param("group") UserGroup group,@Param("game_id") int GameId);

    @SelectProvider(type = UserGroupMapper.UserGroupProvider.class,method = "getUserGroupLevelByType")
    List<Resource> getUserGroupLevelByType(@Param("group") UserGroup group,@Param("type") String type,@Param("gameId") int gameId);


    @SelectProvider(type = UserGroupMapper.UserGroupProvider.class,method = "getUserGroupLevelByTypeAndGameId")
    List<Resource> getUserGroupLevelByTypeAndGameId(@Param("group") UserGroup group,@Param("type") String type,@Param("gameId") int gameId);


    public class UserGroupProvider {
        static Joiner joiner = Joiner.on(",").skipNulls();
        static Splitter splitter = Splitter.on(">").omitEmptyStrings();
        public String getUserGroupLevel(Map attr){
            StringBuilder sb = new StringBuilder();
            UserGroup group = (UserGroup)attr.get("group");
            int gameId = (Integer) attr.get("gameId");
            String parents = joiner.join(splitter.splitToList(group.getPath()));
            return "select b.id,b.resource_id resourceId,b.resource_name resourceName,url,game_id gameId,resource_type resourceType,parent_id parentId,path  from t_e_usergroup_resource a " +
                    "join t_e_resource b on a.status = 1 and  a.resource_id = b.id and b.game_id = "+gameId+" a.user_group_id in ("+parents+ ")";
        }

        public String getUserGroupLevelByGameId(Map attr){
            StringBuilder sb = new StringBuilder();
            UserGroup group = (UserGroup)attr.get("group");
            int gameId = (Integer) attr.get("gameId");
            String parents = joiner.join(splitter.splitToList(group.getPath()));
            return "select b.id,b.resource_id resourceId,b.resource_name resourceName,url,game_id gameId,resource_type resourceType,parent_id parentId,path  from t_e_usergroup_resource a join t_e_resource b on a.status = 1 and  a.resource_id = b.id and a.user_group_id in ("+parents+ ") and b.game_id = "+gameId;
        }

        public String getUserGroupLevelByTypeAndGameId(Map attr){
            StringBuilder sb = new StringBuilder();
            UserGroup group = (UserGroup)attr.get("group");
            String type = (String) attr.get("type");
            int gameId = (Integer) attr.get("gameId");
            String parents = joiner.join(splitter.splitToList(group.getPath()));
            return "select b.id,b.resource_id resourceId,b.resource_name resourceName,url,game_id gameId,resource_type resourceType,parent_id parentId,path  from t_e_usergroup_resource a join t_e_resource b on a.status = 1 and  a.resource_id = b.id and b.resource_type = '"+type+"' and a.user_group_id in ("+parents+ ") and b.game_id = "+gameId;
        }
        public String getUserGroupLevelByType(Map attr){
            StringBuilder sb = new StringBuilder();
            UserGroup group = (UserGroup)attr.get("group");
            String type = (String) attr.get("type");
            String parents = joiner.join(splitter.splitToList(group.getPath()));
            return "select b.id,b.resource_id resourceId,b.resource_name resourceName,url,game_id gameId,resource_type resourceType,parent_id parentId,path  " +
                    "from t_e_usergroup_resource a join t_e_resource b " +
                    " on a.status = 1 and a.resource_id = b.id and b.resource_type = '"+type+"' and a.user_group_id in ("+parents+ ")";

        }
    }


}
