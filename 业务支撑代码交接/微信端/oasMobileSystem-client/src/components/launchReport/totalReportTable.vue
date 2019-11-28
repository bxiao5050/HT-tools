<template>
  <div>
    <div class="fast-area">
      <div class="fast-area-item" :class="{selected:nowCountry.country_id==item.country_id}" v-for="item in countryList" @click="toggleCountry(item)">{{item.name}}</div>
    </div>
    <div class="table-group">
      <table class="out-table" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <!--*********左上-BEGIN***********-->
            <table class="left-top-table">
              <tr>
                <th>游戏</th>
              </tr>
            </table>
            <!--**************左上-END**********-->
          </td>
          <td>
            <div id='scroll1' class="scroll-top">
              <!--***********右上-BEGIN********-->
              <table class="right-top-table">
                <tr>
                  <th>维度</th>
                  <th>激活</th>
                  <th>注册</th>
                  <th>创角</th>
                  <th>花费</th>
                  <th>注册率</th>
                  <th>创角率</th>
                  <th>激活成本</th>
                  <th>注册成本</th>
                  <th>创角成本</th>
                  <th>充值</th>
                  <th>ROI</th>
                  <th>LTV</th>
                  <th>次日留存率</th>
                  <th>3日留存率</th>
                  <th>7日留存率</th>
                  <th>新服创角</th>
                  <th>新服创角成本</th>
                </tr>
              </table>
              <!--************右上-END**********-->
            </div>
          </td>
        </tr>
        <tr>
          <td align="left" valign="top">
            <div id='scroll2' class="scroll-left">
              <!--*************左下-BEGIN**************-->
              <table class="left-body-table">
                <tr v-for="item in tableData">
                  <td>{{item["游戏"]}}</td>
                </tr>
              </table>
              <!--*************左下-END***********-->
            </div>
          </td>
          <td align="left" valign="top">
            <div id="tablecontent" class="table-content">
              <!--***********右下-BEGIN***********-->
              <table class="right-body-table">
                <tr v-for="item in tableData">
                  <td>{{item["维度"]?item["维度"]:""}}</td>
                  <td>{{item["激活"]}}</td>
                  <td>{{item["注册"]}}</td>
                  <td>{{item["创角"]}}</td>
                  <td>{{item["花费"]}}</td>
                  <td>{{item["注册率"]}}%</td>
                  <td>{{item["创角率"]}}%</td>
                  <td>{{item["激活成本"]}}</td>
                  <td>{{item["注册成本"]}}</td>
                  <td>{{item["创角成本"]}}</td>
                  <td>{{item["充值"]}}</td>
                  <td>{{item["ROI"]}}</td>
                  <td>{{item["LTV"]}}</td>
                  <td>{{item["次日留存"]}}%</td>
                  <td>{{item["3日留存"]}}%</td>
                  <td>{{item["7日留存"]}}%</td>
                  <td>{{item["新服创角"]}}</td>
                  <td>{{item["新服创角成本"]}}</td>
                </tr>
              </table>
              <!--*************右下-END*****************-->
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <table class="left-footer-table">
              <tr>
                <td><strong>total</strong></td>
              </tr>
            </table>
          </td>
          <td>
            <div id='scrollFooter' class="scroll-top">
              <!--***********右上-BEGIN********-->
              <table class="right-footer-table">
                <tr>
                  <td>{{totalTableData["维度"]?totalTableData["维度"]:""}}</td>
                  <td>{{totalTableData["激活"]}}</td>
                  <td>{{totalTableData["注册"]}}</td>
                  <td>{{totalTableData["创角"]}}</td>
                  <td>{{totalTableData["花费"]}}</td>
                  <td>{{totalTableData["注册率"]}}%</td>
                  <td>{{totalTableData["创角率"]}}%</td>
                  <td>{{totalTableData["激活成本"]}}</td>
                  <td>{{totalTableData["注册成本"]}}</td>
                  <td>{{totalTableData["创角成本"]}}</td>
                  <td>{{totalTableData["充值"]}}</td>
                  <td>{{totalTableData["ROI"]}}</td>
                  <td>{{totalTableData["LTV"]}}</td>
                  <td>{{totalTableData["次日留存"]}}%</td>
                  <td>{{totalTableData["3日留存"]}}%</td>
                  <td>{{totalTableData["7日留存"]}}%</td>
                  <td>{{totalTableData["新服创角"]}}</td>
                  <td>{{totalTableData["新服创角成本"]}}</td>
                </tr>
              </table>
              <!--************右上-END**********-->
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        nowCountry: null
      }
    },
    computed: {
      launchReportData: function () {
        return this.$store.state.launchAreaStore.launchReportData;
      },
      tableData: function () {
        var tableData = [];
        for (var i = 0; i < this.launchReportData.length; i++) {
          if (this.nowCountry.country_id == this.launchReportData[i].country_id) {
            tableData.push(this.launchReportData[i]);
          }
        }
        for (var i = 0; i < tableData.length; i++) {
          tableData[i].LTV = Number(tableData[i]['MonthInstall']) != 0 ? (Number(tableData[i]['MonthCharge']) /
            Number(tableData[i]['MonthInstall'])).toFixed(2) : 0.00
        }
        return tableData;
      },
      totalTableData: function () {
        var totalData = {
            '维度': "",
            '激活': 0,
            '注册': 0,
            '充值': 0,
            '创角': 0,
            '花费': 0,
            '新服创角': 0,
            '次日留存': 0,
            '3日留存': 0,
            '7日留存': 0,
            'MonthCharge': 0,
            'MonthInstall': 0,
            'ROI': 0,
            '注册率': 0,
            '创角率': 0,
            '激活成本': 0,
            '注册成本': 0,
            '创角成本': 0,
            '新服创角成本': 0,
          }
          //维度
        if (this.tableData.length > 0) {
          totalData["维度"] = this.tableData[0]["维度"] ? this.tableData[0]["维度"] : "";
        }
        //计算和
        totalData["激活"] = this.caculateTotal('激活', this.tableData);
        totalData["注册"] = this.caculateTotal('注册', this.tableData);
        totalData["充值"] = this.caculateTotal('充值', this.tableData);
        totalData["创角"] = this.caculateTotal('创角', this.tableData);
        totalData["花费"] = this.caculateTotal('花费', this.tableData);
        totalData["新服创角"] = this.caculateTotal('新服创角', this.tableData);
        totalData["次日留存"] = this.caculateTotal('次日留存', this.tableData);
        totalData["3日留存"] = this.caculateTotal('3日留存', this.tableData);
        totalData["7日留存"] = this.caculateTotal('7日留存', this.tableData);
        totalData["MonthCharge"] = this.caculateTotal('MonthCharge', this.tableData);
        totalData["MonthInstall"] = this.caculateTotal('MonthInstall', this.tableData);
        //其他
        totalData["ROI"] = this.caculateQuotient(totalData["创角"], totalData["花费"]);
        totalData["注册率"] = this.caculateQuotient(totalData["注册"], totalData["激活"]);
        totalData["创角率"] = this.caculateQuotient(totalData["创角"], totalData["激活"]);
        totalData["激活成本"] = this.caculateQuotient(totalData["花费"], totalData["激活"]);
        totalData["注册成本"] = this.caculateQuotient(totalData["花费"], totalData["注册"]);
        totalData["创角成本"] = this.caculateQuotient(totalData["花费"], totalData["创角"]);
        totalData["新服创角成本"] = this.caculateQuotient(totalData["花费"], totalData["新服创角"]);
        totalData["LTV"] = this.caculateQuotient(totalData["MonthCharge"], totalData["MonthInstall"]);
        return totalData;
      },
      countryList: function () {
        var list = [];
        for (var i = 0; i < this.launchReportData.length; i++) {
          list.push(JSON.stringify({
            country_id: this.launchReportData[i].country_id,
            name: this.launchReportData[i]["国家"]
          }));
        }
        list = Array.from(new Set(list))
        for (var i = 0; i < list.length; i++) {
          list[i] = JSON.parse(list[i]);
        }
        this.nowCountry = list[0];
        return list;
      }
    },
    mounted: function () {
      var obj = document.getElementById("tablecontent");
      obj.addEventListener("scroll", function () {
        document.getElementById("scroll1").children[0].style.position = "relative";
        document.getElementById("scroll2").children[0].style.position = "relative";
        document.getElementById("scrollFooter").children[0].style.position = "relative";

        document.getElementById("scroll1").children[0].style.left = "-" + this.scrollLeft + "px";
        document.getElementById("scroll2").children[0].style.top = "-" + this.scrollTop + "px";

        document.getElementById("scrollFooter").children[0].style.left = "-" + this.scrollLeft + "px";
      })
    },
    methods: {
      toggleCountry: function (item) {
        this.nowCountry = item;
      },
      caculateTotal: function (key, data) {
        var result = 0;
        for (var i = 0; i < data.length; i++) {
          result += data[i][key];
        }
        return result;
      },
      caculateQuotient: function (dividend, divisor) {
        var result = 0;
        if (divisor != 0) {
          result = Number((dividend / divisor).toFixed(2));
        } else {
          result = 0;
        }
        return result;
      }
    }
  }

