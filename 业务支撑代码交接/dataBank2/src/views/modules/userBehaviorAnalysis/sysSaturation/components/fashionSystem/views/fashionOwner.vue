<template>
  <div>
    <card>
      <div slot="header">
        <div class="card-header-title">{{header||""}}</div>
      </div>
      <div slot="body">
        <div class="item-content">
            <div class="bt-item" :class="{'check':fashionType==0}" @click="query(0)">全部</div>
            <div class="bt-item" v-for="(item,index) in fashionList" :key="index" :class="{'check':fashionType==item.fashion_type}" @click="query(item.fashion_type)">{{item.fashion_type_name}}</div>
        </div>
        <div class="item-content">
            <div class="bt-item" :class="{'check':type==1}" @click="type=1">人数</div>
            <div class="bt-item" :class="{'check':type==2}" @click="type=2">拥有率</div>
        </div>
        <div class="table-content">
          <normalTable :tableData="tableData" hideColumn="fashion_type"></normalTable>
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
      fashionType:0,
      type:1,
      fashionList:[],
      countData:[],
      rateData:[]
    }
  },
  computed:{
    tableData(){
      if(this.type==1){
        return this.countData.filter(item=>{
          return item.fashion_type == this.fashionType||this.fashionType==0
        })
      } else{
        return this.rateData.filter(item=>{
          return item.fashion_type == this.fashionType ||this.fashionType==0
        })
      }
    }
  },
  methods:{
    query(type){
      this.fashionType = type
      // this.$emit('query',{in_type_id:this.fashionType})
    },
    dataProvider(pdata){
      this.countData = pdata[0]?pdata[0]:[]
      this.rateData = pdata[1]?pdata[1]:[]
      this.fashionList = pdata[2]?pdata[2]:[]
    }
  }
}
</script>
<style lang="scss" scoped>
      .gray-tabs{
        // float:right;
        display:flex;
        justify-content:flex-start;
        align-items:flex-start;
        padding:10px;
        line-height:30px;
        .tab-type-item{
          width:100px;
          text-align:center;
          border:1px solid #bbb;
          background-color: #EEE;
          cursor: pointer;
          // float: left;
          &.active{
             background-color: #bbb;
             color: #FFF;
          }
        }
      }

       .item-content {
         padding:10px;
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

      // .tab-types-primary {
      //   line-height: 30px;
      //   padding:10px 5px;
      //   .tab-type-item {
      //     // width: 100px;
      //     padding:0 10px;
      //     text-align: center;
      //     border: 1px solid #bbb;
      //     float: left;
      //     // background-color: #EEE;
      //   }
      //   .tab-type-item.active {
      //     background-color: #fc9153;
      //     color: #FFF;
      //   }
      // }
.table-content{
  // min-height:300px;
}
</style>