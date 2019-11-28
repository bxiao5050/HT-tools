package chart;

import com.github.abel533.echarts.*;
import com.google.gson.Gson;
import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.charts.*;
import com.sevenroad.oas.charts.imp.BarChart;
import com.sevenroad.oas.charts.imp.LineChart;
import com.sevenroad.oas.charts.imp.PieChart;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.imp.SqlDbImp;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.dao.model.TableResult;
import com.sevenroad.oas.web.utils.Consts;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/19.
 */
@SuppressWarnings("ALL")
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration(value = "src/main/webapp")
@ContextHierarchy({
        @ContextConfiguration(name = "parent", locations = "classpath:/spring/applicationContext.xml")
})
public class generalChart {
    @Autowired
    SqlDbImp sqlDbImp;
    @Autowired
    ConnectionManager connectionManager;
    @Autowired
    DataViewCache dataViewCache;
    Gson gson = new Gson();
    @Test
    public void lineChart(){
        DataView dataView = dataViewCache.getCache(Consts.DataViews.sysGetUsersInfo);
        ExcuteModel model = new ExcuteModel(dataView,0,null);
        model.setConnection(connectionManager.getConnection(1));
        List<TableResult> resultList = sqlDbImp.select(model);
        ChartConfig chartConfig = new ChartConfig();
        chartConfig.setChartName("五分钟在线");
        chartConfig.setxColumnName("count_date");
        chartConfig.setyColumnName("zones","roles");
        com.sevenroad.oas.charts.Chart chart = new PieChart(chartConfig,resultList.get(0));
        //Option option = chart.draw();
       // System.out.println(gson.toJson(option));
    }
}
