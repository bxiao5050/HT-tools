<template>
  <div ref="total" total-float class="total-float">
    <table ref="table" cellspacing="0" cellpadding="0" border="0" class="el-table__body" :style="{width:getTotalWidth()}">
      <colgroup>
        <col :class="'el-table_1_column_'+(i++)" v-for="(item, i) in _config._config.tableKey" :key="i" :width="item.width" v-if="!item.hide">
      </colgroup>
      <tbody>
        <tr class="el-table__row total">
          <td :class="'el-table_1_column_'+(i++)" v-for="(item, i) in _config._config.tableKey" :key="i" v-if="!item.hide">
            <div class="cell">{{_config.$$data.total[item.key]}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['_config', '_chart'],
  data() {
    return {
      height: 0
    }
  },
  watch: {
    _chart() {
      var total = this.$refs.total.classList
      total.contains('fixed') && total.remove('fixed')
      this.$nextTick(() => {
        this.$data.height = Utils.getElementTop(this.$refs.total)
        this.windowScroll()
      })
    }
  },
  methods: {
    getTotalWidth() {
      var width = 0
      this._config._config.tableKey.forEach(item => {
        if (!item.hide)
          width += item.width
      })
      return width + 'px'
    },
    windowScroll() {
      var total = this.$refs.total.classList
      var scrollTop = this.$root.$children[0].$refs.scroll.scrollTop
      var appHeight = this.$root.$el.clientHeight

      if (this.$data.height <= appHeight + scrollTop) {
        if (total.contains('fixed')) {
          total.remove('fixed')
          this.$refs.table.style['transform'] = `translateX(0px)`
        }
      } else {
        if (!total.contains('fixed')) {
          total.add('fixed')
          if (this.totalScroll.scrollLeft) this.$refs.table.style['transform'] = `translateX(-${this.totalScroll.scrollLeft}px)`
        }

      }
    },
    totalScroll(e) {
      this.totalScroll.scrollLeft = e.target.scrollLeft
    }
  },
  mounted() {
    this.$root.$children[0].$refs.scroll.addEventListener('scroll', this.windowScroll);
    this.$refs.total && this.$refs.total.parentElement.parentElement.parentElement.addEventListener('scroll', this.totalScroll)
  },
  beforeDestroy() {
    this.$root.$children[0].$refs.scroll.removeEventListener('scroll', this.windowScroll)
    this.$refs.total && this.$refs.total.parentElement.parentElement.parentElement.removeEventListener('scroll', this.totalScroll)
  }
}
</script>
<style lang="scss">
.fixed[total-float] {
  position: fixed;
  bottom: 0;
  z-index: 999;
  overflow: hidden;
}
</style>




