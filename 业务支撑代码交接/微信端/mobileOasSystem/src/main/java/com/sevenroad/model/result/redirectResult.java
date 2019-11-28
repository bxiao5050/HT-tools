package com.sevenroad.model.result;

import com.sevenroad.model.resultModel;
import com.sevenroad.utils.data.JsonUtils;

/**
 * Created by linlin.zhang on 2016/11/29.
 */
public class redirectResult extends resultModel {
    public String redirectUrl ;
    public String accessToken;
    public redirectResult(String redirectUrl,String accessToken){
        this.redirectUrl = redirectUrl;
        this.accessToken = accessToken;
    }
    @Override
    public String toString() {
        return redirectUrl +accessToken;
    }


}
