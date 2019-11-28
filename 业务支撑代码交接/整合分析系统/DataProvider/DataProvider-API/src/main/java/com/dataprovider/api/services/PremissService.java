package com.dataprovider.api.services;

import com.baomidou.mybatisplus.mapper.Condition;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.dataprovider.api.results.JsonResult;
import com.dataprovider.dao.DaoFactory;
import com.dataprovider.premiss.entitys.*;
import com.dataprovider.premiss.interfaces.IIntTreeNode;
import com.dataprovider.premiss.mappers.*;
import com.dataprovider.premiss.trees.IntTreeble;
import com.google.common.base.Splitter;
import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/8/22.
 */
@Service
public class PremissService {

    Gson gson = new GsonBuilder().addSerializationExclusionStrategy(new ExclusionStrategy() {
        public boolean shouldSkipField(FieldAttributes fieldAttributes) {
            if("path".equals(fieldAttributes.getName())
                    || "parentId".equals(fieldAttributes.getName())
                    ||"resourceType".equals(fieldAttributes.getName())){
                return true;
            }
            return false;
        }

        public boolean shouldSkipClass(Class<?> aClass) {
            return false;
        }}).create();


    public String userAdd(String userName,String description,String email,String phone){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        try{
            UserMapper userMapper = source.getMapper(UserMapper.class);
            User user = new User();
            user.setUserName(userName);
            user.setUserDescription(description);
            user.setUserEmail(email);
            user.setStatus(1);
            user.setUserPhone(phone);
            int result = userMapper.insert(user);
            if(result == 1) {
                return new JsonResult<String>(200, "success", "success").GetResult(gson);
            }else {
                return new JsonResult<String>(400, "failure", "failure").GetResult(gson);
            }
        }finally {
            source.close();
        }
    }
    public String userDelete(int userId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        try{
            UserMapper roleMapper = source.getMapper(UserMapper.class);
            UserRoleMapper userRoleMapper = source.getMapper(UserRoleMapper.class);
            UserGroupMapMapper userGroupMapMapper = source.getMapper(UserGroupMapMapper.class);
            roleMapper.deleteById(userId);
            userRoleMapper.delete(Condition.create().eq("user_id",userId));
            userGroupMapMapper.delete(Condition.create().eq("user_id",userId));
            return new JsonResult<String>(200, "success", "success").GetResult(gson);

        }finally {
            source.close();
        }
    }

    /**
     * 获取用户指定资源类型、指定游戏下的权限
     * @param userId
     * @param type
     * @return
     */
    public String GetUserPremissByTypeAndGameId(int userId,String type,int gameId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        List<IIntTreeNode> zoneTree = new ArrayList<>(2);
        try{
            ResourceMapper mapper = source.getMapper(ResourceMapper.class);
            UserMapper userMapper = source.getMapper(UserMapper.class);
            UserGroupMapper userGroupMapper = source.getMapper(UserGroupMapper.class);

            //获取用户所属用户组
            UserGroup gruop = userMapper.getUserGroupsLevel(userId);
            //获取用户角色及私有资源
            List<Resource> userResource = userMapper.getResourceByTypeAndGameId(userId,type,gameId);
            //获取用户组资源
            if(gruop != null) {
                userResource.addAll(userGroupMapper.getUserGroupLevelByTypeAndGameId(gruop, type, gameId));
            }
            //获取资源数据
            if(userResource != null && userResource.size() > 0) {
                List<Resource> powerList = mapper.getResourceLevel(userResource);
                Collections.sort(powerList);
                IntTreeble treeble = new IntTreeble(powerList);
                zoneTree = treeble.getTree(0);
                return new JsonResult<List<IIntTreeNode>>(200,"success",zoneTree).GetResult(gson);
            }
            //构造树
            return new JsonResult<List<IIntTreeNode>>(200,"success",zoneTree).GetResult(gson);
        }finally {
            source.close();
        }
    }

