<template>
  <div id="retain-user">
    <div class="content-header">
      <moduleHeader :header="header" :dateList="dateList"></moduleHeader>
    </div>
    <div class="content-body">
      <div class="card-box">
        <card>
          <div slot="header">
            <div class="card-header-title">{{$t('common.IndexKey')}}</div>
            <div class="tabs">
              <div class="tab-item" :class="{'active':type==0}" @click="type=0">注册留存</div>
              <div class="tab-item" :class="{'active':type==1}" @click="type=1">全新留存</div>
              <div class="tab-item" :class="{'active':type==2}" @click="type=2">新增设备留存</div>
            </div>
          </div>
          <div slot="body">
            <div id="retainUserChart"></div>
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
import moduleHeader from 'src/views/modules/module-header.vue'
import card from 'src/components/card.vue'
  import api from 'src/services/api'
  import normalTable from 'src/components/normal-table.vue'
   
  import utils from 'src/utils/utils'
export default {
  components: {
    moduleHeader, card,
  },
  data() {
    return {
      header: {
        title: '留存用户',
        definedContent: '',
        isShowIndex: true,
      },
      date1: moment().add(-1, "day").format("YYYY-MM-DD"),
      date2: moment().add(-1, "day").format("YYYY-MM-DD"),

      currencyType: 0,
      type: 0,
      tableData: [],
      columnData:[]
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
          change: (newDate) => {
            this.date1 = newDate.startDate;
            this.date2 = newDate.endDate;
            this.query();
          }
        }]
      },
    },
  mounted() {
    this.query();
  },
  methods: {
    query() {
      var params = {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date2,
          dataview: this.$store.state.common.nowmenu.dataView[0],
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS']
        }
        api.user.getQuery(params).then(data => {
          if (data.code == 401) {
            this.tableData = data.state[0];
            this.columnData = data.state[1] ? data.state[1] : [];
            this.drawChart();
          } else {
            // console.log(data)
            Utils.Notification.error({
              message: data.message
            })
          }
        })
    },
  }
}
</script>
<style lang="scss">

</style>