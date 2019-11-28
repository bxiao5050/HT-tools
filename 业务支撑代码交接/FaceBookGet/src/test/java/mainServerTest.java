
import com.sevenroad.facebook.mapper.jobMapper;
import com.sevenroad.services.SqlFactory;
import org.junit.Test;
import org.junit.Before; 
import org.junit.After;

/** 
* mainServer Tester. 
* 
* @author <Authors name> 
* @since <pre>���� 20, 2017</pre> 
* @version 1.0 
*/ 
public class mainServerTest { 

@Before
public void before() throws Exception { 
} 

@After
public void after() throws Exception { 
} 

/** 
* 
* Method: main(String[] args) 
* 
*/ 
@Test
public void testMain() throws Exception {
    jobMapper jobMapper = SqlFactory.getSession().getMapper(jobMapper.class);
} 


} 
