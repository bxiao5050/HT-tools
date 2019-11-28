package com.sevenroad.model.result;

import com.sevenroad.model.resultModel;
import com.sevenroad.utils.data.JsonUtils;
import com.sevenroad.utils.exception.severnroadException;

/**
 * Created by linlin.zhang on 2016/11/28.
 */
public class errorResult extends resultModel {
    private int errorCode;
    private String errorMsg;
    public errorResult(severnroadException ex){
        errorCode = ex.getErrorCode();
        errorMsg = ex.getMessage();
    }
    @Override
    public String toString() {
        return JsonUtils.getJsonFromObject(this);
    }
    public int getErrorCode(){
        return errorCode;
    }
    public String getErrorMsg(){
        return errorMsg;
    }
}
