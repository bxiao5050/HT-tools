<template>
  <div class="comparisonModel" v-show="modelPopShow">
    <header>
      <div class="header">
        <v-touch tag="div" class="header-left" v-on:tap="closeModel">返回</v-touch>
        <h1 class="header-title">对比时间</h1>
        <div class="header-right"></div>
      </div>
    </header>
    <div class="date-form">
      <div class="date-warp">
        <span class="head">基准时间:</span>
        <div class="content">{{comporisonDate.date1}}</div>
      </div>
      <div class="date-warp">
        <span class="head">选择对比时间1:</span>
        <div class="content">
          <i class="iconfont">&#xe601;</i>
          <date-picker :date="date2" :option="option"></date-picker>
        </div>
      </div>
      <div class="date-warp">
        <span class="head">选择对比时间2:</span>
        <div class="content">
          <i class="iconfont">&#xe601;</i>
          <date-picker :date="date3" :option="option"></date-picker>
        </div>
      </div>
    </div>
    <div class="agent-set-btn">
      <div class="reset-btn" @click="resetDate">重置</div>
      <div class="yes-btn" @click="callbackDate">确定</div>
    </div>
  </div>
</template>
<script>
  import myDatepicker from 'vue-datepicker'
  import {
    Toast
  } from 'mint-ui'
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      comporisonDate: {
        type: Object
      },
      comporisonDateChannge: {
        type: Function
      },
      reset: {
        type: Function
      }
    },
    mounted: function () {
      this.date2.time = window.moment().add(-1, 'day').format("YYYY-MM-DD");
      this.date3.time = window.moment().add(-1, 'week').format("YYYY-MM-DD");
    },
    data: function () {
      return {
        modelPopShow: false,
        date2: {
          time: ''
        },
        date3: {
          time: ''
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
    watch: {
      'isShow': function (newVal, oldVal) {
        this.modelPopShow = newVal;
        if (this.modelPopShow) {
          this.date2.time = this.comporisonDate.date2;
          this.date3.time = this.comporisonDate.date3;
        }
      },
      'comporisonDate': {
        deep: true,
        handler: function (newVal, oldVal) {
          this.date2.time = newVal.date2;
          this.date3.time = newVal.date3;
        }
      },
      'date2': {
        deep: true,
        handler: function (newVal, oldVal) {
          if (this.comporisonDate.date1 == this.date2.time || this.comporisonDate.date1 == this.date3.time || this.date2
            .time == this.date3.time) {
            Toast("不能选择相同日期，请重新选择!");
          }
        }
      },
      'date3': {
        deep: true,
        handler: function (newVal, oldVal) {
          if (this.comporisonDate.date1 == this.date2.time || this.comporisonDate.date1 == this.date3.time || this.date2
            .time == this.date3.time) {
            Toast("不能选择相同日期，请重新选择!");
          }
        }
      }
    },

    methods: {
      closeModel: function (newVal, oldVal) {
        this.modelPopShow = false;
      },
      callbackDate: function () {
        if (this.comporisonDate.date1 == this.date2.time || this.comporisonDate.date1 == this.date3.time || this.date2
          .time == this.date3.time) {
          Toast("不能选择相同日期，请重新选择!");
          return;
        } else {
          var obj = {
            date2: this.date2.time,
            date3: this.date3.time
          }
          this.closeModel();
          this.comporisonDateChannge(obj);
        }
      },
      resetDate: function () {
        this.reset();
        this.date2.time = this.comporisonDate.date2;
        this.date3.time = this.comporisonDate.date3;
      }
    },
    components: {
      'date-picker': myDatepicker
    }
  }

</script>
<style lang="scss">
  .comparisonModel {
    width: 100%;
    height: 100%;
    background: #FFF;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    .date-form {
      text-align: center;
      font-size: 0.35rem;
      margin-top: 20%;
      .date-warp {
        /*margin: 1rem 0;*/
        padding: 0.5rem 0.5rem 0.5rem 1rem;
        display: -webkit-box;
        -webkit-box-pack: justify;
        -webkit-box-align: center;
        .head {
          -webkit-box-flex: 1;
          text-align: center;
        }
        .content {
          -webkit-box-flex: 2;
          text-align: center;
          .cov-datepicker {
            width: 2rem!important;
          }
        }
      }
      /*.date-warp .datepicker-overlay {
        -webkit-animation: fadein 0.5s;
      }*/
      /*.date-warp .cov-date-body {
        -webkit-transform: translate(-50%, -50%);
      }*/
      /*.date-warp:active {
        background-color:#E8E8E8;
      }*/
    }
  }

</style>
