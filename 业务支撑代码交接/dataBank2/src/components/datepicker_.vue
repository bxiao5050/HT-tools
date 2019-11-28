<template>
  <div class="date-picker">
    <el-date-picker v-model="value" :type="single?'date':'daterange'" placeholder="选择日期范围" :picker-options="single?singleOptions:rangeOptions"
      @change="onChange" :clearable="false">
    </el-date-picker>
    <!--<daypicker v-if="daypicker"></daypicker>
    <dayselect v-if="dayselect" :confirm="dayselect"></dayselect>-->
  </div>
</template>

<script>
  import { DatePicker } from 'element-ui'
  import 'element-ui/lib/theme-chalk/date-picker.css'
  // import daypicker from './daypicker'
  // import dayselect from './dayselect'

  export default {
    components: {
      'el-date-picker': DatePicker,
      // daypicker,
      // dayselect
    },
    props: {
      // daypicker,
      // dayselect,
      date: {
        default: () => {
          return {
            startDate: moment().format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD"),
          }
        }
      },
      single: {
        default: false,
      },
      startDate: String,
      uid: String,
      changeDate: {
        type: Function
      }
    },
    data() {
      return {
        singleOptions: {},
        rangeOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              const start = moment();
              const end = moment();
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const start = moment().add(-1, "days");
              const end = moment().add(-1, "days");
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '过去7天',
            onClick(picker) {
              const start = moment().add(-7, "days");
              const end = moment().add(-1, "days");
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '过去30天',
            onClick(picker) {
              const start = moment().add(-30, "days").format("YYYY-MM-DD");
              const end = moment().add(-1, "days").format("YYYY-MM-DD");
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '本月',
            onClick(picker) {
              const start = moment().date(1).format("YYYY-MM-DD");
              const end = moment().add(-1, "days").format("YYYY-MM-DD");
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '上月',
            onClick(picker) {
              const start = moment().add(-1, "month").format("YYYY-MM-DD");
              const end = moment().date(1).add(-1, "days").format("YYYY-MM-DD");
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value: ''
      }
    },
    mounted() {
      this.renderDatePicker();
    },
    methods: {
      onChange(newDate) {
        if (this.single) {
          let param = {}
          param[this.uid] = newDate.split(' - ')[0]
          this.changeDate(param)
        } else {
          let rangeDate = {
            startDate: newDate.split(' - ')[0],
            endDate: newDate.split(' - ')[1]
          }
          this.changeDate(rangeDate)
        }
      },
      renderDatePicker() {
        if (this.single) {
          // console.log(this.date)
          this.value = moment(this.startDate);
        } else {
          this.value = [];
          this.value[0] = moment(this.date.startDate);
          this.value[1] = moment(this.date.endDate);
        }
      }
    },
    watch: {
      date: {
        deep: true,
        handler(v, ov) {
          if (v != ov) {
            this.renderDatePicker();
          }
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  .date-picker {
    display: flex;
    input {
      font-size: 13px !important;
      padding: 0;
      text-align: center;
      height: 32px;
      line-height: 32px;
      width: 198px;
      &.single {
        width: 128px;
      }
    }
  }
</style>