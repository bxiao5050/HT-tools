<template>
  <div id="login" :style="'background:url('+background+') center 0 no-repeat'">
    <div class="login-box">
      <h2>整合分析系统</h2>
      <br>
      <div class="input-group mb-3">
        <span class="input-group-addon">
          <i class="icon-login-username"></i>
        </span>
        <input id="login-username" type="text" class="form-control" :placeholder="language.username">
      </div>
      <div class="input-group mb-4">
        <span class="input-group-addon">
          <i class="icon-login-password"></i>
        </span>
        <input id="login-password" type="password" class="form-control" @keyup.enter="toLogin" :placeholder="language.password">
      </div>
      <button class="btn btn-secondary" @click="toLogin">{{language.submit}}</button>
    </div>
    <change class="change"></change>
  </div>
</template>

<script>
  import change from 'src/views/system/language/change'
  import md5 from 'js-md5'

  export default {
    // mounted() {
    //   let username = 'jiawei.liu',
    //     password = '123@abc';
    //   if (!username || !password) {
    //     Utils.Notification.error({
    //       message: '请输入用户名和密码'
    //     });
    //   } else {
    //     this.$store.dispatch('Login/data', {
    //       userName: username,
    //       password: md5(password),
    //       language: this.$store.state.Language.cur
    //     })
    //   }
    // },
    components: {
      change
    },
    computed: {
      language() {
        return this.$store.getters['Language/data'].login
      }
    },
    data: function () {
      return {
        background: require('src/assets/login/bg1.jpg')
      }
    },
    methods: {
      toLogin() {
        let username = self['login-username'].value,
          password = self['login-password'].value;
        if (!username || !password) {
          Utils.Notification.error({
            message: '请输入用户名和密码'
          });
        } else {
          this.$store.dispatch('Login/data', {
            userName: username,
            password: md5(password),
            language: this.$store.state.Language.cur
          })
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  .change {
    position: absolute;
    top: 55px;
    right: 4vw;
  }
</style>