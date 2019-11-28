<template>
  <div class="table-group">
    <table class="out-table" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <!--*********左上-BEGIN***********-->
          <table class="left-top-table">
            <tr>
              <th>日期</th>
            </tr>
          </table>
          <!--**************左上-END**********-->
        </td>
        <td>
          <div id='scroll1' class="scroll-top">
            <!--***********右上-BEGIN********-->
            <table class="right-top-table">
              <tr>
                <th>+1日留存率</th>
                <th>+2日留存率</th>
                <th>+3日留存率</th>
                <th>+4日留存率</th>
                <th>+5日留存率</th>
                <th>+6日留存率</th>
                <th>+7日留存率</th>
                <th>+14日留存率</th>
                <th>+30日留存率</th>
                <th>注册人数</th>
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
              <tr v-for="item in newUserRetainData">
                <td>{{item["reg_date"]}}</td>
              </tr>
            </table>
            <!--*************左下-END***********-->
          </div>
        </td>
        <td align="left" valign="top">
          <div id="tablecontent" class="table-content">
            <!--***********右下-BEGIN***********-->
            <table class="right-body-table">
              <tr v-for="item in newUserRetainData">
                <td>{{item["+1日留存率"]}}</td>
                <td>{{item["+2日留存率"]}}</td>
                <td>{{item["+3日留存率"]}}</td>
                <td>{{item["+4日留存率"]}}</td>
                <td>{{item["+5日留存率"]}}</td>
                <td>{{item["+6日留存率"]}}</td>
                <td>{{item["+7日留存率"]}}</td>
                <td>{{item["+14日留存率"]}}</td>
                <td>{{item["+30日留存率"]}}</td>
                <td>{{item["reg_count"]}}</td>
              </tr>
            </table>
            <!--*************右下-END*****************-->
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    data:function(){
      return {
      }
    },
    computed: {
      newUserRetainData: function () {
        return this.$store.state.userRetainstore.newUserRetainData;
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
    }
  }

</script>
<style lang="scss" scoped>
  @media screen and (orientation:portrait){
    .table-group {
    height: 12.6rem;
    max-height: 12.6rem;
    /*-webkit-overflow-scrolling: touch;*/
    .out-table {
      .scroll-top {
        width: 250px;
        overflow: hidden;
      }
      .scroll-left {
        max-height: 440px;
        overflow: hidden;
      }
      .table-content{
        width:250px;max-height:440px;overflow:scroll
      }
      .left-top-table {
        /*width: 100px;*/
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
        width: 1000px;
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
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border: 1px solid #ddd;
          }
        }
      }
      .right-body-table {
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
          }
        }
      }
    }
  }
  }
  


  @media screen and (orientation:landscape){
    .table-group {
    height: 5.33rem;
    max-height: 5.33rem;
    /*-webkit-overflow-scrolling: touch;*/
    .out-table {
      .scroll-top {
        width: 520px;
        overflow: hidden;
      }
      .scroll-left {
        max-height: 280px;
        overflow: hidden;
      }
      .table-content{
        width:520px;max-height:280px;overflow:scroll
      }
      .left-top-table {
        width: 100px;
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
          }
        }
      }
      .right-top-table {
        width: 1000px;
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
          }
        }
      }
      .left-body-table {
        width: 100px;
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
          }
        }
      }
      .right-body-table {
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
          }
        }
      }
    }
  }
}
</style>
