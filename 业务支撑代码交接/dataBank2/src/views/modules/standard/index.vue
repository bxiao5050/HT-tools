<template>
    <div id="modules">test</div>
</template>
<script>
  export default{
    mounted(){
      // console.log(this.$route.params)
      this.$router.replace({name:"five-force"})
    }
  }
</script>
<style lang="scss" scoped>
#modules{
  width: 100%;
  color:#000;
}
</style>
