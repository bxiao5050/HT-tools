<template>
  <div class="radio-btn-group">
    <div class="btn-item" :class="{'active':item.value==value}" v-for="(item,index) in filterList" :key="index" @click="$emit('change',item.value);$emit('input',item.value);">{{item.name}}</div>
  </div>
</template>
<script>
export default {
  name: 'radio-btn-group',
  props: {
    // 激活的匹配项的值
    value: {
      type: [Number, String]
    },
    // 列表数组 内容可为数字字符串和对象
    list: {
      type: Array,
      default: []
    },
    // 当list中存储的是字符串或数字时，初始值，后续递增，默认为下标值
    startIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // 对list数据进行过滤处理
    filterList() {
      let result = []
      this.list.forEach((item, index) => {
        if (typeof item === 'string' || typeof item === 'number') {
          // 字符串或者数字
          result.push({
            name: item,
            value: this.startIndex + index
          })
        } else {
          //对象
          result.push({
            name: item.name,
            value: item.value
          })
        }
      })
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
.radio-btn-group {
  margin-right: 15px;
  /* float: left; */
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  line-height: 30px;
  .btn-item {
    cursor: pointer;
    padding: 2px 20px;
    float: left;
    background-color: #fff;
    border: 1px solid #ddd;
    text-align: center;
    &:first-child{
      border-radius: 5px 0 0 5px;
    }
    &:last-child {
      border-right: 1px solid #ddd;
      border-radius: 0 5px 5px 0;
    }
    &.active {
      font-weight: 400;
      color: #fff;
      background-color: #fc9153;
      border: 1px solid #fc9153;
    }
  }
}
</style>
