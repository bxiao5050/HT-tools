package com.sevenroad.oas.web.utils;

/**
 * Created by linlin.zhang on 2017/4/19.
 */
public class Consts {
    /**
     * 字符串常量
     */
    public class Strings{

        /**
         * error_message
         */
        public static final String NOT_LOGIN = "NOT_LOGIN";
        public static final String LOGIN_FAILUER = "LOGIN_FAILUER";
        public static final String USER_UNAUTH = "USER_UNAUTH";
        public static final String ERROR_PASSWORD = "ERROR_PASSWORD";
        public static final String OPERATION_FAIURE = "OPERATION_FAIURE";
        public static final String LOGIN_SUCCESSED = "LOGIN_SUCCESSED";
        public static final String LOGOUT_SUCCESSED = "LOGOUT_SUCCESSED";
        public static final String OPERATION_SUCCESSED = "OPERATION_SUCCESSED";
        public static final String QUERY_SUCCESSED = "QUERY_SUCCESSED";
        public static final String QUERY_FAILURE = "QUERY_FAILURE";
        public static final String ENTITY_EXISIS = "ENTITY_EXISIS";
        public static final String IS_PREMIESSED = "IS_PREMISSED";
        /**
         * String_const
         */
        public static final String USER_PREMISS = "USER_PREMISS";
        public static final String OA_ID = "OA_ID";
        /**
         * 语言类型
         */
        public static final String CHS = "CHS";
        public static final String EN = "EN";
        public static final String Tradition = "Tradition";

    }

    /**
     * 脚本名配置
     */
    public class DataViews{
        public static final String sysGetUserPermiss = "sysGetUserPermiss";
        public static final String sysGetUserMenuDetails = "sysGetUserMenuDetails";
        /**
         * 区服脚本
         */
        public static final String sysGetUserZone = "sysGetUserZone";
        public static final String sysGet88BoxZone = "sysGet88BoxZone";

        /**
         * 渠道脚本
         */
        public static final String sysGetUserChannel = "sysGetUserChannel";
        public static final String sysGet88BoxChannel = "sysGet88BoxChannel";
        public static final String sysGetPayChannel = "sysGetPayChannel";
        public static final String sysGet88BoxPayChannel = "sysGet88BoxPayChannel";
        public static final String sysGetZiyanUserChannel = "sysGetZiyanUserChannel";

        public static final String sysGetGame = "sysGetGame";
        public static final String permissGetGameMenus = "permissGetGameMenus";
        public static final String permissGetGameZone = "permissGetGameZone";
        public static final String permissGet88BoxGameZone = "permissGet88BoxGameZone";
        public static final String sysGetUsersInfo = "sysGetUsersInfo";


        public static final String permissGetGameChannels = "permissGetGameChannels";
        public static final String permissGet88BoxGameChannels = "permissGet88BoxGameChannels";
        public static final String permissGetActor = "permissGetActor";
        //付费渠道
        public static final String permissGetGamePayChannels = "permissGetGamePayChannels";
        public static final String permissGet88BoxPayChannels = "permissGet88BoxPayChannels";
        /**
         * 权限系统独立的菜单部分
         */
        public static final String sysGetPermissMenus = "sysGetPermissMenus";
        public static final String sysGetPermissGames = "sysGetPermissGames";
    }

    /**
     * 权限类型
     */
    public class PermissKey{
        public static final String OAS_MENU = "oas_menu";
        public static final String OAS_ZONE = "oas_zone";
        public static final String OAS_CHANNEL = "oas_channel";
        public static final String OAS_PAYCHANNEL = "oas_pay_channel";
        public static final String OAS_ACTOR = "oas_actor";
    }
    /**
     *失败
     */
    //用户未登陆
    public static final int NOT_LOGIN = 101;
    //登陆失败
    public static final int LOGIN_FAILUER = 102;
    //用户无权限
    public static final int USER_UNAUTH = 103;
    //错误的密码
    public static final int ERROR_PASSWORD = 104;
    //操作失败
    public static final int OPERATION_FAIURE = 105;
    //查询失败
    public static final int QUERY_FAILURE = 106;
    //实体已存在
    public static final int ENTITY_EXISIS = 107;
    /**
     * 成功
     */
    //登陆成功
    public static final int LOGIN_SUCCESSED = 301;
    //登出成功
    public static final int LOGOUT_SUCCESSED = 302;
    //操作成功
    public static final int OPERATION_SUCCESSED = 303;
    //查询成功
    public static final int QUERY_SUCCESSED = 401;
    //用户类型
    public static final int ACTOR_ADMIN = 0;
    public static final int ACTOR_USER = 1;

}
