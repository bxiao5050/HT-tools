package com.sevenroad.oas.task.execute;

import java.util.Date;

/**
 * Created by linlin.zhang on 2017/5/17.
 */
public interface IExecute {
    void execute(Date currentTime) throws Exception;
    public void setParams(String params);
}
