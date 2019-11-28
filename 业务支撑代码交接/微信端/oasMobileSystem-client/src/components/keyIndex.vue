<template>
    <div>
        <div class="fastDateGroup">
            <div class="fastSelecter">
                <v-touch tag="div" class="fast-item" :class="{now:datetype==1}" v-on:tap="toggleDateType(1)">Day</v-touch>
                <v-touch tag="div" class="fast-item px1-l" :class="{now:datetype==2}" v-on:tap="toggleDateType(2)">Week</v-touch>
                <v-touch tag="div" class="fast-item px1-l" :class="{now:datetype==3}" v-on:tap="toggleDateType(3)">Month</v-touch>
            </div>
        </div>
        <nv-date-picker :dateChange="dateChange" :datetype="datetype" dateDiff="-1"></nv-date-picker>
        <div class="keyIndex">
            <div class="index-group">
                <div class="index-header">
                    <div class="index-group-icon-first"></div><span class="index-header-text">付费数据</span></div>
                <div class="index-content">
                    <div class="index-box" v-for="(item,index) in keyIndexData" v-if="index<6" @click="openChart(item.indicative_name)">
                        <div class="index-item">
                            <div class="index-item-key">
                                <span class="index-item-title">{{item["indicative_name"]}}</span>
                                <span> {{toThousands(item["indicative_name"].indexOf("率",0)!=-1?item["数值"]+"%":item["数值"])}}</span>
                            </div>
                            <div class="index-item-key">
                                <span class="keys index-item-title">环比</span>
                                <span class="key-trend" :class="{up:item['环比']>0,down:item['环比']<0}">
                                    {{item["环比"]+"%"}}
                                </span>
                            </div>
                            <div class="index-item-key" v-if="datetype==1">
                                <span class="index-item-title">同比</span>
                                <span class="key-trend" :class="{up:item['同比']>0,down:item['同比']<0}">
                                    {{item["同比"]+"%"}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="index-group">
                <div class="index-header">
                    <div class="index-group-icon-second"></div><span class="index-header-text">人气数据</span></div>
                <div class="index-content">
                    <div class="index-box" v-for="(item,index) in keyIndexData" v-if="index>=6&&index<14" @click="openChart(item.indicative_name)">
                        <div class="index-item">
                            <div class="index-item-key">
                                <span class="index-item-title">{{item["indicative_name"]}}</span>
                                <span> {{toThousands(item["indicative_name"].indexOf("率",0)!=-1?item["数值"]+"%":item["数值"])}}</span>
                            </div>
                            <div class="index-item-key">
                                <span class="keys index-item-title">环比</span>
                                <span class="key-trend" :class="{up:item['环比']>0,down:item['环比']<0}">
                                    {{item["环比"]+"%"}}
                                </span>
                            </div>
                            <div class="index-item-key" v-if="datetype==1">
                                <span class="index-item-title">同比</span>
                                <span class="key-trend" :class="{up:item['同比']>0,down:item['同比']<0}">
                                    {{item["同比"]+"%"}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="index-group">
                <div class="index-header">
                    <div class="index-group-icon-third"></div><span class="index-header-text">流失数据</span></div>
                <div class="index-content">
                    <div class="index-box" v-for="(item,index) in keyIndexData" v-if="index>=14" @click="openChart(item.indicative_name)">
                        <div class="index-item">
                            <div class="index-item-key">
                                <span class="index-item-title">{{item["indicative_name"]}}</span>
                                <span> {{toThousands(item["indicative_name"].indexOf("率",0)!=-1?item["数值"]+"%":item["数值"])}}</span>
                            </div>
                            <div class="index-item-key">
                                <span class="keys index-item-title">环比</span>
                                <span class="key-trend" :class="{up:item['环比']>0,down:item['环比']<0}">
                                    {{item["环比"]+"%"}}
                                </span>
                            </div>
                            <div class="index-item-key" v-if="datetype==1">
                                <span class="index-item-title">同比</span>
                                <span class="key-trend" :class="{up:item['同比']>0,down:item['同比']<0}">
                                    {{item["同比"]+"%"}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <keyIndexChart :isShow="isShowChart" :chartType="chartType" :selectedId="selectedId" @closeChart="closeChart"></keyIndexChart>
    </div>
</template>
<script>
    import nvDatePicker from './datepicker.vue'
    import keyIndexChart from './keyIndexChart.vue'
    import httpRequest from '../utils/httpRequest.js'
    import { Toast } from 'mint-ui'
    export default {
        components: {
            nvDatePicker, keyIndexChart
        },
        data: function () {
            return {
                datetype: 1,
                date1: '',
                isShowChart: false,
                selectedId: null,
                chartType: "spline"
            }
        },
        computed: {
            keyIndexData: function () {
                return this.$store.state.gameGKStore.keyIndexData;
            }
        },
        methods: {
            toggleDateType: function (datetype) {
                this.datetype = datetype;
            },
            dateChange: function (newDate) {
                this.date1 = newDate;
                this.query();
            },
            toThousands: function (val) {
                return val.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
            },
            query: function () {
                var param = {
                    datetype: this.datetype,
                    count_date: this.date1
                }
                httpRequest.getGameGKData(param, (data) => {
                    if (data.state == "successed") {
                        this.$store.dispatch("setKeyIndexData", data.result[0]);
                    }
                    else {
                        Toast(data.result.errorMsg);
                    }
                })
            },
            checkSelectIdByName: function (itemname) {
                var index;
                switch (itemname) {
                    case "付费金额": index = 1; this.chartType = "spline"; break;
                    case "付费人数":
                    case "新付费用户数":
                    case "老付费用户数": index = 2; this.chartType = "area"; break;
                    case "付费ARPU": index = 3; this.chartType = "spline"; break;
                    case "付费转化率": index = 4; this.chartType = "spline"; break;
                    case "注册用户数":
                    case "滚服用户数": index = 5; this.chartType = "spline"; break;
                    case "登录用户数":
                    case "活跃用户数": index = 6; this.chartType = "area"; break;
                    case "全新用户数": index = 7; this.chartType = "spline"; break;
                    case "新用户注收比（1日）":
                    case "新用户注收比（7日）":
                    case "新用户注收比（30日）": index = 8; this.chartType = "spline"; break;
                    case "在线峰值（PCU）":
                    case "在线均值（ACU）": index = 9; this.chartType = "area"; break;
                    case "流失用户数": index = 10; this.chartType = "spline"; break;
                    case "回流用户数": index = 11; this.chartType = "spline"; break;
                    case "日流失率":
                    case "周流失率":
                    case "月流失率": index = 12; this.chartType = "spline"; break;
                    case "日回流率":
                    case "周回流率":
                    case "月回流率": index = 13; this.chartType = "spline"; break;
                    default: Toast("未识别的指标名称!"); break;
                }
                return index;
            },
            openChart: function (itemname) {
                this.selectedId = this.checkSelectIdByName(itemname);
                this.isShowChart = true;
            },
            closeChart: function () {
                this.isShowChart = false;
            }
        }
    }

</script>
<style lang="scss" scoped>
.fastDateGroup{
     width: 100%;
    height: 1.06rem;
    line-height: 1.06rem;
    position: relative;
    .fastSelecter {
      width: 4rem;
      height: 0.8rem;
      line-height: 0.8rem;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      display: -webkit-box;
      border: 1px solid #CAAD9D;
      .fast-item {
        -webkit-box-flex: 1;
        background: #FFFFFF;
        border-left-color: #CAAD9D;
        font-size: 0.35rem;
        font-family: '微软雅黑';
      }
      .fast-item.now {
        color: #5E5E5E;
        background-color: #EEEEEE;
        font-weight: bold;
      }
    }
}


  .key-trend {
    font-family: "iconfont" !important;
  }

  .key-trend:before {
    content: '\e617';
    color: #F89E54;
  }

  .key-trend.up:before {
    font-family: iconfont;
    content: '\e64d';
    color: #2ACBCB;
  }

  .key-trend.down:before {
    content: '\e60a';
    color: #D87A5D;
  }

.keyIndex{
    width:100%;
    font-family: "微软雅黑";
    font-weight:bold;
    .index-group{
        width:100%;
        margin-top:0.5rem;
        .index-header{
            width:100%;
            text-align: left;
            padding:0.2rem;
            font-size:0.35rem;
           .index-group-icon-first{
    width:0.2rem;
    height:0.3rem;
    float:left;
    background-color: #FFA346;
}
.index-group-icon-second{
    width:0.2rem;
    height:0.3rem;
    float:left;
    background-color: #2EC7C9;
}
.index-group-icon-third{
    width:0.2rem;
    height:0.3rem;
    float:left;
    background-color: #9494A7;
}
.index-header-text{
    display: inline;
    padding-left:0.2rem;
}
        }
        .index-content{
            width:100%;
          border-top:solid 3px rgb(226, 226, 226);
            font-size:0;
            .index-box{
                width:50%;
                height:2.5rem;
                display: inline-block;
                border:1px solid #E2E2E2;
                font-size: 0.3rem;
                .index-item{
                    width:100%;
                    height:100%;
                    display: -webkit-box;
                    -webkit-box-align: center;
                    -webkit-box-pack: center;
                    -webkit-box-orient: vertical;
                     .index-item-key{
                         width:100%;
                         display: -webkit-box;
                         -webkit-box-align: center;
                        -webkit-box-pack:center;
                        -webkit-box-orient: horizontal;
                        padding:0.2rem;
                       .index-item-title{
                         margin-right: 0.1rem;
                         font-weight: 300;
                       }
                     }
                }
            }
            .index-box:active{
                background-color: #E2E2E2;
            }
        }
    }
}

.keyChartModel{
  width: 100%;
    height: 100%;
    background: #FFF;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
}
</style>
