<template>
  <div class="five-forse-group">
    <div class="first-second-header-row">
      <div class="first-column">
        <v-touch tag="div" class="normal-green-row" v-for="(item,index) in fiveForceData" @tap="openChart(item)" v-if="index==0">
          <label class="labs">{{item["pointertype_name"]||"undefined"}}</label>
          <div class="labs">{{item[dateArr[7]]||0}}</div>
          <div class="labs">
            <div class="fiveforce-trend" :class="{up:item.trend>0,down:item.trend<0}"></div>
            <span>{{item["trend"]}}%</span>
          </div>
        </v-touch>
        <v-touch tag="div" class="normal-green-row" v-for="(item,index) in fiveForceData" @tap="openChart(item)" v-if="index==1">
          <label class="labs">{{item["pointertype_name"]||"undefined"}}</label>
          <div class="labs">{{item[dateArr[7]]||0}}</div>
          <div class="labs">
            <div class="fiveforce-trend" :class="{up:item.trend>0,down:item.trend<0}"></div>
            <span>{{item["trend"]}}%</span>
          </div>
        </v-touch>
        <v-touch tag="div" class="normal-green-row" v-for="(item,index) in fiveForceData" @tap="openChart(item)" v-if="index==2">
          <label class="labs">{{item["pointertype_name"]||"undefined"}}</label>
          <div class="labs">{{item[dateArr[7]]||0}}</div>
          <div class="labs">
            <div class="fiveforce-trend" :class="{up:item.trend>0,down:item.trend<0}"></div>
            <span>{{item["trend"]}}%</span>
          </div>
        </v-touch>
        <v-touch tag="div" class="normal-green-row" v-for="(item,index) in fiveForceData" @tap="openChart(item)" v-if="index==3">
          <label class="labs">{{item["pointertype_name"]||"undefined"}}</label>
          <div class="labs">{{item[dateArr[7]]||0}}%</div>
          <div class="labs">
            <div class="fiveforce-trend" :class="{up:item.trend>0,down:item.trend<0}"></div>
            <span>{{item["trend"]}}%</span>
          </div>
        </v-touch>
        <v-touch tag="div" class="normal-green-row" v-for="(item,index) in fiveForceData" @tap="openChart(item)"  v-if="index==4">
          <label class="labs">{{item["pointertype_name"]||"undefined"}}</label>
          <div class="labs">{{item[dateArr[7]]||0}}</div>
          <div class="labs">
            <div class="fiveforce-trend" :class="{up:item.trend>0,down:item.trend<0}"></div>
            <span>{{item["trend"]}}%</span>
          </div>
        </v-touch>
      </div>
      <div class="arrow">
        <div class="arrow-row">
          <div class="line"></div>
        </div>
        <div class="arrow-row">
          <div class="line" v-for="(item,index) in fiveForceData" v-if="index==1&&item.pointertype_name!='全新用户数'"></div>
        </div>
        <div class="arrow-row">
          <div class="line"></div>
        </div>
        <div class="arrow-row">
          <div class="line"></div>
        </div>
        <div class="arrow-row">
          <div class="line"></div>
        </div>
      </div>
      <div class="second-column">
        <v-touch tag="div" class="normal-yellow-row" v-for="(item,index) in fiveForceData" @tap="openChart(item)" v-if="index==5">
          <label class="labs">{{item["pointertype_name"]||"undefined"}}</label>
          <div class="labs">{{item[dateArr[7]]||0}}</div>
          <div class="labs">
            <div class="fiveforce-trend" :class="{up:item.trend>0,down:item.trend<0}"></div>
            <span>{{item["trend"]}}%</span>
          </div>
        </v-touch>
        <v-touch tag="div" class="normal-yellow-row" v-for="(item,index) in fiveForceData" @tap="openChart(item)" v-if="index==6">
          <label class="labs">{{item["pointertype_name"]||"undefined"}}</label>
          <div class="labs">{{item[dateArr[7]]||0}}</div>
          <div class="labs">
            <div class="fiveforce-trend" :class="{up:item.trend>0,down:item.trend<0}"></div>
            <span>{{item["trend"]}}%</span>
          </div>
        </v-touch>
        <v-touch tag="div" class="normal-yellow-row" v-for="(item,index) in fiveForceData" @tap="openChart(item)" v-if="index==7">
          <label class="labs">{{item["pointertype_name"]||"undefined"}}</label>
          <div class="labs">{{item[dateArr[7]]||0}}</div>
          <div class="labs">
            <div class="fiveforce-trend" :class="{up:item.trend>0,down:item.trend<0}"></div>
            <span>{{item["trend"]}}%</span>
          </div>
        </v-touch>
        <div class="normal-arrow-row">
          <div class="arrows">
            <div class="line"></div>
          </div>
        </div>
        <div class="normal-arrow-row">
          <div class="arrows">
            <div class="line"></div>
          </div>
        </div>
      </div>
      <div class="arrow">
        <div class="arrow-row">
          <div class="line"></div>
        </div>
        <div class="arrow-row">
          <div class="line"></div>
        </div>
        <div class="arrow-row">
        </div>
        <div class="arrow-row">
          <div class="line"></div>
        </div>
        <div class="arrow-row">
          <div class="line"></div>
        </div>
      </div>
      <div class="third-column">
        <v-touch tag="div" class="special-yellow-row" v-for="(item,index) in fiveForceData" @tap="openChart(item)" v-if="index==8">
          <label class="labs">{{item["pointertype_name"]||"undefined"}}</label>
          <div class="labs">{{item[dateArr[7]]||0}}</div>
          <div class="labs">
            <div class="fiveforce-trend" :class="{up:item.trend>0,down:item.trend<0}"></div>
            <span>{{item["trend"]}}%</span>
          </div>
        </v-touch>
        <div class="space-30"></div>
        <div class="normal-transparent-row">
        </div>
        <div class="space-20"></div>
        <v-touch tag="div" class="normal-smallred-row" v-for="(item,index) in fiveForceData" @tap="openChart(item)" v-if="index==9">
          <label class="labs">{{item["pointertype_name"]||"undefined"}}</label>
          <div class="labs">{{item[dateArr[7]]||0}}</div>
          <div class="labs">
            <div class="fiveforce-trend" :class="{up:item.trend>0,down:item.trend<0}"></div>
            <span>{{item["trend"]}}%</span>
          </div>
        </v-touch>
        <div class="space-20"></div>
        <v-touch tag="div" class="normal-red-row" v-for="(item,index) in fiveForceData" @tap="openChart(item)" v-if="index==10">
          <label class="labs">{{item["pointertype_name"]||"undefined"}}</label>
          <div class="labs">{{item[dateArr[7]]||0}}</div>
          <div class="labs">
            <div class="fiveforce-trend" :class="{up:item.trend>0,down:item.trend<0}"></div>
            <span>{{item["trend"]}}%</span>
          </div>
        </v-touch>
      </div>
    </div>
  </div>
