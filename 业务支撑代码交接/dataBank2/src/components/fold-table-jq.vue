<template>
  <table class="table table-bordered table-hover">
    <thead>
      <tr>
        <th></th>
        <th v-for="column in columnArr">{{column}}</th>
      </tr>
    </thead>
    <tbody id="tb">
  
    </tbody>
    <tfoot v-if="tableData.length==0">
      <tr>
        <td>无数据</td>
      </tr>
    </tfoot>
  </table>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: []
    },
    tableDetail: {
      type: Array,
      default: []
    },
    mergeKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  computed: {
    columnArr() {
      let result = [];
      if (this.tableData.length > 0) {
        for (let index in this.tableData[0]) {
          result.push(index);
        }
      }
      return result;
    }
  },
  mounted() {
    this.initFoldTable();
  },
  methods: {
    initFoldTable() {
      var result = ""
      if (this.mergeKey) {
        this.tableData.forEach((main) => {
          let mTr = "<tr data-date='"+main[this.mergeKey]+"'>"//基本行
          mTr += "<td><i class='icon-plus' data-name='open-hide-icon'></i></td>"
          this.columnArr.forEach((column) => {
            mTr += "<td>" + main[column] + "</td>"
          })
          mTr += "</tr>"
          result += mTr;
          this.tableDetail.forEach((detail) => {
            if (main[this.mergeKey] == detail[this.mergeKey]) {
              let dTr = "<tr data-date='"+main[this.mergeKey]+"-detail' class='hide-row'>"//详细行
              dTr += "<td></td>"
              this.columnArr.forEach((column) => {
                if (this.mergeKey == column) {
                  dTr += "<td></td>"
                }
                else {
                  dTr += "<td>" + detail[column] + "</td>"
                }
              })
              dTr += "</tr>"
              result += dTr;
            }
          })
        })
        document.getElementById("tb").innerHTML = result;

        var _self=this
        $('[data-name="open-hide-icon"]').click(function(event){
          _self.toggleRowItem($(this))
        })
      }
      else {
        console.error("mergeKey is not set!")
      }
    },
    toggleRowItem(icon){
      if (icon.hasClass('icon-plus')) {
            icon.removeClass('icon-plus').addClass('icon-minus');
            var tmp_parent = icon.parent().parent();

            var child = tmp_parent.nextAll('[data-date=' + tmp_parent.attr('data-date') + '-detail' + ']');
            child.removeClass('hide-row');
        } else {
            icon.removeClass('icon-minus').addClass('icon-plus');
            var tmp_parent = icon.parent().parent();

            var child = tmp_parent.nextAll('[data-date=' + tmp_parent.attr('data-date') + '-detail' + ']');
            child.addClass('hide-row');
        }
    }

  }
}
</script>
<style lang="scss">
table {
  th,
  td {
    font-weight: normal;
    border-top: 0;
    vertical-align: middle;
    text-align: center; // white-space: nowrap;
  }
}

.icon-arrow1 {
  &.up {
    transform: rotate(0deg);
  }
  &.down {
    transform: rotate(180deg);
  }
}

.hide-row{
  display: none;
}
</style>
