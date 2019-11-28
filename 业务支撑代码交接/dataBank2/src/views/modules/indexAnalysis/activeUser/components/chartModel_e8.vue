<template>
  <card>
    <div slot="header">
      <div class="card-header-title">关键指标数据</div>
      <div class="tabs">
        <div class="tab-item" :class="{'active':type==1}" @click="changeType(1)">登录次数</div>
        <div class="tab-item" :class="{'active':type==2}" @click="changeType(2)">活跃人数</div>
        <div class="tab-item" :class="{'active':type==3}" @click="changeType(3)">平均登录次数</div>
      </div>
    </div>
    <div slot="body">
      <div id="activeUserChart" class="charts"></div>
    </div>
  </card>
</template>

<script>
  import card from 'src/components/card.vue'
  import utils from 'src/utils/utils.js'
  export default {
    name: 'chart-model-e8',
    components: {
      card
    },
    props: ["type", "typeChange", "columnData", "chartData"],
    methods: {
      changeType(type) {
        this.typeChange(type);
      },
      drawChart() {
        var categories = [];
        var chartData = this.formatData(this.chartData);
        highchartUtil.drawChart('activeUserChart', 'area', chartData.category, chartData.series)
      },
      formatData(data) {
        let count_date = utils.getColumnKey('count_date', this.columnData);
        let newlogin_count = utils.getColumnKey('newlogin_count', this.columnData);
        let oldlogin_count = utils.getColumnKey('oldlogin_count', this.columnData);

        let newlogin_user = utils.getColumnKey('newlogin_user', this.columnData);
        let oldlogin_user = utils.getColumnKey('oldlogin_user', this.columnData);

        let logincounts_avg = utils.getColumnKey('logincounts_avg', this.columnData);

        var result = {
          category: [],
          series: []
        };
        let newData_obj = {};
        let newData = []
        if (this.type == 1) {
          /*格式化数据*/
          data.forEach(item => {
            let date = item[count_date]
            if (!newData_obj.hasOwnProperty(item[count_date])) {
              newData_obj[date] = newData.push({
                count_time: date,
                serie1: Number(item[newlogin_count]),
                serie2: Number(item[oldlogin_count])
              })
            } else {
              newData[newData_obj[date] - 1].serie1 += item[newlogin_count] * 1
              newData[newData_obj[date] - 1].serie2 += item[oldlogin_count] * 1
            }
          });
          newData=newData.sort((a,b)=>{
            return moment(a.count_time)-moment(b.count_time)
          })
          result.category = [];
          result.series = [{
              name: newlogin_count,
              type: 'area',
              data: []
            },
            {
              name: oldlogin_count,
              type: 'area',
              data: []
            }
          ]
          newData.forEach((dt) => {
            result.category.push(dt.count_time)
            result.series[0].data.push(dt.serie1)
            result.series[1].data.push(dt.serie2)
          })
          // result.category = category;
          // result.series = series;
        } else if (this.type == 2) {
          /*格式化数据*/
          data.forEach(item => {
            let date = item[count_date]
            if (!newData_obj.hasOwnProperty(item[count_date])) {
              newData_obj[date] = newData.push({
                count_time: date,
                serie1: Number(item[newlogin_user]),
                serie2: Number(item[oldlogin_user])
              })
            } else {
              newData[newData_obj[date] - 1].serie1 += item[newlogin_user] * 1
              newData[newData_obj[date] - 1].serie2 += item[oldlogin_user] * 1
            }
          });
          newData=newData.sort((a,b)=>{
            return moment(a.count_time)-moment(b.count_time)
          })
          result.category = [];
          result.series = [{
              name: newlogin_user,
              type: 'area',
              data: []
            },
            {
              name: oldlogin_user,
              type: 'area',
              data: []
            }
          ]
          newData.forEach((dt) => {
            result.category.push(dt.count_time)
            result.series[0].data.push(dt.serie1)
            result.series[1].data.push(dt.serie2)
          })
        } else if (this.type == 3) {
          /*格式化数据*/
          data.forEach(item => {
            let date = item[count_date]
            if (!newData_obj.hasOwnProperty(item[count_date])) {
              newData_obj[date] = newData.push({
                count_time: date,
                serie1: Number(item[logincounts_avg])
              })
            } else {
              newData[newData_obj[date] - 1].serie1 += item[logincounts_avg] * 1
            }
          });
          newData=newData.sort((a,b)=>{
            return moment(a.count_time)-moment(b.count_time)
          })
          result.category = [];
          result.series = [{
            name: logincounts_avg,
            type: 'area',
            data: []
          }]
          newData.forEach((dt) => {
            result.category.push(dt.count_time)
            result.series[0].data.push(dt.serie1)
          })
        }
        //  result.category = category;
        //  result.series = series;
        return result;
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(v, ov) {
          if (v != ov) {
            this.drawChart();
          }
        }
      },
      type: function (v, ov) {
        if (v != ov) {
          this.drawChart();
        }
      }
    }
  }

</script>

<style lang="scss" scoped>

      .table-content {
        overflow: auto;
        width: 100%;
        max-height: 500px;
      }

</style>
