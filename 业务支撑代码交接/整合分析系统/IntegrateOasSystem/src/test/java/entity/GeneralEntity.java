package entity;

import com.baomidou.mybatisplus.mapper.Condition;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.google.gson.Gson;
import com.sevenroad.oas.dao.entity.Task;
import com.sevenroad.oas.dao.mapper.TaskMapper;
import com.sevenroad.oas.task.TaskDispatcher;
import com.sevenroad.oas.task.TaskService;
import com.sevenroad.oas.task.model.FiveMinDataResult;
import com.sevenroad.oas.task.model.FiveMinOnlineParams;
import com.xiaoleilu.hutool.crypto.digest.DigestUtil;
import com.xiaoleilu.hutool.http.HttpUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.context.support.WebApplicationContextUtils;

import java.util.*;

/**
 * Created by linlin.zhang on 2017/5/16.
 */
@SuppressWarnings("ALL")
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration(value = "src/main/webapp")
@ContextHierarchy({
        @ContextConfiguration(name = "parent", locations = "classpath:/spring/applicationContext.xml")
})
public class GeneralEntity {


    Gson gson = new Gson();

    @Test
    public void entityTest(){
        Task task = new Task();
        EntityWrapper<Task> condition = new EntityWrapper<>();
        condition.eq("state",1);
        System.out.println(condition.getSqlSegment());
        List<Task> tasks = task.selectList(condition);
        System.out.println(tasks);
    }

    @Test
    public void getFiveMinData(){
        Date currentTime = Calendar.getInstance().getInstance().getTime();
        Map<String,Object> getParams = new HashMap<>();
        getParams.put("time",currentTime.getTime());
        getParams.put("secret", DigestUtil.md5Hex(currentTime.getTime()+"cd24fb0d6963f"));
        String jsonResult = HttpUtil.get("http://54.169.101.14/pub_abroad_vn/admin/game_online_user",getParams);
        FiveMinDataResult result = gson.fromJson(jsonResult, FiveMinDataResult.class);
        System.out.println("1111111111");
    }
    @Test
    public void getFiveMinParams() {
        FiveMinOnlineParams params = new FiveMinOnlineParams();
        params.setApiUrl("http://54.169.101.14/pub_abroad_vn/admin/game_online_user");
        params.setAppId(10002);
        params.setAppSecret("cd24fb0d6963f");
        params.setConnectionId(3);
        params.setInputTable("sc_game_foreign_data_mobile.t_w_5min_online");
        System.out.println(gson.toJson(params));
    }
    @Test
    public void TaskService(){
        //WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext)
    }
}
