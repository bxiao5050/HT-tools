
<style lang="scss">
.edit-time-components {
  overflow: hidden;
  line-height: normal;
  div, ul, li, p{
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    outline: none;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
  }
  .year-month-box {
    text-align: center;
    .year-month {
      display: inline-block;
      font-size: 20px;
      color: #7b7777;
      span {
        display: inline-block;
        cursor: pointer;
        &:hover {
          color: #2494f2;
        }
      }
    }
    .year-list-box {
      display: inline-block;
      position: relative;
      .year-list, .month-list {
        position: absolute;
        background: #fff;
        width: 65px;
        height: 200px;
        overflow-y: auto;
        border: 1px solid #ddd;
        left: 0;
        text-align: center;
        .year-item, .month-item {
          cursor: pointer;
          color: #333;
          font-size: 14px;
          padding: 3px 0px;
          &:hover {
            background: #e6e6e6;
          }
        }
      }
      .month-list {
        left: initial;
        right: 0;
      }
    }
    .pre-month, .next-month {
      display: inline-block;
      color: #7b7777;
      cursor: pointer;
      transform: scaleY(1.5);
      height: 13px;
      line-height: 6px;
      vertical-align: middle;
      padding: 0 5px;
      &:hover {
        color: #2494f2;
      }
    }
  }
  .time-box {
    background: #fff;
    width: 240px;
    text-align: center;
    float: left;
    margin: 5px;
    border: 1px solid #ddd;
    padding: 5px;
    box-sizing: content-box;
    overflow: hidden;
  }
  .li-item {
    display: inline-block;
    float: left;
    width: 34px;
    height: 34px;
    line-height: 34px;
    font-size: 15px;
    text-align: center;
    border-radius: 50%;
  }
  .week {
    color: #b5b5b5;
    padding: 0;
  }
  .day {
    cursor: pointer;
    &:hover {
      background: #ddd;
    }
  }
  .ul-box {
    width: 100%;
  }
  .disable {
    color: rgba(57, 57, 57, .3);
    cursor: not-allowed;
    &:hover {
      background: none;
    }
  }
}
</style>

