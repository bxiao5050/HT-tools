package com.sevenroad.utils.data;

/**
 * Created by linlin.zhang on 2016/11/22.
 */

public enum CustomParamType {
    Int(1),Date(2),String(3);
    private int type;
    private CustomParamType(int value){
        this.type = value;
    }

    public int getType() {
        return type;
    }

    public String getTypeName(int type)  {
        switch (type){
            case 1: return  "Int" ;
            case 2:return "Date";
            case 3: return "String";
        }
        return "String";
    }
}
