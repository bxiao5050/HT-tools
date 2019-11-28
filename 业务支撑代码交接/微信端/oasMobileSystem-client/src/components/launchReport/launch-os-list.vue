<template>
  <div>
    <v-touch class="agent-list">
      <!--默认的代理商主体-->
      <v-touch tag="div" class="agent-item px1-b" v-for="item in osSource" @tap="selectOs(item)" :class="{check:nowos.id==item.id}">
        <i class="iconfont header-icon">&#xe607;</i>
        <span class="agent-text">{{item.name}}</span>
        <i class="iconfont footer-icon">&#xe664;</i>
      </v-touch>
  </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    Toast
  } from 'mint-ui'
  export default {
    data() {
      return {}
    },
    computed: {
      osSource: function () {
        return this.$store.state.launchAreaStore.os
      },
      nowos: function () {
        return this.$store.state.launchAreaStore.nowos
      }
    },

    methods: {
        selectOs:function(item){
            this.$store.dispatch("selectOs",item);
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
    background: #F0EFFA;
    font-weight: bold;
  }

</style>
