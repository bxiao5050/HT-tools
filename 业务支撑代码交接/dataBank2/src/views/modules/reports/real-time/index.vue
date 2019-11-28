<template>
  <div class="daiding">

  </div>
</template>

<script>
export default {
  data: () => {
    return {
      data: {
        isShow: false,
        region: null,
        game: null,
        regionArr: [],
        gameArr: []
      },
      os: null,
      options: [{
        os: '0',
        txt: 'IOS'
      }, {
        os: '1',
        txt: '安卓'
      }],
    }
  },
  computed: {
    _rcg() {
      var str = ''
      if (this.data.region) {
        str += this.data.region
        if (this.data.game) {
          str += ' - ' + this.data.game
        } else {
          str += ' - ' + '全部游戏'
        }
      }
      return str
    }
  },
  methods: {
    dataInit() {

    }
  },
  created() {
    this.dataInit()
  }
}
</script>

<style lang="scss" scoped>

</style>


