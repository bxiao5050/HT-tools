<template>
  <section class="sideBar" :class="{'show':showMenu}">
    <user-info></user-info>
    <section class="list-ul px1-t">
      <div class="item"  v-for="item in menus"  @click="selectMenu(item)"><i class="iconfont">&#xe63d;</i>{{item.menu_name}}</div>
      <!--<router-link class="item" :to="{'name':'index'}"><i class="iconfont">&#xe603;</i>五力模型</router-link>-->
    </section>

    <section class="list-ul px1-t">
      <div class="item"  @click="clearCatch"><i class="iconfont">&#xe699;</i>清空缓存</div>
      <!--<v-touch tag="div" class="item"  v-on:tap="userSet"><i class="iconfont">&#xe690;</i>帐号设置</v-touch>-->
      <div class="item"  @click="about"><i class="iconfont">&#xe6e5;</i>关于</div>
    </section>
  </section>

</template>
<script>
import httpRequest from '../utils/httpRequest.js'
import {Toast} from 'mint-ui'
  export default {
    replace: true,
    props: ['showMenu'],
    components: {
      'userInfo': require('./user-info.vue')
    },
    computed:{
      menus:function(){
        return this.$store.state.basestore.menus;
      }
    },
    methods:{
      selectMenu:function(item){
         this.$store.dispatch("setNowMenu", item);
         this.$router.push({name:this.$store.state.basestore.nowmenu.menu_url})

         this.$emit("closeMenus");
      },
      clearCatch:function(){
        httpRequest.clearCache({type:"dataview"},(data)=>{
          if(data.state=="successed"){
            Toast("脚本缓存清理成功!");
            this.$emit("closeMenus");
          }
          else{
            Toast(data.result.errorMsg);
          }
        })
        httpRequest.clearCache({type:"query"},(data)=>{
          if(data.state=="successed"){
            Toast("查询缓存清理成功!");
            this.$emit("closeMenus");
          }
          else{
            Toast(data.result.errorMsg);
          }
        })
      },
      userSet:function(){
        alert("模块开发中...");
        this.$emit("closeMenus");
      },
      about:function(){
        alert("关于");
        this.$emit("closeMenus");
      }
    }
  };
</script>
