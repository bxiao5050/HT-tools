<template>
  <div class="my-row">
    <slot></slot>  
  </div>
</template>

<script>
export default {
  name: 'my-row'
}
</script>

<style lang="scss" scoped>
  .my-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>


