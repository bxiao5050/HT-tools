<template>
  <div>
    <nv-head></nv-head>
    <div class="page-body">
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
  import nvHead from '../components/header.vue';
  export default {
    replace: true,
    data() {
      return {
        date: '',
      }
    },
    components: {
      nvHead
    }
  }

</script>
