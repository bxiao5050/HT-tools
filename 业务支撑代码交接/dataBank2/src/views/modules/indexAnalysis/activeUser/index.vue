<template>
  <section id="active-user">
    <div class="content-header">
      <moduleHeader :isShowReg="true" :dateList="dateList"></moduleHeader>
    </div>
    <div class="content-body">
      <component ref="chartModel" :is="currentView" :type="type" :typeChange="changeType" :columnData="columnData" :chartData="tableData"></component>
        <card>
          <div slot="header">
             <div class="card-header-title">{{$t('common.DataDetails')}}</div>
          <div class="export-link">
            <a href="javascript:void(0)" @click="exportData"><i class="icon-download"></i>导出数据</a>
          </div>
          </div>
          <div slot="body">
            <div class="table-content">
            <normalTable :tableData="reverseTableData"></normalTable>
            </div>
          </div>
        </card>
    </div>
  </section>
</template>

<script>
  import moduleHeader from 'src/views/modules/module-header'
  import card from 'src/components/card.vue'
  import api from 'src/services/api'
  import normalTable from 'src/components/table/element-table.vue'
  import chartModel_e8 from './components/chartModel_e8.vue'
  import chartModel from './components/chartModel.vue'
  export default {
    name: 'active-user',
    components: {
      moduleHeader, card,normalTable,chartModel_e8,chartModel
    },
    data() {
      return {
        date1: moment().add(-7, "day").format("YYYY-MM-DD"),
        date2: moment().add(-1, "day").format("YYYY-MM-DD"),
        tableData: [],
        columnData: [],
        type: 1,
      }
    },
    mounted() {
      this.query()
    },
    computed: {
      dateList() {
        return [
          {
            single: false,
            uid: 'date1',
            label: this.$t('common.Date'),
            startDate: this.date1,
            endDate: this.date2,
            isShowDatetype: false,
            change: (newDate) => { this.date1 = newDate.startDate; this.date2 = newDate.endDate; this.query(); }
          }]
      },
      currentView(){
          var systemId= this.$store.state.common.systems.systemId;
          if(systemId==3){//Efunfun或者88box
            return 'chartModel_e8'
          }
          else{
            return 'chartModel'
          }
        },
        systemId(){
          return this.$store.state.common.systems.systemId;
        },
        reverseTableData(){
        let result = this.tableData.map(item=>{
          return item
        })
        result.reverse()
        return result
      },
      },
    methods: {
      changeType(type){
        this.type=type;
      },
      getParams(){
        if(this.systemId==1){
          return {
            isCache: 1,
            in_date1: this.date1,
            in_date2: this.date2,
            dataview: this.$store.state.common.nowmenu.dataView,
            in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
            in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
            in_os: this.$store.getters['OS/nowOS']
          }
        }
        else if(this.systemId==3){
          return {
            isCache: 1,
            in_date1: this.date1,
            in_date: this.date2,
            dataview: this.$store.state.common.nowmenu.dataView,
            in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
            in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
            in_platform: '1,2'
          }
        }
      },
      query() {
        var params=this.getParams()
        api.user.getQuery(params).then((data)=>{
          if(data.code==401){
          this.tableData=data.state[0];
          this.columnData=data.state[1]?data.state[1]:[];
          this.$refs.chartModel.drawChart();
          }
          else{
            Utils.Notification.error({message:data.message})
            console.error(data.message);
          }
        })
      },
      exportData(){
         var params=this.getParams()
        api.user.exportData(params)
      },
    }
  }

</script>

<style lang="scss" scoped>

      .table-content {
        overflow: auto;
        width: 100%;
        max-height: 500px;
        white-space: nowrap;
      }
</style>