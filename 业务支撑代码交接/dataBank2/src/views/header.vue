<template>
  <div class="header">
    <div class="logo">
      <!-- <img :src="imgs.logo"> -->
      <h5>业务支撑平台</h5>
      <i class="icon-toggle-sm" @click="toggleSm"></i>
    </div>
    <div class="item-lr">
      <div class="first-null-item"></div>
      <div class="items">
        <i class="icon icon-header-language"></i>
        <change :config="{className: 'headerChange'}"></change>
      </div>
      <!-- <div class="items" @mouseover="showMessageList=true" @mouseout="showMessageList=false" @click="showMessageList=!showMessageList">
        <i class="icon icon-header-message"></i>
        <span>
          {{$t('header.msg')}}
          <span class="badge badge-success">3</span>
        </span>
        <div class="message-list" v-show="showMessageList">
           <div class="message-item" v-if="messageList.length==0">
            <span>暂无消息</span>
          </div>
          <div class="message-item" v-for="(item,index) in messageList" :key="index">
            <span>消息通知</span>
            <div class="message-time">2017-01-01 10:00:00</div>
          </div>
        </div>
      </div> -->
      <div class="items user-avatar">
        <i class="icon icon-login-username"></i>
        <span>{{userInfo.userName}}</span>
      </div>
      <div class="items" @click="exitSystem">
        <i class="icon icon-header-logout"></i>
        <span>{{$t('header.logout')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import change from 'src/views/system/language/change'
import api from 'src/services/api'
export default {
  components: {
    change
  },
  data: function() {
    return {
      userAvater: false,
      imgs: {
        logo: require('src/assets/header/7road-logo.png')
        // userHead: require('src/assets/header/uh.png')
      },
      showMessageList: false,
      messageList: []
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.common.userInfo
    }
  },
  methods: {
    userAvaterToggle() {
      this.userAvater = !this.userAvater
    },
    userAvaterEnter(el, done) {
      TweenMax.to(el, 0.3, {
        opacity: 1,
        y: 42,
        onComplete: done
      })
    },
    userAvaterLeave(el, done) {
      TweenMax.to(el, 0.3, {
        opacity: 0,
        y: 0,
        onComplete: done
      })
    },
    toggleSm() {
      this.$store.commit('switchCompactStatus')
    },
    exitSystem() {
      Utils.MessageBox.confirm('确认退出系统?', '提示').then(() => {
        api.user.logoutSystem({})
        setTimeout(()=>{
          this.$router.go({path:'login'})
        })
        // this.$store.commit('initUserInfo', null)
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.header {
  z-index: 2;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: $headerColor;
  height: $headerHeight;
  background-color: $headerBackground;

  .logo {
    display: flex;
    align-items: center;
    margin-left: 3vw;
    margin-right: 5vw;
    height: $headerHeight *0.8;
    h5{
      font-weight: 600;
    }
    img {
      // height: 100%;
    }
    .icon-toggle-sm {
      cursor: pointer;
      color: $headerBorderColor;
      font-size: 22px;
      margin: 1px 16px 0 26px;
    }
  }
  .item-lr {
    display: flex;
    align-items: center;
    margin-right: 0;
    height: $headerHeight *0.85;
    line-height: $headerHeight;
    font-size: 15px;
    margin-left: auto;
    .first-null-item {
      height: $headerHeight;
      border-right: 1px solid #020202;
    }
    .items {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      padding-right: 15px;
      padding-left: 15px;
      cursor: pointer;
      position: relative;
      height: $headerHeight;
      border-right: 1px solid #020202;
      border-left: 1px solid #323232; //$headerItemHoverBgcolor;
      &:first-child {
        // padding-right: 106px;
      }
      &:nth-child(2) {
        padding-right: 106px;
      }
      &:last-child {
        padding-right: 30px;
      }
      &:hover {
        background-color: $headerItemHoverBgcolor;
      }
      .badge {
        margin-left: 3px;
      }
      .message-list {
        position: absolute;
        background-color: $headerItemHoverBgcolor;
        border: 1px solid $headerBorderColor;
        top: $headerHeight;
        left: 50%;
        width: 206px;
        margin-left: -103px;
        max-height: 250px;
        overflow-x: hidden;
        overflow-y: auto;
        .message-item {
          line-height: 26px;
          padding: 6px 10px;
          .message-content {
            width: 100%;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .message-time {
            font-size: 12px;
            color: $headerColor;
          }
          &:hover {
            background: $headerBackground;
          }
        }
      }
    }
    .icon {
      color: $headerBorderColor;
      font-size: 24px;
      margin-right: 6px;
      display: flex;

      &.icon-header-language {
        z-index: 10;
        margin-right: 0;
      }
      &.icon-header-logout {
        margin-top: 1px;
        font-size: 27px;
      }
    }
    .user-avatar {
      img {
        height: $headerHeight *0.8;
        width: $headerHeight *0.8;
        border-radius: 50%;
      }
      .userAvater {
        top: 0;
        left: 0;
        position: absolute;
        transform: matrix(1, 0, 0, 1, -85, 0);
        width: 228px;
        height: 190px;
        background: #000;
        opacity: 0;
      }
    }
  }
}
</style>