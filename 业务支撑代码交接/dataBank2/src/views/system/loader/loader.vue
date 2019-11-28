<template>
  <div id="loader-container" :class="{'core-hide':!isShow}">
    <div type="cover"></div>
    <div type="loading">
      <div class="loading">
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loadCount: 0,
      isShow: false
    };
  },
  methods:{
    load() {
      this.loadCount++;
      this.isShow = true
    },
    loadend() {
      this.loadCount--;
      if(this.loadCount === 0) this.isShow = false
    },
    loadclose() {
      this.loadCount = 0
      this.isShow = false
    },
    loadclickclose() {
      this.isShow = false
    }
  }
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>