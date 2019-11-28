##活动接口

* 基本接口：

| 类型 | URL | 请求方式  | 
| :----: | :----  | :----: | 
| 活动信息 | ${ipport}/activity/info| GET | 
| 领奖历史 | ${ipport}/activity/cdKeys | GET | 
| 参与活动 | ${ipport}/activity/join | GET | 

`/activity/cdKeys`接口传递参数：

| 名称 | 类型 | 是否必需  | 备注 |  
| :----:   | :----  | :----: | :----: | 
| groupId  | string | true |  活动组id | 
| actId    | string | true |  活动id | 
| token    | string | true |  用户认证令牌 | 

请求返回数据格式：

```
{
    "code": 200,
    "state": [
        {
            "goodId": "299fb11f-2e5a-4792-ae6f-85011ee3319b",
            "type": 0,
            "historyId": "5b2b23d4856f3e50998aeb86",
            "actId": "5afd2f0f90bf7f08a0446bcf",
            "rewardId": "5afd3bf090bf7f08a0446c29", //奖励id，根据此id为对应奖励按钮设置领取状态
            "rewardName": "累登1天",
            "getDate": "2018-06-21 11:04:36",
            "userId": "25587683",
            "userName": "kitkat@9266.com",
            "thirdGameZoneId": "1",
            "playerName": "katty0",
            "isGet": true
        },
        ...
    ]
}

```
`/activity/join`接口传递参数：

| 名称 | 类型 | 是否必需  | 备注 |  
| :----:   | :----  | :----: | :----: | 
| groupId  | string | true |  活动组id | 
| actId    | string | true |  活动id | 
| rewardId | string | true |  奖励id | 
| token    | string | true |  用户认证令牌 | 

请求返回数据格式：

```
{
	code:200
	state:{
		actId:"5acb098890bf7f158cb8711e"
		getDate:"2018-06-26 13:50:17"
		goodId:"dc6e8f04-5a28-47cb-9d21-2ca5ae4915bf"
		historyId:"5b31e22990bf7f07b476f559"
		isGet:true
		playerName:"oopsgg"
		rewardId:"5acb098890bf7f158cb8712b"
		rewardName:"รางวัลล็อกอิน 1 วัน"
		thirdGameZoneId:"1"
		type:0
		userId:"123759623"
		userName:"smiler119"
		
		//若奖励类型为激活码，state中将含有cdkeys字段
	}
}
```


## 累计登录达成

* 说明： 
    1. 通过`/activity/info`接口获取用户登录天数； 
    2. 通过`/activity/cdKeys`获取用户领取历史；
    3. 通过1,2条件设置按钮状态；
    4. 用户领取累积登录，通过`/activity/join`获取奖励。

* 参数信息

`/activity/info`接口传递参数：

| 名称 | 类型 | 是否必需  | 备注 |  
| :----:   | :----  | :----: | :----: | 
| groupId  | string | true |  活动组id | 
| actId    | string | true |  活动id | 
| rewardId | string | true |  奖励id（通常使用累积登录条件最后一个条件的rewardId） | 
| token    | string | true |  用户认证令牌 | 

请求返回数据格式：
```
{
    "code": 200,
    "state": {
        "joinTime": { //没有用
            "dayTime": 1,
            "sumTime": 1
        },
        //登录数据
        "gameLogin": [
            {
                "countDate": "2018-07-04", //登录时间
                "count": 16                //当天登录次数 
            },
            {
                "countDate": "2018-07-05",
                "count": 4
            },
           ...
        ]
    }
}

```

##活跃人数达成

* 说明： 
    1. 通过`/activity/info`接口获取活跃人数
    2. 通过`/activity/cdKeys`接口获取活跃奖励领取历史
    2. 根据活跃人数和领取历史设置个梯度活跃奖励领取按钮状态
    3. 通过`/activity/join`接口获取活跃奖励
   
* `/activity/info`参数信息

| 名称 | 类型 | 是否必需  | 备注 |
| :----:   | :----  | :----: | :----   |
| actId    | string | true   | 活动Id |
| groupId  | string | true   | 活动组Id |
| token    | string | true   | 用户认证令牌 |

数据返回格式

```
{
	code:200
	state:{
		ActJoin:0   //活跃人数
		countTimes:5000，
		...
	}
}
```

##累计充值达成

说明： 
1. 通过`/activity/info`接口获取充值金额
2. 通过`/activity/cdKeys`接口获取领取记录
3. 根据充值金额和领取记录设置充值奖励状态

* `/activity/info`参数信息

| 名称 | 类型 | 是否必需  | 备注 |
| :----:   | :----  | :----: | :----   |
| actId    | string | true   | 活动Id |
| groupId  | string | true   | 活动组Id |
| rewardId | string | true   | 礼包Id  |
| token    | string | true   | 用户认证令牌 |

数据返回格式

```
{
	code:200
	state:{
		PayCharge:0   //充值金额
		...
	}
}
```


## 直接领取类活动

说明：  
 1. 通过`/activity/cdKeys`接口获取领取记录  
 2. 根据充值金额和领取记录设置充值奖励状态  
 3. 通过`/activity/join`接口获取奖励  
     
**注意：**   
 **转盘活动**根据`/activity/join`接口获取到的**rewardId**判断指针指向
     

## 预约活动

说明： 

  1. 通过`/activity/info`获取预约人数；
  2. 通过`/activity/advance/join`提交预约手机号
  
  
`/activity/advance/join` 参数说明

| 名称 | 类型 | 是否必需  | 备注 |
| :----:   | :----  | :----: | :----   |
| groupId  | string | true   | 活动组Id |
| actId    | string | true   | 活动Id |
| phone | string | true   | 格式为 086-xxxxx  |


## 许愿活动

说明：
 
活动需要配置两个活动，一个许愿次数，一个许愿奖励  

   1. 通过`/activity/join`获取许愿次数奖励的`goodsId`
   2. 通过`/activity/submit/info`进行许愿
   3. 通过`/activity/recently/cdkeys`获取愿望列表，条数根据`limit`参数控制
   4. 最终中奖许愿玩家通过`/activity/lottery/list`获取
   
`/activity/submit/info` 传递参数说明

| 名称 | 类型 | 是否必需  | 备注 |
| :----:   | :----  | :----: | :----   |
| groupId  | string | true   | 活动组Id |
| goodsId    | string | true   | 许愿次数奖励获取到的goodsId |
| userInfo | string | true   | 用户愿望  |
| token | string | true   | 用户认证令牌  |

`/activity/recently/cdkeys`传递参数说明

| 名称 | 类型 | 是否必需  | 备注 |
| :----:   | :----  | :----: | :----   |
| groupId  | string | true   | 活动组Id |
| actId    | string | true   | 活动Id |
| limit | string | true   | 愿望条数  |
| token | string | true   | 用户认证令牌  |

返回参数格式：
```
{
    code: 200,
    state: [
        userName："用户名"
        userInfo: {
            wish: "愿望"
        }
    ]
}
```

`/activity/lottery/list`参数说明：

| 名称 | 类型 | 是否必需  | 备注 |
| :----:   | :----  | :----: | :----   |
| groupId  | string | true   | 活动组Id |
| actId    | string | true   | 活动Id |
| token | string | true   | 用户认证令牌  |

返回参数格式：

```
{
    code: 200,
    state: [
        {
            historyBase: {
                thirdGameZoneId: "三方区服id"，
                playerName: "用户名"
            }
        }
        ...
    ]
}

```