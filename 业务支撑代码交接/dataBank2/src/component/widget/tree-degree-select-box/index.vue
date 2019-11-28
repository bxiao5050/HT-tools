<template>
  <my-col class="wrap">
    <my-col class="wrap-fir">
      <my-card class="card">
        <my-row>
          <div :class="regionClass[0] ? 'btn on' : 'btn'" @click="changeRegion(0)">{{data.allTxt}}</div>
        </my-row>
        <div class="btn-box">
          <div :class="regionClass[item.unite_id] ? 'btn on' : 'btn'" @click="changeRegion(item.unite_id)" v-for="(item, i) in $store.getters['overseas_common/getList1'].parent" :key="i">
            {{item.area_app_name}}
          </div>
        </div>
      </my-card>
      <my-card class="card" style="margin-bottom:15px">
        <div class="btn-box">
          <div :class="gameClass[item.unite_id] ? 'btn on' : 'btn'" @click="changeGame(item.unite_id)" v-for="(item, i) in gameList" :key="i">
            {{item.area_app_name}}
          </div>
        </div>
      </my-card>
    </my-col>
    <my-row class="end" v-if="!autoConfirm">
      <el-button @click="confirm()">确认修改</el-button>
      <el-button @click="close()">关闭窗口</el-button>
    </my-row>
  </my-col>
</template>

<script>
export default {
  name: 'TDSP'
  , data() {
    return {

      region: null,
      regionArr: [],
      regionClass: {},

      game: null,
      gameArr: [],
      gameClass: {},
      gameList: null
    }
  }
  , watch: {
    regionArr() {
      var list = this.$store.getters['overseas_common/getList1']
      if (this.regionArr.length > 1) {
        this.gameList = list.child
      } else {
        var id = this.regionArr[0]
        this.gameList = list[id].children
      }
    }
  }
  , methods: {
    changeGame(id) {
      var style = {}
      if (this.gameClass[id]) {
        if (this.autoConfirm) {
          return
        }
        this.gameArr = []
        this.game = null
      } else {
        var list = this.$store.getters['overseas_common/getList1']
        style[id] = true
        this.gameArr = [id]
        this.game = list[id].area_app_name
      }
      this.$data.gameClass = style
      if (this.autoConfirm) {
        setTimeout(() => {
          this.confirm()
        }, 300)
      }
    },
    changeRegion(id) {
      var list = this.$store.getters['overseas_common/getList1']
      var style = {}
      if (id > 0) { // 单个地区
        style[id] = true
        this.regionArr = [id]
        this.region = list[id].area_app_name
      } else { // 所有地区
        style[0] = true
        this.regionArr = list.parent.map(item => {
          return item.unite_id
        })
        this.region = this.data.allTxt
      }
      this.$data.regionClass = style
    },
    close() {
      this.data.isShow = false
    },
    confirm() {
      if (this.regionArr.length === 1) {
        var list = this.$store.getters['overseas_common/getList1']
        var gameId = this.gameArr[0]
        var regionId = this.regionArr[0]
        if (gameId && list[gameId].parent_id != regionId) {
          this.game = null
          this.gameArr = []
        }
      }
      this.data.callback && this.data.callback([
        this.region,
        this.regionArr,
        this.game,
        this.gameArr
      ])
      this.close()
    },
    initData() {
      this.regionArr = this.data.regionArr
      this.region = this.data.region
      this.gameArr = this.data.gameArr
      this.game = this.data.game
    },
    initStyle() {
      var regionClass = {}, regionId = 0, gameClass = {}, gameId = 0;
      if (this.region) {
        if (this.regionArr.length === 1) {
          regionId = this.regionArr[0]
        }
        regionClass[regionId] = true
      }
      if (this.game) {
        if (this.gameArr.length === 1) {
          gameId = this.gameArr[0]
        }
        gameClass[gameId] = true
      }
      this.regionClass = regionClass
      this.gameClass = gameClass
    }

  }
  , props: ["data", "autoConfirm"]
  , beforeMount() {
    this.initData()
    this.initStyle()
  },
  mounted() {
    window.addEventListener("keydown", this.confirm);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.confirm);
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  .wrap-fir {
    background: rgba(208, 196, 214, 0.5);
    margin: 10px;
  }
}
.btn {
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  float: left;
}
.btn-box {
  .btn {
    margin: 8px 0 0 8px;
  }
}
.btn.on {
  background: #5b5691;
  color: #fff;
}
.card {
  margin: 15px 15px 0 15px;
  box-sizing: border-box;
}
.end {
  justify-content: flex-end;
  button {
    font-size: 16px;
    width: 100px;
    text-align: center;
    height: 38px;
    line-height: 37px;
    padding: 0;
    margin: 0 15px 10px 15px;
    &:first-child {
      margin-right: 0;
    }
  }
}
</style>


