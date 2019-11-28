package mail;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.mail.CreateMailTemplate;
import com.sevenroad.oas.mail.FreeMarkInstance;
import com.sevenroad.oas.mail.model.ReportEntity;
import com.sevenroad.oas.mail.task.GetMediaDataTask;
import com.sevenroad.oas.mail.task.GetTotalDataTask;
import com.sevenroad.oas.web.common.SystemConfig;
import freemarker.template.Template;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.context.support.XmlWebApplicationContext;

import java.io.File;
import java.io.FileWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by linlin.zhang on 2018/3/16/016.
 */
public class Task {

    ApplicationContext context = new ClassPathXmlApplicationContext("spring/applicationContext.xml");

    @Test
    public void testGetTotalDataTask() throws Exception{
        GsonBuilder gb = new GsonBuilder();
        gb.serializeSpecialFloatingPointValues();
        gson = gb.create();
        CreateMailTemplate createMailTemplate = context.getBean(CreateMailTemplate.class);
        //,"52","51","48","47","46","41","43","36","38","19","33","34"
        ReportEntity reportEntity = createMailTemplate.GetTotalData(
        //        new String[]{"53","52","52","51","48","47","46","41","43","36","38","19","33","34"}
                null,null
        );

        FreeMarkInstance instance = new FreeMarkInstance();
        instance.init();
        Template template = instance.getTemplate("mail.html");
        Writer out = new FileWriter(new File("D:\\linlin.zhang\\Project\\Git\\webers\\foreginOasSystem\\IntegrateOasSystem-switchPermiss\\src\\main\\resources\\resources\\mail\\mail.html"));
        Map<String,Object> root = new HashMap<String,Object>();
        root.put("report", reportEntity);
        root.put("chartData", gson.toJson(reportEntity).replaceAll("\"","\\\\\""));
        template.process(root, out);
        out.flush();
        out.close();
        System.out.print(out.toString());

    }

