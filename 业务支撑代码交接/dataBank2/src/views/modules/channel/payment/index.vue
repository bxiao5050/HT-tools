
<template >
  <div>
    <plyone v-if="$store.state.PayChannel.ply===1"></plyone>
    <plythree v-if="$store.state.PayChannel.ply===3"></plythree>
  </div>
</template>


<script>

import plyone from './components/ply-1'
import plythree from './components/ply-3'


/**
 * @typedef {Object} payment
 * @property {plyone} plyone Schedules on a queue in the current event frame
 */
const payment = {

  /**
  * 模板数据初始化，开始执行渲染
  * 
  * @property {number} plyone 
  */
  components: {

    plyone,
    plythree
  }
}
export default payment
</script>