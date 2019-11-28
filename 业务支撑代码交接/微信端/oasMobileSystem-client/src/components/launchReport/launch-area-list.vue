<template>
  <div>
    <!--当前系统为投放系统时,显示地区和游戏信息-->
    <div class="app-list">
      <!--返回 &&!appSearchText-->
      <div class="app-item px1-b" @click="appReturn" v-if="appState!=1">
        <i class="iconfont header-icon">&#xe600;</i>
        <span class="app-text">返回{{backLevel.area_app_name?"["+backLevel.area_app_name+"]":""}}<span/>
      </div>
       <!--全部地区-->
      <div class="app-item px1-b" @click="allArea" v-if="appState==1" :class="{check:nowApp.unite_id==1}">
        <i class="iconfont header-icon">&#xe6b8;</i>
        <span class="app-text">全部地区</span>
        <i class="iconfont footer-icon" v-if="nowApp.unite_id==1">&#xe664;</i>
      </div>
      <!--全部国家-->
      <div class="app-item px1-b" @click="allCountry" v-if="appState==2" :class="{check:nowApp.unite_id==nowAppArea.unite_id}">
        <i class="iconfont header-icon">&#xe6b8;</i>
        <span class="app-text">全部国家</span>
        <i class="iconfont footer-icon" v-if="nowApp.unite_id==nowAppArea.unite_id">&#xe664;</i>
      </div>
      <!--全部游戏-->
      <div class="app-item px1-b" @click="allGame" v-if="appState==3" :class="{check:nowApp.unite_id==nowAppCountry.unite_id}">
        <i class="iconfont header-icon">&#xe6b8;</i>
        <span class="app-text">全部游戏</span>
        <i class="iconfont footer-icon" v-if="nowApp.unite_id==nowAppCountry.unite_id">&#xe664;</i>
      </div>
      <!--默认的代理商主体 v-if="!appSearchText"-->
      <div class="app-item px1-b" v-for="item in appList" @click="selectApp(item)" :class="{check:nowApp.unite_id==item.unite_id}">
        <i class="iconfont header-icon">&#xe607;</i>
        <span class="app-text">{{item.area_app_name}}</span>
        <i class="iconfont footer-icon" v-if="appState==1||appState==2">&#xe694;</i>
        <i class="iconfont footer-icon" v-if="appState==3&&nowApp.unite_id==item.unite_id">&#xe664;</i>
      </div>
      <!--查询时显示的结果-->
      <!--<div class="app-item px1-b" v-for="item in searchResult" @click="selectApp(item)" v-if="appSearchText" :class="{check:nowApp.unite_id==item.unite_id}">
        <i class="iconfont header-icon">&#xe607;</i>
        <span class="app-text">{{item.area_app_name}}</span>
        <i class="iconfont footer-icon" v-if="appState==1||appState==2">&#xe694;</i>
        <i class="iconfont footer-icon" v-if="appState==3&&nowApp.unite_id==item.unite_id">&#xe664;</i>
      </div>-->
      <!--</scroller>-->
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import httpRequest from '../../utils/httpRequest.js'
  import commonMethod from '../../utils/commonMethod.js'
  import {
    Toast
  } from 'mint-ui'
  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters(["appData", "nowApp", "appList", "nowAppArea", "nowAppCountry", "nowAppGame", "appState",
        // "appSearchText"
      ]),
      // searchResult: function () {
      //   return this.$store.state.channelstore.searchResult;
      // },
      backLevel: function () {
        if (this.appState == 2) {
          return this.nowAppArea;
        } else if (this.appState == 3) {
          return this.nowAppCountry;
        }
      }
    },

    methods: {
      allArea:function(){
        var now = this.appData[0];
        this.$store.dispatch("setNowApp", now);
      },
      allCountry: function () {
        var now = this.nowApp;
        for (var i = 0; i < this.appData[0].childNode.length; i++) {
          console.log(this.appData[0].childNode[i].unite_id == this.nowApp.parent_id)
          if (this.nowApp.unite_id != 0 && this.appData[0].childNode[i].unite_id == this.nowApp.parent_id) {
            now = this.appData[0].childNode[i];
          }
        }
        console.log(now)

        this.$store.dispatch("setNowApp", now);
      },
      allGame: function () {
        var backApp = {};
        backApp = this.nowAppCountry;
        this.$store.dispatch("setNowApp", backApp);
        // this.$store.dispatch("setNowChannelParam", this.channels);
      },
      appReturn: function () {
        var backApp = {};
        var list = [];
        if (this.appState == 2) {
          backApp = this.nowAppArea;
          this.$store.dispatch("setAppArea", backApp);
        } else if (this.appState == 3) {
          backApp = this.nowAppCountry;
          this.$store.dispatch("setAppCountry", backApp);
        }
        if (backApp.parent_id == 1) {
          list = this.appData[0].childNode;
        } else {
          for (var i = 0; i < this.appData[0].childNode.length; i++) {
            if (backApp.parent_id == this.appData[0].childNode[i].unite_id) {
              list = this.appData[0].childNode[i].childNode;
            }
          }
        }

        if (this.appState == 2) {
          this.$store.dispatch("setNowApp", this.nowAppArea);
          this.$store.dispatch("setAppList", list);
          this.$store.dispatch("appStateAdd", -1);
        } else if (this.appState == 3) {
          this.$store.dispatch("setNowApp", this.nowAppCountry);
          this.$store.dispatch("setAppList", list);
          this.$store.dispatch("appStateAdd", -1);
        }
      },
      selectApp: function (item) {
        // this.$store.dispatch("clearAppSearchInfo");

        this.$store.dispatch("setNowApp", item);

        if (this.appState == 1) {
          this.$store.dispatch("setAppArea", item);
          this.$store.dispatch("setAppList", item.childNode);
          this.$store.dispatch("appStateAdd", 1);
        } else if (this.appState == 2) {
          this.$store.dispatch("setAppCountry", item);
          this.$store.dispatch("setAppList", item.childNode);
          this.$store.dispatch("appStateAdd", 1);
        } else if (this.appState == 3) {

        }

      }
    }
  }

</script>
<style lang="scss" rel='stylesheet/scss' scoped>
  .null-app {
    width: 100%;
    text-align: center;
  }
  
  .app-list {
    width: 100%;
    display: -webkit-box;
    -webkit-box-align: center;
    /*-webkit-box-pack: center;*/
    -webkit-box-orient: vertical;
    overflow: auto !important;
    -webkit-overflow-scrolling: touch;
    padding: 0 0 2rem 0;
    height: 11.7rem;
    background-color: #FFF;
    .app-item {
      width: 100%;
      height: 1.3rem;
      line-height: 1.3rem;
      padding: 0.13rem 0.53rem;
      .header-icon {
        float: left;
      }
      .app-text {
        float: left;
        margin-left: 0.26rem;
        width: 80%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: left;
      }
      .footer-icon {
        float: right;
      }
    }
    .app-item:active {
      background-color: #E8E8E8;
    }
  }
  
  .check {
    color: #716CA8;
    background: #F0EFFA;
    font-weight: bold;
  }

</style>
