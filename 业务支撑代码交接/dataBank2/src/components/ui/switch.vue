
<template>
  <div class="ui-switch" :class="'_'+state">
    <i class="ball"></i>
  </div>
</template>

<script>
export default {
  name: 'ui-switch',
  props: ['state'],
  data: () => {
    return {
      // state: 0
    }
  },
  methods: {
    // switchTo() {
    //   this.state = this.state === 0 ? 2 : 0
    // }
  }
}
</script>

<style lang="scss" scoped>
$border-width: 1px;
$height: 18px;
$gap: 4px;
$ball-r: $height - $gap;
$ball-g: $gap * .5;
$width: $ball-r * 2+$gap;
.ui-switch {
  cursor: pointer;
  position: absolute;
  width: $width;
  height: $height;
  transition: .3s;
  border-radius: 50px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  .ball {
    transition: .3s;
    position: absolute;
    top: $ball-g;
    left: $ball-g;
    width: $ball-r;
    height: $ball-r;
    border-radius: 50px;
    background: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  &._0 {
    // border: $border-width solid #cfd8dc;
    background: #eceeef;
    .ball {
      transform: translateX(0); // border: $border-width solid #cfd8dc;
    }
  }
  &._1 {
    // border: $border-width solid #f0ad4e;
    background: #f0ad4e;
    .ball {
      transform: translateX(50%); // border: $border-width solid #f0ad4e;
    }
  }
  &._2 {
    // border: $border-width solid #5bc0de;
    background: #20a8d8;
    .ball {
      transform: translateX(100%); // border: $border-width solid #5bc0de;
    }
  }
}
</style>