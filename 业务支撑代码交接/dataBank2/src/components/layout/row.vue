<template>
  <div class="lo-row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'lo-row'
} 
</script>

<style lang="scss" scoped>
.lo-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>