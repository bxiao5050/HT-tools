<template>
  <section id="first-pay-detail">
    <div class="content-header">
      <moduleHeader :header="header" :dateList="dateList"></moduleHeader>
    </div>
    <div class="content-body">
        <card>
          <div slot="header">详细数据</div>
          <div slot="body">
            <div class="table-content">
              <normalTable :tableData="tableData"></normalTable>
            </div>
          </div>
        </card>
    </div>
  </section>
</template>

<script>
  import moduleHeader from 'src/views/modules/module-header'
  import card from 'src/components/card.vue'
  import api from 'src/services/api'
  import normalTable from 'src/components/normal-table.vue'
  export default {
    name: 'first-pay-detail',
    components: {
      moduleHeader,
      card,
      normalTable
    },
    data() {
      return {
        header: {
          title: '首充明细',
          definedContent: '',
          isShowIndex: true,
        },
        date1: moment().add(-1, "day").format("YYYY-MM-DD"),
        date2: moment().format("YYYY-MM-DD"),
        tableData: [],
      }
    },
    mounted() {
      this.query();
    },
    computed: {
      dateList() {
        return [{
          single: false,
          uid: 'date1',
          label: '日期',
          startDate: this.date1,
          endDate: this.date2,
          isShowDatetype: false,
          change: (newDate) => {
            this.date1 = newDate.startDate;
            this.date2 = newDate.endDate;
            this.query();
          }
        }]
      },
    },
    mounted() {
      this.query();
    },
    methods: {
      getDateView() {
        var nowmenu = this.$store.state.common.nowmenu;
        if (nowmenu && nowmenu.dataView) {
          return nowmenu.dataView;
        } else {
          console.error("获取脚本信息失败!");
          return "";
        }
      },
      query() {
        var params = {
          in_date1: this.date1,
          in_date2: this.date2,
          dataview: this.getDateView(),
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
          in_platform: '1,2',
          isCache: 1,
        }
        api.user.getQuery(params).then((data) => {
          if (data.code == 401) {
            this.tableData = data.state[0];
          } else {
            Utils.Notification.error({
              message: data.message
            })
            console.error(data.message);
          }
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
      }
  .charts {
    min-height: 300px;
    height: 300px;
  }
</style>