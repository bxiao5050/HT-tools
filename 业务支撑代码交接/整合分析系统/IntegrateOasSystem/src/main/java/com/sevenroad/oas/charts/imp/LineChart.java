package com.sevenroad.oas.charts.imp;


import com.github.abel533.echarts.axis.CategoryAxis;
import com.github.abel533.echarts.axis.ValueAxis;
import com.github.abel533.echarts.code.Trigger;
import com.github.abel533.echarts.series.Line;
import com.sevenroad.oas.charts.Chart;
import com.github.abel533.echarts.*;
import com.sevenroad.oas.charts.ChartConfig;
import com.sevenroad.oas.charts.ChartResult;
import com.sevenroad.oas.dao.model.Column;
import com.sevenroad.oas.dao.model.TableResult;
import com.xiaoleilu.hutool.convert.Convert;
import org.apache.velocity.util.ArrayListWrapper;

import java.util.*;

/**
 * Created by linlin.zhang on 2017/5/19.
 */
public class LineChart extends Chart {

    public LineChart(ChartConfig config,TableResult result){
        super(config,result);
    }

    @Override
    public ChartResult draw(){
        Option option = new Option();
        option.title(config.getChartName());
        option.yAxis(new ValueAxis());
        Legend legend = new Legend();
        CategoryAxis xAxis = new CategoryAxis();
        List<Column> columns = tableResult.getResult();
        Line[] line = new Line[config.getyColumnName().length];
        for(int i = 0;i<columns.size();i++){
            Column column = columns.get(i);
            if(column.getColumnName().equals(config.getxColumnName())){
                for(int j = 0;j<column.getRowData().size();j++) {
                    xAxis.data(column.getRowData().get(j));
                }
            }else{
                String[] yColumn = config.getyColumnName();
                for(int z = 0;z<yColumn.length;z++) {
                    if(column.getColumnName().equals(yColumn[z])) {
                        line[z] = new Line();
                        legend.data(column.getColumnName());
                        line[z].name(column.getColumnName());
                        for (int j = 0; j < column.getRowData().size(); j++) {
                            line[z].data(Convert.toDouble(column.getRowData().get(j)));
                        }
                    }
                }
            }
        }
        option.legend(legend);
        option.tooltip(Trigger.axis);
        option.xAxis(xAxis);
        option.series(line);
        return new ChartResult(config.getChartName(),option);
    }
}
