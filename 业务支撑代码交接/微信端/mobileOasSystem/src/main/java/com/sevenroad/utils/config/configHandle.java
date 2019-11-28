package com.sevenroad.utils.config;

/**
 * Created by linlin.zhang on 2016/10/18.
 */
public interface configHandle {
    boolean isloaded();
    void load(String filePath);
}
