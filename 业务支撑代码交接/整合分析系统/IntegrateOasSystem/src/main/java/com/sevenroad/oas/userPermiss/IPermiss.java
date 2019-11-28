package com.sevenroad.oas.userPermiss;


import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/2.
 */

/**
 * 权限对比接口，实现此接口来判断用户是否具有此权限
 *
 */
public interface IPermiss {
    /**
     * 获取唯一标示
     * @return
     */
    int UniteId();
    /**
     * 是否具有权限
     * @param permisses 权限列表
     * @return
     */
    Boolean isPermiss(List<? extends IPermiss> permisses);
}
