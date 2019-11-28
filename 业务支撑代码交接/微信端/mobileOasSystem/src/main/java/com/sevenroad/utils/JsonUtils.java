package com.sevenroad.utils;

import com.google.gson.Gson;

/**
 * Created by linlin.zhang on 2018/2/26/026.
 */
public class JsonUtils {
    static Gson gson = new Gson();

    public static Gson getInstance(){
        return gson;
    }
}
