
<template>
  <div class="ui-switch" :class="'_'+state">
    <i class="block"></i>
  </div>
</template>



<script>
export default {
  name: 'ui-switch',
  props: ["state"],
  data: () => {
    return {
      // state: 0
    }
  },
  methods: {
    // switchTo() {
    //   this.state = Math.floor(Math.random() * 3)
    // }
    // ddd
  }
}

</script>

<style lang="scss" scoped>
.ui-switch {
  cursor: pointer;
  position: absolute;
  transition: .3s ease-in-out;
  width: 16px;
  height: calc(100% - 2px);
  border-radius: 1px;
  border: 1px solid #cfd8dc;
  background: #fff;
  .block {
    transition: .3s ease-in-out;
    position: absolute;
    top: 1px;
    left: 1px;
    width: 12px;
    height: 12px;
    border-radius: 1px;
    background: #cfd8dc;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
  &._0 {
    .block {
      transform: translateX(0);
    }
  }
  &._1 {
    .block {
      background: #f0ad4e;
      transform: translateY(4px);
    }
  }
  &._2 {
    .block {
      background: #20a8d8;
      transform: translateY(8px);
    }
  }
}
</style>