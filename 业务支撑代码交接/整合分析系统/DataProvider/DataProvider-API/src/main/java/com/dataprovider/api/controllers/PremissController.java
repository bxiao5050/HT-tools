package com.dataprovider.api.controllers;

import com.dataprovider.api.results.JsonResult;
import com.dataprovider.api.services.GetService;
import com.dataprovider.api.services.PremissService;
import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by linlin.zhang on 2017/8/21.
 */
@RestController
@RequestMapping("/permiss")
public class PremissController {
    @Autowired
    PremissService premissService;
    Gson gson = new Gson();


    /**
     *@title
     * @param userId 用户id
     * @param type 资源类型
     * @param gameId 游戏id 默认0
     * @return
     */
    @RequestMapping("/user/fromGameAndType")
    public String getUserPremiss(int userId,String type,@RequestParam(name = "gameId",defaultValue = "0")int gameId){
        try {
            return premissService.GetUserPremissByTypeAndGameId(userId, type,gameId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }


    /**
     * 添加用户
     * @param userName
     * @param userDescrpition
     * @param email
     * @param phone
     * @return
     */
    @RequestMapping("/user/add")
    public String userAdd(String userName,String userDescrpition,String email,String phone){
        try {
            return premissService.userAdd(userName, userDescrpition,email,phone);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 删除用户
     * @param userId
     * @return
     */
    @RequestMapping("/user/delete")
    public String userDelete(int userId){
        try {
            return premissService.userDelete(userId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }
    /**
     * 获取用户权限
     * @param userId 用户id
     * @param type 资源类型
     * @param gameId 游戏id，默认0
     * @return
     */
    @RequestMapping("/user/allfromType")
    public String getUserListPremiss(int userId,String type,@RequestParam(name = "gameId",defaultValue = "0")int gameId){
        try {
            return premissService.getUserPremissListByType(userId, type,gameId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 用户授权信息
     * @param userId 用户id
     * @param type 资源类型
     * @param gameId 游戏id
     * @return
     */
    @RequestMapping("/user/allfromGameAndType")
    public String getUserListPremissAndGameId(int userId,String type,@RequestParam(name = "gameId",defaultValue = "0")int gameId){
        try {
            return premissService.getUserPremissListByGameIdType(userId, type,gameId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 给用户授权
     * @param userId 用户id
     * @param resourceId 授权资源id
     * @return
     */
    @RequestMapping("/user/grant")
    public String grantUser(int userId,String resourceId,int gameId,String type){
        try {
            return premissService.grantUserList(userId,resourceId,gameId,type);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 用户组信息
     * @return
     */
    @RequestMapping("/usergroup/list")
    public String getUserPremiss(){
        try {
            return premissService.GetUserGroup();
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 用户组下的用户
     * @param groupId 用户组id
     * @return
     */
    @RequestMapping("/usergroup/users")
    public String getGruopUser(int groupId){
        try {
            return premissService.getGroupUser(groupId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 给用户组授权
     * @param groupId 组id
     * @return
     */
    @RequestMapping("/usergroup/grant")
    public String grantUserGroup(int groupId,String resourceId,int gameId,String type){
        try {
            return premissService.grantUserGruopList(groupId,resourceId,gameId,type);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 用户加入用户组
     * @param userId 用户id
     * @param groupId 组id
     * @return
     */
    @RequestMapping("/usergroup/user/add")
    public String addUserGroupToUser(int userId,int groupId){
        try {
            return premissService.grantUserGroupToUser(userId,groupId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 用户组添加
     * @return
     */
    @RequestMapping("/usergroup/add")
    public String roleAdd(String groupName,String description,int parentId){
        try {
            return premissService.addUserGroup(groupName,description,parentId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }
    /**
     * 用户组删除
     * @return
     */
    @RequestMapping("/usergroup/delete")
    public String usergroupDelete(int groupId){
        try {
            return premissService.delUserGroup(groupId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    @RequestMapping("/role/list")
    public String roleList(){
        try {
            return premissService.roleList();
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 用户加入角色
     * @param userId 用户id
     * @param roleId 角色id
     * @return
     */
    @RequestMapping("/role/user/add")
    public String addRoleToUser(int userId,int roleId){
        try {
            return premissService.grantRoleToUser(userId,roleId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 角色授权
     * @param roleId 角色id
     * @param reourceId 资源id
     * @return
     */
    @RequestMapping("/role/grant")
    public String grantRole(int roleId,String resourceId,int gameId,String type){
        try {
            return premissService.grantRoleList(roleId,resourceId,gameId,type);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 获取角色授权信息
     * @param roleId  角色id
     * @param type 资源类型
     * @param gameId 游戏id
     * @return
     */
    @RequestMapping("/role/allfromTypeAndGameId")
    public String allRolePermiss(int roleId,String type,@RequestParam(name = "gameId",defaultValue = "0") int gameId){
        try {
            return premissService.getRolePremissListByGameIdType(roleId, type,gameId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 获取角色权限
     * @param roleId 角色id
     * @param type 资源类型
     * @param gameId 游戏id
     * @return
     */
    @RequestMapping("/role/fromTypeAndGameId")
    public String RolePermiss(int roleId,String type,@RequestParam(name = "gameId",defaultValue = "0")int gameId){
        try {
            return premissService.GetRoleByTypeAndGameId(roleId, type,gameId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 获取用户组授权信息
     * @param groupId 组id
     * @param type 资源类型
     * @param gameId 游戏id
     * @return
     */
    @RequestMapping("/usergroup/allfromTypeAndGameId")
    public String allUserGroupPermiss(int groupId,String type,@RequestParam(name = "gameId",defaultValue = "0")int gameId){
        try {
            return premissService.getGroupPremissListByGameIdType(groupId, type,gameId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 角色添加
     * @return
     */
    @RequestMapping("/role/add")
    public String usergroupAdd(String roleName,String description){
        try {
            return premissService.roleAdd(roleName,description);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }
    /**
     * 角色删除
     * @return
     */
    @RequestMapping("/role/delete")
    public String usergroupAdd(int roleId){
        try {
            return premissService.roleDelete(roleId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }


    /**
     * 用户组权限信息
     * @param groupId 组id
     * @param type 资源类型
     * @param gameId 游戏id
     * @return
     */
    @RequestMapping("/usergroup/fromTypeAndGameId")
    public String UserGroupPermiss(int groupId,String type,@RequestParam(name = "gameId",defaultValue = "0")int gameId){
        try {
            return premissService.GetGroupByTypeAndGameId(groupId, type,gameId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 搜索用户
     * @param userName 用户名 多个用| 分割
     * @return
     */
    @RequestMapping("/user/list")
    public String userList(String userName){
        try {
            return premissService.userList(userName);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 移除用户组
     * @param groupId 组id
     * @param userId 用户id
     * @return
     */
    @RequestMapping("/usergroup/user/remove")
    public String userGroupRemove(int groupId,int userId){
        try {
            return premissService.removeUserFromUserGroup(userId,groupId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }

    /**
     * 移除角色权限
     * @param roleId 角色id
     * @param userId 用户id
     * @return
     */
    @RequestMapping("/role/user/remove")
    public String roleRemove(int roleId,int userId){
        try {
            return premissService.removeUserFromRoleList(userId,roleId);
        }
        catch (Exception e){
            return new JsonResult<String>(400,"error", ExceptionUtil.getMessage(e)).GetResult(gson);
        }
    }


}
