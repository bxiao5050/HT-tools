<template>
  <div>
     <div class="content-header">
     <moduleHeader :dateList="dateList" :isShowReg="true"></moduleHeader>
     <div class="switchs-item">
        <span class="item-header">选择系统:</span>
        <div class="item-content">
          <div class="bt-item" v-for="(item,index) in config" :key="index" :class="{'check':now && item.id===now.id}" @click="changeSystem(item)">{{item.name}}</div>
        </div>
      </div>
      <div class="switchs-item" style="position:relative;">
        <span class="item-header">显示类型:</span>
        <el-radio-group v-model="showType">
          <el-radio-button name="showType" :label="1" type="warning" title="图形"><i class="icon-bar-chart"></i></el-radio-button>
          <el-radio-button name="showType" :label="2" type="warning" title="表格"><i class="icon-table"></i></el-radio-button>
        </el-radio-group>
        <div class="export-link">
            <a href="javascript:void(0)" @click="exportData"><i class="icon-download"></i>导出数据</a>
        </div>
      </div>
    </div>
    <div class="content-body">
      <component ref="saturation" :is="currentView" :showType="showType" @query="query" @exportData="exportData"></component>
    </div>
  </div>
</template>
<script>
import moduleHeader from 'src/views/modules/module-header.vue'
import api from 'src/services/api'
import petSystem from './components/petSystem/index.vue'
import armsSystem from './components/armsSystem/index.vue'
import fashionSystem from './components/fashionSystem/index.vue'
import baozhuSystem from './components/baozhuSystem/index.vue'
export default {
  name: 'sysParticiption',
  components: {
    moduleHeader,
    petSystem, // 宠物系统
    armsSystem, // 武器系统
    fashionSystem, // 时装系统
    baozhuSystem // 宝珠系统
  },
  data() {
    return {
      date1: moment()
        .add(-1, 'day')
        .format('YYYY-MM-DD'),

      now: null,
      config: [
        {
          id: 1,
          name: '宠物系统',
          view: 'petSystem',
          dataview: ''
        },
        {
          id: 2,
          name: '武器系统',
          view: 'armsSystem',
          dataview: ''
        },
        {
          id: 3,
          name: '时装系统',
          view: 'fashionSystem',
          dataview: ''
        },
        {
          id: 4,
          name: '宝珠系统',
          view: 'baozhuSystem',
          dataview: ''
        }
      ],
      showType: 1
    }
  },
  mounted() {
    this.now = this.config[0]
    this.query()
  },
  computed: {
    dateList() {
      return [
        {
          single: true,
          uid: 'date1',
          label: '日期',
          startDate: this.date1,
          endDate: '',
          isShowDatetype: false,
          change: newDate => {
            this.date1 = newDate.startDate
            this.query()
          }
        }
      ]
    },
    currentView() {
      if (this.now) return this.now.view
      return this.config[0].view
    },
    currentDateView() {
      if (this.now) return this.now.dataview
      return this.config[0].dataview
    }
  },
  methods: {
    changeSystem(item) {
      this.now = item
      this.query()
    },
    getParams(obj) {
      return {
        isCache: 1,
        in_date1: this.date1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
        in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
        in_os: this.$store.getters['OS/nowOS'],
        in_type_id: obj&&obj==undefined ? obj.in_type_id : 0,
        in_select_id: this.now ? this.now.id : 1
      }
    },
    query(obj) {
      let params = this.getParams(obj)
      api.user.getQuery(params).then(data => {
        if (data.code == 401) {
          this.$refs.saturation.dataProvider(data.state)
        } else {
          Utils.Notification.error({
            message: data.message
          })
          console.error(data.message)
        }
      })
    },
    exportData(obj) {
      let params = this.getParams(obj)
      console.log(params)
      api.user.exportData(params)
    }
  }
}
</script>
<style lang="scss">
.switchs-item .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #fc9153;
  border-color: #fc9153;
  box-shadow: none;
}
</style>

<style lang="scss" scoped>
// .float-radio-group{
//   // position: absolute;
//   // right:80px;
//   padding:0 20px;
// }
.export-link {
  position: absolute;
  right: 80px;
  white-space: nowrap;
}
//  .item-content {
//     margin-right: 15px;
//     float: left;
//     line-height: 30px;
//     .bt-item {
//       cursor: pointer;
//       padding: 0 15px;
//       float: left;
//       background-color: #fff;
//       border: 1px solid #bbb;
//       border-right: 0;
//       text-align: center;
//       &:last-child {
//         border-right: 1px solid #bbb;
//       }
//     }
//     .bt-item.check {
//       font-weight: 700;
//       color: #fff;
//       background-color: #fc9153;
//     }
//   }
</style>