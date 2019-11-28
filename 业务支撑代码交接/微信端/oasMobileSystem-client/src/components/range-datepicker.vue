<template>
  <section class="checkRow">
    <div class="left-area" @click="dateSub"><i class="iconfont">&#xe693;</i>{{lastName}}</div>
    <div class="date-warp">
      <i class="iconfont">&#xe601;</i>
      <date-picker :date="startTime" :option="option"></date-picker>
      ~
      <i class="iconfont">&#xe601;</i>
      <date-picker :date="endTime" :option="option"></date-picker>
    </div>
    <div class="right-area" :class="{hide:isHideKey}" @click="dateAdd">{{nextName}}<i class="iconfont">&#xe694;</i></div>
  </section>
</template>
<script>
  import myDatepicker from 'vue-datepicker'
  import commonMethod from '../utils/commonMethod.js'
  import {
    Toast
  } from 'mint-ui'
  export default {
    props: {
      dateChange: {
        type: Function
      },
      datetype: {
        type: Number,
        default: 1
      },
      date: {
        type: Object,
        default: {
          startTime: commonMethod.DateFormat(new Date(), "yyyy-MM-dd"),
          endTime: commonMethod.DateFormat(new Date(), "yyyy-MM-dd")
        }
      },
      dateDiff: {
        default: 0
      }
    },
    data() {
      return {
        startTime: {
          time: window.moment().format('YYYY-MM-DD')
        },
        endTime: {
          time: window.moment().format('YYYY-MM-DD')
        },
        lastName: '前一天',
        nextName: '后一天',
        isHideKey: false,
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
    mounted() {
      // this.startTime.time = window.moment().add(this.dateDiff, 'day').format('YYYY-MM-DD');
      this.startTime.time = window.moment(this.date.startTime).format('YYYY-MM-DD');
      this.endTime.time = window.moment(this.date.endTime).format('YYYY-MM-DD');
    },
    methods: {
      dateAdd() {
        this.startTime.time = window.moment(this.startTime.time).add(1, 'days').format('YYYY-MM-DD');
        this.endTime.time = window.moment(this.endTime.time).add(1, 'days').format('YYYY-MM-DD');
      },
      dateSub() {
        this.startTime.time = window.moment(this.startTime.time).add(-1, 'days').format('YYYY-MM-DD');
        this.endTime.time = window.moment(this.endTime.time).add(-1, 'days').format('YYYY-MM-DD');
      },
      setIsHideKey: function () {
        if (window.moment(this.endTime.time).format("YYYY-MM-DD") == window.moment().format("YYYY-MM-DD")) {
          this.isHideKey = true;
        } else {
          this.isHideKey = false;
        }
      },
      setDate() {
        var obj = {
          startTime: this.startTime.time,
          endTime: this.endTime.time
        }
        this.dateChange(obj);
      }
    },
    watch: {
      'startTime.time': function (newVal, oldVal) {
        if (window.moment(newVal) > window.moment(this.endTime)) {
          Toast("开始日期不能大于结束日期!请重新选择");
          this.startTime.time = oldVal;
        } else {
          this.setDate();
        }
      },
      'endTime.time': function (newVal, oldVal) {
        if (window.moment(this.startTime.time) > window.moment(newVal)) {
          Toast("开始时间不能大于结束时间!请重新选择");
          this.endTime.time = oldVal;
        } else {
          this.setIsHideKey();
          this.setDate();
        }
      },
      'date.startTime': function (newVal, oldVal) {
        this.startTime.time = window.moment(newVal).format('YYYY-MM-DD');
      },
      'date.endTime': function (newVal, oldVal) {
        this.endTime.time = window.moment(newVal).format('YYYY-MM-DD');
      },
      datetype: function (newVal, oldVal) {
        switch (this.datetype) {
          case 1:
            this.startTime.time = window.moment().add(-1, "days").format('YYYY-MM-DD');
            this.endTime.time = window.moment().add(-1, "days").format('YYYY-MM-DD');
            break;
          case 2:
            this.startTime.time = window.moment().add(-8, "days").format('YYYY-MM-DD');
            this.endTime.time = window.moment().add(-1, "days").format('YYYY-MM-DD');
            break;
          case 3:
            this.startTime.time = window.moment().add(-31, "days").format('YYYY-MM-DD');
            this.endTime.time = window.moment().add(-1, "days").format('YYYY-MM-DD');
            break;
          case 4:
            this.startTime.time = window.moment().date(1).format('YYYY-MM-DD');
            this.endTime.time = window.moment().format('YYYY-MM-DD');
            break;
          case 5:
            this.startTime.time = window.moment().add(-1, "month").date(1).format('YYYY-MM-DD');
            this.endTime.time = window.moment().add(-1, "month").endOf("month").format('YYYY-MM-DD')
            break;
        }
      }
    },
    components: {
      'date-picker': myDatepicker
    }

  }

</script>
<style lang="scss" rel='stylesheet/scss' scoped>
  .checkRow {
    /*display: -webkit-flex;*/
    /* Safari */
    /*display: flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;*/
    margin: 5px 0 0 0;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: justify;
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
    .right-area {
      /*padding: 10px;*/
      /*margin-right: -10px;*/
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      /*font-weight: bold;*/
      font-family: '微软雅黑';
    }
    .right-area.hide {
      visibility: hidden;
    }
    .left-area {
      /*padding: 10px;*/
      /*margin-left: -10px;*/
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      /*font-weight: bold;*/
      font-family: '微软雅黑';
    }
  }

</style>
