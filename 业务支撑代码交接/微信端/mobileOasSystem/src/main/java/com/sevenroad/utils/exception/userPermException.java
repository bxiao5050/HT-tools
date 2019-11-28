package com.sevenroad.utils.exception;


/**
 * Created by linlin.zhang on 2016/11/3.
 */
public class userPermException extends  severnroadException  {
    public static final int UN_BIND_USER = 101;
    public static final int ERROR_USER_OR_PWD = 102;
    public static final int INVALID_ACCESS_TOKEN = 103;
    public static final int EMPTY_PERM = 104;
    public static final int BINDED_USER = 105;
    public static final int UNOAUTH_ACCESS_TOKEN = 106;
    public static final int ERROR_SAFE_CODE = 107;
    public static final int ENABLE_USER = 108;
    public static final int EXPIRED_USER = 109;
    public static final int BINDING_USER = 110;
    public userPermException(int errorCode){
        super(errorCode);
    }

    @Override
    protected String getMsg(int errorCode) {
        switch (errorCode)
        {
            case UN_BIND_USER:return "用户未绑定或禁用";
            case ERROR_USER_OR_PWD:return "错误的用户名或密码";
            case INVALID_ACCESS_TOKEN:return "无效的访问权限";
            case EMPTY_PERM:return "无权限";
            case BINDED_USER:return "用户已绑定";
            case UNOAUTH_ACCESS_TOKEN: return "未授权的访问令牌";
            case ERROR_SAFE_CODE:return "错误的安全校验码，错误超过5次账号将禁用";
            case ENABLE_USER:return "用户已被禁用";
            case EXPIRED_USER:return "链接已失效";
            case BINDING_USER:return "用户正在绑定，请5分钟后重试";
            default:return "未知的错误";
        }
    }
}
