<template>
  <div class="prompt-group" v-if="isShow">
    <div class="prompt-mask"></div>
    <div class="prompt" :class="option.state">
      <div class="prompt-header">
        {{option.title}}
      </div>
      <div class="prompt-body">
        {{option.content}}
      </div>
      <div class="prompt-footer">
        <a href="javascript:void(0);" class="prompt-confirm" @click="confirmPrompt">{{option.yesLabel}}</a>
        <a href="javascript:void(0);" class="prompt-cancel" v-if="option.type=='confirm'" @click="closePrompt">{{option.cancelLabel}}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      option: {
        type: "alert",  //alert or confirm
        state: "info",
        title: "提示",
        content: "内容",
        yesLabel: "确认",
        cancelLabel: "取消",
        confirm: () => { },
        cancel: () => { }
      },
      isShow: false,

    }
  },
  mounted() {
    window.showPrompt = this.showPrompt;
  },
  methods: {
    showPrompt(option) {
      this.mergeOption(this.option, option);
      this.isShow = true;
    },
    confirmPrompt() {
      this.isShow = false;
      this.option.confirm();
      this.clearOption();
    },
    closePrompt() {
      this.isShow = false;
      this.option.cancel();
      this.clearOption();
    },
    clearOption() {
      this.option = {
        type: "alert",  //alert or confirm
        state: "info",
        title: "提示",
        content: "内容",
        yesLabel: "确认",
        cancelLabel: "取消",
        confirm: () => { },
        cancel: () => { }
      }
    },
    mergeOption(obj, newObj) {
      for (let i in newObj) {
        obj[i] = newObj[i];
      }
    }

  }
}
</script>
<style lang="scss" scoped>
.prompt-group {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: '微软雅黑';
  color:#333;
  z-index: 100000000;
  .prompt-mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5)
  }
  .prompt {
    min-width: 250px;
    max-width: 350px;
    line-height: 40px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    background: #FFF;
    text-align: center;
    .prompt-header {
      width: 100%;
      font-weight: bold;
      height: 40px;
      border-bottom: solid 1px #ddd;
      color: skyblue;
    }
    .prompt-body {
      width: 100%;
      min-height: 40px;
      border-bottom: 1px solid #ddd;
      padding: 10px 20px;
    }
    .prompt-footer {
      width: 100%;
      height: 40px;
      display: flex;
      .prompt-confirm {
        flex: 1;
        text-decoration: none;
        border-right: 1px solid #eee;
        &:hover {
          background-color: #EEE;
        }
        &:active {
          background-color: #ddd;
        }
      }
      .prompt-cancel {
        flex: 1;
        text-decoration: none;
        &:hover {
          background-color: #EEE;
        }
        &:active {
          background-color: #ddd;
        }
      }
    }
    &.success {
      .prompt-header {
        color: green;
      }
    }
    &.info {
      .prompt-header {
        color: skyblue;
      }
    }
    &.error {
      .prompt-header {
        color: red;
      }
    }
  }
}
</style>
