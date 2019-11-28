<template>
  <div>
    <!--<mt-cell title="渠道">-->
      <!--&lt;!&ndash;<input list="medialist" class="media-control" placeholder="必填" v-model="media_source">&ndash;&gt;-->
      <!--&lt;!&ndash;<select v-model="selectedtype" class="media-control">&ndash;&gt;-->
        <!--&lt;!&ndash;<option  value="-1">全部</option>&ndash;&gt;-->
        <!--&lt;!&ndash;<option v-for="(item,index) in catagory" :value="index">{{item}}</option>&ndash;&gt;-->
      <!--</select>-->
    <!--</mt-cell>-->
    <div class="table-group">
      <table class="out-table" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <!--*********左上-BEGIN***********-->
            <table class="left-top-table">
              <tr>
                <th :style="{width:rowWidth+'px'}">{{showHead}}</th>
              </tr>
            </table>
            <!--**************左上-END**********-->
          </td>
          <td>
            <div id='scroll1' class="scroll-top">
              <!--***********右上-BEGIN********-->
              <table class="right-top-table">
                <tr>
                  <th :style="{width:rowWidth+'px'}" v-for="(item,index) in showTableTitle">{{item}}</th>
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
                <tr v-for="item in showTable">
                  <td :style="{width:rowWidth+'px'}">{{item[showHead]}}</td>
                </tr>
              </table>
              <!--*************左下-END***********-->
            </div>
          </td>
          <td align="left" valign="top">
            <div id="tablecontent" class="table-content">
              <!--***********右下-BEGIN***********-->
              <table class="right-body-table">
                <v-touch tag="tr" v-for="item in showTable" >
                  <td :style="{width:rowWidth+'px',maxWidth:rowWidth+'px'}" v-for="pi in showTableTitle">{{item[pi]}}</td>
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
  export default {
    props: [ 'tableData','catagoryName','head','tableTitle'],
    data:function () {
      return {
        catagory:[],
        showTable:[],
        selectedtype:-1,
        rowWidth:0,
        totalHead:'',
        totalTableTitle:[],
        catagoryHead:'',
        catagoryTableTitle:[],
        showHead:'',
        showTableTitle:[]
      };
    },
    mounted:function () {
      this.showHead = this.head;
      this.showTableTitle = this.tableTitle;
      if(this.selectedtype) this.selectedtype = -1;
      var obj = document.getElementById("tablecontent");
      obj.addEventListener("scroll", function () {
        document.getElementById("scroll1").children[0].style.position = "relative";
        document.getElementById("scroll2").children[0].style.position = "relative";

        document.getElementById("scroll1").children[0].style.left = "-" + this.scrollLeft + "px";
        document.getElementById("scroll2").children[0].style.top = "-" + this.scrollTop + "px";
      });
      this.showTable = this.getCurrentTable();
    },
    watch:{
      tableData:function (newValue) {
          this.catagory = this.getCatagory();
          //this.tableTitle = this.getTableTitle();
        this.catagoryHead = this.showHead ;
        this.catagoryTableTitle = this.showTableTitle;
        this.totalHead = this.catagoryName;
        this.totalTableTitle = [this.head,...this.catagoryTableTitle];
        if(this.selectedtype == -1) {
          this.showHead = this.totalHead;
          this.showTableTitle = this.totalTableTitle;
          this.showTable = this.tableData;
        }
        else {
          this.showHead = this.catagoryHead;
          this.showTableTitle = this.catagoryTableTitle;
          this.showTable = this.getCurrentTable();
        }
        this.rowWidth = (1200 - 110)/this.tableTitle.length;
      },
      selectedtype:function (newValue) {
        if(this.selectedtype == -1) {
            this.showHead = this.totalHead;
            this.showTableTitle = this.totalTableTitle;
          this.showTable = this.tableData;
        }
        else {
          this.showHead = this.catagoryHead;
          this.showTableTitle = this.catagoryTableTitle;
          this.showTable = this.getCurrentTable();
        }
      }
    },
    methods:{
      getTableTitle:function () {
        var title = [];
        var model = this.tableData[i];
        if(model) {
          for (var pi in model)
            if (model.hasOwnProperty(pi)) {
              title.push(pi);
            }
        }
        return title;
      },
      getCurrentTable:function () {
        var catagoryName = this.catagoryName;
        var current = this.catagory[this.selectedtype];
        var result = [];
        this.tableData.forEach((item)=>{
          if(item[catagoryName] == current)
            result.push(item);
        });
        return result;
      },
      getCatagory:function () {
        var result = [];
        var catagoryName = this.catagoryName;
        this.tableData.forEach((item)=>{
            if(result.findIndex(i=>i == item[catagoryName]) == -1)
                result.push(item[catagoryName]);
        });
        return result;
      }
    }
  };
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
      margin-top: 0.26rem;
    /*-webkit-overflow-scrolling: touch;*/
    .out-table {
    .scroll-top {
      width: 7.0rem;
      overflow: hidden;
    }
    .scroll-left {
      overflow: hidden;
    }
    .table-content {
      width: 7.3rem;
      overflow: scroll
    }
    .table-content::-webkit-scrollbar {
      height: 0;
    }
    .left-top-table {
      /*height: 100%;*/
      width: 100%;
      border-collapse: collapse;
      border: none;
    tr {
      border-color: inherit;
    th {
      height: 30px;
      text-align: center;
      border: 1px solid #ddd;
    }
  }
  }
  .right-top-table {
    width: 1200px;
    height: 100%;
    border-collapse: collapse;
    border: none;
  tr {
    border-color: inherit;
  th {
    height: 30px;
    text-align: center;
    border: 1px solid #ddd;
  }
  }
  }
  .left-body-table {
    height: 100%;
    border-collapse: collapse;
    border: none;
  tr {
    border-color: inherit;
  td {
    height: 30px;
    text-align: center;
    border: 1px solid #ddd;
  }
  }
  }
  .right-body-table {
    width: 1200px;
    height: 100%;
    border-collapse: collapse;
    border: none;
  tr {
    border-color: inherit;
  td {
    height: 30px;
    text-align: center;
    border: 1px solid #ddd;
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
    height: 30px;
    text-align: center;
    border: 1px solid #ddd;
  }
  }
  }
  .right-footer-table {
    width: 1200px;
    height: 100%;
    border-collapse: collapse;
    border: none;
  tr {
    border-color: inherit;
  td {
    height: 30px;
    text-align: center;
    border: 1px solid #ddd;
  }
  }
  }
  }
  }
  }

  @media screen and (orientation:landscape) {
    .table-group {
      margin-top: 0.26rem;
    /*-webkit-overflow-scrolling: touch;*/
    .out-table
    {
    .scroll-top {
      width: 9rem;
      overflow: hidden;
    }
    .scroll-left {
      overflow: hidden;
    }
    .table-content {
      width: 9rem;
      overflow: scroll
    }
    .table-content::-webkit-scrollbar {
      height: 0;
    }
    .left-top-table {
      /*height: 100%;*/
      width: 100%;
      border-collapse: collapse;
      border: none;
    tr {
      border-color: inherit;
    th {
      width: 150px;
      height: 30px;
      text-align: center;
      border: 1px solid #ddd;
    }

  }

  }
  .right-top-table {
    width: 1200px;
    height: 100%;
    border-collapse: collapse;
    border: none;
  tr {
    border-color: inherit;
  th {
    height: 30px;
    text-align: center;
    border: 1px solid #ddd;
  }
  }
  }
  .left-body-table {
    height: 100%;
    border-collapse: collapse;
    border: none;
  tr {
    border-color: inherit;
  td {
    width: 150px;
    height: 30px;
    text-align: center;
    border: 1px solid #ddd;
  }
  }
  }
  .right-body-table {
    width: 1200px;
    height: 100%;
    border-collapse: collapse;
    border: none;
  tr {
    border-color: inherit;
  td {
    height: 30px;
    text-align: center;
    border: 1px solid #ddd;
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
    height: 30px;
    text-align: center;
    border: 1px solid #ddd;
  }
  }
  }
  .right-footer-table {
    width: 1200px;
    height: 100%;
    border-collapse: collapse;
    border: none;
  tr {
    border-color: inherit;
  td {
    height: 30px;
    text-align: center;
    border: 1px solid #ddd;
  }
  }
  }
  }
  }
  }

</style>
