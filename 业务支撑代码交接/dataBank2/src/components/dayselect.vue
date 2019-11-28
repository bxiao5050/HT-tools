<template>
  <div class="dayselect">
    <el-select v-model="selected" placeholder="请选择" @change="changeSelected">
      <el-option v-for="(item,index) in options" :key="index" :value="index" :disabled="disabledOption(item)">
        {{item}}
      </el-option>
    </el-select>
    <!-- <div class="btn-primary" @click="confirm(selected)" noselect>查询</div> -->
  </div>
</template>
<script>
  // import select from 'src/vendor/element-ui/packages/select'
  // import option from 'src/vendor/element-ui/packages/option'
  // import {select,option} from 'element-ui'
  export default {
    // components: {
    //   'el-select': select,
    //   'el-option': option
    // },
    data() {
      return {
        selected: '1',
        options: (() => {
          let obj = {}, i = 10;
          for (let n = 0; n <= 15; n++) {
            switch (n) {
              case 1:
                obj[n] = "00:00-09:00"
                break;
              case 0:
                obj[n] = "00:00-24:00"
                break;
              default:
                obj[n] = i + ':00-' + ++i + ':00';
                break;
            }
          }
          return obj
        })()
      }
    },
    mounted(){
      this.selected = this.value
    },
    methods:{
      changeSelected(selected){
        this.$emit('input',selected)
        this.confirm(selected)
      }
    },
    props: {
      value:{
        type:[String],
        default:'1'
      },
      confirm:{
        type:Function,
        default:()=>{}
      },
      disabledOption:{
        type:Function,
        default:()=>{
          return false
        }
      }
    },
    watch:{
      value(v,ov){
        if(v!=ov){
          this.selected = v
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  .dayselect {
    display: flex;
    margin-left: 15px;
    .el-select {
      width: 138px !important;
    }
    .btn-primary {
      cursor: pointer;
      line-height: 32px;
      margin-left: 15px;
      width: 54px;
      border-radius: 3px;
      text-align: center;
      font-size: 14px;
      font-weight: 700;
    }
  }

  li.el-select-dropdown__item {
    text-align: center !important;
  }
</style>


<style lang="scss">
  .dayselect {
    .el-input {
      input {
        height: 32px;
        border-radius: 0;
      }
    }
  }
</style>