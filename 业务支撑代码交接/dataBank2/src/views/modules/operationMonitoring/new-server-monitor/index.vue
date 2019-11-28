<template>
  <section id="new-server-monitor">
    <div class="content-header">
      <moduleHeader :header="header" :isShowReg="true" :dateList="dateList"></moduleHeader>
    </div>
    <div class="content-body">
        <card>
          <div slot="header">详细数据</div>
          <div slot="body">
            <div class="table-content">
            <normalTable :tableData="data"></normalTable>
            </div>
          </div>
        </card>
    </div>
  </section>
</template>

<script>
import moduleHeader from 'src/views/modules/module-header'
import card from 'src/components/card.vue'
import normalTable from 'src/components/normal-table.vue'
export default {
  name: 'new-server-monitor',
  components: {
    card, moduleHeader,  normalTable
  },
  computed: {
    data() {
      return this.$store.state.NewServerMonitor.data
    }
  },
  data() {
    return {
      header: {
        title: '新服监测',
        definedContent: '',
        isShowIndex: false,
      },
      dateList: [
        {
          single: true,
          uid: 'date1',
          label: '日期',
          startDate: this.date1,
          endDate: '',
          change: (newDate) => { this.date1 = newDate.startDate; this.query(); }
        }],

      date1: moment().format("YYYY-MM-DD"),
      tableData: [],
    }
  },
  mounted() {
    this.query();
  },
  methods: {
    changeDate(newDate) {
      this.date1 = newDate.startDate
      // console.log(newDate.startDate)
    },
    query() {
      this.$store.dispatch('NewServerMonitor/data', {
        isCache: 1,
        in_date1: this.date1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
        in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
        platformId: '1,2'
      })
    }
  }
}

</script>

<style lang="scss" scoped>

  .table-content {
    overflow: auto;
    width: 100%;
    max-height: 500px;
    white-space:nowrap;
  }
</style>