<template>
  <div>
    <div class="content-header">
      <moduleHeader :dateList="dateList" :isShowReg="true"></moduleHeader>
      <div class="switchs-item">
        <span class="item-header">指标:</span>
        <div class="item-content">
          <div class="bt-item" :class="{'check':type===1}" @click="type=1">战斗人数</div>
          <div class="bt-item" :class="{'check':type===2}" @click="type=2">战斗场次</div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <card>
        <div slot="header">{{$t('common.IndexKey')}}</div>
        <div slot="body" class="flex-row">
          <div class="war-type-table">
            <table class="table" v-if="selectedList.length>0">
              <thead>
                <tr>
                  <th></th>
                  <template v-for="(item,index) in templateColumnArr">
                    <th>{{item}}</th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in templateList">
                  <td><input type="checkbox" v-model="selectedList" :value="item"></td>
                  <td>{{item[columnData.template_name]}}</td>
                  <td>{{item[columnData.day_avg]}}</td>
                  <td>{{item[columnData.rate]+'%'}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="10" style="color:red;">提示:最多只能选五个!</td>
                </tr>
              </tfoot>
            </table>

          </div>
          <div class="chart-group">
            <div id="warTypeChart" class="charts"></div>
          </div>
        </div>
      </card>
      <card>
        <div slot="header">
          <div class="card-header-title">{{$t('common.DataDetails')}}</div>
          <div class="export-link">
            <a href="javascript:void(0)" @click="exportData"><i class="icon-download"></i>导出数据</a>
          </div>
        </div>
        <div slot="body">
          <div class="table-content">
            <normalTable :tableData="reverseTableData" :columnWidthObj="{0:150,1:150,2:150,3:150,4:150,5:150,6:150,7:150,8:150,9:150,10:150,11:150,12:150,13:150}"></normalTable>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
  import moduleHeader from 'src/views/modules/module-header.vue'
  import card from 'src/components/card.vue'
  import normalTable from 'src/components/table/element-table.vue'
  import api from 'src/services/api'
  export default {
    name: 'war-type-analysis',
    components: {
      moduleHeader, card, normalTable
    },
    data() {
      return {
        date1: moment().add(-7, 'day').format('YYYY-MM-DD'),
        date2: moment().add(-1, 'day').format('YYYY-MM-DD'),
        type: 1,

        templateList: [],
        tableData: [],

        selectedList: [],
      }
    },
    computed: {
      dateList() {
        return [{
          single: false,
          uid: 'date1',
          label: '日期',
          startDate: this.date1,
          endDate: this.date2,
          isShowDatetype: false,
          change: (newDate) => {
            this.date1 = newDate.startDate;
            this.date2 = newDate.endDate;
            this.query();
          }
        }]
      },
      columnData() {
        return {
          template_name: utils.getColumnByIndex(0, this.templateList),
          day_avg: utils.getColumnByIndex(1, this.templateList),
          rate: utils.getColumnByIndex(2, this.templateList),
        }
      },
      templateColumnArr() {
        let result = [];
        if (this.templateList && this.templateList.length > 0) {
          for (let index in this.templateList[0]) {
            result.push(index);
          }
        }
        return result;
      },
      reverseTableData() {
        let result = this.tableData.map(item => {
          return item
        })
        result.reverse()
        return result
      },
    },
    mounted() {
      this.query()
    },
    methods: {
      getParams() {
        return {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date2,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          in_type_id: this.type
        }
      },
      query() {
        var params = this.getParams()
        api.user.getQuery(params).then(data => {
          if (data.code == 401) {
            this.templateList = data.state[0];
            this.tableData = data.state[1];
            this.columnData = data.state[2] ? data.state[2] : [];

            // if(this.selectedList.length===0){
            this.selectedList = []
            for (let i = 0; i < this.templateList.length; i++) {
              if (i < 5) {
                this.selectedList.push(this.templateList[i])
              }
            }
            // }
            this.drawChart();
          }
          else {
            // console.log(data)
            Utils.Notification.error({ message: data.message })
          }
        })
      },
      exportData() {
        var params = this.getParams()
        api.user.exportData(params)
      },
      drawChart() {
        let template_name = utils.getColumnByIndex(0, this.templateList)

        let count_date = utils.getColumnByIndex(0, this.tableData)

        let categories = []
        let seriesData = []
        this.selectedList.forEach(list => {
          seriesData.push({
            name: list[template_name],
            data: []
          })
        })
        this.tableData.forEach(item => {
          categories.push(item[count_date])
          seriesData.forEach(a => {
            a.data.push(Number(item[a.name].replace(/,/g, '')))
          })
        })
        highchartUtil.drawChart('warTypeChart', 'spline', categories, seriesData)
      }
    },
    watch: {
      type(v, ov) {
        if (v != ov) {
          this.query()
        }
      },
      selectedList(v, ov) {
        if (v.length > 5) {
          Utils.Notification.warning({ message: '最多只能选择五个!' })
          this.selectedList = ov;
        } else {
          this.drawChart()
        }
      }
    }
  }

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

  .flex-row {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .war-type-table {
      flex: 4;
      white-space: nowrap;
      max-height: 400px;
      overflow-y: auto;
    }
    .chart-group {
      flex: 8;
    }
  }



  .table-content {
    white-space: nowrap;
    overflow-y: auto;
  }
</style>