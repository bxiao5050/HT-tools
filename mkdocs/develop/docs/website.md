# 官网

开发前确认素材无误，确认官网域名等已申请
 
例子：  
>>**H5独步江域名信息**  
      **官网域名**:　　　　　　`docbogiangho.bilivfun.com`  
      **服务器目录**:　　　　　`/data/web/sites/dbjh-vn`  
      **静态资源CDN地址**:　　`http://images-cdn.bilivfun.com/docbogiangho/`  
      **CDK域名**:　　　　　　`cdk.bilivfun.com`   
  
---
  
## 开发流程

### * 根据素材制作页面；
> 静态资源放官网目录下`static`文件夹下，其地址为静态资源cdn地址

### * 配置活动后台
> * 页面开发完成，在[官网管理后台](http://admin.changicth.com)上配置官网信息；  
    1. `站点管理` -> `增加站点` -> `填写站点信息`
    2. `站点管理` -> `查询站点` -> `指定模板` -> `勾选活动模板、新闻模板和首页模板`
    3. `文章种类` -> `文章类型` -> `新增两个文章类型，一个活动，一个新闻（所属种类为news）`
    4. `权限管理` -> `查询角色` -> `增加两个角色，一个运营，一个管理员，并为对应账号配置角色，否则对应账号无法查看该游戏；`
    
  * 添加新闻时，新闻状态设置为热点，状态有效时间尽可能的长一些，发布时间要比当前时间提前1小时  
    
  * 账号： panda.z　　密码： 123@asdf
  * 账号会过期，重置密码后默认密码为： changic
    
### * 修改新闻代码　　
>* 活动后台配置完成后，根据后台配置信息修改html为ftl  

### * 生成新闻代码
>* 将修改好的ftl文件放到对应的模板目录下（在站点中配置），  
    点击`生成全站HTML`，对应官网目录下会生成对应的新闻代码，    
   模板文件存放路径： `业务支持` -> `游戏官网服` -> `/data/web/web-changic/WEB-INF/template/目录名称`  
   官网文件存放路径：`业务支持` -> `游戏官网服` -> `/data/web/sites/`
    
---

## 附录 
  
#### 首页新闻列表代码
```
    <@directive_article_list site=站点序号 size=显示文章数量 type=类型简称 kind=1>
        <#list _list_entity_article as article>
           <li>
               <p class="tit">
                 <a target="_blank" href="<#if article.url?exists || article.url !=''>${article.url} <#else>${serverHost}/news/detail/${article.ID?c}.html</#if>">
                      <span class="content">
                          [<#list article.typeList as type><#if type_index == 0>${type.typeName}<#else><#break /></#if></#list>]
                          <#if article.title?length gt 50>${article.title?substring(0,48)}... <#else>${article.title} </#if>
                      </span>
                 </a>
               </p>
               <p class="date">${article.createTime?string("yyyy-MM-dd")}</p>
           </li>
       </#list>
    </@directive_article_list>
```
#### 新闻内页代码  

* **列表**
```
<ul class="list active" id="list">
     <#include "/luna-sg/news/listContent.ftl">
</ul>
    
```
* **listContent.ftl(填充到列表中，15条每页)**
```
<#list newsList as news>
        <li>
            <div class="left">
                <a target="_blank" href="<#if news.url?exists || news.url !=''>${news.url}<#else>${serverHost}/news/detail/${news.ID?c}.html</#if>">
                    <span class="style">[NEWS]</span><span class="tit">${news.title}</span>
                </a>
            </div>
            <div class="right">
                <span class="date">${news.createTime?string("yyyy-MM-dd")}</span>
            </div>
        </li>
</#list>

<#if (currentPage==1 ) && (currentPage < totalPage)>
    <div class="pageNum" id="page_1">
        <a href="javascript:void(0)" onclick="changePage('list/${typeId}_1.html?ver=${version}');">First</a>
        <a href="javascript:void(0)">&lt;&nbsp;Pre</a>
        &nbsp;&nbsp;${currentPage}/${totalPage}&nbsp;&nbsp;
        <a href="javascript:void(0)" onclick="changePage('list/${typeId}_${currentPage + 1}.html?ver=${version}')">Next&nbsp;&gt;</a>
        <a href="javascript:void(0)" onclick="changePage('list/${typeId}_${totalPage}.html?ver=${version}')">Last</a>
    </div>
</#if>

<#if (currentPage>1) && (currentPage < totalPage)>
    <div class="pageNum">
        <a href="javascript:void(0)" onclick="changePage('list/${typeId}_1.html?ver=${version}');">First</a>
        <a href="javascript:void(0)" onclick="changePage('list/${typeId}_${currentPage - 1}.html?ver=${version}')" href="javascript:void(0)">&lt;&nbsp;Pre</a>
        &nbsp;&nbsp;${currentPage}/${totalPage}&nbsp;&nbsp;
        <a href="javascript:void(0)" onclick="changePage('list/${typeId}_${currentPage + 1}.html?ver=${version}')" href="javascript:void(0)">Next&nbsp;&gt;</a>
        <a href="javascript:void(0)" onclick="changePage('list/${typeId}_${totalPage}.html?ver=${version}')">Last</a>
    </div>
</#if>

<#if (currentPage>1) && (currentPage == totalPage)>
    <div class="pageNum">
        <a href="javascript:void(0)" onclick="changePage('list/${typeId}_1.html?ver=${version}');">First</a>
        <a href="javascript:void(0)" onclick="changePage('list/${typeId}_${currentPage - 1}.html?ver=${version}')">&lt;&nbsp;Pre</a>
        &nbsp;&nbsp;${currentPage}/${totalPage}&nbsp;&nbsp;
        <a href="javascript:void(0)">Next&nbsp;&gt;</a>
        <a href="javascript:void(0)">Last</a>
    </div>
</#if>
```
* **文章内容**
```
<div class="list-content">
    <div class="content">
        <p class="tit">${news.title}（标题）</p>
        <p class="date">POST ON<span><#if news.publishTime?exists || news.publishTime != ''>${news.publishTime?string("yyyy-MM-dd")} <#else>${news.createTime?string("yyyy-MM-dd")}</#if></span> (发布时间)</p>
        <p class="detail">
            文章内容
            ${news.content}
        </p>
    </div>
</div>
```    
* **切换不同类型文章按钮代码**
```
<div class="link">
    <a href="javascript:void(0);" class="guide acts" data-id="61" data-version="${version}">news</a>
    <a href="javascript:void(0);" class="guide news" data-id="62" data-version="${version}">events</a>
</div>    
    
    
$(".guide").click(function(){
    var id = $(this).attr("data-id"); //对应文章类型id
    var version = $(this).attr("data-version"); //页面生成的版本号
    var url = '/news/list/'+id+'_1.html?ver='+version; 
    $.get(url, function(data){
        $(".list-menu").html(data);
    });
});
```

## fis3打包的官网

* 以前使用的是fis3打包，若需维护则需要重新打包更新，打包指令
    
    `fis3 release production -d output`
    
* `fis-conf.js`为打包配置文件，若地址等有更新，则需到这里面更改
    
* 打包完毕之后，将output中**static**打包为**zip**文件,替换官网**static**
   
* 更新tpl文件，生成官网

## 游戏域名

| 名称          | 域名   |对应服务器文件名|
| :----:        | :----  |     :----:     | 
| iPocket     | [http://www.ipocketgames.com/](http://www.ipocketgames.com/)            | www |
| bilivfun    | [http://www.bilivfun.com/](http://www.bilivfun.com/)                    | bilivfun |
| 公司官网    | [http://xiaoyao.pocketgamesol.com/](http://xiaoyao.pocketgamesol.com/)   | xiaoyao |
| luna-新马     | [http://luna.bilivfun.com/](http://luna.pocketgamesol.com/)           | luna-sg |
| 数码宝贝-泰国  | [http://dd.pocketgamesol.com/](http://dd.pocketgamesol.com/)			| smbb-th |
| 口袋3ds-印尼  | [http://pkid.pocketgamesol.com/](http://pkid.pocketgamesol.com/)		| kdyg3ds-id |
| 口袋3ds-法国  | [http://pmfr.pocketgamesol.com/](http://pmfr.pocketgamesol.com/) 		| kdyg3ds-fr |
| 口袋3ds-韩国  | [http://kor.pocketgamesol.com/](http://kor.pocketgamesol.com/) 		| kdyg3ds-kr|
| 口袋3ds-港台  | [http://pokeko.pocketgamesol.com/](http://pokeko.88box.com/)			| kdyg3ds-tw|
| 口袋3ds-德国  | [http://pkde.pocketgamesol.com/](http://pkde.pocketgamesol.com/) 		| kdyg3ds-de|
| 口袋3ds-越南  | [http://pokedaichien.pocketgamesol.com/](http://pokedaichien.pocketgamesol.com/) | kdyg3ds-vn|
| 口袋3ds-泰国  | [http://pokesaga.pocketgamesol.com/](http://pokesaga.pocketgamesol.com/) 	     | kdyg3ds-th|
| 超级英雄-越南 | [http://sieuanhhung.pocketgamesol.com/](http://sieuanhhung.pocketgamesol.com/)  | super-hero |
| 全球超英-越南 | [http://www.funheroesfight.com/](http://www.funheroesfight.com/)                | heroesfight |
| 攻城略地-泰国 | [http://k.changicth.com/](http://k.changicth.com/) 				                 | k | 
| 攻城略地-越南 | [http://t.changicvn.com/](http://t.changicvn.com/) 				                 | t |
| 全民主公-越南 | [http://tamquoc.pocketgamesol.com/](http://tamquoc.pocketgamesol.com/) 	         | qmzg-vn |
