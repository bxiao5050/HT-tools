<template>
  <div>
    <div class="fastGroup">
      <div class="fastSelecter">
        <v-touch tag="div" class="fast-item" :class="{now:datetype==1}" v-on:tap="toggleDatetype(1)">Day</v-touch>
        <v-touch tag="div" class="fast-item px1-l" :class="{now:datetype==2}" v-on:tap="toggleDatetype(2)">Week</v-touch>
        <v-touch tag="div" class="fast-item px1-l" :class="{now:datetype==3}" v-on:tap="toggleDatetype(3)">Month</v-touch>
      </div>
    </div>
    <nv-date-picker :dateChange="dateChange" :datetype="datetype" dateDiff="-1"></nv-date-picker>
    <!--<transition name="component-fade" mode="out-in">
    <fiveForceContent :dateArr="dateArr" v-on:openChart="openChart" v-if="currentView=='fiveForceContent'"></fiveForceContent>
    <fiveForceTable :dateArr="dateArr" v-if="currentView=='fiveForceTable'"></fiveForceTable>
    </transition>-->
    <transition name="component-fade" mode="out-in">
      <keep-alive>
      <component v-bind:is="currentView" :dateArr="dateArr" v-on:openChart="openChart">
      </component>
      </keep-alive>
    </transition>
    <div class="tran-group" @click="toggleModel">
      <i class="iconfont" :class="{down:currentView=='fiveForceContent',up:currentView=='fiveForceTable'}"></i>
    </div>
    <fiveForceChartModel :isShow="isShowChart" :dateArr="dateArr" :indexNameArr="indexNameArr"></fiveForceChartModel>
  </div>
</template>
<script>
  import nvDatePicker from '../../components/datepicker.vue'
  import fiveForceContent from '../../components/fiveForceContent.vue'
  import fiveForceTable from '../../components/fiveForceTable.vue'
  import fiveForceChartModel from '../../components/fiveForceChartComponent.vue'
  import httpRequest from '../../utils/httpRequest.js'
  import commonMethod from '../../utils/commonMethod.js'
  import {
    Toast
  } from 'mint-ui'
  export default {
    components: {
      nvDatePicker,
      fiveForceContent,
      fiveForceTable,
      fiveForceChartModel
    },
    data: function () {
      return {
        isShowChart: false,
        indexNameArr: "",
        datetype: 1,
        dateArr: '',
        date1: '',
        currentView: 'fiveForceContent'
      }
    },
    methods: {
      toggleDatetype: function (datetype) {
        this.datetype = datetype;
      },
      dateChange: function (newDate) {
        this.date1 = newDate;
      },
      openChart: function (item) {
        this.indexNameArr = commonMethod.getIndexNameArr(item);
        this.isShowChart = !this.isShowChart;
        // this.$store.state.fiveforcestore.drawChart();
      },
      toggleModel: function () {
        if (this.currentView == "fiveForceContent") {
          this.currentView = "fiveForceTable";
        } else if (this.currentView == "fiveForceTable") {
          this.currentView = "fiveForceContent"
        }
      },
      query: function () {
        var params = {
          date1: this.date1,
          datetype: this.datetype
        }
        httpRequest.getFiveForceData(params, (data) => {
          if (data.state == "successed") {
            var fiveforcedata = data.result[1];
            var indexdata = data.result[0]
            this.$store.dispatch("setFiveForceData", fiveforcedata);
            this.$store.dispatch("setIndexData", indexdata);
          } else {
            Toast(data.result.errorMsg);
          }
        })
      }
    },
    watch: {
      'date1': function (newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          this.dateArr = commonMethod.getDays(this.datetype, this.date1);
          this.query();
        }
      }
    }
  }

</script>
<style lang="scss">
  .fastGroup {
    width: 100%;
    height: 1.06rem;
    line-height: 1.06rem;
    position: relative;
    .fastSelecter {
      width: 7rem;
      height: 0.8rem;
      line-height: 0.8rem;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      /*display:-webkit-flex;
      -webkit-align-items:center;
      -webkit-justify-content:center;*/
      display: -webkit-box;
      border: 1px solid #CAAD9D;
      .fast-item {
        -webkit-box-flex: 1;
        background: #FFFFFF;
        border-left-color: #CAAD9D;
        font-size: 0.4rem;
        /*letter-spacing:0.13rem;*/
        font-family: '微软雅黑';
      }
      .fast-item.now {
        color: #FFF;
        background-color: #FC9153;
      }
    }
  }
  
  .tran-group {
    position: absolute;
    bottom: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    width: 100%;
    height: 0.8rem;
    font-family: "iconfont" !important;
    .down:before {
      content: '\e60c';
      color: #2ACBCB;
      font-size: 0.6rem;
    }
    .up:before {
      content: '\e76e';
      color: #2ACBCB;
      font-size: 0.6rem;
    }
  }
  
  .component-fade-enter-active,
  .component-fade-leave-active {
    -webkit-transition: opacity .3s ease;
    transition: opacity .3s ease;
  }
  
  .component-fade-enter,
  .component-fade-leave-active {
    opacity: 0;
  }

</style>