    /**
     * 获取用户指定资源类型下的权限
     * @param userId
     * @param type
     * @return
     */
    public String GetUserPremissByType(int userId,String type,int gameId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        List<IIntTreeNode> zoneTree = null;
        try{
            ResourceMapper mapper = source.getMapper(ResourceMapper.class);
            UserMapper userMapper = source.getMapper(UserMapper.class);
            UserGroupMapper userGroupMapper = source.getMapper(UserGroupMapper.class);

            //获取用户所属用户组
            UserGroup gruop = userMapper.getUserGroupsLevel(userId);
            //获取用户角色及私有资源
            List<Resource> userResource = userMapper.getResourceByType(userId,type,gameId);
            //获取用户组资源
            userResource.addAll(userGroupMapper.getUserGroupLevelByType(gruop,type,gameId));
            //获取资源数据
            List<Resource> powerList = mapper.getResourceLevel(userResource);
            //构造树
            IntTreeble treeble = new IntTreeble(powerList);
            zoneTree = treeble.getTree(0);
            return new JsonResult<List<IIntTreeNode>>(200,"success",zoneTree).GetResult(gson);
        }finally {
            source.close();
        }
    }


    /**
     * 获取角色指定资源类型、指定游戏下的权限
     * @param groupId
     * @param type
     * @return
     */
    public String GetGroupByTypeAndGameId(int groupId,String type,int gameId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        List<IIntTreeNode> zoneTree = null;
        try{
            ResourceMapper mapper = source.getMapper(ResourceMapper.class);
            RoleMapper roleMapper = source.getMapper(RoleMapper.class);
            //获取角色资源
            List<Resource> userResource = roleMapper.getAcotorResourceByTypeAndGameId(groupId,type,gameId);
            //获取资源数据
            List<Resource> powerList = mapper.getResourceLevel(userResource);
            //构造树
            IntTreeble treeble = new IntTreeble(powerList);
            zoneTree = treeble.getTree(0);
            return new JsonResult<List<IIntTreeNode>>(200,"success",zoneTree).GetResult(gson);
        }finally {
            source.close();
        }
    }

    public String getGroupPremissListByGameIdType(int groupId,String type,int gameId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        List<IIntTreeNode> zoneTree = null;
        try{
            ResourceMapper mapper = source.getMapper(ResourceMapper.class);
            UserGroupMapper groupMapper = source.getMapper(UserGroupMapper.class);
            UserGroup group = groupMapper.selectById(groupId);
            List<Resource> userResource = groupMapper.getUserGroupLevelByTypeAndGameId(group,type,gameId);
            //获取资源数据
            List<Resource> powerList = null;
            if(userResource.size() > 0) {
                powerList = mapper.getResourceLevel(userResource);
            }else {
                powerList = userResource;
            }
            List<Resource> allResource =mapper.selectList(Condition.create().eq("resource_type",type).eq("game_id",gameId));
            for(int i = 0;i<allResource.size();i++){
                allResource.get(i).setOwner(false);
                for(int j = 0;j<powerList.size();j++){
                    if(allResource.get(i).TreeNodeId() == powerList.get(j).TreeNodeId()){
                        allResource.get(i).setOwner(true);
                    }
                }
            }
            //构造树
            IntTreeble treeble = new IntTreeble(allResource);
            zoneTree = treeble.getTree(0);
            return new JsonResult<List<IIntTreeNode>>(200,"success",zoneTree).GetResult(gson);
        }finally {
            source.close();
        }
    }


    public String GetRoleByTypeAndGameId(int groupId,String type,int gameId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        List<IIntTreeNode> zoneTree = null;
        try{
            ResourceMapper mapper = source.getMapper(ResourceMapper.class);
            UserGroupMapper groupMapper = source.getMapper(UserGroupMapper.class);
            UserGroup group = groupMapper.selectById(groupId);
            List<Resource> userResource = groupMapper.getUserGroupLevelByTypeAndGameId(group,type,gameId);
            //获取资源数据
            List<Resource> powerList = mapper.getResourceLevel(userResource);
            //构造树
            IntTreeble treeble = new IntTreeble(powerList);
            zoneTree = treeble.getTree(0);
            return new JsonResult<List<IIntTreeNode>>(200,"success",zoneTree).GetResult(gson);
        }finally {
            source.close();
        }
    }

