<template>
  <div id="add-user">
    <div class="content-header">
      <moduleHeader :header="header" :dateList="dateList"></moduleHeader>
    </div>
    <div class="content-body">
      <div class="card-box">
        <card>
          <div slot="header">
            <div class="card-header-title">关键指标数据</div>
            <div class="tabs">
              <div class="tab-item" :class="{'active':type==0}" @click="type=0">新增用户和设备</div>
              <div class="tab-item" :class="{'active':type==1}" @click="type=1">新增活跃比</div>
            </div>
          </div>
          <div slot="body">
            <div id="addedUserChart" class="charts"></div>
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
                    <th>注册用户</th>
                    <th>全新注册用户</th>
                    <th>活跃用户</th>
                    <th>新增设备(去重)</th>
                    <th>新增活跃比</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tableData">
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>
                      <div class="progress progress-xs progress-striped active">
                        <div class="progress-bar progress-bar-success" style="width: 90%"></div>
                      </div>
                    </td>
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
        title: '新增用户',
        definedContent: '',
        isShowIndex: true,
      },
      date1: moment().add(-1, "day").format("YYYY-MM-DD"),
      date2: moment().add(-1, "day").format("YYYY-MM-DD"),

      currencyType: 0,

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
        { name: this.date1, data: [1, 2, 1, 2, 1], max: 2 },
      ]
      highchartUtil.drawChart('addedUserChart', 'spline', categories, seriesData, true)
    }
  }
}
</script>
<style lang="scss">

</style>
