package com.sevenroad.dao.data;

import java.util.ArrayList;

/**
 * Created by linlin.zhang on 2016/11/4.
 */
public class systemInfo {
    public int system_id;
    public String system_name;
    public ArrayList<gameInfo> gameInfos;
    public systemInfo(){
        gameInfos = new ArrayList<gameInfo>();
    }
}
