<template>
  <div>
    <nv-date-picker :date="date" :dateChange="dateChange"></nv-date-picker>
    <switchChart :chartData="chartData" :catagoryName="catagoryName" :catagoryTitle="catagoryTitle" :stackName="stackName"></switchChart>
    <sort-table :tableData="tableData" :catagoryName="catagoryName" :head="stackName" :tableTitle="tableTitle"></sort-table>
  </div>
</template>
<script>
  import nvDatePicker from '../../components/range-datepicker.vue'
  import switchChart from '../../components/launchReport/switchChart.vue'
  import sortTable from '../../components/launchReport/sort-table.vue'
  import httpRequest from '../../utils/httpRequest.js'
  import commonMethod from '../../utils/commonMethod.js'
  import {
    Toast
  } from 'mint-ui'
  export default {
    components: {
      nvDatePicker,
      switchChart,
      sortTable
    },
    data: function () {
      return {
        date:{
          startTime: window.moment().add(-15, "days").format("YYYY-MM-DD"),
          endTime:window.moment().add(-2, "days").format("YYYY-MM-DD")
        },
        catagoryName:'媒体',
        stackName:'纬度',
        catagoryTitle:['激活','注册率','创角','花费'],
        tableTitle:['激活','注册','创角','花费','注册率','创角率','激活成本','注册成本','创角成本','充值','ROI','LTV','次日留存','3日留存','7日留存'],
        tableData:[],
        chartData:[]
      }
    },
    mounted: function () {
      var oldMenu = this.$store.state.launchAreaStore.oldMenu;
      var nowmenu = this.$store.state.basestore.nowmenu;
      if (oldMenu == null || oldMenu.menu_id != nowmenu.menu_id) {
        this.$store.dispatch("setDataRepairAppData", this.$store.state.launchAreaStore.appData);
        this.$store.dispatch("setOldMenu", nowmenu);
      }
      this.query();
    },
    methods: {
      dateChange: function (newDate) {
        if(newDate.startTime != this.date.startTime || newDate.endTime != this.date.endTime){
            this.date = newDate;
            this.query();
        }
      },
      query: function () {
        var parms = {date1:this.date.startTime,date2:this.date.endTime};
        httpRequest.getMediaReportData(parms,(data)=> {
            var result = data.result[0];
            var total = {
              媒体:'Total',
              激活:0,
              注册:0,
              创角:0,
              花费:0,
              充值:0,
              次日留存:0,
              "3日留存":0,
              "7日留存":0,
              MonthCharge:0,
              MonthInstall:0
            };
            result.forEach((item)=>{
              total.纬度 = item.纬度;
              total.激活 += item.激活;
              total.注册 += item.注册;
              total.创角 += item.创角;
              total.花费 += item.花费;
              total.充值 += item.充值;
              total.次日留存 += item.次日留存;
              total["3日留存"] += item["3日留存"];
              total["7日留存"] += item["7日留存"];
              total.MonthCharge += item.MonthCharge;
              total.MonthInstall += item.MonthInstall;
            });

            total.注册率 = (total.注册*100/total.激活).toFixed(2) + '%';
            total.创角率 = (total.创角*100/total.激活).toFixed(2)+ '%';
            total.激活成本 = (total.花费/total.激活).toFixed(2);
            total.注册成本 = (total.花费/total.注册).toFixed(2);
            total.创角成本 = (total.花费/total.创角).toFixed(2);
            total.ROI = (total.充值/total.花费).toFixed(2)+'%';
            total.LTV = (total.MonthCharge/total.MonthInstall).toFixed(2);
            total.次日留存 = (total.次日留存*100/total.激活).toFixed(2)+'%';
            total["3日留存"] =  (total["3日留存"]*100/total.激活).toFixed(2)+'%';
            total["7日留存"] =  (total["7日留存"]*100/total.激活).toFixed(2)+'%'
            total.充值 = total.充值.toFixed(2);
            total.花费 = total.花费.toFixed(2);
            result = result.map((item)=>{
              item.LTV = (item.MonthCharge/item.MonthInstall).toFixed(2);
              item.注册率 = item.注册率.toFixed(2)+'%'
              item.创角率 =  item.创角率.toFixed(2)+'%';
              item.ROI = item.ROI + '%';
              item.次日留存 = (item.次日留存*100/item.激活).toFixed(2)+'%';
              item["3日留存"] =  (item["3日留存"]*100/item.激活).toFixed(2)+'%';
              item["7日留存"] =  (item["7日留存"]*100/item.激活).toFixed(2)+'%';
              return item;});
          result.push(total);
          this.tableData = result;
        });
        httpRequest.getMediaReportBySystemCompareData(parms,(data)=> {
          var result = data.result[0];
          this.chartData = result;
        });
      }
    },
    watch: {
    }
  }

</script>
<style lang="scss">


</style>
