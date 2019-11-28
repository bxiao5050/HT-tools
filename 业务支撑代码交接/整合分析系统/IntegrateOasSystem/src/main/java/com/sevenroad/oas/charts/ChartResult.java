package com.sevenroad.oas.charts;

/**
 * Created by linlin.zhang on 2017/5/22.
 */
public class ChartResult {
    private String componentName;
    private Object option;

    public ChartResult(String componentName,Object option){
        this.componentName = componentName;
        this.option = option;
    }

    public String getComponentName() {
        return componentName;
    }

    public void setComponentName(String componentName) {
        this.componentName = componentName;
    }

    public Object getOption() {
        return option;
    }

    public void setOption(Object option) {
        this.option = option;
    }
}
