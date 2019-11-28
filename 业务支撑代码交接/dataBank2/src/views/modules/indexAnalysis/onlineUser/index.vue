<template>
  <div id="online-user">
    <div class="content-header">
      <moduleHeader :header="header" :dateList="dateList"></moduleHeader>
    </div>
    <div class="content-body">
      <div class="card-box">
        <card>
          <div slot="header">
            <div class="card-header-title">关键指标数据</div>
            <div class="tabs">
              <div class="tab-item" :class="{'active':type==0}" @click="type=0">ACU</div>
              <div class="tab-item" :class="{'active':type==1}" @click="type=1">PCU</div>
              <div class="tab-item" :class="{'active':type==2}" @click="type=2">ACU/PCU</div>
              <div class="tab-item" :class="{'active':type==3}" @click="type=3">AT</div>
            </div>
          </div>
          <div slot="body">
            <div id="onlineUserChart" class="charts"></div>
          </div>
        </card>
      </div>
  
      <div class="card-box">
        <card>
          <div slot="header">详细数据</div>
          <div slot="body">
            <div class="table-content">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>日期</th>
                    <th>每日流失率</th>
                    <th>每日流失数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tableData">
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr v-if="tableData.length==0">
                    <td colspan="10">无数据</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import moduleHeader from 'src/views/modules/module-header'
import card from 'src/components/card.vue'
export default {
  components: {
    moduleHeader, card,
  },
  data() {
    return {
      header: {
        title: '在线用户',
        definedContent: '',
        isShowIndex: true,
      },
      date1: moment().add(-1, "day").format("YYYY-MM-DD"),
      date2: moment().add(-1, "day").format("YYYY-MM-DD"),

      playerType: 0,
      type: 0,

      tableData: [],
    }
  },
  computed: {
    dateList() {
      return [
        {
          single: false,
          uid: 'date1',
          label: '日期',
          startDate: this.date1,
          endDate: this.date2,
          isShowDatetype: false,
          change: (newDate) => { this.date1 = newDate.startDate; this.date2 = newDate.endDate; this.query(); }
        }]
    },
  },
  mounted() {
    this.query();
  },
  methods: {
    query() {
      this.drawChart();
    },
    drawChart() {
      var categories = ["00:00", "00:05", "00:10", "00:15", "00:20"];
      var seriesData = [
        { name: this.date1, data: [1, 2, 1, 2, 1], type: 'spline', max: 2 }
      ]
      highchartUtil.drawChart('onlineUserChart', 'spline', categories, seriesData, true)
    }
  }
}
</script>
<style lang="scss">

</style>
