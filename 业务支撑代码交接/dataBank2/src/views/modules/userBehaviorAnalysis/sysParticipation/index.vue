<template>
  <div>
     <div class="content-header">
     <moduleHeader :dateList="dateList" :isShowReg="true"></moduleHeader>
     <div class="switchs-item">
        <span class="item-header">选择系统:</span>
        <div class="item-content">
          <div class="bt-item" v-for="(item,index) in config" :key="index" :class="{'check':now && item.id===now.id}" @click="now=item">{{item.name}}</div>
        </div>
      </div>
    <div>

    </div>
    </div>
    <div class="content-body">
      <component ref="participation" :is="currentView" :now="now" :date1="date1" @query="query" @exportData="exportData"></component>
    </div>
  </div>
</template>
<script>
import moduleHeader from "src/views/modules/module-header.vue";
import api from "src/services/api";
import marrySystem from "./components/marrySystem.vue";
import unionSystem from "./components/unionSystem.vue";
import petSystem from "./components/petSystem.vue";
import armsSystem from "./components/armsSystem.vue";
export default {
  name: "sysParticiption",
  components: {
    moduleHeader,
    marrySystem, // 结婚系统
    unionSystem, // 工会系统
    petSystem, // 宠物系统
    armsSystem // 武器系统
  },
  data() {
    return {
      date1: moment()
        .add(-1, "day")
        .format("YYYY-MM-DD"),
      // dataProvider:[],

      now: null,
      config: [
        {
          id: 1,
          name: "结婚系统",
          view: "marrySystem",
          dataview: ""
        },
        {
          id: 2,
          name: "工会系统",
          view: "unionSystem",
          dataview: ""
        },
        {
          id: 3,
          name: "宠物系统",
          view: "petSystem",
          dataview: ""
        },
        {
          id: 4,
          name: "武器系统",
          view: "armsSystem",
          dataview: ""
        }
      ]
    };
  },
  mounted() {
    this.now = this.config[0];
  },
  computed: {
    dateList() {
      return [
        {
          single: true,
          uid: "date1",
          label: "日期",
          startDate: this.date1,
          endDate: "",
          isShowDatetype: false,
          change: newDate => {
            this.date1 = newDate.startDate;
            this.query();
          }
        }
      ];
    },
    currentView() {
      if (this.now) return this.now.view;
      return this.config[0].view;
    }
  },
  methods: {
    getParams(obj) {
      return {
        isCache: 1,
        in_date1: this.date1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezone_id: this.$store.getters["Agent/selectedIdList"],
        in_reg_channel: this.$store.getters["RegChannel/selectedIdList"],
        // in_platform: '1,2',
        in_os: this.$store.getters["OS/nowOS"],
        in_type_id: this.now ? this.now.id : 1,
        in_select_id: obj ? obj.in_select_id : 1
      };
    },
    // 查询 第一个参数为子模块中的额外参数，通过emit触发,第二个参数为关键字，只做返回区分多个查询，不对其做任何处理
    query(obj, key) {
      console.log('query',key)
      let params = this.getParams(obj);
      api.user.getQuery(params).then(data => {
        if (data.code == 401) {
          // this.dataProvider= data.state
          this.$refs.participation.dataProvider(data.state, key);
        } else {
          Utils.Notification.error({
            message: data.message
          });
          console.error(data.message);
        }
      });
    },
    exportData(obj) {
      let params = this.getParams(obj);
      api.user.exportData(params);
    }
  }
};
</script>
<style lang="scss" scoped>
.item-content {
  margin-right: 15px;
  float: left;
  line-height: 30px;
  .bt-item {
    cursor: pointer;
    padding: 0 15px;
    float: left;
    background-color: #fff;
    border: 1px solid #bbb;
    border-right: 0;
    text-align: center;
    &:last-child {
      border-right: 1px solid #bbb;
    }
  }
  .bt-item.check {
    font-weight: 700;
    color: #fff;
    background-color: #fc9153;
  }
}
</style>