<template>
        <card>
          <div slot="header">
            <div class="card-header-title">{{$t('common.IndexKey')}}</div>
            <div class="tabs">
              <div class="tab-item" :class="{'active':type==1}" @click="changeType(1)">DAU</div>
              <div class="tab-item" :class="{'active':type==2}" @click="changeType(2)">WAU</div>
              <div class="tab-item" :class="{'active':type==3}" @click="changeType(3)">MAU</div>
              <div class="tab-item" :class="{'active':type==4}" @click="changeType(4)">DAU/WAU</div>
              <div class="tab-item" :class="{'active':type==5}" @click="changeType(5)">DAU/MAU</div>
            </div>
          </div>
          <div slot="body">
            <div id="activeUserChart" class="charts"></div>
          </div>
        </card>
</template>

<script>
import card from 'src/components/card.vue'
import utils from 'src/utils/utils.js'
export default {
  name: 'chart-model-e8',
  components: {
    card
  },
  props:["type","typeChange","columnData","chartData"],
  methods: {
    changeType(type){
      this.typeChange(type);
    },
    drawChart() {
      var categories = [];
      var chartData=this.formatData(this.chartData);
      highchartUtil.drawChart('activeUserChart','area',chartData.category, chartData.series)
    },
    formatData(data){
      let count_date=utils.getColumnByIndex(0,this.chartData)//utils.getColumnKey('统计时间',this.columnData);
      let day_add_usr=utils.getColumnByIndex(1,this.chartData)//utils.getColumnKey('DAU（day_add_usr）',this.columnData);
      let day_old_user=utils.getColumnByIndex(2,this.chartData)//utils.getColumnKey('DAU（day_old_user）',this.columnData);

      let week_active_user=utils.getColumnByIndex(4,this.chartData)//utils.getColumnKey('WAU（week_active_user）',this.columnData);

      let month_active_user=utils.getColumnByIndex(5,this.chartData)//utils.getColumnKey('MAU（month_active_user）',this.columnData);

      let week_avg_active_days=utils.getColumnByIndex(6,this.chartData)//utils.getColumnKey('DAU/WAU（week_avg_active_days）',this.columnData);

      let month_avg_active_days=utils.getColumnByIndex(7,this.chartData)//utils.getColumnKey('DAU/MAU（month_avg_active_days）',this.columnData);

      var result={
        category:[],
        series:[]
      };
      let newData=[];
      if(this.type==1){
        /*格式化数据*/
        data.forEach((item) => {
          // if(newData.length==0){
            newData.push({
              count_time:item[count_date],
              serie1:Number(item[day_add_usr].replace(/,/g,'')),
              serie2:Number(item[day_old_user].replace(/,/g,''))
              })
          // }
          // else{
          //   newData.forEach((res)=>{
          //     if(item[count_date]==res['count_time']){
          //       res['serie1']+=Number(item.day_add_usr);
          //       res['serie2']+=Number(item.day_old_user);
          //     }
          //   })
          // }
        })
        // console.log(newData)
        let category=[];
        let series=[
          { name: day_add_usr, type: 'area', data: []},
          { name: day_old_user, type: 'area', data: []}]
        newData.forEach((dt)=>{
          category.push(dt.count_time)
          series[0].data.push(dt.serie1)
          series[1].data.push(dt.serie2)
        })
        result.category=category;
        result.series=series;
      }
      else if(this.type==2){
/*格式化数据*/
        data.forEach((item) => {
          // if(newData.length==0){
            newData.push({
              count_time:item[count_date],
              serie1:Number(item[week_active_user].replace(/,/g,'')), 
              })
          // }
          // else{
          //   newData.forEach((res)=>{
          //     if(item[count_date]==res['count_time']){
          //       res['serie1']+=Number(item[week_active_user]);
          //     }
          //   })
          // }
        })
        let category=[];
        let series=[{ name: week_active_user, type: 'area', data: []}]
        newData.forEach((dt)=>{
          category.push(dt.count_time)
          series[0].data.push(dt.serie1)
        })
        result.category=category;
        result.series=series;
      }
      else if(this.type==3){
/*格式化数据*/
        data.forEach((item) => {
          // if(newData.length==0){
            newData.push({
              count_time:item[count_date],
              serie1:Number(item[month_active_user].replace(/,/g,'')), 
              })
          // }
          // else{
          //   newData.forEach((res)=>{
          //     if(item[count_date]==res['count_time']){
          //       res['serie1']+=Number(item[month_active_user]);
          //     }
          //   })
          // }
        })
        let category=[];
        let series=[
          { name: month_active_user, type: 'area', data: []}]
        newData.forEach((dt)=>{
          category.push(dt.count_time)
          series[0].data.push(dt.serie1)
        })
        result.category=category;
        result.series=series;
      }
      else if(this.type==4){
/*格式化数据*/
        data.forEach((item) => {
          // if(newData.length==0){
            newData.push({
              count_time:item[count_date],
              serie1:Number(item[week_avg_active_days].replace(/,/g,'')), 
              })
          // }
          // else{
          //   newData.forEach((res)=>{
          //     if(item[count_date]==res['count_time']){
          //       res['serie1']+=Number(item[week_avg_active_days]);
          //     }
          //   })
          // }
        })
        let category=[];
        let series=[
          { name: week_avg_active_days, type: 'area', data: []}]
        newData.forEach((dt)=>{
          category.push(dt.count_time)
          series[0].data.push(dt.serie1)
        })
        result.category=category;
        result.series=series;
      }
      else if(this.type==5){
/*格式化数据*/
        data.forEach((item) => {
          // if(newData.length==0){
            newData.push({
              count_time:item[count_date],
              serie1:Number(item[month_avg_active_days].replace(/,/g,'')), //平均登录次数
              })
          // }
          // else{
          //   newData.forEach((res)=>{
          //     if(item[count_date]==res['count_time']){
          //       res['serie1']+=Number(item[month_avg_active_days]);
          //     }
          //   })
          // }
        })
        let category=[];
        let series=[
          { name: month_avg_active_days, type: 'area', data: []}]
        newData.forEach((dt)=>{
          category.push(dt.count_time)
          series[0].data.push(dt.serie1)
        })
        result.category=category;
        result.series=series;
      }
      return result;
    }
  },
  watch:{
    chartData:{
      deep:true,
      handler(v,ov){
        if(v!=ov){
          this.drawChart();
        }
      }
    },
    type:function(v,ov){
      if(v!=ov){
        this.drawChart();
      }
    }
  }
}
</script>

<style lang="scss" scoped>

    .table-content {
      overflow: auto;
      width: 100%;
      max-height: 500px;
    }
</style>