package com.sevenroad.oas.dao.model.tables;

/**
 * Created by linlin.zhang on 2017/5/19.
 */
public class DataViewMapComponent {
    private int dataViewId;
    private int componentId;
    private String componentName;
    private int componentType;
    private String xColName;
    private String[] yColName;
    public int getDataViewId() {
        return dataViewId;
    }

    public void setDataViewId(int dataViewId) {
        this.dataViewId = dataViewId;
    }

    public int getComponentId() {
        return componentId;
    }

    public void setComponentId(int componentId) {
        this.componentId = componentId;
    }

    public String getComponentName() {
        return componentName;
    }

    public void setComponentName(String componentName) {
        this.componentName = componentName;
    }

    public int getComponentType() {
        return componentType;
    }

    public void setComponentType(int componentType) {
        this.componentType = componentType;
    }

    public String getxColName() {
        return xColName;
    }

    public void setxColName(String xColName) {
        this.xColName = xColName;
    }

    public String[] getyColName() {
        return yColName;
    }

    public void setyColName(String[] yColName) {
        this.yColName = yColName;
    }
}
