<template>
  <div class="date-picker">
    <input type="text" :id="uid" name="daterange" class="form-control">
    <daypicker></daypicker>
  </div>
</template>

<script>

import daypicker from './daypicker'

export default {
  components: {
    daypicker
  },
  props: {
    uid: {
      default: "datepicker"
    },
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
    changeDate: {
      type: Function
    }
  },
  data() {
    return {
      rangeDate: {
        startDate: "",
        endDate: "",
      }
    }
  },
  mounted() {
    this.$id = $("#" + this.uid)
    this.renderDatePicker();
  },
  beforeDestroy() {
    this.$id.data("daterangepicker").remove();
  },
  methods: {
    renderDatePicker() {
      var options = {
        locale: {
          format: 'YYYY-MM-DD',
          customRangeLabel: "自定义",
          applyLabel: '确定',
          cancelLabel: '取消',
        },
        "ranges": {
          "今天": [
            moment().format("YYYY-MM-DD"),
            moment().format("YYYY-MM-DD")
          ],
          "昨天": [
            moment().add(-1, "days").format("YYYY-MM-DD"),
            moment().add(-1, "days").format("YYYY-MM-DD")
          ],
          "过去7天": [
            moment().add(-7, "days").format("YYYY-MM-DD"),
            moment().format("YYYY-MM-DD")
          ],
          "过去30天": [
            moment().add(-30, "days").format("YYYY-MM-DD"),
            moment().format("YYYY-MM-DD")
          ],
          "本月": [
            moment().date(1).format("YYYY-MM-DD"),
            moment().format("YYYY-MM-DD")
          ],
          "上月": [
            moment().add(-1, "month").date(1).format("YYYY-MM-DD"),
            moment().date(1).add(-1, "days").format("YYYY-MM-DD")
          ]
        },
        "alwaysShowCalendars": true,
        "opens": "right",
        "drops": "down",
        "singleDatePicker": this.single ? true : false,
        "startDate": "",
        "endDate": ""
      }
      if (this.single) {
        options.startDate = this.date.startDate;
      }
      else {
        options.startDate = this.date.startDate;
        options.endDate = this.date.endDate;
      }
      this.$id.daterangepicker(options, (start, end, label) => {
        this.rangeDate = {
          startDate: moment(start).format('YYYY-MM-DD'), // moment(start).format('YYYY-MM-DD'),
          endDate: moment(end).format('YYYY-MM-DD') //moment(end).format('YYYY-MM-DD')
        }

        this.changeDate(this.rangeDate)
      })
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



