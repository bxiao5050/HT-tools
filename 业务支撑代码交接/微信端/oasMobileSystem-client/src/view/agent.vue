<template>
  <div>
    <header>
      <div class="header">
        <!--<div class="header-left" @click="returnMain">返回</div>-->
        <v-touch tag="div" class="header-left" @tap="returnMain">返回</v-touch>
        <h1 class="header-title">选择代理商</h1>
      </div>
    </header>
    <div class="page-body">
      <div class="agent-content">
        <div class="now-agent-group">
          <label class="now-agent-head">代理商:</label>
          <label class="now-agent-text">{{nowAgentName}}</label>
        </div>
        <div class="now-agent-group" v-if="nowSystemId!=1">
          <label class="now-agent-head">当前渠道:</label>
          <label class="now-agent-text">{{nowChannel.CHANNEL_NAME}}</label>
        </div>
        <agenttypecom></agenttypecom>
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
  import agenttypecom from '../components/agent-type'
  import agentList from '../components/agentList'
  // import channelList from '../components/channelList'
  import channelList_mobile from '../components/channelList_mobile'
  import channelList_release from '../components/channelList_release'
  import httpRequest from '../utils/httpRequest.js'
  import commonMethod from '../utils/commonMethod.js'
  import {
    Toast
  } from 'mint-ui'
  export default {
    components: {
      agenttypecom,
      agentList,
      // channelList,
      channelList_mobile,
      channelList_release
    },
    computed: {
      nowAgent: function () {
        return this.$store.state.agentstore.nowAgent;
      },
      nowAgentName: function () {
        var first = commonMethod.isEmptyObject(this.$store.state.agentstore.firstAgent) ? "" : this.$store.state.agentstore
          .firstAgent.AGENT_NAME;
        var second = commonMethod.isEmptyObject(this.$store.state.agentstore.secondAgent) ? "" : "-" + this.$store.state
          .agentstore.secondAgent.AGENT_NAME;
        var third = commonMethod.isEmptyObject(this.$store.state.agentstore.thirdAgent) ? "" : "-" + this.$store.state
          .agentstore.thirdAgent.AGENT_NAME;
        return first + second + third;
      },
      firstAgent: function () {
        return this.$store.state.agentstore.firstAgent;
      },
      secondAgent: function () {
        return this.$store.state.agentstore.secondAgent;
      },
      nowChannel: function () {
        return this.$store.state.channelstore.nowChannel;
      },
      agentType: function () {
        return this.$store.state.agentstore.agentType;
      },
      nowSystemId: function () {
        return this.$store.state.basestore.nowgame.system_id;
      },
      currentTypeView: function () {
        var currentTypeView;
        if (this.agentType == 0) {
          currentTypeView = "agentList"
        } else if (this.agentType == 1) {
          if (this.nowSystemId == 1) {
            // currentTypeView = "channelList"
          } else if (this.nowSystemId == 2) {
            currentTypeView = "channelList_mobile"
          } else if (this.nowSystemId == 3) {
            currentTypeView = "channelList_release"
          } else {
            currentTypeView = "channelList_mobile"
          }
        }
        return currentTypeView;
      }
    },
    methods: {
      returnMain: function () {
        this.clearSearch();
        if (this.nowSystemId == 1) {
          if (this.$store.state.agentstore.nowAgentParam.length <= 0 || commonMethod.isEmptyObject(this.nowAgent)) {
            alert("必须选择代理商");
            return;
          }
        } else {
          if (this.$store.state.agentstore.nowAgentParam.length <= 0 || commonMethod.isEmptyObject(this.nowAgent)) {
            alert("必须选择代理商");
            return;
          }
          if (commonMethod.isEmptyObject(this.nowChannel)) {
            alert("必须选择渠道");
            return;
          }
        }
        this.$router.back();
      },
      reset: function () {
        this.clearSearch();
        if (this.agentType == 0) {
          var params = {
            system_id: this.$store.state.basestore.nowgame.system_id,
            game_id: this.$store.state.basestore.nowgame.game_id,
            agent_id: 0
          }
          commonMethod.judgeIsCacheAgent(params, (data) => {
            if (data.state == "successed") {
              var agents = data.result[0];
              this.$store.dispatch("setAgents", agents);
              this.$store.dispatch("setNowAgent", {});
              this.$store.dispatch("setFirstAgent", {});
              this.$store.dispatch("setNowAgentParam", []);
              this.$store.dispatch("setAgentState", 1);

            } else {
              Toast(data.result.errorMsg)
            }
          })
        } else if (this.agentType == 1) {
          var params = {
            system_id: this.$store.state.basestore.nowgame.system_id,
            game_id: this.$store.state.basestore.nowgame.game_id,
            channel_id: 0
          }
          commonMethod.judgeIsCacheChannel(params, (data) => {
            if (data.state == "successed") {
              var channels = data.result[0];
              this.$store.dispatch("initChannels", channels);
              this.$store.dispatch("setNowChannel", {})
                //  this.$store.dispatch("setFirstChannel", {});
              this.$store.dispatch("setChannelState", 1);
            } else {
              Toast(data.result.errorMsg)
            }
          })
        }
      },
      clearSearch: function () {
        if (this.agentType == 0) {
          this.$store.dispatch("clearAgentSearchInfo");
        } else if (this.agentType == 1) {
          this.$store.dispatch("clearChannelSearchInfo");
        }
      },
      toQuery: function () {
        this.clearSearch();
        if (this.nowSystemId == 1) {
          if (this.$store.state.agentstore.nowAgentParam.length <= 0 || commonMethod.isEmptyObject(this.nowAgent)) {
            alert("必须选择代理商");
            return;
          }
        } else {
          if (this.$store.state.agentstore.nowAgentParam.length <= 0 || commonMethod.isEmptyObject(this.nowAgent)) {
            alert("必须选择代理商");
            return;
          }
          if (commonMethod.isEmptyObject(this.nowChannel)) {
            alert("必须选择渠道");
            return;
          }
        }
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
