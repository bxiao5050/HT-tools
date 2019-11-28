<template>
  <div>
    <card>
      <div slot="header">{{now?(now.name+'-'):''}}各等级玩家携带的武器人均战斗次数TOP20
      </div>
      <div slot="body">
        <div class="switchs-item">
          <span class="item-header">充值区间：</span>
          <div class="item-content">
            <div v-for="(item,index) in payRange" :key="index" class="bt-item" :class="{'check':chartChargeType==index}" @click="chartChargeType=index">{{item}}</div>
          </div>
        </div>
        <div id="petChart" class="charts" v-show="chartData.length>0"></div>
        <div class="chart-nodata" v-if="chartData.length==0">暂无数据</div>
      </div>
    </card>

    <card>
      <div slot="header">
        <div class="card-header-title">{{now?(now.name+'-'):''}}各等级玩家携带的武器战斗次数/人均战斗次数/占比分布</div>
          <div class="export-link">
            <a href="javascript:void(0)" @click="exportData"><i class="icon-download"></i>导出数据</a>
          </div>
      </div>
      <div slot="body">
         <div class="switchs-item">
          <span class="item-header">充值区间：</span>
          <div class="item-content">
             <div v-for="(item,index) in payRange" :key="index" class="bt-item" :class="{'check':tableChargeType==index}" @click="tableChargeType=index">{{item}}</div>
          </div>
        </div>
         <div class="switchs-item">
          <span class="item-header">类型：</span>
          <div class="item-content">
            <div class="bt-item" :class="{'check':type==1}" @click="type=1">总战斗次数</div>
            <div class="bt-item" :class="{'check':type==2}" @click="type=2">人均战斗次数</div>
            <div class="bt-item" :class="{'check':type==3}" @click="type=3">占比</div>
          </div>
        </div>
        <div class="table-content">
          <normalTable :hideColumn="paytype" :tableData="filterTableData"></normalTable>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import card from "src/components/card.vue";
import normalTable from "src/components/table/element-table.vue";
export default {
  name: "arms-system",
  components: {
    card,
    normalTable
  },
  props: ["date1", "now"],
  data() {
    return {
      chartChargeType: 0,
      tableChargeType: 0,
      type: 1,

      payRange: ["全部", "大R", "中R", "中小R", "小R", "非R"],
      sourceData: [], // 包括全部充值区间的数据源
      chartData: []
    };
  },
  computed: {
    filterChartData() {
      var paytype = utils.getColumnByIndex(1, this.chartData);
      let filterStr = "";
      filterStr = this.payRange[this.chartChargeType];
      let index = 0;
      return this.chartData.filter(item => {
        return item[paytype] === filterStr && index < 20 && ++index;
      });
    },
    filterTableData() {
      var paytype = utils.getColumnByIndex(1, this.sourceData);
      let filterStr = "";
      filterStr = this.payRange[this.tableChargeType];
      return this.sourceData.filter(item => {
        return item[paytype] === filterStr;
      });
    },
    paytype() {
      return utils.getColumnByIndex(1, this.sourceData);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$emit("query", { in_select_id: 2 }, "chart"); // 查询图表数据(人均战斗次数)
      this.$emit("query", { in_select_id: this.type }); // 查询表格数据
    },
    dataProvider(pdata, key) {
      let sortStr = utils.getColumnByIndex(2, pdata[0]);
      if (key && key === "chart") {
        this.chartData =
          pdata[0].sort((a, b) => {
            return Number(b[sortStr]) - Number(a[sortStr]);
          }) || [];
        this.drawChart();
      } else {
        this.sourceData =
          pdata[0].sort((a, b) => {
            return Number(b[sortStr]) - Number(a[sortStr]);
          }) || [];
      }
    },
    exportData() {
      this.$emit("exportData", { in_select_id: this.type });
    },
    drawChart() {
      let filterChartData = this.filterChartData;
      let petname = utils.getColumnByIndex(0, filterChartData);
      let payrange = utils.getColumnByIndex(1, filterChartData);
      let perwarcount = utils.getColumnByIndex(2, filterChartData);

      let categories = [];
      let seriesData = [];
      for (let i = 0; i < filterChartData.length; i++) {
        for (let index in filterChartData[i]) {
          if (index != petname && index != payrange && index != perwarcount) {
            seriesData.push({
              name: index,
              data: []
            });
          }
        }
        break;
      }
      filterChartData.forEach(item => {
        categories.push(item[petname]);
        seriesData.forEach(serie => {
          serie.data.push(
            Number(item[serie.name].replace(/,/g, "").split("%")[0])
          );
        });
      });
      highchartUtil.drawChart("petChart", "column", categories, seriesData);
    }
  },
  watch: {
    chartChargeType(v, ov) {
      if (v != ov) {
        this.drawChart();
      }
    },
    date1(v, ov) {
      if (v != ov) {
        this.type = 1;
        this.chartChargeType = 0;
        this.tableChargeType = 0;
        this.init();
      }
    },
    type(v, ov) {
      if (v != ov) {
        // this.drawChart()
        this.$emit("query", { in_select_id: this.type });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.switchs-item {
  padding: 0 0 10px 0px;
  .item-header {
    width: 80px;
    text-align: right;
  }
  .item-content {
    margin-right: 15px;
    // float: left;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    line-height: 30px;
    .bt-item {
      cursor: pointer;
      padding: 0 15px;
      // float: left;
      // width: 100px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-right: 0;
      text-align: center;
      &:last-child {
        border-right: 1px solid #ddd;
      }
    }
    .bt-item.check {
      font-weight: 700;
      color: #fff;
      background-color: #fc9153;
      border: 1px solid #fc9153;
    }
  }
}
.chart-nodata {
  text-align: center;
  color: #5e7382;
}
</style>