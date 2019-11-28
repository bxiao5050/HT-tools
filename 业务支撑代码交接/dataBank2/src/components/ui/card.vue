<template>
  <div class="ui-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ui-card',
  props: ['config'],
}

</script>

<style lang="scss">
.ui-card {
  box-sizing: border-box;
  color: #000;
  width: 100%;
  height: 250px;
  padding: 15px;
  margin: 15px 0;
  border: 1px solid #cfd8dc;
}
</style>