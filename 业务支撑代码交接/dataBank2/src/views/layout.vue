<template>
  <div class="viewApp">
    <viewHeader></viewHeader>
    <div class="viewMain">
      <div class="module" :class="{sm:isCompact,'hide-aside':$store.state.common.hideAside}">
        <viewAside v-if="$store.state.common.systems.systemId!==Config.OverseasReleaseSysId"></viewAside>
        <div class="wrapper">
          <div class="scroll" ref="scroll">
            <div class="module-head">
              {{nowmenu?nowmenu.menuName:'null'}}
              <i class="icon-quest" style="color:#b9bec2;cursor:pointer;" @click="showTip"></i>
              <a href="javascript:void(0)" @click="refresh" v-if="userInfo&&userInfo.userName=='jishan.fan'">刷新</a>
            </div>
            <router-view ref="components" class="components"></router-view>
          </div>
        </div>
      </div>
      <viewSidebar></viewSidebar>
      <Modal class="index-tip" headerName="指标说明" width="800" v-show="isShowTip" @close="isShowTip=false">
        <div class="index-table" slot="modal-body">
          <table class="table table-hover">
            <tbody>
              <tr v-for="(item, index) in indicatorData" :key="index">
                <td>{{item['indicatorName']}}</td>
                <td style="width:70%;">{{item['getIndicatorDescription']}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr v-if="indicatorData.length==0">
                <td colspan="2">无数据</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import viewHeader from 'views/header'
import viewAside from 'views/aside'
import viewSidebar from 'views/sidebar'
import Modal from 'src/components/modal.vue'
import api from 'src/services/api'
import normalTable from 'src/components/normal-table.vue'
export default {
  components: {
    viewHeader, viewSidebar, viewAside, Modal, normalTable
  }
  , data() {
    return {
      isShowTip: false,
      indicatorData: []
    }
  },
  computed: {
    Config() {
      return Config
    },
    userInfo() {
      return this.$store.state.common.userInfo
    },
    isCompact() {
      return this.$store.state.layout.isCompact
    },
    nowmenu() {
      return this.$store.state.common.nowmenu
    },
    nowOS() {
      return this.$store.getters['OS/nowOS']
    },
    zones() {
      return this.$store.getters['Agent/selectedIdList']
    },
    regChannels() {
      return this.$store.getters['RegChannel/selectedIdList']
    },
    payChannels() {
      return this.$store.getters['RegChannel/selectedIdList']
    }
  },
  methods: {
    showTip() {
      this.isShowTip = true
      this.getIndicators()
    },
    getIndicators() {
      let params = {
        menuId: this.nowmenu.menuId
      }
      api.user.getIndicators(params).then((data) => {
        if (data.code == 401) {
          this.indicatorData = data.state;
        }
        else {
          this.$notify.warning({ message: '获取指标数据失败!' })
          this.indicatorData = [];
        }
      })
    },
    refresh() {
      this.$refs.components.query();
    }
  },
  watch: {
    nowOS(v, ov) {
      if (this.$store.state.Common.couldQuery && v != ov) {
        this.$refs.components.query();
      }
    },
    zones(v, ov) {
      if (this.$store.state.Common.couldQuery && v != ov) {
        this.$refs.components.query();
      }
    },
    regChannels(v, ov) {
      if (this.$store.state.Common.couldQuery && v != ov) {
        this.$refs.components.query();
      }
    },
    payChannels(v, ov) {
      if (this.$store.state.Common.couldQuery && v != ov) {
        this.$refs.components.query();
      }
    },
  }
}

</script>

<style lang="scss">
.viewApp {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.viewMain {
  position: relative;
  margin-top: $headerHeight;
  display: flex;
  flex-grow: 1;
  .module {
    transition: all 0.3s ease-in-out;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: $sidebarWidth;
    display: flex;
    flex-direction: column;
    &.sm {
      left: 60px;
    }
    .switchs,
    .switch-group,
    .item-header,
    .switchs-item {
      display: flex;
      align-items: center;
    }
    .wrapper {
      height: 100%;
      transition: all 0.3s ease-in-out;
    }
    .scroll {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: auto;
      .module-head {
        font-size: 26px;
        font-weight: bold;
        color: #5b5691;
        font-family: "黑体";
        margin: 15px;
        margin-left: 18px;
        float: left;
        height: 40px;
      }
      .components {
        width: 100%;
        float: left;
        display: flex;
        flex-direction: column;
        font-size: 13px;
        color: #000;
        .content-header {
          margin-bottom: 20px;
          background-color: #fff;
          .switchs {
            margin-top: 5px;
          }
          .switch-group {
            flex-wrap: wrap;
          }
          .switchs-item {
            margin: -2px -8px 15px 18px;
            .item-header {
              margin: 0 9px 0 4px;
            }
            .item-content {
              margin-right: 15px;
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              flex-wrap: wrap;
              line-height: 30px;
              .bt-item {
                cursor: pointer;
                padding: 0 15px;
                float: left;
                background-color: #fff;
                border: 1px solid #ddd;
                text-align: center;
                &:last-child {
                  border-right: 1px solid #ddd;
                }
              }
              .bt-item.check {
                font-weight: 700;
                color: #fff;
                background-color: #fc9153;
                border: 1px solid #fc9153;
              }
            }
            input {
              border-radius: 0;
            }
          }
        }
        .content-body {
          padding: 10px 30px;
        }
      }
    }

    &.hide-aside {
      transform: translateY(-100px);
      .wrapper {
        height: 100%;
      }
    }
  }
}

.index-tip {
  color: #333;
  .index-table {
    margin: 15px 0;
    max-height: 400px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 5px;
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
      background-color: #bbb;
    }
  }
}
</style>