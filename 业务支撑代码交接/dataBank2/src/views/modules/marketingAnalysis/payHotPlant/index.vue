<template>
  <section id="fashion-consum">
    <div class="content-header">
      <moduleHeader :dateList="dateList" :isShowReg="true" @datetypeChange="datetypeChange"></moduleHeader>
    </div>
    <div class="content-body">
       <card>
        <div slot="header">
          <div class="card-header-title">关键指标</div>
        </div>
        <div slot="body">
          <div class="chart-group-row" v-show="tableData.length>0">
            <div class="chart-item">
              <div id="hotPayChart1" class="charts"></div>  
              <div class="chart-desc"><span>消费人数分布</span></div>
            </div>
            <div class="chart-item">
              <div id="hotPayChart2" class="charts"></div>  
              <div class="chart-desc"><span>消费总额分布</span></div>
            </div>
            <div class="chart-item">
              <div id="hotPayChart3" class="charts"></div>  
              <div class="chart-desc"><span>人均消费分布</span></div>
            </div>
          </div>
          <div class="chart-nodata" v-if="tableData.length==0">暂无数据</div>
        </div>
      </card>
      
      <card>
        <div slot="header">
          <div class="card-header-title">详细数据</div>
          <div class="export-link">
            <a href="javascript:void(0)" @click="exportData"><i class="icon-download"></i>导出数据</a>
          </div>
        </div>
        <div slot="body">
          <div class="table-content">
            <normalTable :tableData="tableData"></normalTable>
          </div>
        </div>
      </card>
    </div>
  </section>
</template>

<script>
import moduleHeader from "src/views/modules/module-header";
import card from "src/components/card.vue";
import normalTable from "src/components/table/element-table.vue";
import api from "src/services/api";
export default {
  name: "pay-hot-plant",
  components: {
    // datepicker,
    moduleHeader,
    card,
    normalTable
  },
  data() {
    return {
      datetype: 1,
      date1: moment()
        .add(-1, "day")
        .format("YYYY-MM-DD"),

      tableData: []
    };
  },
  mounted() {
    this.query();
  },
  computed: {
    dateList() {
      return [
        {
          single: true,
          uid: "date1",
          label: "日期",
          startDate: this.date1,
          endDate: "",
          isShowDatetype: true,
          datetype: this.datetype,
          change: newDate => {
            this.date1 = newDate.startDate;
            this.query();
          }
        }
      ];
    },
    systemId() {
      return this.$store.state.common.systems.systemId;
    },
    columnDataArr() {
      return {
        template_id: utils.getColumnByIndex(0, this.goodsTypeList),
        template_name: utils.getColumnByIndex(1, this.goodsTypeList),
        item_id: utils.getColumnByIndex(2, this.hotGoodsList),
        item_name: utils.getColumnByIndex(3, this.hotGoodsList)
      };
    }
  },
  methods: {
    datetypeChange(newVal) {
      this.datetype = newVal;
      if (newVal === 1) {
        this.date1 = moment()
          .add(-1, "day")
          .format("YYYY-MM-DD");
      } else if (newVal === 2) {
        this.date1 = moment()
          .add(-1, "week")
          .day(1)
          .format("YYYY-MM-DD");
      } else if (newVal === 3) {
        this.date1 = moment()
          .add(-1, "month")
          .date(1)
          .format("YYYY-MM-DD");
      }
      this.query();
    },
    query() {
      let params = {
        isCache: 1,
        in_date1: this.date1,
        in_select_id: this.datetype, // 1 日 2 周 3 月
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezone_id: this.$store.getters["Agent/selectedIdList"],
        in_reg_channel: this.$store.getters["RegChannel/selectedIdList"],
        in_os: this.$store.getters["OS/nowOS"]
      };
      api.user.getQuery(params).then(data => {
        if (data.code == 401) {
          this.tableData = data.state[0];
          this.drawChart();
        } else {
          this.$notify.error({
            message: data.message
          });
        }
      });
    },
    exportData() {
      let params = {
        isCache: 1,
        in_date1: this.date1,
        in_select_id: this.datetype, // 1 日 2 周 3 月
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezone_id: this.$store.getters["Agent/selectedIdList"],
        in_reg_channel: this.$store.getters["RegChannel/selectedIdList"],
        in_os: this.$store.getters["OS/nowOS"]
      };
      api.user.exportData(params);
    },
    drawChart() {
      this.drawChart1();
      this.drawChart2();
      this.drawChart3();
    },
    drawChart1() {
      // 第一个饼图
      let payrange = utils.getColumnByIndex(0, this.tableData); // 消费区间
      let paycount = utils.getColumnByIndex(2, this.tableData); // 消费人数
      let pieData = [
        {
          name: "消费人数分布",
          data: []
        }
      ];
      this.tableData.forEach(item => {
        console.log()
        pieData[0].data.push([item[payrange], Number(item[paycount].replace(/,/g,''))]);
      });
      highchartUtil.drawPieChart("hotPayChart1", pieData);
    },
    drawChart2() {
      // 第二个饼图
      let payrange = utils.getColumnByIndex(0, this.tableData); // 消费区间
      let paytotal = utils.getColumnByIndex(1, this.tableData); // 消费总额
      let pieData = [
        {
          name: "消费总额分布",
          data: []
        }
      ];
      this.tableData.forEach(item => {
        pieData[0].data.push([item[payrange], Number(item[paytotal].replace(/,/g,''))]);
      });
      highchartUtil.drawPieChart("hotPayChart2", pieData);
    },
    drawChart3() {
      let payrange = utils.getColumnByIndex(0, this.tableData); // 消费区间
      let percentpay = utils.getColumnByIndex(3, this.tableData); // 消费总额
      let categories = [];
      let seriesData = [
        {
          name: percentpay,
          data: []
        }
      ];
      this.tableData.forEach(item => {
        categories.push(item[payrange]);
        seriesData[0].data.push(Number(item[percentpay].replace(/,/g,'')));
      });
      highchartUtil.drawChart("hotPayChart3", "column", categories, seriesData);
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-group-row {
  width:100%;
  height:100%;
  // display: flex;
  // justify-content: flex-start;
  // align-items: flex-start;
  .chart-item {
    // flex: 1;
    // display: flex;
    // flex-direction: column;
    // justify-content: flex-start;
    // align-items: center;
    width:33%;
    height:100%;
    display: inline-block;
    position: relative;
    padding-bottom: 40px;
    // text-align: center;
    .charts {
      width: 100%;
      height: 400px;
    }
    .chart-desc {
      width: 100px;
      background-color: #f2f2f2;
      border: 1px solid #d7d7d7;
      padding: 5px 10px;
      border-radius: 3px;
      position: absolute;
      left:50%;
      transform: translateX(-50%);
    }
  }
}
.chart-nodata {
  text-align: center;
  color: #5e7382;
}
</style>