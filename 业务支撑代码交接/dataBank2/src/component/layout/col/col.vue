<template>
  <div class="my-col">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'my-col'
}
</script>

<style lang="scss" scoped>
.my-col {
  display: flex;
  flex-direction: column;
}
</style>


