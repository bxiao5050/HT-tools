<template>
  <div>
    <div class="fastGroup">
      <div class="fastSelecter">
        <v-touch tag="div" class="fast-item" :class="{now:type==1}" v-on:tap="toggleType(1)">关键指标</v-touch>
        <v-touch tag="div" class="fast-item px1-l" :class="{now:type==2}" v-on:tap="toggleType(2)">玩家留存</v-touch>
        <v-touch tag="div" class="fast-item px1-l" :class="{now:type==3}" v-on:tap="toggleType(3)">玩家流失</v-touch>
        <v-touch tag="div" class="fast-item px1-l" :class="{now:type==4}" v-on:tap="toggleType(4)">玩家回流</v-touch>
      </div>
    </div>
    <component :is="currentView"></component>
  </div>
</template>
<script>
  import keyIndex from '../../components/keyIndex';
  import playerRetain from '../../components/playerRetain';
  import playerLost from '../../components/playerLost';
  import playerGoBack from '../../components/playerGoBack';
  export default {
    components: {
      keyIndex,
      playerRetain,
      playerLost,
      playerGoBack
    },
    data: function () {
      return {
        // type: 1,
        currentView: 'keyIndex'
      }
    },
    computed: {
      type: function () {
        return this.$store.state.gameGKStore.type;
      },
      currentView: function () {
        if (this.type == 1) {
          return "keyIndex";
        }
        else if (this.type == 2) {
          return "playerRetain";
        }
        else if (this.type == 3) {
          return "playerLost";
        }
        else if (this.type == 4) {
          return "playerGoBack";
        }
      }
    },
    methods: {
      toggleType: function (type) {
        // this.type = type;
        this.$store.dispatch("setType", type)
      },
    },
  }

</script>
<style scoped>
.fastSelecter{
  width:8rem;
}
</style>