    Gson gson ;
    @Test
    public void testFreeMakr() throws Exception{

        ReportEntity reportEntity = gson.fromJson("{\"countDate\":\"2018-03-21\",\"Title\":\"2018-03-21投放日报\",\"totalData\":{\"mobileGame\":[{\"gameName\":\"超级英雄英文\",\"todayCost\":576.84998,\"monthCost\":21168.988,\"monthBudget\":53151.0,\"percent\":39.83},{\"gameName\":\"新马印菲LUNA\",\"todayCost\":1273.54,\"monthCost\":30952.811,\"monthBudget\":64424.0,\"percent\":48.05}]},\"gameData\":[{\"gameName\":\"  超级英雄英文    \",\"rows\":[{\"mediaSource\":\"googleadwords_int\",\"system\":\"googleadwords_int\",\"install\":395,\"reg\":278,\"roles\":225,\"cost\":332.63,\"regPercent\":70.38,\"rolesPercent\":56.96,\"regCost\":1.48,\"rolesCost\":0.0},{\"mediaSource\":\"Facebook Ads\",\"system\":\"Facebook Ads\",\"install\":334,\"reg\":265,\"roles\":223,\"cost\":244.22,\"regPercent\":79.34,\"rolesPercent\":66.77,\"regCost\":1.1,\"rolesCost\":0.0},{\"mediaSource\":\"Organic\",\"system\":\"Organic\",\"install\":90,\"reg\":57,\"roles\":46,\"cost\":0.0,\"regPercent\":63.33,\"rolesPercent\":51.11,\"regCost\":0.0,\"rolesCost\":0.0}],\"chartData\":{\"install\":[1297,1265,1231,1313,1334,1169,1145,1054,997,1174,1302,1518,1492,1272,1218,1154,1199,1406,1551,1177,1110,1205,1515,1912,2559,2605,1690,1062,819],\"regs\":[1039,1011,941,1047,1061,930,898,845,778,939,1017,1151,1181,999,955,898,942,1063,1189,909,849,968,1177,1454,1983,1986,1271,783,600],\"roles\":[924,891,846,928,953,851,814,766,702,822,893,1018,1049,875,847,787,815,942,1059,808,751,848,1038,1267,1733,1719,1096,676,494],\"cost\":[996.26,988.29,982.91,986.37,1009.23,961.1,896.18,882.22,866.37,990.43,996.39,1014.13,1010.29,887.51,1003.43,938.8,923.95,977.39,924.19,920.16,847.08,919.33,1108.18,1375.53,1482.01,1503.42,1268.19,635.36,576.85]}},{\"gameName\":\" 新马印菲LUNA     \",\"rows\":[{\"mediaSource\":\"mobvista_int\",\"system\":\"mobvista_int\",\"install\":440,\"reg\":184,\"roles\":180,\"cost\":1.28,\"regPercent\":41.82,\"rolesPercent\":40.91,\"regCost\":0.01,\"rolesCost\":0.0},{\"mediaSource\":\"Facebook Ads\",\"system\":\"Facebook Ads\",\"install\":334,\"reg\":274,\"roles\":266,\"cost\":853.16,\"regPercent\":82.04,\"rolesPercent\":79.64,\"regCost\":3.21,\"rolesCost\":0.0},{\"mediaSource\":\"Organic\",\"system\":\"Organic\",\"install\":222,\"reg\":151,\"roles\":149,\"cost\":0.0,\"regPercent\":68.02,\"rolesPercent\":67.12,\"regCost\":0.0,\"rolesCost\":0.0},{\"mediaSource\":\"googleadwords_int\",\"system\":\"googleadwords_int\",\"install\":96,\"reg\":66,\"roles\":65,\"cost\":177.45,\"regPercent\":68.75,\"rolesPercent\":67.71,\"regCost\":2.73,\"rolesCost\":0.0},{\"mediaSource\":\"duapps_int\",\"system\":\"duapps_int\",\"install\":68,\"reg\":49,\"roles\":49,\"cost\":88.4,\"regPercent\":72.06,\"rolesPercent\":72.06,\"regCost\":1.8,\"rolesCost\":0.0},{\"mediaSource\":\"unityads_int\",\"system\":\"unityads_int\",\"install\":34,\"reg\":27,\"roles\":27,\"cost\":55.5,\"regPercent\":79.41,\"rolesPercent\":79.41,\"regCost\":2.06,\"rolesCost\":0.0},{\"mediaSource\":\"bluestacks_int\",\"system\":\"bluestacks_int\",\"install\":22,\"reg\":16,\"roles\":16,\"cost\":39.6,\"regPercent\":72.73,\"rolesPercent\":72.73,\"regCost\":2.48,\"rolesCost\":0.0},{\"mediaSource\":\"ironsource_int\",\"system\":\"ironsource_int\",\"install\":21,\"reg\":18,\"roles\":17,\"cost\":26.25,\"regPercent\":85.71,\"rolesPercent\":80.95,\"regCost\":1.54,\"rolesCost\":0.0},{\"mediaSource\":\"applovin_int\",\"system\":\"applovin_int\",\"install\":17,\"reg\":13,\"roles\":13,\"cost\":31.68,\"regPercent\":76.47,\"rolesPercent\":76.47,\"regCost\":2.44,\"rolesCost\":0.0},{\"mediaSource\":\"taptica_int\",\"system\":\"taptica_int\",\"install\":2,\"reg\":0,\"roles\":0,\"cost\":0.22,\"regPercent\":0.0,\"rolesPercent\":0.0,\"regCost\":0.0,\"rolesCost\":0.0}],\"chartData\":{\"install\":[1715,1724,1435,1734,1880,1499,1380,1445,1509,1569,1815,1700,1433,1324,1346,1384,1269,1629,1488,1305,1165,1355,2015,1537,1119,1175,1016,1141,1256],\"regs\":[1222,1199,1040,1304,1428,1116,1045,963,1010,1105,1301,1264,990,913,876,769,776,978,1022,891,860,734,634,570,727,770,749,850,798],\"roles\":[1199,1163,1014,1279,1390,1095,1022,935,971,1071,1267,1227,969,890,852,746,744,947,989,863,841,716,614,559,714,752,731,826,782],\"cost\":[2383.99,2313.31,1790.38,2393.05,2648.66,1957.22,1700.72,1727.66,1425.51,1906.85,2298.35,2370.31,1537.8,1255.84,1648.51,1312.2,1239.78,1643.16,1775.18,1521.73,1244.96,1107.06,1157.15,943.07,1141.61,1283.04,1428.89,1438.27,1273.54]}}]}",ReportEntity.class);


    }
}
