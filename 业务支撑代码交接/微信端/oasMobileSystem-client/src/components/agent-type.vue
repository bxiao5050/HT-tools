<template>
  <div class="agent-type-group">
    <div class="search-group">
      <v-touch class="search-control px1">
        <input class="search-input" type="text" v-model="searchText" placeholder="搜索代理商、渠道" />
        <i class="iconfont search-icon">&#xe6a6;</i>
      </v-touch>
    </div>
    <div class="type-group">
      <v-touch class="agent-type">
        <v-touch tag="div" class="agent-type-item" :class="{'checked':agentType==0}" @tap="clickAgentType(0)">代理商</v-touch>
        <v-touch tag="div" class="agent-type-item" :class="{'checked':agentType==1,'is-web':systemId==1}" @tap="clickAgentType(1)">渠道</v-touch>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        searchText: '',
      }
    },
    computed: {
      agentType: function () {
        return this.$store.state.agentstore.agentType;
      },
      systemId: function () {
        return this.$store.state.basestore.nowgame.system_id;
      }
    },
    created(){
      this.$store.commit("setClearSearchText",this.clearSearchText);
    },
    methods: {
      clickAgentType: function (type) {
        this.$store.dispatch("setAgentType", type);
      },
      clearSearchText:function(){
        this.searchText="";
      }
    },
    watch: {
      searchText: function (newVal, oldVal) {
        if (this.agentType == 0) {
          this.$store.dispatch("agentSearch", this.searchText);
        } else if (this.agentType == 1) {
          this.$store.dispatch("channelSearch", this.searchText);
        }
      }
    }
  }

</script>
<style lang="scss">
  .agent-type-group {
    width: 100%;
    padding-bottom: 0.2rem;
    .search-group {
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      .search-control {
        width: 95%;
        height: 0.8rem;
        line-height: 0.8rem;
        margin: 0 auto;
        .search-input {
          width: 100%;
          height: 0.8rem;
          line-height: normal;
          /*border: 1px solid #BCBCBC;*/
          border-radius: 5px;
          text-align: center;
          padding-right: 0.8rem;
          float: left;
        }
        .search-icon {
          margin-left: -30px;
          float: left;
        }
      }
    }
    .type-group {
      width: 100%;
      .agent-type {
        width: 90%;
        height: 1.06rem;
        line-height: 1.06rem;
        margin-left: 5%;
        /*padding:0 0.39rem;*/
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: justify;
        text-align: center;
        border-bottom: 1px solid #E2E2E2;
        .agent-type-item {
          -webkit-box-flex: 1;
          text-align: center;
          font-size: 0.35rem;
          background-color: #FFF;
          border: 1px solid #E2E2E2;
        }
        .agent-type-item.is-web {
          visibility: hidden;
        }
        .agent-type-item.checked {
          /*border-bottom: 1px solid #FDBC87;*/
          color: #FFF;
          background-color: #716CA8;
          font-weight: bold;
        }
      }
    }
  }

</style>
