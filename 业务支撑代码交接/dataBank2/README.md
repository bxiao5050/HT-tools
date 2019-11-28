# 整合分析系统
## 介绍
> 整合分析系统,是集合<font color=orange size=3 face="黑体">自研业务分析系统</font>,<font color=orange size=3 face="黑体">海外发行分析系统</font>,<font color=orange size=3 face="黑体">efunfun分析系统</font>,<font color=orange size=3 face="黑体">88box分析系统</font>等分析平台为一体的整合分析系统平台。

## 项目文档
### 项目构成
> 这是一个基于vue.js开发的管理系统平台。使用vue-router控制模块切换，vuex管理状态和部分数据，ajax作为http请求工具，highcharts作为模块图表展现工具。

#### 工具库
- vue全家桶: vue,vue-router,vuex
- 项目打包工具: webpack
- http请求工具: ajax
- 图表工具: highcharts
- 组件库: element-ui
- 样式库: bootstrap,icon-font
- 其他: jquery,moment, js-md5等

#### 代码结构
- brower_components目录为本地库目录(手动修改过源码的库)

- build目录为webpack配置目录

- config目录为编译启动配置目录

- dist目录为编译打包后文件生成目录

- node-module为插件库目录

- src目录为前端代码目录
>- assets目录为资源文件目录
>- components目录为自定义组件目录
>- router目录为路由配置目录
>>- index.js vue-router路由生成
>>- menuConfig.js 路由配置项

>- scss目录为样式文件目录
>- store目录为vuex数据源目录
>- utils目录为自定义工具库目录
>>- services 为接口配置目录
>>- highchartUtil.js 文件为自定义图表配置方法库
>- views目录为业务页面目录

>- main.js 项目启动文件

- test目录为测试工具目录

##### 编译运行
```
npm run dev
```

##### 项目打包
```
npm run build
```

### IE兼容性
> 兼容IE9以上(不包括IE9,IE9部分方法会失效,部分样式待调整)

### 多语言
- 简体中文
- 繁体中文
- 英文

> 配置多语言：多语言文件目录为src --> store --> modules --> Language --> packs 目录,chs.js 为简体中文配置文件,en.js 为英文配置文件,tradition.js 为繁体中文配置文件。

> 使用: store数据源中store.state.Language,cur为当前语言，data内为语言包内容，引入对应语言包，在模块中进行单独匹配

### 新模块开发
1. 数据库添加菜单并分配用户菜单权限(前端开发可暂时跳过,手动跳转路由)
2. src --> components --> modules 目录下添加新模块目录
3. src --> router --> menuConfig 配置菜单路由并指向新模块目录
4. src --> store 目录下配置store数据源(非必要，可不使用store)
5. 打开页面通过路由访问到新模块页面，并开发调试

### 更新日志
>- 2017-11-01
>1. 登陆页面改版，优化启动效果
>2. 添加表格冻结表头功能
>3. 五分钟视图添加五分钟付费人数

### api接口文档

#### 接口列表

##### 接口地址
- http://172.16.1.171:8015

##### 系统登录
- url: http://接口地址/api/v1.0/user/login
- 请求类型：JSONP
- 参数:

| 参数名 | 类型 | 值 |
| :------- | ---- | :------: |
| userName | String |  'admin' |
| password | String |  '123456'(md5) |
| language | String |  'CHS'  |

- 响应结果:
```
{
    code: 301,
    message: "登陆成功",
    state: {
        userName: "郁伟强",
        userGame: [
            {
                systemId: 1,
                systemName: "自研业务分析系统",
                gameId: 101,
                mainGameId: 47,
                GameName: "手游弹弹堂"
            },
            {
                systemId: 2,
                systemName: "海外发行分析系统",
                gameId: 1,
                mainGameId: 10002,
                GameName: "越南超级英雄"
            },
            {
                systemId: 3,
                systemName: "efunfun分析系统",
                gameId: 301,
                mainGameId: 1,
                GameName: "卧龙吟"
            },
            {
                systemId: 3,
                systemName: "efunfun分析系统",
                gameId: 302,
                mainGameId: 2,
                GameName: "星曲"
            }
        ]
    }
}
```

##### 系统登出
- url: http://接口地址/api/v1.0/user/logout
- 请求类型：JSONP
- 参数: 无

- 响应结果:
```
{
    code: 101,
    message: "NOT_LOGIN",
    state: "用户未登陆"
}
```

##### 获取系统游戏
- url: http://接口地址/api/v1.0/user/games
- 请求类型：JSONP
- 参数:

| 参数名 | 类型 | 值 |
| :------- | ---- | :------: |
| username | String |  'admin' |
| password | String |  '123456' |
| language | String |  'CHS'  |

