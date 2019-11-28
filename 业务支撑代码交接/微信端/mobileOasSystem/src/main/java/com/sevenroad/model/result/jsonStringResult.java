package com.sevenroad.model.result;

import com.sevenroad.model.resultModel;

/**
 * Created by linlin.zhang on 2016/11/24.
 */
public class jsonStringResult extends resultModel {
    public String result;
    public jsonStringResult(String msg){
        result = msg;
    }
    @Override
    public String toString() {
        return result;
    }
}
