
<template >
  <div>
    <plyone v-if="$store.state.Agent.ply===1"></plyone>
    <plythree v-if="$store.state.Agent.ply===3"></plythree>
  </div>
</template>


<script>

import plyone from './components/ply-1'
import plythree from './components/ply-3'

export default {
  components: {
    plyone, plythree
  }
}
</script>