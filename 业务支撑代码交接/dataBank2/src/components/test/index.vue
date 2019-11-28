<template>
  <div>
    <datepicker :date="date" :single="false" :changeDate="changeDate"></datepicker>
    <progressBar></progressBar>
  </div>
</template>

<script>

import datepicker from '../datepicker_.vue'
import { alert } from 'src/main'
import progressBar from '../progressBar'
export default {
  components: {
    datepicker, progressBar
  },
  data() {
    return {
      date:{
        startDate:'2017-01-01',
        endDate:'2017-01-01',
      }
    }
  },
  methods:{
    changeDate(newDate){
      console.log(newDate)
    }
  }
}
</script>

