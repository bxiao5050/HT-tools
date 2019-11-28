<template>
  <div class="language-component" :class="config.className">
    <el-select v-model="cur" @change="changeLang" popper-class="change">
      <el-option v-for="item in packs" :key="item.value" :label="item.txt" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<script>
import commonMethod from 'src/utils/commonMethod'
import api from 'src/services/api'
  export default {
    props: {
      config: {
        default: () => {
          return {
            className: 'change'
          }
        }
      }
    },
    data() {
      return {
        cur: 'CHS',//this.$store.state.Language.cur,
        packs: [
          { value: 'CHS', txt: '简体中文' },
          { value: 'Tradition', txt: '繁体中文' },
          { value: 'EN', txt: 'English' },
        ]
      }
    },
    created(){
      this.cur = localStorage.lang || 'CHS'
    },
    methods:{
      changeLang(cur){
        localStorage.lang = this.$i18n.locale = cur;
        this.$emit('changeLang',cur)
        if (this.$store.state.common.userInfo) {
          // store.dispatch('Common/changeLanguage')
          this.changeLanguage()
        }
        // this.$store.commit('Language/cur', cur)
      },
      changeLanguage(){
        api.user.changeLanguage({
          language: this.cur
        }).then(data => {
          if (data.code == 303) {
            commonMethod.getSystemGames();
          } else {
            Utils.Notification.error({
              message: data.message
            })
          }
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .change {
    .el-select {
      width: 130px;
    }
  }

  .headerChange {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 11;
  }
</style>
<style lang="scss">
  .change,
  .headerChange {
    .el-input__inner {
      text-align: center;
    }
  }

  .headerChange {
    .el-input__inner {
      background: transparent;
      color: $headerColor;
      border: 0;
      padding-left: 47px;
    }
  }

  .el-select-dropdown.change {
  overflow: hidden;
  background: #3D3971;
  border: 0;
  .el-select-dropdown__item {
    text-align: center;
    color: #fff;
    background: transparent;
    &.hover,
    &:hover {
      background-color: #34b58c;
    }
  }
}
  .el-select-dropdown.change {
    text-align: center;
  }

</style>