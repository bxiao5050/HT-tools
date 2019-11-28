package com.sevenroad.oas.charts.imp;


import com.sevenroad.oas.charts.Chart;
import com.sevenroad.oas.charts.ChartConfig;
import com.sevenroad.oas.charts.ChartResult;
import com.sevenroad.oas.dao.Utils;
import com.sevenroad.oas.dao.model.Column;
import com.sevenroad.oas.dao.model.TableResult;
import com.xiaoleilu.hutool.json.JSONArray;
import com.xiaoleilu.hutool.json.JSONObject;
import com.xiaoleilu.hutool.util.StrUtil;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/22.
 */
public class TableChart extends Chart {

    public TableChart(ChartConfig config, TableResult result){
        super(config,result);
    }
    @Override
    public ChartResult draw() {
        TableResult item = tableResult;
        List<Column> columns = item.getResult();
        String[] rows = new String[item.getRowCount()];
        String[] cells = new String[columns.size()];
        for(int z = 0;z<item.getRowCount();z++) {
            for (int j = 0; j < columns.size(); j++) {
                Column column = columns.get(j);
                cells[j]= "\""+column.getColumnName() + "\":" + Utils.getSqlRowValue(column.getRowData().get(z),column.getColumnType());
            }
            rows[z] = "{"+ StrUtil.join(",",cells)+"}";
        }

        String result = "[" + StrUtil.join(",",rows) + "]";
        JSONArray jsonArray = new JSONArray(result);
        return new ChartResult(config.getChartName() ,jsonArray);
    }
}
