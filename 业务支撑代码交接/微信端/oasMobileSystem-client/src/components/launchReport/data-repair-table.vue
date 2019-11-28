<template>
  <div>
    <dataRepairAdd :isShow="isShowAdd" @closeAdd="toggleAdd" @query="query"></dataRepairAdd>
    <dataRepairEdit :isShow="isShowEdit" :itemData="editItemData" @closeEdit="closeEdit" @query="query"></dataRepairEdit>
    <div class="btn-bar-group">
      <label class="orange-btn" @click="toggleAdd">手动录入</label>
      <label class="right-border-btn" @click="deleteItem">批量删除</label>
    </div>
    <div class="table-group">
      <table class="out-table" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <!--*********左上-BEGIN***********-->
            <table class="left-top-table">
              <tr>
                <th style="width:50px;"><input type="checkbox" v-model='checked' :value="checked" @change="checkedAll" /></th>
                <th>时间</th>
              </tr>
            </table>
            <!--**************左上-END**********-->
          </td>
          <td>
            <div id='scroll1' class="scroll-top">
              <!--***********右上-BEGIN********-->
              <table class="right-top-table">
                <tr>
                  <th style="width:110px;">游戏</th>
                  <th style="width:90px;">系统</th>
                  <th style="width:110px;">MediaSoure</th>
                  <th style="width:90px;">激活</th>
                  <th style="width:90px;">注册</th>
                  <th style="width:90px;">创角</th>
                  <th style="width:90px;">花费</th>
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
                <tr v-for="item in dataRepairData">
                  <td style="width:50px;"><input type="checkbox" :value="item.id" v-model="selectedList" /></td>
                  <td>{{item["count_date"]}}</td>
                </tr>
              </table>
              <!--*************左下-END***********-->
            </div>
          </td>
          <td align="left" valign="top">
            <div id="tablecontent" class="table-content">
              <!--***********右下-BEGIN***********-->
              <table class="right-body-table">
                <v-touch tag="tr" v-for="item in dataRepairData" @doubletap="toggleEdit(item)">
                  <td style="width:110px;">{{item["game_name"]}}</td>
                  <td style="width:90px;">{{item["os"]==0?"安卓":"IOS"}}</td>
                  <td style="width:110px;">{{item.media_source == item.link_media_source ? item.media_source + ' 抵消自然量' : item.media_source}}</td>
                  <td style="width:90px;">{{item["installs"]}}</td>
                  <td style="width:90px;">{{item["regs"]}}</td>
                  <td style="width:90px;">{{item["roles"]}}</td>
                  <td style="width:90px;">{{item["cost"]}}</td>
                </v-touch>
              </table>
              <!--*************右下-END*****************-->
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  import dataRepairEdit from './data-repair-edit.vue'
  import dataRepairAdd from './data-repair-add.vue'
  import httpRequest from '../../utils/httpRequest.js'
  import {
    Toast
  } from 'mint-ui'
  export default {
    data: function () {
      return {
        isShowAdd: false,
        isShowEdit: false,
        selectedList: [],
        checked: false,
        editItemData: {},
      }
    },
    components: {
      dataRepairAdd,
      dataRepairEdit
    },
    computed: {
      dataRepairData: function () {
        return this.$store.state.launchAreaStore.dataRepairData;
      }
    },
    mounted: function () {
      var obj = document.getElementById("tablecontent");
      obj.addEventListener("scroll", function () {
        document.getElementById("scroll1").children[0].style.position = "relative";
        document.getElementById("scroll2").children[0].style.position = "relative";

        document.getElementById("scroll1").children[0].style.left = "-" + this.scrollLeft + "px";
        document.getElementById("scroll2").children[0].style.top = "-" + this.scrollTop + "px";
      })

    },
    watch: {
      'selectedList': {
        handler: function (val, oldVal) {
          if (this.selectedList.length === this.dataRepairData.length) {
            this.checked = true;
          } else {
            this.checked = false;
          }
        },
        deep: true
      }
    },
    methods: {
      toggleAdd: function () {
        this.isShowAdd = !this.isShowAdd;
      },
      toggleEdit: function (item) {
        this.editItemData = item;
        this.isShowEdit = !this.isShowEdit;
      },
      closeEdit: function () {
        this.isShowEdit = false;
        if (!this.isShowEdit) {
          this.editItemData = {};
        }
      },
      checkedAll: function () {
        var _this = this;
        this.checked = !this.checked;
        if (this.checked) { //实现反选
          _this.selectedList = [];
        } else { //实现全选
          _this.selectedList = [];
          _this.dataRepairData.forEach(function (item) {
            _this.selectedList.push(item.id);
          });
        }
      },
      deleteItem: function () {
        if (this.selectedList.length == 0) return;
        if (!confirm("确认要删除" + this.selectedList.length + "条数据，删除后不可还原，是否继续？")) {
          window.event.returnValue = false;
        } else {
          var params = {
            in_id: this.selectedList.join(",")
          }
          httpRequest.dataRepairDel(params, (data) => {
            if (data.state == "successed") {
              Toast("数据删除成功!");
              this.query();
            } else {
              Toast(data.result.errorMsg);
            }
          })
        }
      },
      query: function () {
        this.$emit("query");
      }
    }
  }

</script>
<style lang="scss" scoped>
  .btn-bar-group {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: left;
    font-size: 0.26rem;
    .orange-btn {
      color: #FFF;
      background-color: #FC9153;
      border: 1px solid #FC9153;
      padding: 0 0.13rem;
      float: left;
    }
    .oragge-btn:active,
    .oragge-btn:hover {
      background-color: #dc8553;
    }
    .right-border-btn {
      border: 1px solid #D8C2B7;
      padding: 0 0.13rem;
      float: right;
    }
  }
  
  @media screen and (orientation:portrait) {
    .table-group {
      height: 5.3rem;
      max-height: 5.3rem;
      margin-top: 0.26rem;
      /*-webkit-overflow-scrolling: touch;*/
      .out-table {
        .scroll-top {
          width: 5.33rem;
          overflow: hidden;
        }
        .scroll-left {
          max-height: 12rem;
          overflow: hidden;
        }
        .table-content {
          width: 5.33rem;
          max-height: 12rem;
          overflow: scroll
        }
        .table-content::-webkit-scrollbar {
          height: 0;
        }
        .left-top-table {
          width: 150px;
          /*height: 100%;*/
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
        .right-top-table {
          width: 700px;
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
          width: 150px;
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
        .right-body-table {
          width: 700px;
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
          width: 1000px;
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
      height: 3rem;
      max-height: 3rem;
      margin-top: 0.26rem;
      /*-webkit-overflow-scrolling: touch;*/
      .out-table {
        .scroll-top {
          width: 9rem;
          overflow: hidden;
        }
        .scroll-left {
          max-height: 3rem;
          overflow: hidden;
        }
        .table-content {
          width: 9rem;
          max-height: 3rem;
          overflow: scroll
        }
        .table-content::-webkit-scrollbar {
          height: 0;
        }
        .left-top-table {
          width: 150px;
          /*height: 100%;*/
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
        .right-top-table {
          width: 700px;
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
          width: 150px;
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
        .right-body-table {
          width: 700px;
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
          width: 1000px;
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
