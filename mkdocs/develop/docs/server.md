# 活动后台

活动后台分为测试服和正式服，其中各个游戏信息、活动信息以及游戏接口配置在mongodb中,  
系统逐渐完善，常见问题主要有活动接口更换，游戏接口问题，筛选手机号码等...  

 
--- 
 
## 测试服

mongodb地址： `172.16.172:27017/test`   
服务器地址: 　　`10.10.3.144`  
项目目录：　　`E:\linlin.zhang\activity3.0`  
日志目录：　　`C:\logs`  
活动管理平台： [http://172.16.1.171:9100/](http://172.16.1.171:9100/)


## 正式服

mongodb地址： `52.76.137.89:27017/activity_db`    
服务器地址：　`gms业务支持`->`活动后台服`->`/data/activities`  
活动管理平台： [http://172.16.1.171:9200/](http://172.16.1.171:9200/)  
查看活动日志：
>* 服务器地址下执行`history | grep mysql`
 * 进入最新一个mysql `mysql -usdk_linlin180102 -p'sdk_linlin20180102@_132'  -h10.10.2.192  -P2433`
 * 切换到库 `activity_log`
 * 其中，表`t_p_page_login` 为登录日志（可导出参与人数登信息）  
   表`t_p_join_activity` 为活动日志（可导出对应活动领奖人数等信息）
 * 例： 查询活动参与人数
   `select count(user_id) from t_p_join_activity where act_id='5b0f9b5f90bf7f14c86ce34e' and message like '{"code":200%' and count_date > '2018-06-15';`
---          
          
## 常见问题

### 更换或新增游戏接口
    
>游戏接口更换，在`mongodb`的`apps`表中找到对应的app配置，更换API      
    * `PLAYER_INFO`　　　获取角色信息接口  
    * `APP_SECERT`　　　　app Secret      
    * `SEND_EMAIL_NEW`　发送邮件奖励接口  
    * `PLAYER_TASK`　　　查询任务完成接口（不常用）  

### 所有条件配置正确却领取条件满足，领取时报不满足条件

> 如果活动有当天登录游戏要求，  
  需查看登录后游戏接口返回最新时间lastLogin是否为当天时间，  
  若时间仍满足条件，需到项目中进行调试  
  

### 导入超过1M固定用户

>在活动管理平台中导入测试用户.txt（不超过1M）,      
  到`mongdb`中查看`activities`中对应活动含有的条件id -> `andList`，  
  再根据条件id查到对应资源文件目录，到服务器上替换文件再保存目录即可  
  
 
### 预约电话号码筛选

> 到Activity3.0项目中`ACtivity-RPC > src/main/java/test.com.activity.rpc.admin/imp > AdminServiceTest`
  运行测试例子  
```
@Test
public void validPhone() {
  List<String> list = FileUtil.readLines("D:\\phone.txt", "utf-8");
  ValidPhoneTask.ValidPhoneResult result = toolsService.validPhones(list);
  Joiner joiner = Joiner.on("\n");
  String validString = joiner.join(result.getValidPhone());
  FileUtil.writeString(validString, "D:\\phone-tn.txt", "utf-8");
}
  
```

### 获取不到区服

> 有可能是数据库那边的问题，可以试着重启，一般都能解决问题~







