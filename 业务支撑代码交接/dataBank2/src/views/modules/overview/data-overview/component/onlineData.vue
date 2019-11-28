<template>
  <div class="overview-row">
        <el-card class="small-card" v-for="(item,index) in overviewList" :key="index">
        <div class="desc-group">
          <div class="desc-label">
            <div class="desc-label-name">当{{datetype==1?'日':(datetype==2?'周':'月')}}{{item.name}}</div>
            <div class="desc-label-value">{{(index==0||index==2)?Number(item.value).toFixed(0):item.value}}</div>
          </div>
          <div class="desc-chart">
            <inlineChart class="desc-trend" :chartId="'inline-chart'+index" :data="item.list"></inlineChart>
          </div>
        </div>
      </el-card>
   </div>
</template>
<script>
import api from 'src/services/api'
import inlineChart from 'src/components/inline-chart'
export default {
  name: 'online-data',
  props: ['datetype', 'onlineData'],
  components: {
    inlineChart
  },
  data() {
    return {
      data: []
    }
  },
  computed: {
    overviewList() {
      let result = []
      if (this.onlineData && this.onlineData.length > 0) {
        for (let index in this.onlineData[0]) {
          if (index != '统计时间') {
            result.push({
              name: index,
              value: 0,
              list: []
            })
          }
        }
      }
      result.forEach(res => {
        let value = 0
        let last = 0
        this.onlineData.forEach((item, index) => {
          res.list.push(Number(item[res.name]))
          // value += Number(item[res.name])
          value = value >= item[res.name] ? value : Number(item[res.name])

          last = index === this.onlineData.length - 1 ? item[res.name] : 0
        })
        res.value = last // value.toFixed(2)
      })
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/overview.scss';
.overview-content {
  background-color: #eee;
  padding: 20px;
  .overview-row {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .small-card {
      flex: 1;
      margin: 10px;
      box-sizing: border-box;
    }
    .middle-card {
      flex: 2;
      margin: 10px;
      box-sizing: border-box;
    }
    .must-card {
      flex: 3;
      margin: 10px;
      box-sizing: border-box;
    }
    .most-card {
      flex: 4;
      margin: 10px;
      box-sizing: border-box;
    }
  }
}

.desc-group {
  display: flex;
  justify-content: flex-start;
  align-items: middle;
  .desc-label {
    flex: 1;
    line-height: 30px;
    white-space: nowrap;
    .desc-label-name {
    }
    .desc-label-value {
    }
  }
  .desc-chart {
    flex: 3;
    .desc-trend {
      width: 100%;
      height: 100%;
    }
  }
}
.charts {
  height: 300px;
}
</style>