<template>
  <div><component :is="curView"></component></div>
</template>

<script>
  import plyone from './components/ply-1'
  import plythree from './components/ply-3'

  /**
   * @typedef {Object} Register
   * @property {plyone} plyone Schedules on a queue in the current event frame
   */
  const register = {
    /**
     * 模板数据初始化，开始执行渲染
     * @property {number} plyone 
     */
    components: {
      plyone,
      plythree
    },
    computed: {
      ply() {
        return this.$store.state.RegChannel.ply
      },
      curView() {
        return this.ply === 1 ? 'plyone' : this.ply === 3 ? 'plythree' : 'plytwo'
      }
    }
  }
  export default register
</script>