package com.sevenroad.utils.data;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * Created by linlin.zhang on 2016/10/28.
 */
public class CustomParam implements Comparable  {
    private String paramName;
    private int paramType;
    private Object paramValue;
    private int index;
    public CustomParam(String paramName,int paramType,Object paramValue,int index){
        this.paramName = paramName;
        this.paramType = paramType;
        this.paramValue = paramValue;
        this.index = index;
    }
    public void setParamValue(Object value){
        this.paramValue = value;
    }
    public void setIndex(int index){
        this.index = index;
    }
    public String getParamName(){
        return paramName;
    }
    public int getParamType(){
        return paramType;
    }
    public int getIndex(){
        return index;
    }
    public String getStringValue(){
        return String.valueOf(paramValue);
    }

    @Override
    public String toString() {
        return paramValue.toString();
    }

    public int getIntValue(){
        return Integer.parseInt(paramValue.toString());
    }
    public boolean getBoolValue(){
        return (Boolean) paramValue;
    }
    public double getDoubleValue(){
        return (Double) paramValue;
    }

    @Override
    public int compareTo(Object o) {
        CustomParam other = (CustomParam) o;
        return this.index - other.getIndex() ;
    }
}
