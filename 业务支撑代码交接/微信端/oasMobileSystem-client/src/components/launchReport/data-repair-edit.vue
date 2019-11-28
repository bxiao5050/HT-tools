<template>
  <div class="editModel" v-show="editShow">
    <header>
      <div class="header">
        <v-touch tag="div" class="header-left" v-on:tap="closeModel">返回</v-touch>
        <h1 class="header-title">数据修改</h1>
        <div class="header-right"></div>
      </div>
    </header>
    <div class="edit-form">
      <mt-cell title="日期">
        <div class="date-warp">
          <label>{{nowItemData.count_date}}</label>
        </div>
      </mt-cell>
      <mt-cell title="系统">
        <div>
          <label>{{nowItemData.os==0?"安卓":"IOS"}}</label>
        </div>
      </mt-cell>
      <mt-cell title="游戏" :value="nowItemData.game_name"></mt-cell>
      <mt-cell title="渠道">
        <label>{{nowItemData.media_source}}</label>
      </mt-cell>
      <mt-field label="激活" placeholder="选填,默认0" type="number" v-model="nowItemData.installs" :state="installsValidateFail?'warning':''"></mt-field>
      <mt-field label="注册" placeholder="选填,默认0" type="number" v-model="nowItemData.regs" :state="regsValidateFail?'warning':''"></mt-field>
      <mt-field label="创角" placeholder="选填,默认0" type="number" v-model="nowItemData.roles" :state="rolesValidateFail?'warning':''"></mt-field>
      <mt-field label="花费" placeholder="选填,默认0" type="number" v-model="nowItemData.cost" :state="costValidateFail?'warning':''"></mt-field>
      <mt-cell title="抵消自然量" :value="nowItemData.link_media_source==nowItemData.media_source?'是':'否'">
      </mt-cell>
    </div>
    <div class="agent-set-btn">
      <div class="reset-btn" @click="reset">重置</div>
      <div class="yes-btn" @click="editCost">修改</div>
    </div>
  </div>
</template>
<script>
  import httpRequest from '../../utils/httpRequest.js'
  import commonMethod from '../../utils/commonMethod.js'
  import {
    Toast
  } from 'mint-ui'
  export default {
    props: ["isShow", "itemData"],
    data: function () {
      return {
        editShow: false,
        nowItemData: {
          app_id: "",
          cost: "",
          count_date: "",
          game_name: "",
          id: "",
          installs: "",
          link_media_source: "",
          media_source: "",
          os: "",
          regs: "",
          roles: ""
        },

        installsValidateFail: false,
        regsValidateFail: false,
        rolesValidateFail: false,
        costValidateFail: false,
      }
    },
    watch: {
      isShow: function (newVal, oldVal) {
        this.editShow = newVal;
      },
      itemData: {
        handler: function (newVal, oldVal) {
          if (this.editShow) {
            if (!commonMethod.isEmptyObject(newVal)) {
              this.nowItemData = newVal;
            } else {
              Toast("Null Error!");
              this.nowItemData = {
                app_id: "",
                cost: "",
                count_date: "",
                game_name: "",
                id: "",
                installs: "",
                link_media_source: "",
                media_source: "",
                os: "",
                regs: "",
                roles: ""
              };
            }
          }
        },
        deep: true
      },
      'nowItemData.installs': function (newVal, oldVal) {
        if (!newVal || newVal <= 0) {
          this.installsValidateFail = true;
        } else {
          this.installsValidateFail = false;
        }
      },
      'nowItemData.regs': function (newVal, oldVal) {
        if (!newVal || newVal <= 0) {
          this.regsValidateFail = true;
        } else {
          this.regsValidateFail = false;
        }
      },
      'nowItemData.roles': function (newVal, oldVal) {
        if (!newVal || newVal <= 0) {
          this.rolesValidateFail = true;
        } else {
          this.rolesValidateFail = false;
        }
      },
      'nowItemData.cost': function (newVal, oldVal) {
        if (!newVal || newVal <= 0) {
          this.costValidateFail = true;
        } else {
          this.costValidateFail = false;
        }
      }
    },
    methods: {
      showModel: function () {
        this.editShow = true;
      },
      closeModel: function () {
        this.reset();
        // this.addShow = false;
        this.$emit("closeEdit");
      },
      reset: function () {
        this.nowItemData = this.itemData;

        this.installsValidateFail = false;
        this.regsValidateFail = false;
        this.rolesValidateFail = false;
        this.costValidateFail = false;
      },
      editCost: function () {
        if (this.media_source != "") {
          // if (this.installsValidateFail || this.regsValidateFail || this.rolesValidateFail || this.costValidateFail) {
          //   Toast("数据格式错误!请重新输入");
          //   return;
          // }
          var params = this.nowItemData;
          console.log(params)
          httpRequest.dataRepairEdit(params, (data) => {
            if (data.state == "successed") {
              Toast("数据修改成功!");
              this.closeModel();
              this.query();
            } else {
              Toast(data.result.errorMsg);
            }
          })
        } else {
          Toast("mediaSource不能为空!");
        }
      },
      query: function () {
        this.$emit("query");
      }
    }
  }

</script>
<style lang="scss">
  .editModel {
    width: 100%;
    height: 100%;
    background: #FFF;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    .edit-form {
      width: 100%;
      height: 100%;
      margin-top: 50px;
      padding-bottom:2.3rem;
      text-align: left;
      font-size: 0.39rem;
      overflow:scroll;
      .os-radio {
        width: 250px;
        .os-radio-item {
          margin-right: 0.26rem;
        }
      }
      .cov-datepicker {
        width: 250px!important;
      }
      .mint-cell {
        text-decoration: none!important;
      }
    }
  }
  
  .date-warp {
    height: 30px;
    line-height: 30px;
  }
  
  .date-warp .datepicker-overlay {
    -webkit-animation: fadein 0.5s;
  }
  
  .date-warp .cov-date-body {
    -webkit-transform: translate(-50%, -50%);
  }
  
  .date-warp .cov-date-next:before,
  .date-warp .cov-date-previous:before {
    -webkit-transform: rotate(45deg);
  }
  
  .date-warp .cov-date-previous:before {
    -webkit-transform: rotate(-45deg);
  }
  
  .date-warp .cov-date-previous::after {
    -webkit-transform: rotate(45deg);
  }
  
  .date-warp .cov-date-next::after,
  .cov-date-previous::after {
    -webkit-transform: rotate(-45deg);
  }
  
  .date-warp .cov-date-body {
    background-color: #716CA8!important;
  }
  
  .date-warp .cov-date-caption {
    color: #FFF!important;
  }
  
  .date-warp .checked {
    background-color: #FC9153!important;
  }
  
  .media-control {
    border: 0;
    width: 250px;
  }

</style>
