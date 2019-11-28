<template>
  <div id="login" class="login-page" :style="'background:url('+imgs.background+') center no-repeat;background-size:100% 100%;'">
    <div class="login-card" :style="'background:url('+ imgs.backbottom +') center no-repeat'">
      <div class="login-banner">
        <AwesomeSwiper ref="swiper" imageStyle="width:100%;height:100%;border-radius: 5px 0 0 5px;" v-model="activeBanner" :slides="bannerList"></AwesomeSwiper>
        <ul class="banner-dot">
          <li v-for="(item,index) in bannerList" :key="index" :inv="3000" @click="$refs.swiper.slideToIndex(index)" :class="{active:activeBanner==index}"></li>
        </ul>
      </div>
      <div class="login-form">
        <div class="form-header">
          <!-- <img class="form-icon" :src="imgs.icon" alt=""/> -->
          <span class="form-title">整合分析系统</span>
        </div>
        <div class="input-group mb-3 form-item">
          <span class="input-group-addon">
            <i class="icon-login-username"></i>
          </span>
          <input id="login-username" type="text" class="form-control" :placeholder="$t('login.Username')">
        </div>
        <div class="input-group mb-3 form-item">
          <span class="input-group-addon">
            <i class="icon-login-password"></i>
          </span>
          <input id="login-password" type="password" class="form-control" @keyup.enter="toLogin" :placeholder="$t('login.Password')">
        </div>
        <div class="input-group mb-3 form-item">
          <button class="login-btn" @click="toLogin">{{$t('login.submit')}}</button>
        </div>
      </div>
    </div>
    <div class="login-footer">
      <p>业务管理平台</p>
      <p>Copyright&copy;2017 All rights reserved.</p>
    </div>
  </div>
</template>

<script>
import AwesomeSwiper from "src/components/slide/awesome-swiper";
import md5 from "js-md5";
export default {
  components: {
    AwesomeSwiper: AwesomeSwiper
  }
  , data() {
    return {
      imgs: {
        background: require("src/assets/login/login-bg1.jpg"),
        backbottom: require("src/assets/login/back-bottom.png"),
        icon: require("src/assets/login/icon.png")
      },
      bannerList: [{
        src: require("src/assets/login/banner1.png")
      }, {
        src: require("src/assets/login/banner2.png")
      }, {
        src: require("src/assets/login/banner3.png")
      }],
      activeBanner: 0,
      lang: localStorage.lang || "CHS",
      notify: null
    };
  }, methods: {
    changeLang(cur) {
      this.lang = cur
    },
    toLogin() {
      var username, password

      username = document.getElementById('login-username').value
      password = md5(document.getElementById('login-password').value)

      // username = 'jun.li'
      // password = md5('123@abc')

      if (!username || !password) {
        Utils.Notification.error({
          message: "请输入用户名和密码"
        })
      } else {
        this.$store.dispatch("Login/data", {
          userName: username,
          password: password,
          language: this.lang
        })
      }
    }
  }, mounted() {
    // this.toLogin()
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .login-card {
    width: 800px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    color: #333;
    transform: translate(-50%, -50%);
    transition: all 0.5s ease-in-out;
    border-radius: 5px;
    padding-bottom: 5px;
    box-shadow: 5px 6px 50px -5px #000;
    .login-banner {
      width: 400px;
      height: 100%;
      float: left;
      background-color: #fff;
      border-radius: 5px 0 0 5px;
      white-space: nowrap;
      position: relative;
      cursor: -webkit-grab;
      &:active {
        cursor: -webkit-grabbing;
      }
      .banner-img {
        width: 100%;
        height: 100%;
        border-radius: 5px 0 0 5px;
      }
      .banner-dot {
        cursor: pointer;
        position: absolute;
        bottom: -60px;
        left: 50%;
        transform: translateX(-50%);
        li {
          width: 20px;
          float: left;
          color: #7e41ca;
          &.active {
            color: #fff;
          }
        }
      }
    }
    .login-form {
      float: left;
      width: 400px;
      height: 100%;
      background-color: #fff;
      text-align: center;
      box-sizing: border-box;
      padding: 40px 30px;
      border-radius: 0 5px 5px 0;
      .form-header {
        line-height: 40px;
        height: 40px;
        font-size: 25px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .form-icon {
          height: 40px;
          padding: 0 5px;
        }
        .form-title {
          color: #7b41c5;
          padding: 0 5px;
        }
      }
      .form-item {
        margin: 10px 0 20px 0;
        line-height: 40px;
        height: 40px;
      }
      .login-btn {
        background: #007fff;
        color: #fff;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        cursor: pointer;
        border: none;
        width: 100%;
        display: block;
      }
    }
  }
  .login-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 20px;
    background-color: transparent;
    color: rgb(111, 110, 109);
    text-align: center;
    padding-bottom: 20px;
    p {
      margin-bottom: 0.5rem;
    }
  }
  .form-control {
    flex-direction: row;
  }
}
</style>