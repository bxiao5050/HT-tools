package com.sevenroad.oas.charts;

import com.github.abel533.echarts.Option;
import com.sevenroad.oas.dao.model.TableResult;

/**
 * Created by linlin.zhang on 2017/5/19.
 */
public abstract class Chart {
    /**
     * 基本图类型
     */
    /**
     * 默认按表类型输出
     */
    public static final int TABLE_CHART = 0;
    /**
     * 折线输出
     */
    public static final int LINE_CHART = 1;
    /**
     * 饼图输出
     */
    public static final int PIE_CHART = 2;
    /**
     * 柱状图输出
     */
    public static final int BAR_CHART = 3;

    protected ChartConfig config;
    protected TableResult tableResult;

    public Chart(ChartConfig config,TableResult result){
        this.config = config;
        this.tableResult = result;
    }

    public abstract ChartResult draw();
}
