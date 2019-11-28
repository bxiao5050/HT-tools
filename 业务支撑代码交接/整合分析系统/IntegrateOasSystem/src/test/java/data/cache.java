package data;

import com.sevenroad.oas.cache.Imp.ColumnNameCache;
import com.sevenroad.oas.cache.Imp.DataViewMapComponentCache;
import com.sevenroad.oas.dao.model.tables.DataViewMapComponent;
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
public class cache {

    @Autowired
    DataViewMapComponentCache dataViewMapComponentCache;

    @Autowired
    ColumnNameCache columnNameCache;
    @Test
    public void testData(){
       List<DataViewMapComponent> result = dataViewMapComponentCache.getCache(8);
    }

    @Test
    public void testColumn(){
        String key = "CHScount_date";
        System.out.println(columnNameCache.getCache(key));
    }
}
