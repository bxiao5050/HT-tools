package com.sevenroad.oas.charts.imp;

import com.github.abel533.echarts.Legend;
import com.github.abel533.echarts.Option;
import com.github.abel533.echarts.axis.CategoryAxis;
import com.github.abel533.echarts.axis.ValueAxis;
import com.github.abel533.echarts.code.Trigger;
import com.github.abel533.echarts.data.PieData;
import com.github.abel533.echarts.series.Line;
import com.github.abel533.echarts.series.Pie;
import com.sevenroad.oas.charts.Chart;
import com.sevenroad.oas.charts.ChartConfig;
import com.sevenroad.oas.charts.ChartResult;
import com.sevenroad.oas.dao.model.Column;
import com.sevenroad.oas.dao.model.TableResult;
import com.xiaoleilu.hutool.convert.Convert;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/19.
 */
public class PieChart extends Chart {
    public PieChart(ChartConfig config, TableResult result){
        super(config,result);
    }
    @Override
    public ChartResult draw() {
        Option option = new Option();
        option.title(config.getChartName());
        option.yAxis(new ValueAxis());
        Legend legend = new Legend();
        List<Column> columns = tableResult.getResult();
        Pie[] line = new Pie[config.getyColumnName().length];
        Column category = null;
        for(int i = 0;i<columns.size();i++){
            if(columns.get(i).getColumnName().equals(config.getxColumnName())){
                category = columns.get(i);
                legend.data(category.getRowData().toArray());
            }
        }
        for(int i = 0;i<columns.size();i++){
            Column column = columns.get(i);
            String[] yColumn = config.getyColumnName();
            for(int z = 0;z<yColumn.length;z++) {

                if(column.getColumnName().equals(yColumn[z])) {
                    line[z] = new Pie();
                    for (int j = 0; j < column.getRowData().size(); j++) {
                        line[z].data(new PieData(category.getRowData().get(j),Convert.toDouble(column.getRowData().get(j))));
                    }
                }
            }
        }
        option.tooltip(Trigger.axis);
        option.legend(legend);
        option.series(line);
        return new ChartResult(config.getChartName(),option);
    }
}
