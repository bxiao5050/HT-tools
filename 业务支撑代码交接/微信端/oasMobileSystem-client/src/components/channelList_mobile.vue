<template>
  <div>
    <!--当前系统为手游(2)时,显示渠道信息，渠道层级为2层-->
    <div class="channel-list">
      <!--返回-->
      <div class="channel-item px1-b" @click="channelReturn" v-if="channelState!=1&&!channelSearchText">
        <i class="iconfont header-icon">&#xe600;</i>
        <span class="channel-text">返回[{{firstChannel.CHANNEL_NAME}}]<span/>
      </div>
       <!--全部渠道-->
      <div class="channel-item px1-b" @click="allTotal" v-if="channelState==2&&!channelSearchText" :class="{check:nowChannel.CHANNEL_ID==firstChannel.CHANNEL_ID}">
        <i class="iconfont header-icon">&#xe6b8;</i>
        <span class="channel-text">全部渠道</span>
        <i class="iconfont footer-icon" v-if="nowChannel.CHANNEL_ID==firstChannel.CHANNEL_ID">&#xe664;</i>
      </div>
      <!--默认的代理商主体-->
      <div class="channel-item px1-b" v-for="item in channelList" @click="selectChannel(item)" v-if="!channelSearchText" :class="{check:nowChannel.CHANNEL_ID==item.CHANNEL_ID}">
        <i class="iconfont header-icon">&#xe607;</i>
        <span class="channel-text">{{item.CHANNEL_NAME}}</span>
        <i class="iconfont footer-icon" v-if="channelState==1">&#xe694;</i>
        <i class="iconfont footer-icon" v-if="channelState==2&&nowChannel.CHANNEL_ID==item.CHANNEL_ID">&#xe664;</i>
      </div>
      <!--查询时显示的结果-->
      <div class="channel-item px1-b" v-for="item in searchResult" @click="selectChannel(item)" v-if="channelSearchText" :class="{check:nowChannel.CHANNEL_ID==item.CHANNEL_ID}">
        <i class="iconfont header-icon">&#xe607;</i>
        <span class="channel-text">{{item.CHANNEL_NAME}}</span>
        <i class="iconfont footer-icon" v-if="channelState==1">&#xe694;</i>
        <i class="iconfont footer-icon" v-if="channelState==2&&nowChannel.CHANNEL_ID==item.CHANNEL_ID">&#xe664;</i>
      </div>
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
      ...mapGetters(["channels", "nowChannel", "channelList", "channelState", "firstChannel",
        "channelSearchText"
      ]),
      searchResult: function () {
        return this.$store.state.channelstore.searchResult;
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
      channelReturn: function () {
        this.$store.dispatch("setNowChannel", this.firstChannel);
        this.$store.dispatch("setChannelList", this.channels);
        this.$store.dispatch("channelStateAdd", -1);
      },
      selectChannel: function (item) {
        this.$store.dispatch("clearChannelSearchInfo");

        this.$store.dispatch("setNowChannel", item);

        if (this.channelState == 1) {
          this.$store.dispatch("setFirstChannel", item);
          this.$store.dispatch("setChannelList", item.childNode);
          this.$store.dispatch("channelStateAdd", 1);
        } else if (this.channelState == 2) {

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
    background:#F0EFFA;
    font-weight: bold;
  }

</style>
