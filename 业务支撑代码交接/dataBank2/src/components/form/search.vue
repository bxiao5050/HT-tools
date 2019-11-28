<template>
  <div class="search">
    <input type="text" class="form-control" placeholder="search" v-model="value">
    <button class="btn btn-outline-primary" @click="params.click(value.toLowerCase())">
      <i class="icon-search"></i>
    </button>
  </div>
</template>
<script>
  export default {
    data: () => {
      return {
        value: ''
      }
    },
    props: [
      'params'
    ]
  }
</script>
<style lang="scss" scoped>
  .search {
    font-size: 13px;
    display: flex;
    align-items: center;
    button {
      margin-left: 5px;
      padding: 0 2px;
      &.btn-outline-primary{
        color:#fc9153;
        border-color:#fc9153;
        &:hover{
          color: #fff;
          background-color: #fc9153;
          border-color: #fc9153;
        }
      }
      .icon-search {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 28px;
      }
    }
    input {
      height: 14px;
      line-height: 14px;
      font-size: 14px;
      box-sizing: content-box;
    }
  }
</style>