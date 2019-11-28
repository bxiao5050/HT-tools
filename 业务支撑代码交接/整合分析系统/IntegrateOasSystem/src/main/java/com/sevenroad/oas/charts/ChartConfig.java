package com.sevenroad.oas.charts;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/19.
 */
public class ChartConfig {
    private int chartType;
    private String chartName;
    private String xColumnName;
    private String[]  yColumnName;

    public int getChartType() {
        return chartType;
    }

    public void setChartType(int chartType) {
        this.chartType = chartType;
    }

    public String getChartName() {
        return chartName;
    }

    public void setChartName(String chartName) {
        this.chartName = chartName;
    }

    public String getxColumnName() {
        return xColumnName;
    }

    public void setxColumnName(String xColumnName) {
        this.xColumnName = xColumnName;
    }

    public String[] getyColumnName() {
        return yColumnName;
    }

    public void setyColumnName(String... yColumnName) {
        this.yColumnName = yColumnName;
    }
}
