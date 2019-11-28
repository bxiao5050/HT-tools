<template>
  <div class="my-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'my-card'
}
</script>

<style lang="scss" scoped>
.my-card {
  box-sizing: border-box;
  color: #000;
  padding: 15px;
  border: 1px solid #cfd8dc;
}
</style>


