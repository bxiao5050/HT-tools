package com.sevenroad.handle;

import com.sevenroad.model.resultModel;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by linlin.zhang on 2016/11/23.
 */
public interface handleImp {
    void setParams(HttpServletRequest request) throws Exception ;
    resultModel execute() throws Exception;
}