</script>
<style lang="scss" scoped>
  .fast-area {
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0 0.26rem 0.26rem 0.26rem;
    white-space: nowrap;
    .fast-area-item {
      padding: 0 0.13rem;
      border: 1px solid #bbb;
      float: left;
    }
    .fast-area-item.selected {
      background-color: #8179C8;
      color: #FFF;
    }
  }
  
  @media screen and (orientation:portrait) {
    .table-group {
      height: 5.3rem;
      max-height: 5.3rem;
      /*-webkit-overflow-scrolling: touch;*/
      .out-table {
        .scroll-top {
          width: 6.66rem;
          overflow: hidden;
        }
        .scroll-left {
          max-height: 4rem;
          overflow: hidden;
        }
        .table-content {
          width: 6.66rem;
          max-height: 4rem;
          overflow: scroll
        }
        .table-content::-webkit-scrollbar {
          height: 0;
        }
        .left-top-table {
          /*width: 100px;*/
          /*height: 100%;*/
          border-collapse: collapse;
          border: none;
          tr {
            border-color: inherit;
            th {
              width: 150px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #ddd;
              white-space: nowrap;
            }
          }
        }
        .right-top-table {
          width: 2000px;
          height: 100%;
          border-collapse: collapse;
          border: none;
          tr {
            border-color: inherit;
            th {
              width: 100px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #ddd;
              white-space: nowrap;
            }
          }
        }
        .left-body-table {
          /*width: 100px;*/
          height: 100%;
          border-collapse: collapse;
          border: none;
          tr {
            border-color: inherit;
            td {
              width: 150px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #ddd;
              white-space: nowrap;
            }
          }
        }
        .right-body-table {
          width: 2000px;
          height: 100%;
          border-collapse: collapse;
          border: none;
          tr {
            border-color: inherit;
            td {
              width: 100px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #ddd;
              white-space: nowrap;
            }
          }
        }
        .left-footer-table {
          /*width: 100px;*/
          /*height: 100%;*/
          border-collapse: collapse;
          border: none;
          tr {
            border-color: inherit;
            td {
              width: 150px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #ddd;
              white-space: nowrap;
            }
          }
        }
        .right-footer-table {
          width: 2000px;
          height: 100%;
          border-collapse: collapse;
          border: none;
          tr {
            border-color: inherit;
            td {
              width: 100px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #ddd;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
  
  @media screen and (orientation:landscape) {
    .table-group {
      height: 5.3rem;
      max-height: 5.3rem;
      /*-webkit-overflow-scrolling: touch;*/
      .out-table {
        .scroll-top {
          width: 9rem;
          overflow: hidden;
        }
        .scroll-left {
          max-height: 4rem;
          overflow: hidden;
        }
        .table-content {
          width: 9rem;
          max-height: 4rem;
          overflow: scroll
        }
        .table-content::-webkit-scrollbar {
          height: 0;
        }
        .left-top-table {
          /*width: 100px;*/
          /*height: 100%;*/
          border-collapse: collapse;
          border: none;
          tr {
            border-color: inherit;
            th {
              width: 150px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #ddd;
              white-space: nowrap;
            }
          }
        }
        .right-top-table {
          width: 2000px;
          height: 100%;
          border-collapse: collapse;
          border: none;
          tr {
            border-color: inherit;
            th {
              width: 100px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #ddd;
              white-space: nowrap;
            }
          }
        }
        .left-body-table {
          /*width: 100px;*/
          height: 100%;
          border-collapse: collapse;
          border: none;
          tr {
            border-color: inherit;
            td {
              width: 150px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #ddd;
              white-space: nowrap;
            }
          }
        }
        .right-body-table {
          width: 2000px;
          height: 100%;
          border-collapse: collapse;
          border: none;
          tr {
            border-color: inherit;
            td {
              width: 100px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #ddd;
              white-space: nowrap;
            }
          }
        }
        .left-footer-table {
          /*width: 100px;*/
          /*height: 100%;*/
          border-collapse: collapse;
          border: none;
          tr {
            border-color: inherit;
            td {
              width: 150px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #ddd;
              white-space: nowrap;
            }
          }
        }
        .right-footer-table {
          width: 2000px;
          height: 100%;
          border-collapse: collapse;
          border: none;
          tr {
            border-color: inherit;
            td {
              width: 100px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #ddd;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }

</style>
