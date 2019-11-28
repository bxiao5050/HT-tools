<template>
  <div class="card-box">
    <div class="card">
      <div class="card-header">
        <slot name="header" class="card-header-slot">
        </slot>
        <div class="icons">
          <i class="icon-win-min" @click="isCollapse=true" v-show="!isCollapse"></i>
          <i class="icon-win-max" @click="isCollapse=false" v-show="isCollapse"></i>
        </div>
      </div>
      <div v-show="!isCollapse" class="card-body">
        <slot name="body">
        </slot>
      </div>
      <div v-show="!isCollapse">
        <slot name="footer">

        </slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isCollapse: false,
      }
    }
  }

</script>
<style lang="scss" scoped>
  .card-box {
    margin: 0 0 30px 0;
    .card {
      margin: 0;

      border: 1px solid #d1dbe5;
      border-radius: 4px;
      background-color: #fff;
      overflow: hidden;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
      .card-header {
        line-height: 45px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        font-size:14px;
        background-color:#FFF;
        position:relative;
        .icons {
          cursor: pointer;
          margin-left: auto;
          i {
            display: block;
            padding: 5px;
            margin-top: 2px;
          }
        }
        .card-header-title {
          padding: 0 20px 0 0;
          float: left;
        }
        .tabs {
          position: relative;
          float: left; // display: inline-flex;
          vertical-align: middle;
          .tab-item {
            padding: 0 20px;
            text-align: center;
            border-left: 1px solid #ddd;
            float: left;
            &:last-child{
              border-right: 1px solid #ddd;
            }
          }
          .tab-item.active {
            background-color: #fc9153;//#5bc0de;
            color: #FFF;
          }
        }
        .export-link{
           position:absolute;
           right: 75px;
        }
      }
      .card-body {
        padding: 20px;
        .no-data{
          line-height:40px;
          text-align:center;
          font-size:13px;
        }
      }
      .icon-win-max {
        font-weight: 700;
      }
    }
  }

</style>
