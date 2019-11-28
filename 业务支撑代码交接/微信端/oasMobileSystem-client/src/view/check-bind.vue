<template>
  <div class="tip">
    <div class="tip-header">是否允许绑定</div>
    <div class="tip-body">您的帐号正在被其他微信号绑定，是否允许绑定?</div>
    <div class="tip-footer">
      <div class="refuse" @click="refuseBind">拒绝</div>
      <div class="accet" @click="accetBind">允许绑定</div>
    </div>
  </div>
</template>
<script>
  import commonMethod from '../utils/commonMethod.js'
  import httpRequest from "../utils/httpRequest.js"
  import {Toast} from "mint-ui"
  export default {
    data: function () {
      return {
        token: '',
        result: false
      }
    },
    mounted: function () {
      this.token = commonMethod.getUrlToken();
    },
    methods: {
      accetBind: function () {
        this.result = true;
        this.sendResult();
      },
      refuseBind: function () {
        this.result = false;
        this.sendResult();
      },
      sendResult: function () {
        var params = {
          key: this.token,
          isAccept: this.result
        }
        httpRequest.checkBind(params, (data) => {
          if (data.state == "successed") {
            Toast(data.result);
          } else {
            Toast(data.result.errorMsg);
          }
        })
      }
    }
  }

</script>
<style lang="scss">
  .tip {
    width: 90%;
    background-color: #FFF;
    border: 1px solid #E2E2E2;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    font-family: '微软雅黑';
    .tip-header {
      text-align: center;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.46rem;
      border-bottom: 1px solid #E2E2E2;
      background-color: #ffffcc;
      font-weight: bold;
    }
    .tip-body {
      height: 2rem;
      line-height: 2rem;
      font-size: 0.4rem;
      border-bottom: 1px solid #E2E2E2;
    }
    .tip-footer {
      height: 1rem;
      line-height: 1rem;
      font-size: 0;
      text-align: center;
      .refuse {
        display: inline-block;
        width: 50%;
        font-size: 0.4rem;
        background-color: #EF4F4F;
        color: #FFF;
      }
      .refuse:active {
        background-color: #E64340;
      }
      .accet {
        display: inline-block;
        width: 50%;
        font-size: 0.4rem;
        background-color: #04BE02;
        color: #FFF;
      }
      .accet:active {
        background-color: #1AAD19;
      }
    }
  }

</style>
