<template>
  <div id="first-pay">
    <div class="content-header">
      <moduleHeader :isShowReg="config[systemId].isShowRegChannel" :isShowPay="config[systemId].isShowPayChannel" :dateList="dateList"></moduleHeader>
    </div>
    <div class="content-body">
      <div class="card-box">
        <card>
          <div slot="header">
              <div class="card-header-title">{{$t('common.DataDetails')}}</div>
              <div class="tabs">
              <div class="tab-item" :class="{'active':type==1}" @click="type=1">区间新增大R</div>
              <div class="tab-item" :class="{'active':type==2}" @click="type=2">充值大R</div>
            </div>
              <div class="export-link">
                <a href="javascript:void(0)" @click="exportData"><i class="icon-download"></i>导出数据</a>
              </div>
          </div>
          <div slot="body">
            <div class="table-content">
              <normalTable :tableData="tableData" :columnWidthObj="{2:160,3:140,5:220,7:160}"></normalTable>
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
import api from 'src/services/api'
import normalTable from 'src/components/table/element-table.vue'
export default {
  name:'R-account',
  components: {
    moduleHeader, card,normalTable
  },
  data() {
    return {
      datetype:1,
      date1: moment().add(-7, "day").format("YYYY-MM-DD"),
      date2: moment().add(-1, "day").format("YYYY-MM-DD"),

      tableData: [],
      type: 1,

      config: {
        1: {
          isShowRegChannel: true,
          isShowPayChannel: true
        },
        2: {
          isShowRegChannel: true,
          isShowPayChannel: false
        },
        3: {
          isShowRegChannel: true,
          isShowPayChannel: true
        }
      }
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
          datetype:this.datetype,
          change: (newDate) => { this.date1 = newDate.startDate; this.date2 = newDate.endDate; this.query(); }
        }]
    },
    systemId(){
      return this.$store.state.common.systems.systemId
    }
  },
  mounted() {
    this.query();
  },
  methods: {
    // datetypeChange(newVal) {
    //   this.datetype = newVal;
    //   if (newVal == 1) {
    //     this.date1 = moment().add(-7, "day").format('YYYY-MM-DD');
    //     this.date2 = moment().add(-1, "day").format('YYYY-MM-DD');
    //   }
    //   else if (newVal == 2) {
    //     this.date1 = moment().add(-7, "week").day(1).format('YYYY-MM-DD');
    //     this.date2 = moment().add(-1, "week").day(7).format('YYYY-MM-DD');
    //   }
    //   else if (newVal == 3) {
    //     this.date1 = moment().add(-7, "month").date(1).format('YYYY-MM-DD');
    //     this.date2 = moment().date(1).add(-1, 'day').format('YYYY-MM-DD');
    //   }
    //   this.query();
    // },
    getParams(){
      // 2 海外发行分析系统
       return {
            isCache: 1,
            in_date1: this.date1,
            in_date2: this.date2,
            dataview: this.$store.state.common.nowmenu.dataView[0],
            in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
            in_channel_id: this.$store.getters['RegChannel/selected2IdList'],
            in_package_id: this.$store.getters['RegChannel/selected3IdList'],
            in_config_id: this.type
          }
    },
    query() {
      this.tableData = []
       var params=this.getParams()
      api.user.getQuery(params).then(data=>{
        if(data.code==401){
          this.tableData=data.state[0];
        }
        else{
          // console.log(data)
          Utils.Notification.error({message:data.message})
        }
      })
    },
    exportData(){
      var params=this.getParams()
      api.user.exportData(params)
    }
  },
  watch:{
    type(v,ov){
      if(v!=ov){
        this.query()
      }
    }
  }
}
</script>
<style lang="scss">

</style>
