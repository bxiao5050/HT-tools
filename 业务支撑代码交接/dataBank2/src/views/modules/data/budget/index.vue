<template>
  <div class="data-budget">
    <div class="first-wrap">
      <my-row>
        <div class="time-picker">
          <el-button-group class="group">
            <el-button size="medium">
              <span>日期</span>
            </el-button>
            <el-date-picker size="medium" @change="dateChange" v-model="pickerOptions.date" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-button-group>
        </div>

        <el-button size="medium" @click="excel()">
          <span>下载模板</span>
        </el-button>

        <el-button size="medium" @click="upload()">
          <span>上传模板</span>
          <form v-show="false" id="my-form" :action="baseUrl + '/import/fn_oas_budget_costs'" method="post" enctype="multipart/form-data">
            <input type="file" name="file" ref="upload">
          </form>
        </el-button>

        <el-button size="medium" @click="query()">
          <span>查询</span>
        </el-button>

      </my-row>
    </div>

    <div class="second-wrap">
      <my-row v-if="$$data">
        <el-table :data="$$data">
          <el-table-column v-for="(item, i) in _state.config.tableKey" :key="i" :prop="item.key" :label="item.key" :sortable="item.sortable"></el-table-column>
        </el-table>
      </my-row>
    </div>
  </div>
</template>

<script>
import Loader from 'src/views/system/loader/loader.js'
import Http, { baseUrl } from 'src/services/http'
export default {
  name: "data-budget",
  components: {},
  data() {
    return {
      SMN: "o_c_budget",
      pickerOptions: {
        date: null,
      },
      baseUrl,
      promise1: null
    }
  },
  computed: {
    _state() {
      return this.$store.state[this.SMN]
    },
    $$data() {
      return this.$store.getters[this.SMN + '/getData']
    }
  },
  watch: {},
  methods: {
    upload() {
      this.$refs.upload.click()
    },
    excel() {
      window.open('http://121.10.140.56:8115/tpl/海外投放预算模板.xlsx')
    },
    dateChange(date) {
      this.$store.commit(this.SMN + '/set', {
        key: 'date',
        val: moment(date).format("YYYY-MM-DD")
      })
    },
    query() {
      this.$store.dispatch(this.SMN + '/getData', { count_date: this._state.date }).then(data => {

      })
    },
    fileChange() {
      this.promise1.then(() => {
        Loader.load()
        $('#my-form').ajaxSubmit({
          dataType: 'json',
          method: 'post',
          xhrFields: {
            withCredentials: true
          },
          success: (data) => {
            console.log(data)
            if (data.code === 401) {
              this.$notify({
                type: "success",
                message: "上传成功"
              });
              Loader.loadend()
            } else {
              this.$notify({
                type: "error",
                message: data.state
              });
              Loader.loadend()
            }
          },
          error: (data) => {
            this.$notify({
              type: "error",
              message: '操作失败'
            });
            Loader.loadend()
          }
        })
      })
    }
  },
  created() {
    this.pickerOptions.date = new Date(this._state.date)
  },
  mounted() {
    this.$refs.upload.addEventListener("change", this.fileChange)
    this.promise1 = new Promise(resolve => {
      require.ensure([], () => {
        require("jquery-form")
        resolve()
      })
    })
  },
  beforeDestroy() {
    this.$refs.upload.removeEventListener("change", this.fileChange)
  }
}
</script>

<style lang="scss">
.components.data-budget {
  .first-wrap {
    float: left;
    margin: 15px;
  }
  .group {
    display: flex;
    margin-right: 15px;
  }
}
</style>
