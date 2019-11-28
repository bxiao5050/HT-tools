package test.com.sevenroad.facebook.service; 

import com.facebook.ads.sdk.AdAccount;
import com.sevenroad.facebook.common.consts;
import com.sevenroad.facebook.entity.app;
import com.sevenroad.facebook.entity.job;
import com.sevenroad.facebook.job.levelJob;
import com.sevenroad.facebook.job.recordJob;
import com.sevenroad.facebook.service.campaignService;
import com.sevenroad.facebook.singleton.FBConfig;
import com.xiaoleilu.hutool.date.DateUtil;
import org.junit.Test;
import org.junit.Before; 
import org.junit.After;

import java.sql.Timestamp;

/** 
* campaignService Tester. 
* 
* @author <Authors name> 
* @since <pre>十月 16, 2017</pre> 
* @version 1.0 
*/ 
public class campaignServiceTest {
    campaignService service = new campaignService();
    app app = new app();
    AdAccount account;
    levelJob levelJob;
    recordJob recordJob;
    job jobItem = new job();

@Before
public void before() throws Exception {
    app.setAppId(27);
    app.setFbAccountId("890804817722918");
    app.setAppName("泰国口袋妖怪");
    app.setFbAppId("548408708701703");
//    account = new  AdAccount(app.getFbAccountId(), FBConfig.getContext());
    jobItem.setAppId(27);
    jobItem.setInterval(43200000);
    jobItem.setJobId(104);
    jobItem.setJobType(2);
    jobItem.setDescription("");
    jobItem.setJobTime(new Timestamp(DateUtil.parse("2018-10-15 08:20:45").getTime()));
    jobItem.setNextTime(new Timestamp(DateUtil.parse("2017-10-15 20:20:45").getTime()));
    jobItem.setJobStatus(consts.jobSuccessState);
    jobItem.setStatus(true);
    recordJob = new recordJob(jobItem,app);
} 

@After
public void after() throws Exception { 
} 

/** 
* 
* Method: getCampaigns(app app, AdAccount account) 
* 
*/ 
@Test
public void testGetCampaigns() throws Exception { 
//TODO: Test goes here...

    recordJob.call();
} 


} 
