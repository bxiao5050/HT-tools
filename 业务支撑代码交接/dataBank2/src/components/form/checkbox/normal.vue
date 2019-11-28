<style lang="scss" scoped>
.checkbox {
  .box {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    background: #fff;
    color: #000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    i.icon-form-checkbox-normal-g {
      font-size: 20px;
    }
    i.icon-form-checkbox-normal-h {
      font-size: 12px;
    }
  }
  .icon-form-checkbox-normal-h2 {
    width: 10px;
    height: 10px;
    background: #f0ad4e;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  }
}
</style>
<template>
  <div class="checkbox">
    <div class="box">
      <i :class="className[state]"></i>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ['state'],
  data: function () {
    return {
      className: [
        '',
        'icon-form-checkbox-normal-h2',
        'icon-form-checkbox-normal-g',
      ]
    }
  }
}
</script>