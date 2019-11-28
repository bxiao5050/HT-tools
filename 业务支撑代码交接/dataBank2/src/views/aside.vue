<template>
  <div class="aside" id="aside">
    <div class="box">
      <div class="game-list" v-if="games">
        <div class="game-list-item" :class="{active:item.id===nowgame}" v-for="(item, index) in games" :key="index" @click="gameSelect(item)"  :title="item.name"
          v-if="index<9">
          <div class="game-list-item-in">
            <img :src="item.icon" class="thumb">
            <span noselect>{{item.name}}</span>
          </div>
        </div>
      </div>
      <i class="icon-toggle-game-list" @click="$store.commit('AsideToggleShow', 0)" v-if="games&&games.length>9">
        <span noselect>{{$t('aside.more')}}</span>
      </i>
      <div class="agent-options btn btn-info" @click="$store.commit('AsideToggleShow', 1)" v-if="agents">
        <i class="icon-users"></i>
        <span :title="selectedConfirmList_filter">{{selectedConfirmList_filter||'无代理商权限'}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
    </div>
    <div class="transition" id="aside-transition">
      <div class="cover" :class="{'core-hide': cover}" @click="closeAll"></div>
      <transition @enter="transition" @leave="transition">
        <gameList v-show="$store.state.aside.isShow['0']" data-key="0"></gameList>
      </transition>
      <transition @enter="transition" @leave="transition">
        <agent v-show="$store.state.aside.isShow['1']" data-key="1"></agent>
      </transition>
      <transition @enter="transition" @leave="transition">
        <channelRegister v-show="$store.state.aside.isShow['2']" data-key="2"></channelRegister>
      </transition>
      <transition @enter="transition" @leave="transition">
        <channelPayment v-show="$store.state.aside.isShow['3']" data-key="3"></channelPayment>
      </transition>
    </div>

    <div class="show-game-content" :class="{up:!$store.state.common.hideAside,down:$store.state.common.hideAside}" @click="$store.commit('changeAside')" title="游戏列表显示/隐藏">
      <!-- 游戏选择 -->
      <i class="icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
import gameList from "views/game-list";
import agent from "modules/agent";
import channelRegister from "modules/channel/register";
import channelPayment from "modules/channel/payment";
import commonMethod from "src/utils/commonMethod.js";
import gameIconConfig from "src/config/gameIconConfig";
export default {
  components: {
    gameList,
    agent,
    channelRegister,
    channelPayment
  },
  data: function() {
    return {
      i: 0,
      transing: false,
      gameList: false,
      agentList: false,
      tfcr: false,
      aniAwait: false,
      ease: Back.easeOut.config(3)
    };
  },
  computed: {
    cover() {
      return this.$store.getters["cover"];
    },
    systemId() {
      return this.$store.state.common.systems.systemId;
    },
    games() {
      let games = this.$store.getters["games"];
      games.forEach(item => {
        item.icon =
          gameIconConfig.config[this.systemId][item.id] ||
          gameIconConfig.defaultIcon;
      });
      return games;
    },
    nowgame() {
      return this.$store.state.common.nowgame;
    },
    //判断是否需要代理商模块
    agents() {
      return this.$store.state.common.systems.systemId != 3;
    },
    selectedConfirmList() {
      return this.$store.getters["Agent/selectedConfirmList"];
    },
    selectedConfirmList_filter() {
      let h = "";
      this.selectedConfirmList.forEach((e, i) => {
        let n = e.name ? e.name : e.parentname ? e.parentname : e.grandname;
        let f = this.selectedConfirmList.length - i === 1 ? "" : ",";
        h += n + f;
      });
      return h;
    }
  },
  methods: {
    closeAll() {
      for (let n in this.$store.state.aside.isShow) {
        this.$store.state.aside.isShow[n] = false;
      }
    },
    gameSelect(item) {
      // console.log(item.id)
      if (item.id != this.nowgame) {
        this.$store.commit("selectGame", item.id);
        commonMethod.changeGame();
      }
    },
    transition(element, done) {
      let h = element.offsetHeight;
      let d = (h * 0.001).toFixed(2);
      if (this.$store.state.aside.isShow[element.dataset.key]) {
        element.style.opacity = 0;
        element.style.height = 0;
        TweenMax.to(element, d * 3, {
          height: h,
          opacity: 1,
          ease: this.ease,
          onComplete: () => {
            requestAnimationFrame(() => {
              this.$store.state.aside.transing = false;
            });
            done();
          }
        });
      } else {
        TweenMax.to(element, d, {
          opacity: 0,
          height: 0,
          onComplete: () => {
            let state = this.$store.state.aside;
            if (state.async) {
              state.async = false;
              state.isShow[state.key] = true;
            } else {
              requestAnimationFrame(() => {
                this.$store.state.aside.transing = false;
              });
            }
            element.style.height = "auto";
            done();
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.aside {
  z-index: 1;
  position: relative;
  font-size: 14px;
  background-color: #e1e1e8;
  .cur-game {
    position: absolute;
  }
  .box {
    background-color: $asideBgcolor;
    width: 100%;
    padding: 0 30px;
    display: flex;
    align-items: center;
    border-left: 1px solid #7a72c7;
    border-bottom: 1px solid #3f3b73;

    overflow-x: auto;
    &::-webkit-scrollbar {
      height: 3px;
    }
    /* 滚动槽 */
    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.1);
    }
    &::-webkit-scrollbar-thumb:window-inactive {
      background-color: #fff;
    }

    .game-list {
      display: flex;
      .game-list-item {
        cursor: pointer;
        margin-right: 10px;
        .game-list-item-in {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 5px;
          height: $sidebarHeight - 3;
          box-sizing: border-box;
          .thumb {
            width: $sidebarHeight - 31;
            height: $sidebarHeight - 31;
            padding: 5px;
            border-radius: 17px;
          }
          span {
            font-size: 13px;
            color: #fff;
            width: 100%;
            line-height: 20px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        &.active {
          background: linear-gradient(#514b8e, #928dcf);
          border: 1px solid #141414;
          box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.3);
          .game-list-item-in {
            border: 1px solid;
            border-right: 2px solid;
            border-image: linear-gradient(#7a72c7, #cbc9e7) 30 30;
          }
        }
      }
    }
    .toggleBox {
      margin-left: auto;
    }
  }
  .icon-toggle-game-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 48px;
    margin: 0 12px;
    cursor: pointer;
    span {
      font-size: 14px;
      white-space: nowrap;
    }
    &:hover {
      color: #fc9153;
    }
  }
  .agent-options {
    margin-left: auto;
    background: #7e7aba;
    padding: 5px 18px 5px 28px;
    max-width: 200px;
    margin-right: 5vw;
    position: relative;
    border-color: #bbb4d6;
    outline: 1px solid #49457e;
    box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    .el-icon-caret-bottom {
      position: absolute;
      font-size: 12px;
      top: 50%;
      right: 8px;
      transform: translateY(-5px);
      color: #3d3971;
    }
    .icon-users {
      color: #3d3971;
      position: absolute;
      font-size: 22px;
      top: 50%;
      left: 10px;
      transform: translateY(-13px);
    }
    span {
      width: 100%;
      padding: 0 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }
  }
  .transition {
    // margin: 0 0 16px 0;//($sidebarHeight - 18) 0 16px 0;
    overflow: hidden;
    .cover {
      position: fixed;
      width: 200%;
      height: 200%;
      background: transparent;
      left: -100%;
      top: -100%;
      z-index: 10 !important;
    }
    > div {
      position: relative;
      z-index: 11;
    }
  }

  .show-game-content {
    position: absolute;
    right: 20px;
    top: 100%;
    color: #fff;
    background-color: #5b5691;
    padding: 5px;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease-in-out;
    box-sizing: border-box;
    &.up {
      transform: rotate(-90deg);
      &:hover {
        box-shadow: -2px -2px 2px 2px #928dcf;
        color: #fc9153;
      }
    }
    &.down {
      transform: rotate(90deg);
      &:hover {
        box-shadow: 2px 2px 2px 2px #928dcf;
        color: #fc9153;
      }
    }
  }
}
</style>
