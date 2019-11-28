<template>
  <div>
    <nv-date-picker :dateChange="dateChange"></nv-date-picker>
    <dataRepairTable @query="query"></dataRepairTable>
  </div>
</template>
<script>
  import nvDatePicker from '../../components/datepicker.vue'
  import dataRepairTable from '../../components/launchReport/data-repair-table.vue'
  import httpRequest from '../../utils/httpRequest.js'
  import commonMethod from '../../utils/commonMethod.js'
  import {
    Toast
  } from 'mint-ui'
  export default {
    components: {
      nvDatePicker,
      dataRepairTable,
    },
    data: function () {
      return {
        date1: '',
        media_source: '',
      }
    },
    mounted: function () {
      var oldMenu = this.$store.state.launchAreaStore.oldMenu;
      var nowmenu = this.$store.state.basestore.nowmenu;
      if (oldMenu == null || oldMenu.menu_id != nowmenu.menu_id) {
        this.$store.dispatch("setDataRepairAppData", this.$store.state.launchAreaStore.appData);
        this.$store.dispatch("setOldMenu", nowmenu);
      }
    },
    methods: {
      dateChange: function (newDate) {
        this.date1 = newDate;
      },
      query: function () {
        var params = {
          date1: this.date1,
          media_source: this.media_source
        }
        httpRequest.getDataRepairData(params, (data) => {
          if (data.state == "successed") {
            var dataRepairData = data.result[0];
            this.$store.dispatch("setDataRepairData", dataRepairData);
          } else {
            Toast(data.result.errorMsg);
          }
        })
      }
    },
    watch: {
      'date1': function (newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          this.query();
        }
      }
    }
  }

</script>
<style lang="scss">


</style>
