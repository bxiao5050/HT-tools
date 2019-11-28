<template>
  <section class="checkRow">
    <div class="left-area" @click="dateSub"><i class="iconfont">&#xe693;</i>{{lastName}}</div>
    <div class="date-warp">
      <i class="iconfont">&#xe601;</i>
      <date-picker :date="startTime" :option="option"></date-picker>
    </div>
    <div class="right-area" :class="{hide:isHideKey}" @click="dateAdd">{{nextName}}<i class="iconfont">&#xe694;</i></div>
  </section>
</template>
<script>
  import myDatepicker from 'vue-datepicker'
  import commonMethod from '../utils/commonMethod.js'
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
        type: String,
        default: commonMethod.DateFormat(new Date(),"yyyy-MM-dd")
      },
      dateDiff: {
        default: 0
      }
    },
    data() {
      return {
        startTime: {
          time: ''
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
      this.startTime.time = window.moment(this.date).add(this.dateDiff, 'day').format('YYYY-MM-DD');
    },
    methods: {
      dateAdd() {
        switch (this.datetype) {
          case 1:
            this.startTime.time = window.moment(this.startTime.time, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
            break;
          case 2:
            this.startTime.time = window.moment(this.startTime.time, 'YYYY-MM-DD').add(1, 'weeks').weekday(1).format(
              'YYYY-MM-DD');
            break;
          case 3:
            this.startTime.time = window.moment(this.startTime.time, 'YYYY-MM-DD').add(1, 'month').date(1).format(
              'YYYY-MM-DD');
            break;
        }

      },
      dateSub() {
        switch (this.datetype) {
          case 1:
            this.startTime.time = window.moment(this.startTime.time, 'YYYY-MM-DD').add(-1, 'days').format('YYYY-MM-DD');
            break;
          case 2:
            this.startTime.time = window.moment(this.startTime.time, 'YYYY-MM-DD').add(-1, 'weeks').weekday(1).format(
              'YYYY-MM-DD');
            break;
          case 3:
            this.startTime.time = window.moment(this.startTime.time, 'YYYY-MM-DD').add(-1, 'month').date(1).format(
              'YYYY-MM-DD');
            break;
        }
      },
      setIsHideKey: function () {
        if (window.moment(this.startTime.time).format("YYYY-MM-DD") == window.moment().format("YYYY-MM-DD")) {
          this.isHideKey = true;
        } else {
          this.isHideKey = false;
        }
      },
      setDate() {
        this.$store.dispatch('setDate', this.startTime.time);
        this.dateChange(this.startTime.time);
      }
    },
    watch: {
      startTime: {
        deep: true,
        handler: function (val, oldVal) {
          this.setIsHideKey();
          this.setDate();
        }
      },
      date: function (newVal, oldVal) {
        this.startTime.time = newVal;
      },
      datetype: {
        deep: true,
        handler: function (val, oldVal) {
          if (val && val != oldVal) {
            switch (val) {
              case 1:
                this.startTime.time = window.moment().add(-1, 'day').format('YYYY-MM-DD');
                this.lastName = '前一天';
                this.nextName = '后一天';
                break;
              case 2:
                this.startTime.time = window.moment().add(-1, "week").days(1).format('YYYY-MM-DD');
                this.lastName = '上一周';
                this.nextName = '下一周';
                break;
              case 3:
                this.startTime.time = window.moment().add(-1, "month").date(1).format('YYYY-MM-DD');
                this.lastName = '上个月';
                this.nextName = '下个月';
                break;
            }
          }
          this.setDate();
        }
      }
    },
    components: {
      'date-picker': myDatepicker
    }

  }

</script>
<style lang="scss" rel='stylesheet/scss'>
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
    .date-warp .cov-date-next::after, .cov-date-previous::after {
      -webkit-transform: rotate(-45deg);
    }
    .date-warp .cov-date-body{
      background-color:#716CA8!important;
    }
    .date-warp .cov-date-caption{
      color:#FFF!important;
    }
    .date-warp .checked{
      background-color: #FC9153!important;
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
