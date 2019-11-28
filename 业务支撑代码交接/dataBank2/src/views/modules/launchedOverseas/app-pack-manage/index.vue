<template>
  <div>
    <div>
      <div>
        <span>选择游戏:</span>
        <el-select v-model="nowgame">
          <el-option :value="1">越南攻城掠地</el-option>
          <el-option :value="2">泰国攻城掠地</el-option>
        </el-select>
      </div>
      <div>
        <span>包名:</span>
        <input type="text" placeholder="必填">
      </div>
      <div>
        <button @click="addGamePack">添加</button>
      </div>
    </div>
    <div class="table-content">
      <normalTable :tableData="tableData"></normalTable>
    </div>
  </div>
</template>
<script>
import api from 'src/services/api'
import normalTable from 'src/components/table/element-table.vue'
export default {
  name: 'app-pack-manage',
  components: {
    normalTable
  },
  data() {
    return {
      nowgame: 1,
      gameList: [],
      tableData: []
    }
  },
  methods: {
    addGamePack() {
      let params = {}

      this.$notify.success('添加成功', '提示')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