- 响应结果:
```
{
    code: 401,
    message: "QUERY_SUCCESSED",
    state: [
        {
            systemId: 1,
            systemName: "自研业务分析系统",
            gameId: 101,
            mainGameId: 47,
            GameName: "手游弹弹堂"
        },
        {
            systemId: 2,
            systemName: "海外发行分析系统",
            gameId: 1,
            mainGameId: 10002,
            GameName: "越南超级英雄"
        },
        {
            systemId: 3,
            systemName: "efunfun分析系统",
            gameId: 301,
            mainGameId: 1,
            GameName: "卧龙吟"
        },
        {
            systemId: 3,
            systemName: "efunfun分析系统",
            gameId: 302,
            mainGameId: 2,
            GameName: "星曲"
        }
    ]
}
```

##### 游戏切换
- url: http://接口地址/api/v1.0/user/change
- 请求类型：JSONP
- 参数:

| 参数名 | 类型 | 值 |
| :------- | ---- | :------: |
| systemId | Number |  1 |
| gameId | Number |  101 |

- 响应结果:
```
{
    code: 303,
    message: "OPERATION_SUCCESSED",
    state: "操作成功"
}
```

##### 获取代理商
- url: http://接口地址/api/v1.0/user/zones
- 请求类型：JSONP
- 参数:

| 参数名 | 类型 | 值 |
| :------- | ---- | :------: |
| isCache | Number |  1 或者 0 |

- 响应结果:
```
{
    "code": 401, 
    "message": "QUERY_SUCCESSED", 
    "state": [
        [
            {
                "region_id": 1, 
                "region_name": " 手游弹弹堂测试 ", 
                "agent_id": 271, 
                "agent_name": " 台湾预发布 ", 
                "game_zone_id": 272, 
                "game_zone_name": " 台湾预发布 1区 "
            }
        ]
    ]
}
```

##### 获取注册渠道
- url: http://接口地址/api/v1.0/user/channels
- 请求类型：JSONP
- 参数:

| 参数名 | 类型 | 值 |
| :------- | ---- | :------: |
| isCache | Number |  1 或者 0 |

- 响应结果:
```
{
    "code": 401, 
    "message": "QUERY_SUCCESSED", 
    "state": [
        [
            {
                "channel_id": -1, 
                "channel_name": "默认"
            }
        ]
    ]
}
```

##### 获取付费渠道
- url: http://接口地址/api/v1.0/user/paychannels
- 请求类型：JSONP
- 参数:

| 参数名 | 类型 | 值 |
| :------- | ---- | :------: |
| isCache | Number |  1 或者 0 |

- 响应结果:
```
{
    "code": 401, 
    "message": "QUERY_SUCCESSED", 
    "state": [
        [
            {
                "channel_id": -1, 
                "channel_name": "默认"
            }
        ]
    ]
}
```

##### 获取菜单列表
- url: http://接口地址/api/v1.0/user/menus
- 请求类型：JSONP
- 参数: 无

- 响应结果:
```
{
    "code": 401, 
    "message": "QUERY_SUCCESSED", 
    "state": [
        {
            "menuId": 1, 
            "menuName": "运营监控", 
            "childrenMenu": [
                {
                    "isAdd": true, 
                    "isDel": true, 
                    "isEdit": true, 
                    "isQeury": true, 
                    "dataView": "fn_7road_oas_5min_view", 
                    "menuId": 101, 
                    "menuName": "五分钟视图"
                }, 
                {
                    "isAdd": true, 
                    "isDel": true, 
                    "isEdit": true, 
                    "isQeury": true, 
                    "dataView": "fn_7road_oas_virtual_point", 
                    "menuId": 103, 
                    "menuName": "虚拟货币监控"
                }
            ]
        }
    ]
}
```

##### 模块查询
- url: http://接口地址/api/v1.0/query/{dataview}
- 请求类型：POST
- 参数:

| 参数名 | 类型 | 值 |
| :------- | ---- | :------: |
| isCache | Number |  1 或者 0 |
| 参数根据脚本配置 | ALL |  ALL |

- 响应结果:
```
{
    "code": 401, 
    "message": "QUERY_SUCCESSED", 
    "state": [
        [{模块查询结果}],
        [{多语言关联结果}]
    ]
}
```

##### 模块导出
- url: http://接口地址/api/v1.0/export/{dataview}
- 请求类型：POST
- 参数:

| 参数名 | 类型 | 值 |
| :------- | ---- | :------: |
| isCache | Number |  1 或者 0 |
| 参数根据脚本配置 | ALL |  ALL |

- 响应结果:
```
{
    "code": 401, 
    "message": "QUERY_SUCCESSED", 
    "state": [
        [{模块查询结果}],
        [{多语言关联结果}]
    ]
}
```