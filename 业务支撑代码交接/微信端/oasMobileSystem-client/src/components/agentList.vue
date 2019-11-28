<template>
  <div>
    <v-touch class="agent-list">
      <!--<scroller ref="my_scroller" style="height: 12rem;top:3.2rem;">-->
        <!--返回-->
        <v-touch tag="div" class="agent-item px1-b" @tap="agentReturn" v-if="agentState!=1&&!agentSearchText">
          <i class="iconfont header-icon">&#xe600;</i>
          <span class="agent-text">返回{{backLevel.AGENT_NAME?"["+backLevel.AGENT_NAME+"]":""}}<span/>
      </v-touch>
       <!--全部汇总-->
      <v-touch tag="div" class="agent-item px1-b" @tap="allTotal" v-if="agentState==2&&!agentSearchText" :class="{check:nowAgent.AGENT_ID==firstAgent.AGENT_ID}">
        <i class="iconfont header-icon">&#xe6b8;</i>
        <span class="agent-text">全部汇总</span>
          <i class="iconfont footer-icon" v-if="nowAgent.AGENT_ID==firstAgent.AGENT_ID">&#xe664;</i>
        </v-touch>
        <!--全部子区-->
        <v-touch tag="div" class="agent-item px1-b" @tap="allKitArea" v-if="agentState==3&&!agentSearchText" :class="{check:nowAgent.AGENT_ID==secondAgent.AGENT_ID}">
          <i class="iconfont header-icon">&#xe6b8;</i>
          <span class="agent-text">全部子区</span>
          <i class="iconfont footer-icon" v-if="nowAgent.AGENT_ID==secondAgent.AGENT_ID">&#xe664;</i>
        </v-touch>

        <!--默认的代理商主体-->
        <v-touch tag="div" class="agent-item px1-b" v-for="item in agents" @tap="selectAgent(item)" v-if="!agentSearchText" :class="{check:nowAgent.AGENT_ID==item.AGENT_ID}">
          <i class="iconfont header-icon">&#xe607;</i>
          <span class="agent-text">{{item.AGENT_NAME}}</span>
          <i class="iconfont footer-icon" v-if="agentState==1||agentState==2">&#xe694;</i>
          <i class="iconfont footer-icon" v-if="agentState==3&&nowAgent.AGENT_ID==item.AGENT_ID">&#xe664;</i>
        </v-touch>
        <!--查询时显示的结果-->
        <v-touch tag="div" class="agent-item px1-b" v-for="item in searchResult" @tap="selectAgent(item)" v-if="agentSearchText" :class="{check:nowAgent.AGENT_ID==item.AGENT_ID}">
          <i class="iconfont header-icon">&#xe607;</i>
          <span class="agent-text">{{item.AGENT_NAME}}</span>
          <i class="iconfont footer-icon" v-if="agentState==1||agentState==2">&#xe694;</i>
          <i class="iconfont footer-icon" v-if="agentState==3&&nowAgent.AGENT_ID==item.AGENT_ID">&#xe664;</i>
        </v-touch>
      <!--</scroller>-->
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import httpRequest from '../utils/httpRequest.js'
  import commonMethod from '../utils/commonMethod.js'
  import {Toast} from 'mint-ui'
  export default {
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters(["agents", "nowAgent", "firstAgent", "secondAgent", "agentState", "agentSearchText", "searchResult"]),
      backLevel: function () {
        if (this.agentState == 2) {
          return this.firstAgent;
        } else if (this.agentState == 3) {
          return this.secondAgent;
        }
      }
    },
   
    methods: {
      allTotal: function () {
        var backAgent = {};
        backAgent = this.firstAgent;
        this.$store.dispatch("setFirstAgent", backAgent);
        this.$store.dispatch("setNowAgent", backAgent);
        this.$store.dispatch("setNowAgentParam", this.agents);
      },
      allKitArea: function () {
        var backAgent = {};
        backAgent = this.secondAgent;
        this.$store.dispatch("setSecondAgent", backAgent);
        this.$store.dispatch("setNowAgent", backAgent);
        // this.$store.dispatch("setNowAgentParam", this.agents);
        this.$store.dispatch("setNowAgentParam", [backAgent]);
      },
      agentReturn: function () {
        var backAgent = {};
        if (this.agentState == 2) {
          backAgent = this.firstAgent;
          this.$store.dispatch("setFirstAgent", backAgent);
        } else if (this.agentState == 3) {
          backAgent = this.secondAgent;
          this.$store.dispatch("setSecondAgent", backAgent);
        }
        this.$store.dispatch("setNowAgent", backAgent);
        if (this.agentState == 2) {
          this.$store.dispatch("setNowAgentParam", this.agents);
        }
        else if(this.agentState == 3){
          this.$store.dispatch("setNowAgentParam", [backAgent]);
        }
        // this.$store.dispatch("setNowAgentParam", this.agents);
        this.getChildrenAgent(backAgent.AGENT_PID, (data) => {
          this.$store.dispatch("setAgents", data);
          this.$store.dispatch("agentStateAdd",-1);
        });
      },
      selectAgent: function (item) {
        this.$store.dispatch("clearAgentSearchInfo");
        this.$store.dispatch("setNowAgent", item);
        if (this.agentState == 1) {
          this.$store.dispatch("setFirstAgent", item);
          this.getChildrenAgent(item.AGENT_ID, (data) => {
            this.$store.dispatch("setAgents", data);
            this.$store.dispatch("setNowAgentParam", this.agents);
            this.$store.dispatch("agentStateAdd",1);
          });
        } else if (this.agentState == 2) {
          this.$store.dispatch("setSecondAgent", item);
          this.getChildrenAgent(item.AGENT_ID, (data) => {
            this.$store.dispatch("setAgents", data);
            // this.$store.dispatch("setNowAgentParam", this.agents);
            this.$store.dispatch("setNowAgentParam", [item]);
            this.$store.dispatch("agentStateAdd",1);
          });
        } else if (this.agentState == 3) {
          this.$store.dispatch("setThirdAgent", item);
          this.$store.dispatch("setNowAgentParam", [item]);
        }

      },
      getChildrenAgent: function (item, callback) {
        var params = {
          system_id: this.$store.state.basestore.nowgame.system_id,
          game_id: this.$store.state.basestore.nowgame.game_id,
          agent_id: item
        }
        commonMethod.judgeIsCacheAgent(params, (data) => {
          if (data.state == "successed") {
            callback(data.result[0]);
          } else {
            Toast(data.result.errorMsg)
          }
        })
      }
    }
  }

</script>
<style lang="scss" rel='stylesheet/scss' scoped>
  .agent-list {
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
    .agent-item {
      width: 100%;
      height: 1.3rem;
      line-height: 1.3rem;
      padding: 0.13rem 0.53rem;
      .header-icon {
        float: left;
      }
      .agent-text {
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
    .agent-item:active {
      background-color: #E8E8E8;
    }
  }
  
  .check {
    color: #716CA8;
    background:#F0EFFA;
    font-weight: bold;
  }

</style>
