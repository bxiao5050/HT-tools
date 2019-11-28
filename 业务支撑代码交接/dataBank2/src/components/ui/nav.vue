<template>
  <div class="ui-nav code-01">
    <ul>
      <li class="nav-item btn" v-for="(item, index) in data.list" :class="{'btn-orange':(data.cur===item[data.curName]),'btn-secondary':(data.cur!=item[data.curName])}" @click="data.click(item, index)" v-if="item[data.itemName]">
        <a class="nav-link">{{item[data.itemName]}}</a>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: ['data']
}
</script>

<style lang="scss" scoped>
.ui-nav {
  display: flex;
  justify-content: flex-end;
  ul {
    list-style: none;
    color: #000;
    display: flex;
    justify-content: flex-end;
    padding: 0;
    margin: 0;
    .nav-item {
      margin-left: 3px;
      // border-bottom-width: 0;
      line-height: 20px;
      &:first-child {
        margin-left: 0;
      }
      .nav-link {
        text-align: center;
      }
    }
  }
}
.btn-orange{
  background-color: #fc9153;
      color: #FFF;
      &:hover{
        background-color: #FB6104;
      }
}
</style>