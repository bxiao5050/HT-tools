# 数据与权限

主要内容包含系统（PC+微信）新增游戏，每日报表增删游戏，  
数据异常修改 
常用数据库:  

* `121.10.140.56:3306`     (**Mysql**　　　:　root       　love7road!)  
* `113.107.167.25:5432`    (**PostgreSQL**:　gp_pg_user 　Ch7GR4pg56)  
* `121.10.140.201:5432`    (**PostgreSQL**:　gpadmin　　　gp#123root)  

---

## 配置新游戏

### [手游支撑平台](http://121.10.141.219:4600/)添加新游戏

### 113.107.167.25 和 121.10.140.201

**首先，到`113.107.167.25 和 121.10.140.201`数据库`db_game_data.sc_oas_db_mobile`下**

* `t_oas_game` 表中配置新游戏  
* `t_oas_system_game` 中配置系统与游戏关系  
* `t_oas_system_game_menu` 配置游戏菜单关系
  
配置完成调接口 [http://121.10.141.219:4600/user/system/clearCache](http://121.10.141.219:4600/user/system/clearCache)(清理缓存)

**投放报表中游戏在 `113.107.167.25 和 121.10.140.201`的`sc_sdk_databank`中配置**  

* `t_c_area_app` 游戏地区关系表

### FB投放分析系统配置

* 首先配置app，`sc_osa_db_fb_ad.t_e_app`中添加app，`token`为facebook应用中
市场营销API->工具->获取访问口令下勾选`ads_management`, `ads_read`, `read_insights`获取口令  
获取口令的facebook账号必须具有市场营销的权限（若没有必须找投放授权再重新生成token）  

* 配置`t_e_game`， `t_e_game_app`，`t_e_job` 三张表  

---

## 配置权限

### [手游支撑平台](http://121.10.141.219:4600/)配置权限

* 到[运维服务平台](http://yw.7road-inc.com:8080/) 上配置，若用户不存在，则创建用户
* 角色管理中具有多个角色，可根据需要为用户配置相应的角色  
* 若需要做特殊处理，可以查找到用户后在其私有权限中配置  
**注意**： 在`海外发行分析系统菜单`添加游戏时，需要在`海外发行分析系统代理商`和`海外发行分析系统渠道`中
同步添加游戏所对应的渠道和代理商


  
## 微信系统添加新游戏

* `121.10.140.56`下，`data_premiss.t_e_resource`中配置菜单，
其中`resource_type`为`wechat_menu`的资源为微信菜单，新增游戏需要对应的添加游戏和菜单

* `t_e_role_resource`为角色分配上面菜单权限，渠道权限(在`t_e_resource`表中直接根据game_id查看对应渠道与包)

* 若用户不存在则，在`t_e_user`中添加

* 添加完毕需调用接口http://xywxfw.changic.net.cn/sysAdmin?type=gameinfo&access_token=微信公众号accesstoken  
  [微信公众号](https://mp.weixin.qq.com/) （账号： 7roaddata@7road.com 密码： 7RoadData11）


## 微信系统重启

* 微信分析系统 121.10.140.56:16333 （账号：`root` 密码：`fj6xElEFoe@7road`）

* 目录：/application/WeiXinOasSystem/wecharOasSystem_foreign/wecharOasSystem  
  执行指令   
        `sh command.sh stop` 停止    
        `sh command.sh start` 启动  
---
  
## 常见问题

### 投放FB花费异常

* 到`sc_osa_db_fb_ad.t_e_job`中查看状态是否正常（success）  

* 正常，则直接运行函数 fun_utf8_app_add_fb_cost，时间为数据错误的时间段，
如重算六月三号，参数为`'2018-6-3','2018-6-3'`

* 若不正常，查看日志信息log_message栏，观察问题  

服务器地址： `public`->`香港跳板机`->`/data/facebookAds/facebookGet/facebookGet`  


### 投放每日报表游戏更改(邮件生成游戏列表)

* 桌面远程到`121.10.141.219`（账号：admin-219 密码：ChYw@zhuan%Y0ng）       
  
* 到`D:\projects\oas3.0\DataBankV1 2016-9-5\DataBankV1\src\mail\emailUtil.js`中增删改reportApp，
  reportApp为`113.107.167.25`下`sc_sdk_databank.t_c_area_app`的unite_id

* 添加完毕后，项目目录下`cmd.exe`运行`forever restart app.js`


  
  