    public String getRolePremissListByGameIdType(int roleId,String type,int gameId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        List<IIntTreeNode> zoneTree = null;
        try{
            ResourceMapper mapper = source.getMapper(ResourceMapper.class);
            RoleMapper roleMapper = source.getMapper(RoleMapper.class);
            List<Resource> userResource = roleMapper.getAcotorResourceByTypeAndGameId(roleId,type,gameId);
            //获取资源数据
            List<Resource> powerList = null;
            if(userResource.size() > 0) {
                powerList = mapper.getResourceLevel(userResource);
            }else {
                powerList = userResource;
            }
            List<Resource> allResource =mapper.selectList(Condition.create().eq("resource_type",type).eq("game_id",gameId));
            for(int i = 0;i<allResource.size();i++){
                allResource.get(i).setOwner(false);
                for(int j = 0;j<powerList.size();j++){
                    if(allResource.get(i).TreeNodeId() == powerList.get(j).TreeNodeId()){
                        allResource.get(i).setOwner(true);
                    }
                }
            }
            //构造树
            IntTreeble treeble = new IntTreeble(allResource);
            zoneTree = treeble.getTree(0);
            return new JsonResult<List<IIntTreeNode>>(200,"success",zoneTree).GetResult(gson);
        }finally {
            source.close();
        }
    }



    public String GetUserGroup(){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        List<IIntTreeNode> zoneTree = null;
        try{
            UserGroupMapper mapper = source.getMapper(UserGroupMapper.class);
            List<UserGroup> powerList = mapper.selectList(Condition.create().eq("state",1));
            IntTreeble treeble = new IntTreeble(powerList);
            zoneTree = treeble.getTree(0);
            return new JsonResult<List<IIntTreeNode>>(200,"success",zoneTree).GetResult(gson);
        }finally {
            source.close();
        }
    }




    public String getGroupUser(int groupId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        try{
            UserGroupMapper mapper = source.getMapper(UserGroupMapper.class);
            List<User> powerList = mapper.getGroupUser(groupId);
            return new JsonResult< List<User>>(200,"success",powerList).GetResult(gson);
        }finally {
            source.close();
        }
    }


    /**
     * 获取用户权限拥有状况
     * @param userId
     * @param type
     * @return
     */
    public String getUserPremissListByType(int userId,String type,int gameId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        List<IIntTreeNode> zoneTree = null;
        try{
            ResourceMapper mapper = source.getMapper(ResourceMapper.class);
            UserMapper userMapper = source.getMapper(UserMapper.class);
            UserGroupMapper userGroupMapper = source.getMapper(UserGroupMapper.class);

            //获取用户所属用户组
            UserGroup gruop = userMapper.getUserGroupsLevel(userId);
            //获取用户角色及私有资源
            List<Resource> userResource = userMapper.getResourceByType(userId,type,gameId);
            //获取用户组资源
            if(gruop != null) {
                userResource.addAll(userGroupMapper.getUserGroupLevelByType(gruop, type, gameId));
            }
            //获取资源数据
            List<Resource> powerList = null;
            if(userResource.size() > 0) {
                powerList = mapper.getResourceLevel(userResource);
            }else {
                powerList = userResource;
            }
            List<Resource> allResource =mapper.selectList(Condition.create().eq("resource_type",type).eq("game_id",gameId).orderBy("resource_id",false));
            for(int i = 0;i<allResource.size();i++){
                allResource.get(i).setOwner(false);
                for(int j = 0;j<powerList.size();j++){
                    if(allResource.get(i).TreeNodeId() == powerList.get(j).TreeNodeId()){
                        allResource.get(i).setOwner(true);
                    }
                }
            }
            //构造树
            IntTreeble treeble = new IntTreeble(allResource);
            zoneTree = treeble.getTree(0);
            return new JsonResult<List<IIntTreeNode>>(200,"success",zoneTree).GetResult(gson);
        }finally {
            source.close();
        }
    }


