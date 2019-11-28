<template>
  <section id="reg-detail">
    <div class="content-header">
      <moduleHeader :header="header" :dateList="dateList"></moduleHeader>
      <div class="switchs">
        <div class="switch-group">
          <div class="switchs-item">
            <span class="item-header">ID:</span>
            <input type="text" class="item-input" v-model="userId" @keyup.enter="query" placeholder="输入ID"></input>
          </div>

          <div class="switchs-item">
            <span class="item-header">帐号:</span>
            <input type="text" class="item-input" v-model="userName" @keyup.enter="query" placeholder="输入帐号名称"></input>
          </div>

          <!--<div class="switchs-item">
            <span class="item-header"></span>
            <button class="btn btn-primary item-input" @click="query"><i class="icon-refresh"></i>查询</button>
          </div>-->
        </div>
      </div>
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
  name: 'reg-detail',
  components: {
    moduleHeader,
    card,
    normalTable
  },
  data() {
    return {
      header: {
        title: '注册明细',
        definedContent: '',
        isShowIndex: true,
      },
      date1: moment().add(-1, "day").format("YYYY-MM-DD"),
      date2: moment().format("YYYY-MM-DD"),

      userId: "",
      userName: "",

      tableData: [],
      columnData: [], //表格列名数组
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
    }
  },
  methods: {
    query() {
      var params = {
        isCache: 1,
        in_date1: this.date1,
        in_date2: this.date2,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
        in_platform: '1,2',
        user_id: this.userId,
        username: this.userName
      }
      api.user.getQuery(params).then((data) => {
        if (data.code == 401) {
          this.tableData = data.state[0]
          this.columnData = data.state[1]
        } else {
          Utils.Notification.error({
            message: data.message
          })
          console.error(data.message)
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