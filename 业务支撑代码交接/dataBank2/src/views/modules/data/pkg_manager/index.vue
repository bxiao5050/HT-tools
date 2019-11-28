<template>
  <div class="pkg_manager">
    <my-row>
      <el-select v-model="game" filterable value-key="id" placeholder="请选择游戏" size="medium" style="margin: 0 16px 0 16px">
        <el-option v-for="item in _gameList" :key="item.id" :label="item.name" :value="item">
        </el-option>
      </el-select>
      <el-select class="os" v-model="os" size="medium">
        <el-option v-for="item in options" :key="item.value" :label="item.txt" :value="item.os"></el-option>
      </el-select>
    </my-row>
    <my-row style="margin: 16px 0 0 0">
      <el-input size="medium" placeholder="请输入包名" v-model="pkg_name" style="margin: 0 16px 0 16px;width: 310px;">
        <template slot="prepend">包名</template>
      </el-input>
      <el-button size="medium" @click="check()" style="margin: 0 16px 0 0">
        添加
      </el-button>
    </my-row>
    <my-row class="center">
      <div v-if="_pkgList">
        <el-table :data="_pkgList.list">
          <el-table-column v-for="(item, i) in _state.tableKey" :key="i" :prop="item" :label="item" :width="i===0?150:i===2?210:80" :formatter="formatterOs"></el-table-column>
          <el-table-column label="删除" :formatter="formatterDel"></el-table-column>
        </el-table>
      </div>
    </my-row>
  </div>
</template>

<script>
export default {
  name: "pkg_manager",
  components: {},
  data() {
    return {
      addLimit: 2000,
      game: "",
      pkg_name: "",
      os: null,
      options: [
        {
          os: "0",
          txt: "IOS"
        },
        {
          os: "1",
          txt: "安卓"
        }
      ]
    };
  },
  computed: {
    _state() {
      return this.$store.state.o_c_pkg_manager;
    },
    _gameList() {
      return this.$store.getters["overseas_common/getList2"];
    },
    _pkgList() {
      return this.$store.getters["o_c_pkg_manager/getPkgList"];
    }
  },
  watch: {},
  methods: {
    init() {},
    check() {
      if (!this.os) {
        this.$notify({
          type: "error",
          message: "请选择系统"
        });
        return;
      } else if (!this.game.id) {
        this.$notify({
          type: "error",
          message: "请选择游戏"
        });
        return;
      } else if (!this.pkg_name) {
        this.$notify({
          type: "error",
          message: "添加的包名不能为空"
        });
        return;
      }
      if (this.check.ban) {
        return;
      } else {
        this.check["ban"] = true;
        setTimeout(() => {
          this.check.ban = false;
        }, this.addLimit);
      }
      var this_ = this;
      this.$store.dispatch("o_c_pkg_manager/getPkgList", true).then(() => {
        if (this_._pkgList.hasOwnProperty(this_.game.name)) {
          if (
            this_._pkgList[this_.game.name][this_.os].hasOwnProperty(
              this_.pkg_name
            )
          ) {
            this_.$notify({
              type: "error",
              message: "添加的包名已重复"
            });
          } else {
            this_.add();
          }
        } else {
          this_.add();
        }
      });
    },
    add() {
      this.$store
        .dispatch("o_c_pkg_manager/addPkg", {
          in_app_id: this.game.id,
          in_app_name: this.game.name,
          in_package_name: this.pkg_name,
          in_os: this.os
        })
        .then(() => {
          this.$notify({
            type: "success",
            message: "添加成功"
          });
        });
    },
    formatterDel(row, col, val) {
      var { keys, index } = this._state;
      var { idIndex, osIndex, pkgIndex, gameIndex } = index;
      var in_app_id = row[keys[idIndex]];
      var in_package_name = row[keys[pkgIndex]];
      var in_os = row[keys[osIndex]];
      return (
        <div
          class="pkg-del"
          onClick={this.pkgDel.bind(
            this,
            { in_os, in_app_id, in_package_name },
            row[keys[gameIndex]]
          )}
        >
          删除
        </div>
      );
    },
    pkgDel(param, game) {
      if (confirm(`确认删除[${param.in_package_name}]吗`))
        this.$store
          .dispatch("o_c_pkg_manager/delPkg", { param, game })
          .then(() => {
            this.$notify({
              type: "success",
              message: "删除成功"
            });
          });
    },
    formatterOs(row, col, val) {
      var { keys, index } = this._state;
      var { osIndex } = index;
      var osKey = keys[osIndex];
      var os = row[osKey];
      if (col.label === osKey) {
        if (os) {
          return "安卓";
        } else {
          return "IOS";
        }
      }
      return val;
    }
  },
  created() {
    this.init();
    this.$store.dispatch("overseas_common/getList2");
    this.$store.dispatch("o_c_pkg_manager/getPkgList");
  }
};
</script>

<style lang="scss" scoped>
.pkg-del {
  cursor: pointer;
  user-select: none;
}
.center {
  padding-left: 16px;
}
</style>