    public String getUserPremissListByGameIdType(int userId,String type,int gameId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        List<IIntTreeNode> zoneTree = null;
        try{
            ResourceMapper mapper = source.getMapper(ResourceMapper.class);
            UserMapper userMapper = source.getMapper(UserMapper.class);
            UserGroupMapper userGroupMapper = source.getMapper(UserGroupMapper.class);

            //获取用户所属用户组
            UserGroup gruop = userMapper.getUserGroupsLevel(userId);
            //获取用户角色及私有资源
            List<Resource> userResource = userMapper.getResourceByTypeAndGameId(userId,type,gameId);
            //获取用户组资源
            if(gruop != null) {
                userResource.addAll(userGroupMapper.getUserGroupLevelByType(gruop, type, gameId));
            }
            //获取资源数据
            List<Resource> powerList = null;
            if(userResource.size() > 0) {
                powerList = mapper.getResourceLevel(userResource);
            }else {
                powerList = userResource;
            }
            List<Resource> allResource =mapper.selectList(Condition.create().eq("resource_type",type).eq("game_id",gameId).orderBy("resource_id",false));
            for(int i = 0;i<allResource.size();i++){
                allResource.get(i).setOwner(false);
                for(int j = 0;j<powerList.size();j++){
                    if(allResource.get(i).TreeNodeId() == powerList.get(j).TreeNodeId()){
                        allResource.get(i).setOwner(true);
                    }
                }
            }
            //构造树
            IntTreeble treeble = new IntTreeble(allResource);
            zoneTree = treeble.getTree(0);
            return new JsonResult<List<IIntTreeNode>>(200,"success",zoneTree).GetResult(gson);
        }finally {
            source.close();
        }
    }

    Splitter splitter = Splitter.on(",").omitEmptyStrings();

