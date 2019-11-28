<template>
  <div>
    <!--当前系统为发行游戏(3)时,显示渠道信息，渠道层级为3层-->
    <div class="channel-list">
      <!--<scroller ref="my_scroller" style="height: 12rem;top:3.2rem;">-->
      <!--返回-->
      <div class="channel-item px1-b" @click="channelReturn" v-if="channelState!=1&&!channelSearchText">
        <i class="iconfont header-icon">&#xe600;</i>
        <span class="channel-text">返回{{backLevel.CHANNEL_NAME?"["+backLevel.CHANNEL_NAME+"]":""}}<span/>
      </div>
       <!--全部汇总-->
      <div class="channel-item px1-b" @click="allTotal" v-if="channelState==2&&!channelSearchText" :class="{check:nowChannel.CHANNEL_ID==firstChannel.CHANNEL_ID}">
        <i class="iconfont header-icon">&#xe6b8;</i>
        <span class="channel-text">全部汇总</span>
        <i class="iconfont footer-icon" v-if="nowChannel.CHANNEL_ID==firstChannel.CHANNEL_ID">&#xe664;</i>
      </div>
      <!--全部子区-->
      <div class="channel-item px1-b" @click="allKitArea" v-if="channelState==3&&!channelSearchText" :class="{check:nowChannel.CHANNEL_ID==secondChannel.CHANNEL_ID}">
        <i class="iconfont header-icon">&#xe6b8;</i>
        <span class="channel-text">全部子区</span>
        <i class="iconfont footer-icon" v-if="nowChannel.CHANNEL_ID==secondChannel.CHANNEL_ID">&#xe664;</i>
      </div>
      <!--默认的代理商主体-->
      <div class="channel-item px1-b" v-for="item in channelList" @click="selectChannel(item)" v-if="!channelSearchText" :class="{check:nowChannel.CHANNEL_ID==item.CHANNEL_ID}">
        <i class="iconfont header-icon">&#xe607;</i>
        <span class="channel-text">{{item.CHANNEL_NAME}}</span>
        <i class="iconfont footer-icon" v-if="channelState==1||channelState==2">&#xe694;</i>
        <i class="iconfont footer-icon" v-if="channelState==3&&nowChannel.CHANNEL_ID==item.CHANNEL_ID">&#xe664;</i>
      </div>
      <!--查询时显示的结果-->
      <div class="channel-item px1-b" v-for="item in searchResult" @click="selectChannel(item)" v-if="channelSearchText" :class="{check:nowChannel.CHANNEL_ID==item.CHANNEL_ID}">
        <i class="iconfont header-icon">&#xe607;</i>
        <span class="channel-text">{{item.CHANNEL_NAME}}</span>
        <i class="iconfont footer-icon" v-if="channelState==1||channelState==2">&#xe694;</i>
        <i class="iconfont footer-icon" v-if="channelState==3&&nowChannel.CHANNEL_ID==item.CHANNEL_ID">&#xe664;</i>
      </div>
      <!--</scroller>-->
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import httpRequest from '../utils/httpRequest.js'
  import commonMethod from '../utils/commonMethod.js'
  import {
    Toast
  } from 'mint-ui'
  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters(["channels", "nowChannel", "channelList", "firstChannel", "secondChannel", "channelState",
        "channelSearchText"
      ]),
      searchResult: function () {
        return this.$store.state.channelstore.searchResult;
      },
      backLevel: function () {
        if (this.channelState == 2) {
          return this.firstChannel;
        } else if (this.channelState == 3) {
          return this.secondChannel;
        }
      }
    },

    methods: {
      allTotal: function () {
        var now = this.nowChannel;
        for (var i = 0; i < this.channels.length; i++) {
          console.log(this.channels[i].CHANNEL_ID == this.nowChannel.CHANNEL_PID)
          if (this.nowChannel.CHANNEL_PID != 0 && this.channels[i].CHANNEL_ID == this.nowChannel.CHANNEL_PID) {
            now = this.channels[i];
          }
        }
        console.log(now)

        this.$store.dispatch("setNowChannel", now);
      },
      allKitArea: function () {
        var backChannel = {};
        backChannel = this.secondChannel;
        this.$store.dispatch("setNowChannel", backChannel);
        // this.$store.dispatch("setNowChannelParam", this.channels);
      },
      channelReturn: function () {
        var backChannel = {};
        var list = [];
        if (this.channelState == 2) {
          backChannel = this.firstChannel;
          this.$store.dispatch("setFirstChannel", backChannel);
        } else if (this.channelState == 3) {
          backChannel = this.secondChannel;
          this.$store.dispatch("setSecondChannel", backChannel);
        }
        if (backChannel.CHANNEL_PID == 0) {
          list = this.channels;
        } else {
          for (var i = 0; i < this.channels.length; i++) {
            if (backChannel.CHANNEL_PID == this.channels[i].CHANNEL_ID) {
              list = this.channels[i].childNode;
            }
          }
        }

        if (this.channelState == 2) {
          this.$store.dispatch("setNowChannel", this.firstChannel);
          this.$store.dispatch("setChannelList", list);
          this.$store.dispatch("channelStateAdd", -1);
        } else if (this.channelState == 3) {
          this.$store.dispatch("setNowChannel", this.secondChannel);
          this.$store.dispatch("setChannelList", list);
          this.$store.dispatch("channelStateAdd", -1);
        }
      },
      selectChannel: function (item) {
        this.$store.dispatch("clearChannelSearchInfo");
        
        this.$store.dispatch("setNowChannel", item);

        if (this.channelState == 1) {
          this.$store.dispatch("setFirstChannel", item);
          this.$store.dispatch("setChannelList", item.childNode);
          this.$store.dispatch("channelStateAdd", 1);
        } else if (this.channelState == 2) {
          this.$store.dispatch("setSecondChannel", item);
          this.$store.dispatch("setChannelList", item.childNode);
          this.$store.dispatch("channelStateAdd", 1);
        } else if (this.channelState == 3) {

        }

      }
    }
  }

</script>
<style lang="scss" rel='stylesheet/scss' scoped>
  .null-channel {
    width: 100%;
    text-align: center;
  }
  
  .channel-list {
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
    .channel-item {
      width: 100%;
      height: 1.3rem;
      line-height: 1.3rem;
      padding: 0.13rem 0.53rem;
      .header-icon {
        float: left;
      }
      .channel-text {
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
    .channel-item:active {
      background-color: #E8E8E8;
    }
  }
  
  .check {
    color: #716CA8;
    background: #F0EFFA;
    font-weight: bold;
  }

</style>
