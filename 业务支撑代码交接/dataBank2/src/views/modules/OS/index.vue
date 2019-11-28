<template>
  <div class="os-group">
   <div class="os-head">系统选择：</div> 
  <div class="os-list">
    <div class="os-item" v-for="item in OSList" @click="checkOS(item)">
        <Checkbox :state="item.checked?2:0">
           <label>{{item.name}}</label>
        </Checkbox>
    </div>
  </div>
  </div>
</template>
<script>
  import Checkbox from 'src/components/form/checkbox/normal'
  export default {
    name: 'OS',
    components: {
      Checkbox
    },
    computed: {
      OSList() {
        return this.$store.state.OS.OSList;
      }
    },
    methods: {
      checkOS(item) {
        item.checked = !item.checked;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .os-group {
    display: flex;
    justify-content: center;
    align-self: center;
    line-height: 32px;
    background-color: #FFF;
    color: #333;
    /* padding: 3px 16px; */
    margin-left: 25px;
    margin-bottom: 10px;
    .os-head {
      margin-right: 42px;
      line-height: 39px;
    }
    .os-list {
      /* padding: 10px 0; */
      display: flex;
      .os-item {
        /* display: inline-block; */
        font-size: 0;
        .checkbox {
          color: #000;
          user-select: none;
          display: flex;
          align-items: center;
          width: 65px;
          font-size: 13px;
          margin: 0 15px 0 0;
          label {
            cursor: pointer;
            font-weight: normal;
            width: 30px;
            margin: 3px 0 0 8px;
          }
        }
      }
    }
  }
</style>