</template>
<script>
  import commonMethod from '../utils/commonMethod.js'
  export default {
    props: ["dateArr"],
    data: function () {
      return {}
    },
    computed: {
      fiveForceData: function () {
        return this.$store.state.fiveforcestore.fiveForceData;
      }
    },
    methods: {
      openChart: function (item) {
        this.$emit('openChart', item);
      },
    }
  }

</script>
<style lang="scss">
  .fiveforce-trend {
    font-size: 0.5rem;
    font-family: "iconfont" !important;
  }
  
  .fiveforce-trend:before {
    content: '\e617';
    color: #F89E54;
  }
  
  .fiveforce-trend.up:before {
    font-family: iconfont;
    content: '\e64d';
    color: #2ACBCB;
  }
  
  .fiveforce-trend.down:before {
    content: '\e60a';
    color: #D87A5D;
  }
  
  .five-forse-group {
    padding: 0;
    text-align: center;
    /*background-color: #5F68B9;*/
    .first-second-header-row {
      white-space: nowrap;
      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: center;
      -webkit-box-orient: horizontal;
      .first-column {
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        -webkit-box-orient: vertical;
        width: 2.8rem; //29%;
        height: 12rem; //450px;
        .normal-green-row {
          width: 100%;
          height: 1.8rem; //70px;
          background-color: #DDE7F2;
          margin: 0.26rem 0;
          /*border: 1px solid #27B78D;*/
          text-align: center;
          white-space: normal;
          display: -webkit-box;
          -webkit-box-align: center;
          -webkit-box-pack: center;
          -webkit-box-orient: vertical;
          /*color:#27B78D;*/
          .labs {
            font-size: 12px;
            white-space: nowrap;
            // display: block;
            height: 0.6rem;
            display: -webkit-box;
            -webkit-box-pack: center;
            -webkit-box-align: center;
          }
        }
      }
      .second-column {
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        -webkit-box-orient: vertical;
        width: 2.8rem; //29%;
        height: 12rem; //450px;
        .normal-yellow-row {
          width: 100%;
          display: -webkit-box;
          -webkit-box-align: center;
          -webkit-box-pack: center;
          -webkit-box-orient: vertical;
          height: 1.8rem; //70px;
          background-color: #EBFAE2;
          margin: 0.26rem 0;
          /*border: 1px solid #C9B626;*/
          text-align: center;
          white-space: normal;
          /*color:#C9B626;*/
          .labs {
            font-size: 12px;
            white-space: nowrap;
            // display: block;
            height: 0.6rem;
            display: -webkit-box;
            -webkit-box-pack: center;
            -webkit-box-align: center;
          }
        }
        .normal-arrow-row {
          display: -webkit-box;
          -webkit-box-align: center;
          -webkit-box-pack: center;
          -webkit-box-orient: vertical;
          width: 100%;
          height: 1.8rem;
          margin: 0.26rem 0;
          .arrows {
            // font-size: 40px;
            // color: #E0E0E0;
            width: 100%;
            height: 0.1rem;
            .line {
              width: 100%;
              height: 0.1rem;
              background-color: #E0E0E0;
            }
          }
        }
      }
      .third-column {
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        -webkit-box-orient: vertical;
        width: 2.8rem;
        height: 12rem;
        .special-yellow-row {
          width: 100%;
          display: -webkit-box;
          -webkit-box-align: center;
          -webkit-box-pack: center;
          -webkit-box-orient: vertical;
          height: 3.4rem;
          background-color: #EBFAE2;
          margin: 0.52rem 0 0 0;
          /*border: 1px solid #C9B626;*/
          text-align: center;
          white-space: normal;
          /*color:#C9B626;*/
          .labs {
            font-size: 12px;
            white-space: nowrap;
            // display: block;
            height: 0.6rem;
            display: -webkit-box;
            -webkit-box-pack: center;
            -webkit-box-align: center;
          }
        }
        .normal-transparent-row {
          width: 100%;
          display: -webkit-box;
          -webkit-box-align: center;
          -webkit-box-pack: center;
          -webkit-box-orient: vertical;
          height: 1.8rem;
          background-color: transparent;
          margin: 0;
          text-align: center;
          white-space: normal;
          .labs {
            font-size: 12px;
            white-space: nowrap;
            // display: block;
            height: 0.6rem;
            display: -webkit-box;
            -webkit-box-pack: center;
            -webkit-box-align: center;
          }
        }
        .normal-smallred-row {
          width: 100%;
          display: -webkit-box;
          -webkit-box-align: center;
          -webkit-box-pack: center;
          -webkit-box-orient: vertical;
          height: 1.8rem;
          background-color: #FFEFE7;
          margin: 0;
          /*border: 1px solid #E36031;*/
          text-align: center;
          white-space: normal;
          /*color:#E36031;*/
          .labs {
            font-size: 12px;
            white-space: nowrap;
            // display: block;
            height: 0.6rem;
            display: -webkit-box;
            -webkit-box-pack: center;
            -webkit-box-align: center;
          }
        }
        .normal-red-row {
          width: 100%;
          display: -webkit-box;
          -webkit-box-align: center;
          -webkit-box-pack: center;
          -webkit-box-orient: vertical;
          height: 1.8rem;
          background-color: #FFAE88;
          margin: 0;
          /*border: 1px solid #E36031;*/
          text-align: center;
          white-space: normal;
          /*color:#E36031;*/
          .labs {
            font-size: 12px;
            white-space: nowrap;
            // display: block;
            height: 0.6rem;
            display: -webkit-box;
            -webkit-box-pack: center;
            -webkit-box-align: center;
          }
        }
        .space-30 {
          display: block;
          width: 100%;
          height: 0.8rem;
        }
        .space-20 {
          display: block;
          width: 100%;
          height: 0.54rem;
        }
      }
      .arrow {
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        -webkit-box-orient: vertical;
        width: 5%;
        height: 12rem;
        .arrow-row {
          display: -webkit-box;
          -webkit-box-align: center;
          -webkit-box-pack: center;
          -webkit-box-orient: vertical;
          width: 100%;
          height: 1.8rem;
          margin: 0.26rem 0;
          /*color: #E0E0E0;*/
          font-size: 20px;
          .line {
            width: 100%;
            height: 0.1rem;
            background-color: #E0E0E0;
          }
        }
      }
    }
  }

</style>
