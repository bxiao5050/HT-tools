<template>
  <div>
    <header>
      <div class="header">
        <!--<div class="header-left" @click="returnMain">返回</div>-->
        <v-touch tag="div" class="header-left" @tap="returnMain">返回</v-touch>
        <h1 class="header-title">选择地区游戏</h1>
      </div>
    </header>
    <div class="page-body">
      <div class="agent-content">
        <div class="now-agent-group">
          <label class="now-agent-head">当前系统:</label>
          <label class="now-agent-text">{{nowos.name}}</label>
        </div>
        <div class="now-agent-group">
          <label class="now-agent-head">当前地区游戏:</label>
          <label class="now-agent-text">{{nowApp.area_app_name}}</label>
        </div>
        <!--<div class="now-agent-group">
          <label class="now-agent-head">当前游戏:</label>
          <label class="now-agent-text">{{nowApp.area_app_name}}</label>
        </div>-->
        <launchtypecom></launchtypecom>
        <component v-bind:is="currentTypeView">
        </component>
        <!--<agentList v-if="agentType==0"></agentList>
        <channelList v-if="agentType==1"></channelList>-->
      </div>
      <div class="agent-set-btn">
        <div class="reset-btn" @click="reset">重置</div>
        <div class="yes-btn" @click="toQuery">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
  import launchtypecom from '../components/launchReport/launch-area-type.vue'
  import launchOsList from '../components/launchReport/launch-os-List.vue'
  import launchList from '../components/launchReport/launch-area-list.vue'
  import dataRepairList from '../components/launchReport/data-repair-list.vue'
  import httpRequest from '../utils/httpRequest.js'
  import commonMethod from '../utils/commonMethod.js'
  import {
    Toast
  } from 'mint-ui'
  export default {
    components: {
      launchtypecom,
      launchOsList,
      launchList,
      dataRepairList
    },
    computed: {
      nowos: function () {
        return this.$store.state.launchAreaStore.nowos;
      },
      nowApp: function () {
        return this.$store.state.launchAreaStore.nowApp;
      },
      osData: function () {
        return this.$store.state.launchAreaStore.os;
      },
      appData: function () {
        return this.$store.state.launchAreaStore.appData;
      },
      launchType: function () {
        return this.$store.state.launchAreaStore.launchType;
      },
      nowSystemId: function () {
        return this.$store.state.basestore.nowgame.system_id;
      },
      currentTypeView: function () {
        var currentTypeView;
        var menu = this.$store.state.launchAreaStore.oldMenu;
        if (this.launchType == 0) {
          currentTypeView = "launchOsList"
        } else if (this.launchType == 1) {
          if (menu) {
            if (menu.menu_url == "launchReport") {
              currentTypeView = "launchList";
            } else if (menu.menu_url == "dataRepair" || menu.menu_url == "gameReport") {
              currentTypeView = "dataRepairList";
            }
          }
        }
        return currentTypeView;
      }
    },
    methods: {
      returnMain: function () {
        this.$router.back();
      },
      reset: function () {
        if (this.launchType == 0) {
          this.$store.dispatch("selectOs", this.osData[0]);
        } else if (this.launchType == 1) {
          this.$store.dispatch("setAppData", this.appData);
        }
      },
      toQuery: function () {
        this.$router.back();
      }
    }
  }

</script>
<style lang="scss" rel='stylesheet/scss'>
  .agent-content {
    width: 100%;
    position: absolute;
    top: 1.3rem;
    left: 0;
    margin-bottom: 1.3rem;
    overflow-y: auto;
    .now-agent-group {
      height: 1rem;
      line-height: 1rem;
      padding-left: 0.53rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      .now-agent-head {
        color: #0099FF;
      }
      .now-agent-text {
        margin-left: 0.53rem;
        /*max-width: 4rem;*/
      }
    }
  }

  .agent-set-btn {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: justify;
  }

  .reset-btn {
    width: 50%;
    height: 1.3rem;
    line-height: 1.3rem;
    color: #FFF;
    background-color: #BCBCBC;
    /*border:0;*/
    text-align: center;
    font-size: 0.34rem;
  }

  .reset-btn:active {
    background-color: #A7A7A7;
  }

  .yes-btn {
    width: 50%;
    height: 1.3rem;
    line-height: 1.3rem;
    color: #FFF;
    background-color: #FC9153;
    /*border:0;*/
    text-align: center;
    font-size: 0.34rem;
  }

  .yes-btn:active {
    background-color: #dc8553;
  }

</style>