<template>
  <div class='edit-time-components'>
    <div id='{{index}}' class='time-box' v-for='(index, item) in dateList'>
      <div class='year-month-box'>
        <p v-if='item.switch' class='pre-month' @click='changeYearMonth(item.year, item.month - 1, index)'>&lt;</p>
        <div v-if='item.switch' class='year-list-box'>
          <div class='year-month'><span @click='yearMonthList($event, index, 0)'>{{item.year}}年</span><span @click='yearMonthList($event, index, 1)'>{{item.month}}月</span></div>
          <ul v-if='showYearList === index' @mousewheel='mousewheel($event)' class='year-list'>
            <li v-for='y in 25' @click='changeYearMonth(2000 + y, item.month, index)' class='year-item'>{{2000 + y}}年</li>
          </ul>
          <ul v-if='showMonthList === index' @mousewheel='mousewheel($event)' class='month-list'>
            <li v-for='m in 12' @click='changeYearMonth(item.year, m + 1, index)' class='month-item'>{{m + 1}}月</li>
          </ul>
        </div>
        <p v-if='!item.switch' class='year-month'>{{item.year + '年' + item.month + '月'}}</p>
        <p v-if='item.switch' class='next-month' @click='changeYearMonth(item.year, item.month + 1, index)'>&gt;</p>
      </div>
      <ul class='ul-box'>
        <li class='li-item week'>周日</li>
        <li class='li-item week'>周一</li>
        <li class='li-item week'>周二</li>
        <li class='li-item week'>周三</li>
        <li class='li-item week'>周四</li>
        <li class='li-item week'>周五</li>
        <li class='li-item week'>周六</li>
      </ul>
      <ul class='ul-box'>
        <li class='li-item' v-for='i in item.week'></li>
        <li
          v-for='i in item.monthDay'
          id='{{item.id + "-" + (i + 1)}}'
          class='{{"li-item day" + (isDisable(item.year, item.month, i + 1) ? " disable" : "")}}'
          :style = '{
            background: (selected.has(formatDate(item.year, item.month, i + 1)) ? "#5bc0de" : ""),
            color: (selected.has(formatDate(item.year, item.month, i + 1)) ? "#fff" : "")
          }'
          select = '{{(selected.has(formatDate(item.year, item.month, i + 1)) ? "true" : "false")}}'
          data-index = '{{i + 1}}'
          @click='dateClick($event, item, i + 1)'
          @dblclick='dbDateClick($event, item, i + 1)'
          @mouseover='mouseover(item, i + 1)'>
          {{i + 1}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
/*
组件功能:
1.可选择月份展开显示或者作为一个时间框显示
2.可单击选中，支持多选
3.可双击启动连续选择，支持正向，逆向和跳跃不可选日期
4.可原地切换日期
*/
let DEFAULT_DATELIST = [
  {
    year: undefined, // 日期初始年, 默认当前年
    month: undefined, // 日期初始月, 默认当前月
    multiSelect: true, // 日期是否可多选, 默认多选
    switch: true // 当前日期框是否支持切换年月份, 默认关闭(组件默认日期框为开启)
  }
]
let DEFAULT_OPTIONS = {
  disable: [], // 不可选日期，格式: '2016-01-01'
  // enable: [], // 可选日期，格式: '2016-01-01'，enable和disable只能有一个，如果都有默认用enable
  selected: [], // 已选择的day，格式: '2016-01-01'
  callback: undefined // 点击日期回调函数, callback(selectDateList)
}
export default {
  props: {
    datelist: {
      type: Array,
      required: false,
      default: function () {
        return DEFAULT_DATELIST
      },
      coerce: function(val) {
        return val.length === 0 ? DEFAULT_DATELIST : val
      }
    },
    options: {
      type: Object,
      required: false,
      default: function() {
        return DEFAULT_OPTIONS
      },
      coerce: function(val) {
        val.disable = val.disable || []
        val.selected = val.selected || []
        return val
      }
    }
  },
  data() {
    return {
      dateList: [],
      selected: new Set(),
      isdbclick: false,
      domId: null,
      dbDay: null,
      dom: new Array(33),
      showYearList: null,
      showMonthList: null
    }
  },
  methods: {
    mousewheel(event) {
      let pNode = event.currentTarget
      let scrollTop = pNode.scrollTop
      let scrollHeight = pNode.scrollHeight
      let height = pNode.clientHeight
      let delta = (event.wheelDelta) ? event.wheelDelta : -(event.detail || 0)
      if((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
        // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
        pNode.scrollTop = delta > 0 ? 0 : scrollHeight;
        // 向上滚 || 向下滚
        event.preventDefault();
      }
    },
    hideList() {
      this.showYearList = null
      this.showMonthList = null
    },
    yearMonthList(event, index, type) { // type = 0表示年，1表示月
      event.stopPropagation()
      this.hideList()
      if(type === 0) {
        this.showYearList = index
      }else if(type === 1) {
        this.showMonthList = index
      }
    },
    changeYearMonth(year, month, index) {
      this.isdbclick = false // 切换日期后一定要将双击记录清空
      this.domId = null
      let date = JSON.parse(JSON.stringify(this.dateList[index]))
      if(month < 1) {
        year -= 1
        month = 12
      }else if(month > 12) {
        year += 1
        month = 1
      }
      date.year = year
      date.month = month
      this.getDayConfig(date)
      this.dateList.$set(index, date)
    },
    isDisable(year, month, day) {
      let date = this.formatDate(year, month, day)
      if(this.options.enable) {
        return this.options.enable.indexOf(date) === -1
      }else {
        return this.options.disable.indexOf(date) !== -1
      }
    },
    formatDate(year, month, day) {
      month = (month + '').length === 2 ? month : '0' + month
      day = (day + '').length === 2 ? day : '0' + day
      return year + '-' + month + '-' + day
    },
    init(options, datelist) {
      // init data
      this.isdbclick = false
      this.domId = null
      this.dbDay = null
      // this.dom = new Array(33)
      let tempList = JSON.parse(JSON.stringify(datelist))
      tempList.forEach((item, index) => {
        item.id = index // 对整个时间框的初始化配置, 时间框id
        item.lastSelect = null // 对整个时间框的初始化配置, 时间框最近一次选择的时间
        this.getDayConfig(item) // 对每一次显示的时间的初始化配置
      })
      this.selected = new Set(options.selected)
      this.dateList = tempList
    },
    getDayConfig(item) {
      let year = item.year || (new Date()).getFullYear()
      let month = item.month || (parseInt((new Date()).getMonth()) + 1)
      let monthDay = (new Date(year, month, 0)).getDate()
      let week = (new Date(year, parseInt(month - 1), 1)).getDay()
      item.year = parseInt(year)
      item.month = parseInt(month)
      item.monthDay = monthDay
      item.week = week
    },
    getdbClickData(item) {
      for(let i = 1; i <= item.monthDay; ++i) {
        let dom = this.dom[i]
        let tMonth = (item.month + '').length === 2 ? item.month : '0' + item.month
        let tDay = (i + '').length === 2 ? i : '0' + i
        let date = item.year + '-' + tMonth + '-' + tDay
        if(dom.style.background !== '') {
          dom.setAttribute('select', 'true')
          this.selected.add(date)
        }
      }
    },
    cleardbClick() {
      for(let i = 1; i <= this.dom.length; ++i) {
        let dom = this.dom[i]
        if(!dom) return
        if(dom.getAttribute('select') !== 'true') {
          dom.style.background = ''
          dom.style.color = '#000'
        }
      }
    },
    dateClick(event, item, day) {
      if(this.isDisable(item.year, item.month, day)) return
      if(this.isdbclick) {
        if(item.id === this.domId) {
          this.isdbclick = false
          this.getdbClickData(item)
          if(this.options.callback) {
            this.options.callback([...this.selected])
          }
          return
        }else {
          this.cleardbClick()
        }
      }
      this.isdbclick = false
      let date = this.formatDate(item.year, item.month, day)
      if(event.target.getAttribute('select') !== 'true') {
        if(item.multiSelect === false && item.lastSelect) {
          this.selected.delete(this.formatDate(item.year, item.month, item.lastSelect))
          let lastDom = document.getElementById(item.id + '-' + item.lastSelect)
          lastDom.style.background = ''
          lastDom.style.color = '#000'
          lastDom.setAttribute('select', 'false')
        }
        event.target.style.background = '#5bc0de'
        event.target.style.color = '#fff'
        event.target.setAttribute('select', 'true')
        this.selected.add(date)
        item.lastSelect = day
      }else {
        event.target.style.background = ''
        event.target.style.color = '#000'
        event.target.setAttribute('select', 'false')
        this.selected.delete(date)
      }
      if(this.options.callback) {
        this.options.callback([...this.selected])
      }
    },
    dbDateClick(event, item, day) {
      if(item.multiSelect === false) return
      if(this.isDisable(item.year, item.month, day)) return
      event.target.style.background = '#5bc0de'
      event.target.style.color = '#fff'
      let id = item.id
      this.isdbclick = true
      this.dbDay = day
      if(this.domId === id) {
        return
      }
      this.domId = item.id
      let dom = document.getElementById(id + '').getElementsByClassName('day')
      for(let i = 0; i < dom.length; ++i) {
        let item = dom[i]
        this.dom[item.dataset.index] = item
      }
      this.dom[dom.length + 1] = null // 这句作用于上面cleardbClick的if(!dom) return
    },
    mouseover(item, day) {
      if(!this.isdbclick || !this.dbDay) return
      if(this.domId !== item.id) return
      let left = day > this.dbDay ? this.dbDay : day
      let right = day > this.dbDay ? day : this.dbDay
      for(let i = 1; i <= item.monthDay; ++i) {
        if(this.isDisable(item.year, item.month, i)) continue
        let dom = this.dom[i]
        if(left <= i && i <= right) {
          dom.style.background = '#5bc0de'
          dom.style.color = '#fff'
        }else if(dom.getAttribute('select') !== 'true') {
          dom.style.background = ''
          dom.style.color = '#000'
        }
      }
    }
  },
  watch: {
    datelist: function(val, oldVal) {
      this.init(this.options, val)
    },
    options: {
      handler: function(val, oldVal) { // 此处不建议深度监听，根据业务需求判断是否采用深度监听
        this.init(val, this.datelist)
      },
      deep: true
    }
  },
  created: function() {
    this.init(this.options, this.datelist)
    document.addEventListener('click', this.hideList) // 点击日期之外的隐藏日期选择
  },
  destroyed: function() {
    document.removeEventListener('click', this.hideList)
  }
}
</script>