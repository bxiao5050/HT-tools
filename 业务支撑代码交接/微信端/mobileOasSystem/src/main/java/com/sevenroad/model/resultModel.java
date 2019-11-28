package com.sevenroad.model;

import com.sevenroad.utils.data.JsonUtils;

/**
 * Created by linlin.zhang on 2016/11/24.
 */
public class resultModel {
    @Override
    public String toString() {
        return JsonUtils.getJsonFromObject(this);
    }
}
