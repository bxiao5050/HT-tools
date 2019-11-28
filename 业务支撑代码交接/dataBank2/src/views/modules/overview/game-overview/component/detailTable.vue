<template>
<div>
<div class="overview-row">
      <el-card class="small-card">
        <div slot="header">
          <!-- {{item.name}} -->
          详细数据
        </div>
        <div class="overview-table-content">
          <table class="table table-hover">
            <thead>
              <tr>
                <!-- <th v-for="(column,index) in columnArr" :key="index">{{column}}</th> -->
                <th>游戏名</th>
                <th @click="sortKey='充值';desc=!desc">充值<i v-if="sortKey=='充值'" class="icon-arrow-right" :class="{'desc':desc}"></i></th>
                <th @click="sortKey='创角';desc=!desc">创角<i v-if="sortKey=='创角'" class="icon-arrow-right" :class="{'desc':desc}"></i></th>
                <th @click="sortKey='活跃';desc=!desc">活跃<i v-if="sortKey=='活跃'" class="icon-arrow-right" :class="{'desc':desc}"></i></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in sortTable" :key="index">
                <!-- <td v-for="(column,cindex) in columnArr" :key="cindex">{{item[column]}}</td> -->
                <td>{{item['游戏名']}}</td>
                <td>{{item['充值']}}</td>
                <td>{{Number(item['创角']).toFixed(0)}}</td>
                <td>{{Number(item['活跃']).toFixed(0)}}</td>
              </tr>
              <tr v-if="sortTable.length<=0">
                <td colspan="100">无数据</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style="color:#0A95FE;" v-if="tableData.length>0">
                <td>汇总</td>
                <td>{{totalData.pay}}</td>
                <td>{{Number(totalData.reg).toFixed(0)}}</td>
                <td>{{Number(totalData.active).toFixed(0)}}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </el-card>
      </div>
      </div>
</template>
<script>
export default{
  name:'country-table',
  props:['tableData'],
  data(){
    return{
      sortKey: '',
      desc: false
    }
  },
  computed:{
    // columnArr(){
    //   let arr = []
    //   if(this.tableData&&this.tableData.length>0){
    //     for(let i=0;i<this.tableData.length;i++){
    //       for(let index in this.tableData[i]){
    //         arr.push(index)
    //       }
    //       break
    //     }
    //   }
    //   return arr
    // },
        sortTable(){
      let sortTable = this.tableData.sort((a,b)=>{
        let data1,data2
        if(typeof a[this.sortKey] === 'number'){
          data1 = a[this.sortKey]
          data2 = b[this.sortKey]
        } else if(typeof a[this.sortKey] === 'string'){
          if(a[this.sortKey].indexOf('%')!=-1){
            data1 = Number(a[this.sortKey].split('%')[0])
            data2 = Number(b[this.sortKey].split('%')[0])
          }
          if(a[this.sortKey].indexOf(',')!=-1){
            data1 = Number(a[this.sortKey].replace(/,/g,""))
            data2 = Number(b[this.sortKey].replace(/,/g,""))
          }
          data1 = Number(a[this.sortKey])
          data2 = Number(b[this.sortKey])
        }
        if(!this.desc){
          return data1 - data2
        } else{
          return data2 - data1
        }
      })
      return sortTable
    },
    totalData(){
      let total={
        reg: 0,
        active: 0,
        pay: 0,
        // globlePayRate: 0,
        // cost: 0,
        // divided: 0,
        // todayProfit: 0
      }
      // let totalPay = 0
      // this.tableData.forEach(item=>{
      //   totalPay+=Number(item['充值'])
      // })
      this.tableData.forEach(item=>{
        total.reg += Number(item['创角'])
        total.active += Number(item['活跃'])
        total.pay += Number(item['充值'])
        // total.globlePayRate += totalPay==0?0:Number(item['充值'])/totalPay*100
        // total.cost += Number(item['花费'])
        // total.divided += Number(item['分成'])
        // total.todayProfit += Number(item['当天利润'])
      })
      return {
        reg: Number(total.reg).toFixed(2),
        active: Number(total.active).toFixed(2),
        pay: Number(total.pay).toFixed(2),
        // globlePayRate: Number(total.globlePayRate).toFixed(2),
        // cost: Number(total.cost).toFixed(2),
        // divided: Number(total.divided).toFixed(2),
        // todayProfit: Number(total.todayProfit).toFixed(2),
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/overview.scss';
.icon-arrow-right{
  // display: flex;
  // align-items: center;
  display: inline-block;
  transform: rotate(270deg);
  &.desc{
    transform: rotate(90deg);
  }
}
</style>