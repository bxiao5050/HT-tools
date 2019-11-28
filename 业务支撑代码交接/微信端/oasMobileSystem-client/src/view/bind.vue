<template>
  <div class="bind-page">
    <header>
      <div class="header">
        <div class="header-left"></div>
        <h1 class="header-title">绑定帐号</h1>
        <div class="header-right"></div>
      </div>
    </header>
    <section class="page-body">
      <div class="label">
        <i class="iconfont">&#xe624;</i>
        <input type="text" placeholder="业务支撑平台帐号" maxlength="36" class="px1-b" v-model="username">
      </div>
      <div class="label">
        <i class="iconfont">&#xe66e;</i>
        <input type="password" placeholder="业务支撑平台密码" maxlength="36" class="px1-b" v-model="password">
      </div>
      <div class="label">
        <i class="iconfont">&#xe6c0;</i>
        <input type="password" placeholder="设置安全码(4位数字)" pattern="\d*" maxlength="36" class="px1-b" v-model="safecode">
      </div>
      <div class="label">
        <i class="iconfont">&#xe6c0;</i>
        <input type="password" placeholder="确认安全码" pattern="\d*" maxlength="36" class="px1-b" v-model="confirmSafecode">
      </div>
      <div class="label">
        <v-touch tag="a" class="button" v-on:tap="bindWeChat">绑定业务支撑平台号</v-touch>
      </div>
      <!--<div class="label">
        <a class="link">忘记密码?</a>
      </div>-->
      <div class="tips">
        <p>Tips：域账号与微信帐号绑定后，仅用输入安全码即可快速登录！</p>
      </div>
      <!--<div class="logo"></div>-->
    </section>
  </div>
</template>
<script>
  import httpRequest from '../utils/httpRequest.js';
  import commonMethod from '../utils/commonMethod.js'
  import {
    Toast
  } from 'mint-ui';
  export default {
    replace: true,
    data: function () {
      return {
        username: '',
        password: '',
        safecode: '',
        confirmSafecode: ''
      }
    },
    components: {},
    mounted: function () {
      var access_token = commonMethod.getUrlToken();
      if (!access_token) {
        Toast("未获取到用户token,请重新进入");
      } else {
        this.$store.dispatch('setAccessToken', access_token);
      }
    },
    watch: {
      safecode: function (newVal, oldVal) {
        if (newVal.toString().length > 4) {
          this.safecode = oldVal;
        }
        if(!this.checknum(newVal)){
          this.safecode = oldVal;
        }
      },
      confirmSafecode: function (newVal, oldVal) {
        if (newVal.toString().length > 4) {
          this.confirmSafecode = oldVal;
        }
        if(!this.checknum(newVal)){
          this.confirmSafecode = oldVal;
        }
      }
    },
    methods: {
      checknum:function(code) {　　
        if (isNaN(code)) {　　
          return false;　　
        }
        return true;
      },
      bindWeChat: function () {
        if (!this.username || !this.password) {
          Toast("用户名或密码为空，请重新输入!");
          return;
        }
        if (this.safecode.length != 4) {
          Toast("安全码长度错误，必须为4位，请重新输入!");
          return;
        }
        if (this.safecode != this.confirmSafecode) {
          Toast("确认安全码不一致，请重新输入!");
          return;
        }

        var info = {
          username: this.username,
          password: this.password,
          safecode: this.safecode
        }
        httpRequest.bindWeChat(info, (data) => {
          if (data.state == "successed") {
            if (data.result.code && data.result.code == 102) {
              Toast({
                message: data.result.msg,
                duration: 10000
              });
              return;
            } else {
              Toast("帐号绑定成功");
              var userinfo = {
                nick_name: data.result.userName,
                avatar_url: data.result.imageHead,
                accessToken: data.result.accessToken
              }
              this.$store.dispatch("setUserInfo", userinfo);
              this.$router.push({
                name: "game"
              });
            }
          } else {
            Toast(data.result.errorMsg);
          }
        })
      }
    }
  }

</script>
