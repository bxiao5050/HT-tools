<template>
  <div id="dish-plate">
    <div class="content-header">
      <moduleHeader :dateList="dateList" :isShowReg="true" :isShowPay="systemId==1?true:false" @datetypeChange="datetypeChange"></moduleHeader>
    </div>
    <div class="content-body">
        <card>
          <div slot="header">
            <div class="card-header-title">
              <div class="card-header-title">{{$t('common.IndexKey')}}</div>
              <div class="export-link">
                <a href="javascript:void(0)" @click="exportData"><i class="icon-download"></i>导出数据</a>
              </div>
            </div>
            <div class="tabs">
              <div class="tab-item" :class="{'active':type==1}" @click="type=1">{{$t('dishPlate.registerUser')}}</div>
              <div class="tab-item" :class="{'active':type==2}" @click="type=2">{{$t('dishPlate.activeUser')}}</div>
              <div class="tab-item" :class="{'active':type==3}" @click="type=3">{{$t('dishPlate.onlineTop')}}</div>
              <div class="tab-item" :class="{'active':type==4}" @click="type=4">{{$t('dishPlate.payUser')}}</div>
              <div class="tab-item" :class="{'active':type==5}" @click="type=5">{{$t('dishPlate.payMoney')}}</div>
              <div class="tab-item" :class="{'active':type==6}" @click="type=6">{{$t('dishPlate.payARPU')}}</div>
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
  import moduleHeader from 'src/views/modules/module-header'
  import card from 'src/components/card.vue'
  import api from 'src/services/api'
  import normalTable from 'src/components/table/element-table.vue'
   
  export default {
    name: 'dish-plate',
    components: {
      moduleHeader,
      card,
      normalTable
    },
    data() {
      return {
        type: 1,
        datetype: 1,
        date1: moment().add(-1, "day").format("YYYY-MM-DD"),
        date2: moment().add(-1, "day").format("YYYY-MM-DD"),
        tableData: [],

        dates: [],
      }
    },
    mounted() {
      this.query();
    },
    computed: {
      dateList() {
        return [{
          single: this.systemId==1?true:(this.sytemId==3?false:false),
          uid: 'date1',
          label: this.$t('common.Date'),
          startDate: this.date1,
          endDate: this.date2,
          isShowDatetype: true,
          datetype: this.datetype,
          change: (newDate) => {
            this.date1 = newDate.startDate;
            this.date2 = newDate.endDate;
            this.query();
          }
        }]
      },
      systemId(){
        return this.$store.state.common.systems.systemId
      }
    },
    methods: {
      datetypeChange(newVal) {
        this.datetype = newVal;
        if (newVal == 1) {
          this.date1 = moment().add(-1, "day").format('YYYY-MM-DD');
          this.date2 = moment().add(-1, "day").format('YYYY-MM-DD');
        } else if (newVal == 2) {
          this.date1 = moment().add(-1, "week").day(1).format('YYYY-MM-DD');
          this.date2 = moment().add(-1, "week").day(7).format('YYYY-MM-DD');
        } else if (newVal == 3) {
          this.date1 = moment().add(-1, "month").date(1).format('YYYY-MM-DD');
          this.date2 = moment().date(1).add(-1, 'day').format('YYYY-MM-DD');
        }
        this.query();
      },
      getParams(){
        if(this.systemId==1){
          return {
            dataview: this.$store.state.common.nowmenu.dataView,
            in_date1: this.date1,
            in_date2: this.date2,
            in_config_id: this.type,
            in_type_id: this.datetype,
            in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
            in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
            in_pay_channel: this.$store.getters['RegChannel/selectedIdList'],
            in_os: this.$store.getters['OS/nowOS'],
            isCache: 1
          }
        }
        else{
          return {
            dataview: this.$store.state.common.nowmenu.dataView,
            in_date1: this.date1,
            in_date2: this.date2,
            in_config_id: this.type,
            date_type: this.datetype,
            in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
            in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
            in_platform: '1,2',
            isCache: 1
          }
        }
      },
      query() {
        var params = this.getParams()
        api.user.getQuery(params).then((data) => {
          if (data.code == 401) {
            this.tableData = data.state[0];
          } else {
            Utils.Notification.error({message:data.message});
            console.error(data.message);
          }
        })
      },
      exportData(){
        var params = this.getParams()
        api.user.exportData(params)
      }
    },
    watch: {
      type(v, ov) {
        if (v != ov) {
          this.query();
        }
      }
    }
  }

</script>

<style lang="scss" scoped>


</style>
