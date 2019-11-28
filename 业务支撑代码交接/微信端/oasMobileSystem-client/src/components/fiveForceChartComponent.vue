<template>
  <transition :name="transitionName">
    <div class="chartModel" v-show="chartPopShow">
      <header>
        <div class="header">
          <v-touch tag="div" class="header-left" v-on:tap="closeChart">返回</v-touch>
          <h1 class="header-title">图表</h1>
          <div class="header-right"></div>
        </div>
      </header>
      <!--<div>-->
      <!--<div class="returns" @click="closeChart">返回</div>-->
      <!--</div>-->
      <div id="fiveForseChart" style="width:100%;height:80%;position: absolute;top:10%;">
      </div>
    </div>
  </transition>
  <!--<div>
    <mu-drawer class="chartModel" right :open="chartPopShow" v-touch:swiperight="closeChart" @close="closeChart()">
      <div id="fiveForseChart" style="width:100%;height:100%;">
      </div>
    </mu-drawer>
  </div>-->
</template>
<script>
  import highchartUtil from '../utils/highchartUtil.js'
  import commonMethod from '../utils/commonMethod.js'
  import {
    mapGetters
  } from 'vuex'
  export default {
    props: ["isShow", "dateArr", "indexNameArr"],
    data: function () {
      return {
        chartPopShow: false,
        transitionName: 'slide-left'
      }
    },
    created: function () {
      this.$store.commit("set_5li_drawChart", this.drawChart)
    },
    mounted: function () {
      var _self = this;
      var evt = "onorientationchange" in window ? "orientationchange" : "resize";
      window.addEventListener(evt, function () {
        _self.drawChart();
      });
    },
    computed: {
      ...mapGetters([
        "indexData"
      ])
    },
    watch: {
      isShow: function (newVal, oldVal) {
        this.chartPopShow = newVal;
        if (this.chartPopShow) {
          this.drawChart()
        }
      },
      chartPopShow: function (newVal, oldVal) {
        if (this.chartPopShow) {
          this.transitionName = 'slide-left';
        } else {
          this.transitionName = 'slide-right';
        }
      }
    },

    methods: {
      showChart: function () {
        this.chartPopShow = true;
      },
      closeChart: function () {
        this.chartPopShow = false;
      },
      drawChart: function () {
        var data = this.indexData;
        if (data) {
          var categories = this.dateArr;
          var chartData = [];
          for (var i = 0; i < this.indexNameArr.length; i++) {
            var isHide=false;
            if (!commonMethod.isExistIndex(this.indexNameArr[i],data)) {
              console.warn("指标:"+this.indexNameArr[i]+" 在数据表中不存在,将在图表中隐藏");
              isHide=true;
              continue;
            }
            var obj = {
              name: this.indexNameArr[i],
              data: [],
              tooltip: {
                valueSuffix: this.indexNameArr[i].indexOf("率", 0) != -1 ? "%" : ''
              }
            };
            for (var j = 0; j < data.length; j++) {
              if (this.indexNameArr[i] == data[j].pointertype_name) {
                for (var index in data[j]) {
                  for (var k = 0; k < categories.length; k++) {

                    if (index == categories[k]) {
                      obj.data.push(Number(data[j][index].replace(",", "")));
                    }
                  }
                }
              }
            }
            chartData.push(obj);
          }
          highchartUtil.drawLineChart('fiveForseChart', categories, chartData);
        }
      }
    }
  }

</script>
<style>
  .chartModel {
    width: 100%;
    height: 100%;
    background: #FFF;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
  }

</style>
