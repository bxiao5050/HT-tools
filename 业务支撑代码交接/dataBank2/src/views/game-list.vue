<template>
  <div class="game-list">
    <div class="ctn">
        <div class="item" v-for="(item, index) in games" :key="index" @click="gameSelect(item,index)" v-if="index>=9" :title="item.name">
          <img :src="item.icon">
          <span>{{item.name}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import commonMethod from 'src/utils/commonMethod'
import gameIconConfig from 'src/config/gameIconConfig'
export default {
  data: function() {
    return {}
  },
  methods: {
    gameSelect(item, index) {
      if (item.id != this.nowgame) {
        this.$store.commit('selectGame', item.id)
        commonMethod.changeGame()

        this.games.splice(index, 1)
        this.games.unshift(item)
      }
    }
  },
  computed: {
    systemId() {
      return this.$store.state.common.systems.systemId
    },
    games() {
      let games = this.$store.getters['games']
      games.forEach(item => {
        item.icon =
          gameIconConfig.config[this.systemId][item.id] ||
          gameIconConfig.defaultIcon
      })
      return games
    }
  }
}
</script>

<style lang="scss" scoped>
.game-list {
  color: #000;
  overflow: hidden;
  .ctn {
    padding: 16px;
    // float: left;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .item {
      // width: 120px;
      // height: 88px;
      margin: 0 0 0 20px;
      // float: left;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 5px;
      height: 87px;

      transition: all 1s;
      cursor: pointer;
      img {
        width: $sidebarHeight - 31;
        height: $sidebarHeight - 31;
        padding: 5px;
      }
      span {
        width: 100%;
        line-height: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>