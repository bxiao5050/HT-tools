<template>
  <card>
    <div slot="header">{{$t('common.TrendChart')}}</div>
    <div slot="body">
      <div class="row">
        <div id="virtualPieChart" class="charts col-md-4 col-sm-4 col-xs-4"></div>
        <div id="virtualSplineChart" class="charts col-md-8 col-sm-8 col-xs-8"></div>
      </div>
    </div>
  </card>
</template>
<script>
  import card from 'src/components/card.vue'
  export default {
    name: 'chaeView',
    props: ['chartData', 'columnData', 'sonTypeList'],
    components: {
      card
    },
    methods: {
      drawChart() {
        let count_date = utils.getColumnByIndex(0, this.chartData)//utils.getColumnKey('统计时间',this.columnData);
        let point = utils.getColumnByIndex(1, this.chartData)//utils.getColumnKey('point',this.columnData);
        let huanbi = utils.getColumnByIndex(2, this.chartData)//utils.getColumnKey('huanbi',this.columnData);
        let template_name = utils.getColumnByIndex(1, this.sonTypeList)
        var pSeriesData = [{
          name: point,
          type: 'pie',
          data: [],
          subTitle: '',
          lineData: []
        }];
        //初始化饼图数据结构
        for (let i = 0; i < this.sonTypeList.length; i++) {
          if (i < 7) {
            pSeriesData[0].data.push([this.sonTypeList[i][template_name], Number(this.sonTypeList[i][point])]) //饼图数据
          }
          else if (i == 7) {
            pSeriesData[0].data.push(['其他', 0]) //饼图数据
          } else {
            pSeriesData[0].data[7][1] += Number(this.sonTypeList[i][point])
          }
        }
        let lineData = pSeriesData[0].lineData;
        pSeriesData[0].data.forEach(item => {
          let tem_name = item[0];
          let cates = [];
          let obj = {
            subTitle: tem_name,
            cates: [],
            data: [{
              name: point,
              data: []
            }, {
              name: tem_name,
              data: []
            }]
          }
          this.chartData.forEach(cd => {
            obj.cates.push(cd[count_date])
            obj.data[0].data.push(Number(cd[point].replace(/,/g,'')))
            let count = 0;
            if (tem_name == '其他') {
              for (let index in cd) {
                if (index != count_date && index != point && index != huanbi && index != tem_name) {
                  count += Number(cd[index].replace(/,/g,''));
                }
              }
              obj.data[1].data.push(count)
            }
            else {
              obj.data[1].data.push(Number(cd[tem_name].replace(/,/g,'')))
            }
          })
          lineData.push(obj)
        })
        let pieEvent = (e) => {
          if (!e.point.sliced) {
            this.drawSpecial(e);
          }
          else {
            this.drawSimple();
          }
        }
        highchartUtil.drawPieChart('virtualPieChart', pSeriesData, pieEvent)
        this.drawSimple();
      },
      drawSimple() {
        let count_date = utils.getColumnByIndex(0, this.chartData)//utils.getColumnKey('统计时间',this.columnData);
        let point = utils.getColumnByIndex(1, this.chartData)//utils.getColumnKey('point',this.columnData);
        var categories = [];
        var seriesData = [{ name: point, data: [] }]
        this.chartData.forEach(item => {
          categories.push(item[count_date]);
          seriesData[0].data.push(Number(item[point].replace(/,/g,'')))
        })
        highchartUtil.drawChart('virtualSplineChart', 'spline', categories, seriesData, true)
      },
      drawSpecial(e) {
        let select_name = e.point.name;
        // let subTitle;
        let lineCate = [];
        let lineData = e.point.series.options.lineData;
        let lineSeriesData = [];
        lineData.forEach((item) => {
          if (item.subTitle == select_name) {
            // subTitle=item.subTitle+"-各充值区间充值人数";
            lineCate = item.cates;
            lineSeriesData = item.data;
          }
        })
        
        highchartUtil.drawChart('virtualSplineChart', 'spline', lineCate, lineSeriesData, true)
      }
    },
    watch: {
      chartData(v, ov) {
        if (v != ov) {
          this.drawChart();
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  .charts {
    min-height: 300px;
    height: 300px;
  }
</style>