    /**
     * 授予私有权限
     * @param userId
     * @param grantSource
     * @return
     */
    public String grantUserList(int userId,String grantSource,int gameId,String type){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION,true);
        try{
            UserResourceMapper mapper = source.getMapper(UserResourceMapper.class);
            mapper.deletePermiss(userId,gameId,type);
            if(!"".equals(grantSource)) {
                List<String> resources = splitter.splitToList(grantSource);
                for (int i = 0; i < resources.size(); i++) {
                    UserResouce item = new UserResouce();
                    item.setResourceId(Integer.parseInt(resources.get(i)));
                    item.setUserId(userId);
                    item.setStatus(1);
                    mapper.insert(item);
                }
            }
        }catch (Exception e){
            return new JsonResult<String>(400,"failure",e.getMessage()).GetResult(gson);
        } finally {
            source.commit();
            source.close();
        }
        return new JsonResult<String>(200, "success", "success").GetResult(gson);
    }


    /**
     * 授予用户组权限
     * @param userGroupId
     * @param grantSource
     * @return
     */
    public String grantUserGruopList(int userGroupId,String grantSource,int gameId,String type){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION,true);
        try{
            UserGroupResourceMapper mapper = source.getMapper(UserGroupResourceMapper.class);
            List<String> resources = splitter.splitToList(grantSource);
            mapper.deletePermiss(userGroupId,gameId,type);
            for(int i = 0;i<resources.size();i++){
                UserGroupResource item = new UserGroupResource();
                item.setResourceId(Integer.parseInt(resources.get(i)));
                item.setUserGroupId(userGroupId);
                item.setStatus(1);
                mapper.insert(item);
            }
        }catch (Exception e){
            return new JsonResult<String>(400,"failure",e.getMessage()).GetResult(gson);
        } finally {
            source.commit();
            source.close();
        }
        return new JsonResult<String>(200, "success", "success").GetResult(gson);
    }


    /**
     * 授予角色权限
     * @param roleId
     * @param grantSource
     * @return
     */
    public String grantRoleList(int roleId,String grantSource,int gameId,String type){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION,true);
        try{
            RoleResourceMapper mapper = source.getMapper(RoleResourceMapper.class);
            mapper.deletePermiss(roleId,gameId,type);
            if(!"".equals(grantSource)) {
                List<String> resources = splitter.splitToList(grantSource);
                for (int i = 0; i < resources.size(); i++) {
                    RoleResource item = new RoleResource();
                    item.setResourceId(Integer.parseInt(resources.get(i)));
                    item.setActorId(roleId);
                    item.setStatus(1);
                    mapper.insert(item);
                }
            }
        }catch (Exception e){
            return new JsonResult<String>(400,"failure",e.getMessage()).GetResult(gson);
        } finally {
            source.commit();
            source.close();
        }
        return new JsonResult<String>(200, "success", "success").GetResult(gson);
    }


    public String roleList(){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        try{
            RoleMapper roleMapper = source.getMapper(RoleMapper.class);
            return new JsonResult<List<Role>>(200, "success", roleMapper.selectList(Condition.create().eq("actor_state",1))).GetResult(gson);
        }finally {
            source.close();
        }
    }
    public String roleAdd(String roleName,String description){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        try{
            RoleMapper roleMapper = source.getMapper(RoleMapper.class);
            Role role = new Role();
            role.setRoleName(roleName);
            role.setRoleDescription(description);
            role.setStatus(1);
            int result = roleMapper.insert(role);
            if(result == 1) {
                return new JsonResult<String>(200, "success", "success").GetResult(gson);
            }else {
                return new JsonResult<String>(400, "failure", "failure").GetResult(gson);
            }
        }finally {
            source.close();
        }
    }
    public String roleDelete(int roleId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        try{
            RoleMapper roleMapper = source.getMapper(RoleMapper.class);
            UserRoleMapper userRoleMapper = source.getMapper(UserRoleMapper.class);
            RoleResourceMapper roleResourceMapper = source.getMapper(RoleResourceMapper.class);
            roleMapper.deleteById(roleId);
            userRoleMapper.delete(Condition.create().eq("actor_id",roleId));
            roleResourceMapper.delete(Condition.create().eq("actor_id",roleId));
            return new JsonResult<String>(200, "success", "success").GetResult(gson);

        }finally {
            source.close();
        }
    }
    public String userList(String userNames){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        try{
            UserMapper mapper = source.getMapper(UserMapper.class);
            List<User> result = null;
            if("".equals(userNames)){
                result =  mapper.selectList(Condition.create().eq("user_state", 1));
            }else {
                result =  mapper.selectList(Condition.create().eq("user_state", 1).where("user_name REGEXP {0} ", userNames));
            }
            return new JsonResult<List<User>>(200, "success",result).GetResult(gson);
        }finally {
            source.close();
        }
    }

    public String grantRoleToUser(int userId,int roleId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        try{
            UserRoleMapper mapper = source.getMapper(UserRoleMapper.class);
            List<UserRole> result = mapper.selectList(Condition.create().eq("user_id",userId).eq("actor_id",roleId));
            if(result.size() > 0){
                for(int i = 0;i<result.size();i++){
                    if(result.get(i).getStatus() == 0){
                        result.get(i).setStatus(1);
                        mapper.updateById(result.get(i));
                    }
                }
            }else {
                UserRole newItem = new UserRole();
                newItem.setStatus(1);
                newItem.setUserId(userId);
                newItem.setRoleId(roleId);
                mapper.insert(newItem);
            }
            return new JsonResult<String>(200, "success","success").GetResult(gson);
        }finally {
            source.close();
        }
    }

    public String grantUserGroupToUser(int userId,int groupId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        try{
            UserGroupMapMapper mapper = source.getMapper(UserGroupMapMapper.class);
            List<UserGroupMap> result = mapper.selectList(Condition.create().eq("user_id",userId));
            if(result.size() > 0){
                for(int i = 0;i<result.size();i++){
                    if(result.get(i).getStatus() == 0){
                        result.get(i).setStatus(1);
                        mapper.updateById(result.get(i));
                    }
                }
            }else {
                UserGroupMap newItem = new UserGroupMap();
                newItem.setStatus(1);
                newItem.setUserId(userId);
                newItem.setGroupId(groupId);
                mapper.insert(newItem);
            }
            return new JsonResult<String>(200, "success","success").GetResult(gson);
        }finally {
            source.close();
        }
    }

    public String addUserGroup(String groupName,String description,int parentId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        try{
            UserGroupMapper mapper = source.getMapper(UserGroupMapper.class);
            if(parentId == 0){
                UserGroup newItem = new UserGroup();
                newItem.setId(mapper.getMaxId() + 1);
                newItem.setParentId(parentId);
                newItem.setGroupName(groupName);
                newItem.setGroupDescription(description);
                newItem.setPath(newItem.getId() + ">");
                mapper.insert(newItem);
            }
            else {
                UserGroup parent = mapper.selectById(parentId);
                if (parent == null) {
                    return new JsonResult<String>(400, "failure", "parent not exist !").GetResult(gson);
                }
                UserGroup newItem = new UserGroup();
                newItem.setId(mapper.getMaxId() + 1);
                newItem.setParentId(parentId);
                newItem.setGroupName(groupName);
                newItem.setGroupDescription(description);
                newItem.setPath(parent.getPath() + newItem.getId() + ">");
                mapper.insert(newItem);
            }
            return new JsonResult<String>(200, "success","success").GetResult(gson);
        }finally {
            source.close();
        }
    }

    public String delUserGroup(int gruopId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        try{
            UserGroupMapper mapper = source.getMapper(UserGroupMapper.class);
            UserGroupResourceMapper userGroupResourceMapper = source.getMapper(UserGroupResourceMapper.class);
            UserGroupMapMapper userGroupMapMapper = source.getMapper(UserGroupMapMapper.class);
            UserGroup userGroup = mapper.selectById(gruopId);
            if(userGroup != null) {
                mapper.delete(Condition.create().where("path REGEXP {0} ", userGroup.getPath()));
                userGroupResourceMapper.delete(Condition.create().eq("user_group_id", gruopId));
                userGroupMapMapper.delete(Condition.create().eq("group_id", gruopId));
            }
            return new JsonResult<String>(200, "success", "success").GetResult(gson);
        }finally {
            source.close();
        }
    }

    public String removeUserFromUserGroup(int userId,int groupId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        try{
            UserGroupMapMapper mapper = source.getMapper(UserGroupMapMapper.class);
            List<UserGroupMap> result = mapper.selectList(Condition.create().eq("user_id",userId).eq("group_id",groupId));
            if(result.size() > 0){
                for(int i = 0;i<result.size();i++){
                    if(result.get(i).getStatus() == 1){
                        result.get(i).setStatus(0);
                        mapper.updateById(result.get(i));
                    }
                }
            }
            return new JsonResult<String>(200, "success","success").GetResult(gson);
        }finally {
            source.close();
        }
    }

    public String removeUserFromRoleList(int userId,int roleId){
        SqlSession source = DaoFactory.getInstance(DaoFactory.PERMISS_CONNECTION);
        try{
            UserRoleMapper mapper = source.getMapper(UserRoleMapper.class);
            List<UserRole> result = mapper.selectList(Condition.create().eq("user_id",userId).eq("actor_id",roleId));
            if(result.size() > 0){
                for(int i = 0;i<result.size();i++){
                    if(result.get(i).getStatus() == 0){
                        result.get(i).setStatus(0);
                        mapper.updateById(result.get(i));
                    }
                }
            }
            return new JsonResult<String>(200, "success","success").GetResult(gson);
        }finally {
            source.close();
        }
    }
}
