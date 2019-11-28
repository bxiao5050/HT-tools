<template>
  <div>
    <div class="content-header">
      <moduleHeader :dateList="dateList" :isShowReg="true"></moduleHeader>
      <div class="switchs-item">
        <span class="item-header">副本难度:</span>
        <div class="item-content">
          <div class="bt-item" :class="{'check': type===0 }" @click="type=0">全部</div>
          <div class="bt-item" v-for="item in typeList" :class="{'check': item.id===type}" @click="type=item.id">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="content-body">

      <card>
        <div slot="header">关键指标数据</div>
        <div slot="body">
          <div id="copyChart" class="charts"></div>
        </div>
      </card>

      <card>
        <div slot="header">
          <div class="card-header-title">{{$t('common.DataDetails')}}</div>
          <div class="export-link">
            <a href="javascript:void(0)" @click="exportData">
              <i class="icon-download"></i>导出数据</a>
          </div>
        </div>
        <div slot="body">
          <div class="table-content">
            <normalTable :tableData="tableData"></normalTable>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import moduleHeader from "src/views/modules/module-header.vue";
import card from "src/components/card.vue";
import normalTable from "src/components/normal-table.vue";
import api from "src/services/api";
export default {
  name: "tourists-conversion",
  components: {
    card,
    moduleHeader,
    normalTable
  },
  data() {
    return {
      date1: moment()
        .add(-7, "day")
        .format("YYYY-MM-DD"),
      date2: moment()
        .add(-1, "day")
        .format("YYYY-MM-DD"),
      type: 0,
      typeList: [
        {
          id: 1,
          name: "普通"
        },
        {
          id: 2,
          name: "困难"
        },
        {
          id: 3,
          name: "英雄"
        },
        {
          id: 4,
          name: "王者"
        }
      ],
      tableData: [],
      columnData: []
    };
  },
  computed: {
    dateList() {
      return [
        {
          single: false,
          uid: "date1",
          label: "日期",
          startDate: this.date1,
          endDate: this.date2,
          isShowDatetype: false,
          change: newDate => {
            this.date1 = newDate.startDate;
            this.date2 = newDate.endDate;
            this.query();
          }
        }
      ];
    }
  },
  mounted() {
    this.query();
  },
  methods: {
    getParams() {
      return {
        isCache: 1,
        in_date1: this.date1,
        in_date2: this.date2,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_reg_channel: this.$store.getters["RegChannel/selectedIdList"],
        in_gamezone_id: this.$store.getters["Agent/selectedIdList"],
        in_os: this.$store.getters["OS/nowOS"],
        in_type_id: this.type
      };
    },
    query() {
      var params = this.getParams();
      api.user.getQuery(params).then(data => {
        if (data.code == 401) {
          this.tableData = data.state[0];
          this.columnData = data.state[1] ? data.state[1] : [];
          this.drawChart();
        } else {
          // console.log(data)
          Utils.Notification.error({ message: data.message });
        }
      });
    },
    exportData() {
      var params = this.getParams();
      api.user.exportData(params);
    },
    drawChart() {
      let template_name = utils.getColumnByIndex(0, this.tableData);

      let join_user = utils.getColumnByIndex(2, this.tableData);
      let pass_rate = utils.getColumnByIndex(3, this.tableData);

      let categories = [];
      let seriesData = [
        {
          name: join_user,
          data: []
        },
        {
          name: pass_rate,
          data: []
        }
      ];
      this.tableData.forEach(item => {
        categories.push(item[template_name]);
        seriesData[0].data.push(Number(item[join_user].split("%")[0]));
        seriesData[1].data.push(Number(item[pass_rate]));
      });

      highchartUtil.drawChart("copyChart", "spline", categories, seriesData);
    }
  },
  watch: {
    type(v, ov) {
      if (v != ov) {
        this.query();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.item-content {
  margin-right: 15px;
  float: left;
  line-height: 30px;
  .bt-item {
    cursor: pointer;
    padding: 0 15px;
    float: left;
    background-color: #fff;
    border: 1px solid #bbb;
    border-right: 0;
    text-align: center;
    &:last-child {
      border-right: 1px solid #bbb;
    }
  }
  .bt-item.check {
    font-weight: 700;
    color: #fff;
    background-color: #fc9153;
  }
}
.table-content {
}
</style>