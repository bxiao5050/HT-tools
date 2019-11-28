<template>
  <div class="login-page">
    <section class="page-body">
      <h1>请输入安全码</h1>
      <div class="pwd-box px1">
        <input autofocus type="tel" maxlength="4" class="pwd-input " id="pwd-input" v-model="code" @keyup.delete="deleteCode">
        <div class="fake-box">
          <input type="password" class="px1-r" readonly="" v-model="code_1">
          <input type="password" class="px1-r" readonly="" v-model="code_2">
          <input type="password" class="px1-r" readonly="" v-model="code_3">
          <input type="password" readonly="" v-model="code_4">
        </div>
      </div>
      <div class="label">
        <v-touch tag="a" v-on:tap="fogetSafeCode">忘记安全码?</v-touch>
      </div>
      <div class="tips">
        <p>Tips：</p>
        <p>1、如遇数据异常，请尝试点击“清理缓存”</p>
        <p>2、如遇数据延迟，请耐心等待，部分游戏6点前计算完成，其它将在9点前全部计算完成。</p>
      </div>
      <!--<div class="logo"></div>-->
    </section>
  </div>
</template>
<script>
  import httpRequest from '../utils/httpRequest.js'
  import commonMethod from '../utils/commonMethod.js'
  import {
    Toast
  } from 'mint-ui';
  export default {
    replace: true,
    data() {
      return {
        code: '',
        code_1: '',
        code_2: '',
        code_3: '',
        code_4: ''
      }
    },
    watch: {
      code: function (newValue, oldValue) {
        newValue = newValue.trim();
        for (var i = 0, len = newValue.length; i < len; i++) {
          if (i == 0) {
            this.code_1 = newValue[0]
          }
          if (i == 1) {
            this.code_2 = newValue[1]
          }
          if (i == 2) {
            this.code_3 = newValue[2]
          }
          if (i == 3) {
            this.code_4 = newValue[3]
          }
        }

        if (len == 4) {
          // todo check
          document.getElementById('pwd-input').blur();
          this.loginSys();
        }


      }
    },
    mounted: function () {
      var access_token = commonMethod.getUrlToken();
      if (!access_token) {
        Toast("未获取到用户token,请重新进入");
      } else {
        this.$store.dispatch('setAccessToken', access_token);
      }
    },
    methods: {
      deleteCode() {
        this.code = "";
        this.code_1 = "";
        this.code_2 = "";
        this.code_3 = "";
        this.code_4 = "";
      },
      loginSys: function () {
        var params = {
          safecode: this.code
        }
        httpRequest.loginSys(params, (data) => {
          if (data.state == "successed") {
            Toast('登陆成功!');
            var userinfo = {
              nick_name: data.result.userName,
              avatar_url: data.result.imageHead,
              accessToken: data.result.accessToken
            }
            this.$store.dispatch("setUserInfo", userinfo);
            this.$router.push({
              name: "game"
            });
          } else {
            Toast(data.result.errorMsg);
            this.deleteCode();
          }
        })
      },
      fogetSafeCode: function () {
        this.$router.push({
          name: "foget",
          query: this.$route.query
        });
      }
    },
    components: {}
  }

</script>
