<template>
  <div class="bind-page">
    <header>
      <div class="header">
        <div class="header-left" @click="goBack">返回</div>
        <h1 class="header-title">重置安全码</h1>
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
        <input type="password" placeholder="新安全码" pattern="\d*" maxlength="36" class="px1-b" v-model="safecode">
      </div>
      <div class="label">
        <i class="iconfont">&#xe6c0;</i>
        <input type="password" placeholder="确认安全码" pattern="\d*" maxlength="36" class="px1-b" v-model="confirmSafecode">
      </div>
      <div class="label">
        <a class="button" @click="resetPwd">重置安全码</a>
      </div>
    </section>
  </div>
</template>
<script>
  import httpRequest from '../utils/httpRequest.js';
  import commonMethod from '../utils/commonMethod.js'
  import {Toast} from 'mint-ui';
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
    watch: {
      safecode: function (newVal, oldVal) {
        if (newVal.toString().length > 4) {
          this.safecode = oldVal;
        }
      },
      confirmSafecode: function (newVal, oldVal) {
        if (newVal.toString().length > 4) {
          this.confirmSafecode = oldVal;
        }
      }
    },
    methods: {
      resetPwd: function () {
        if (this.safecode != this.confirmSafecode) {
          Toast("安全码不一致，请重新输入!");
          return;
        } else {
          if (this.username && this.password && this.safecode) {
            var info = {
              username: this.username,
              password: this.password,
              safecode: this.safecode
            }
            httpRequest.resetCode(info, (data) => {
              if (data.state == "successed") {
                Toast("安全码修改成功");
                this.$router.push({name:"login",query: this.$route.query});
              } else {
                Toast(data.result.errorMsg);
              }
            })
          }
        }
      },
      goBack: function () {
          this.$router.back();
      }
    }
  }

</script>