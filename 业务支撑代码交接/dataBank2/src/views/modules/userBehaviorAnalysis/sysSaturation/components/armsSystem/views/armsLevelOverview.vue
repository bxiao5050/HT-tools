<template>
  <div>
    <card>
      <div slot="header">
        <div class="card-header-title">{{header||""}}</div>
            <!-- <div class="tabs">
              <div class="tab-item" :class="{'active':type==1}" @click="type=1">数量</div>
              <div class="tab-item" :class="{'active':type==2}" @click="type=2">占比</div>
            </div> -->
      </div>
      <div slot="body">
        <div class="item-content">
              <div class="bt-item" :class="{'check':type==1}" @click="type=1">突破人数</div>
              <div class="bt-item" :class="{'check':type==2}" @click="type=2">占比</div>
        </div>
        <div class="table-content">
          <normalTable :tableData="tableData" height="350"></normalTable>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import card from 'src/components/card.vue'
import normalTable from 'src/components/table/element-table.vue'
export default{
  components:{
    card,normalTable
  },
  props:['header'],
  data(){
    return{
      type:1,
      countData:[],
      rateData:[]
    }
  },
  computed:{
    tableData(){
      if(this.type==1){
        return this.countData
      } else{
        return this.rateData
      }
    }
  },
  methods:{
    dataProvider(pdata){
      this.countData = pdata[0]
      this.rateData = pdata[1]
    },
  }
}
</script>
<style lang="scss" scoped>
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
      width:100px;
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
.table-content{
  // min-height:300px;
  // height:350px;
  // overflow:hidden;
}
</style>