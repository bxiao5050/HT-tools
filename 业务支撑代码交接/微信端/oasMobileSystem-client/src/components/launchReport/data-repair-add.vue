<template>
  <div class="addModel" v-show="addShow">
    <header>
      <div class="header">
        <v-touch tag="div" class="header-left" v-on:tap="closeModel">返回</v-touch>
        <h1 class="header-title">手动录入-数据补充</h1>
        <div class="header-right"></div>
      </div>
    </header>
    <div class="add-form">
      <mt-cell title="日期">
        <div class="date-warp">
          <date-picker :date="startTime" :option="option"></date-picker>
        </div>
      </mt-cell>
      <mt-cell title="系统">
        <div class="os-radio">
          <label class="os-radio-item" v-for="item in os"><input type="radio" name="osRadio" v-model="nowos" :value="item.id"/>{{item.name}}</label>
        </div>
      </mt-cell>
      <mt-cell title="游戏" :value="nowApp.area_app_name"></mt-cell>
      <datalist id="medialist">
        <option v-for="item in medialist">{{item.media_source}}</option>
      </datalist>
      <mt-cell title="渠道">
        <!--<input list="medialist" class="media-control" placeholder="必填" v-model="media_source">-->
        <select v-model="media_source" class="media-control">
            <option value="-1">新的媒体</option>
            <option v-for="item in medialist" :value="item.media_source">{{item.media_source}}</option>
        </select>
      </mt-cell>
      <mt-cell title="渠道" v-if="isShowNewMedia">
        <input class="media-control" placeholder="必填" v-model="newMedia">
      </mt-cell>
      <mt-field label="激活" placeholder="选填,默认0" type="number" v-model="installs" :state="installsValidateFail?'warning':''"></mt-field>
      <mt-field label="注册" placeholder="选填,默认0" type="number" v-model="regs" :state="regsValidateFail?'warning':''"></mt-field>
      <mt-field label="创角" placeholder="选填,默认0" type="number" v-model="roles" :state="rolesValidateFail?'warning':''"></mt-field>
      <mt-field label="花费" placeholder="选填,默认0" type="number" v-model="cost" :state="costValidateFail?'warning':''"></mt-field>
      <mt-cell title="抵消自然量">
        <mt-switch v-model="flag"></mt-switch>
      </mt-cell>
    </div>
    <div class="agent-set-btn">
      <div class="reset-btn" @click="reset">重置</div>
      <div class="yes-btn" @click="addCost">添加</div>
    </div>
  </div>
</template>
<script>
  import myDatepicker from 'vue-datepicker'
  import httpRequest from '../../utils/httpRequest.js'
  import {
    Toast
  } from 'mint-ui'
  export default {
    props: ["isShow"],
    components: {
      'date-picker': myDatepicker
    },
    data: function () {
      return {
        addShow: false,

        os: [{
          id: 0,
          name: '安卓'
        }, {
          id: 1,
          name: 'IOS'
        }],
        isShowNewMedia: true,
        newMedia: '',
        date1: window.moment().format("YYYY-MM-DD"),
        nowos: 0,
        media_source: '-1',
        installs: "",
        regs: '',
        roles: '',
        cost: '',
        flag: false,

        medialist: [],

        installsValidateFail: false,
        regsValidateFail: false,
        rolesValidateFail: false,
        costValidateFail: false,

        startTime: {
          time: window.moment().format("YYYY-MM-DD")
        },
        option: {
          type: 'day',
          week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December'
          ],
          format: 'YYYY-MM-DD',
          placeholder: 'when?',
          inputStyle: {
            'display': 'inline-block',
            'padding': '0px',
            'width': "66px",
            'border': 'none',
            'color': '#5F5F5F'
          },
          color: {
            header: '#ccc',
            headerText: '#f00'
          },
          buttons: {
            ok: 'Ok',
            cancel: 'Cancel'
          },
          overlayOpacity: 0.5, // 0.5 as default
          dismissible: true, // as true as default
        }
      }
    },
    computed: {
      nowApp: function () {
        return this.$store.state.launchAreaStore.nowApp;
      }
    },
    watch: {
      isShow: function (newVal, oldVal) {
        this.addShow = newVal;
        if (this.addShow) {
          this.getMedias();
        }
      },
      startTime: {
        deep: true,
        handler: function (val, oldVal) {
          this.date1 = val;
        }
      },
      nowos: {
        deep: true,
        handler: function (val, oldVal) {
          this.getMedias();
        }
      },
      media_source: function (newVal, oldval) {
        if (newVal == -1) {
          this.isShowNewMedia = true;
          this.newMedia = "";
        } else {
          this.isShowNewMedia = false;
          this.newMedia = "";
        }
      },
      installs: function (newVal, oldVal) {
        if (!newVal || newVal <= 0) {
          this.installsValidateFail = true;
        } else {
          this.installsValidateFail = false;
        }
      },
      regs: function (newVal, oldVal) {
        if (!newVal || newVal <= 0) {
          this.regsValidateFail = true;
        } else {
          this.regsValidateFail = false;
        }
      },
      roles: function (newVal, oldVal) {
        if (!newVal || newVal <= 0) {
          this.rolesValidateFail = true;
        } else {
          this.rolesValidateFail = false;
        }
      },
      cost: function (newVal, oldVal) {
        if (!newVal || newVal <= 0) {
          this.costValidateFail = true;
        } else {
          this.costValidateFail = false;
        }
      }
    },
    methods: {
      showModel: function () {
        this.addShow = true;
      },
      closeModel: function () {
        this.reset();
        // this.addShow = false;
        this.$emit("closeAdd");
      },
      dateChange: function (newDate) {
        this.date1 = newDate;
      },
      reset: function () {
        this.date1 = window.moment().format("YYYY-MM-DD");
        this.startTime = {
          time: window.moment().format("YYYY-MM-DD")
        };
        this.media_source = '-1';
        this.installs = "";
        this.regs = "";
        this.roles = "";
        this.cost = "";
        this.flag = false;

        this.installsValidateFail = false;
        this.regsValidateFail = false;
        this.rolesValidateFail = false;
        this.costValidateFail = false;
      },
      getMedias: function () {
        var params = {
          os_id: this.nowos
        }
        httpRequest.getMedias(params, (data) => {
          if (data.state == "successed") {
            if (data.result.length == 0) {
              this.medialist = [];
            }
            this.medialist = data.result[0];
            this.media_source = '-1';
          } else {
            Toast(data.result.errorMsg);
          }
        })
      },
      addCost: function () {
        if (this.media_source == "") {
          Toast("mediaSource不能为空!");
          return;
        }
        if (this.isShowNewMedia && this.newMedia == "") {
          Toast("新的媒体名不能为空!");
          return;
        }
        var params = {
          date1: this.date1,
          os_id: this.nowos,
          media_source: this.isShowNewMedia ? this.newMedia : this.media_source,
          installs: this.installs || 0,
          regs: this.regs || 0,
          roles: this.roles || 0,
          cost: this.cost || 0,
          type: this.flag ? 1 : 0
        };
        httpRequest.dataRepairAdd(params, (data) => {
          if (data.state == "successed") {
            Toast("数据增加成功!");
            this.closeModel();
            this.query();
          } else {
            Toast(data.result.errorMsg);
          }
        })


      },
      query: function () {
        this.$emit("query");
      }
    }
  }

</script>
<style lang="scss">
  .addModel {
    width: 100%;
    height: 100%;
    background: #FFF;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    .add-form {
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
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    /*padding: 2px 15px 2px 5px;*/
  }

</style>
