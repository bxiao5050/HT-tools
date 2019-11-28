<template>
  <div id="app" v-cloak>
      <router-view></router-view>
    <Loading :isShow="requestCount"></Loading>
  </div>
</template>
<script>
  require('./assets/scss/ALL.scss');
  require('./assets/scss/iconfont/iconfont.css');
  require("mint-ui/lib/style.css")
  window.moment = require('moment')
  import Loading from './components/loading.vue'
  export default {
    components: {
      Loading
    },
    computed: {
      requestCount: function () {
        return this.$store.state.basestore.requestCount;
      }
    }
  }

</script>
<style lang="scss">
  body {
    -webkit-user-select: none;
  }

</style>
