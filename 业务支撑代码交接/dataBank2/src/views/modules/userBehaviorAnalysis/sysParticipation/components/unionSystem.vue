<template>
  <div>
    <card>
      <div slot="header">{{now?(now.name+'-'):''}}关键指标
        <!-- <div class="tab-types">
            <div class="tab-type-item" :class="{'active':type==1}" @click="type=1">加入工会人数</div>
            <div class="tab-type-item" :class="{'active':type==2}" @click="type=2">占比</div>
          </div> -->
      </div>
      <div slot="body">
        <div class="item-content">
            <div class="bt-item" :class="{'check':type==1}" @click="type=1">加入工会人数</div>
            <div class="bt-item" :class="{'check':type==2}" @click="type=2">占比</div>
          </div>
        <div id="unionChart" class="charts"></div>
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
          <normalTable :tableData="reverseTableData"></normalTable>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import card from 'src/components/card.vue'
import normalTable from 'src/components/table/element-table.vue'
export default{
  name:'union-system',
  components:{
    card,normalTable
  },
  props:["date1","now"],
  data(){
    return{
      type:1,

      tableData:[]
    }
  },
  computed:{
     reverseTableData(){
        let result = this.tableData.map(item=>{
          return item
        })
        result.reverse()
        return result
      },
  },
  mounted(){
    this.$emit('query',{in_select_id:this.type})
  },
  methods:{
     dataProvider(pdata){
      this.tableData = pdata[0]||[]
      this.drawChart()
    },
    // initPage(){
    //   this.tableData = this.dataProvider[0]||[]
    //   this.drawChart()
    // },
    exportData(){
      this.$emit('exportData',{in_select_id:this.type})
    },
    drawChart(){
      let count_date = utils.getColumnByIndex(0,this.tableData)
      let categories=[]
      let seriesData=[]
      for(let i = 0; i<this.tableData.length; i++){
        for(let index in this.tableData[i]){
          if(index != count_date){
            if(this.type==1){
            seriesData.push({
              name:index,
              data:[]
            })
            } else{
              seriesData.push({
              name:index,
              data:[],
              tooltip:{
                  valueSuffix:'%'
                }
            })
            }
          }
        }
        break
      }
      this.tableData.forEach(item => {
        categories.push(item[count_date])
        seriesData.forEach(serie => {
          serie.data.push(Number(item[serie.name].replace(/,/g,'').split('%')[0]))
        })
      })
      highchartUtil.drawChart('unionChart','spline',categories,seriesData)
    }
  },
  watch:{
    // dataProvider:{
    //   deep:true,
    //   handler(v,ov){
    //     if(v!=ov){
    //       this.initPage()
    //     }
    //   }
    // },
    date1(v,ov){
      if(v!=ov){
        this.type=1
      }
    },
    type(v,ov){
      if(v!=ov){
        // this.drawChart()
        this.$emit('query',{in_select_id:this.type})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-types {
        position: absolute;
        right: 100px;
        top: 10px;
        vertical-align: middle;
        line-height: 30px;
        .tab-type-item {
          width: 100px;
          text-align: center;
          border: 1px solid #bbb;
          float: left;
          background-color: #EEE;
        }
        .tab-type-item.active {
          background-color: #bbb;
          color: #FFF;
        }
      }



       .item-content {
         padding:0 0 10px 0px;
    margin-right: 15px;
    // float: left;
    display:flex;
        justify-content:flex-start;
        align-items:flex-start;
    line-height: 30px;
    .bt-item {
      cursor: pointer;
      padding: 0 15px;
      // float: left;
      width:150px;
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
</style>