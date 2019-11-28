<template>
  <div class="day-picker" @mousedown="picker">
    <input type="text" class="form-control" :value="hours">
    <div class="board" v-if="board">
      <div class="item btn" :class="start===i?'btn-primary start':end===i?'btn-primary end':(end!=null&&start!=null&&i<end&&i>start)?'btn-secondary cover':'btn-secondary'" v-for="e,i in 25" @click="onclick(i)">{{i
        <10? '0'+i:i}}:00 </div>
          <div class="btn btn-secondary cancel" @click="board=false;start=start_c;end=end_c">取消</div>
          <div class="btn btn-success confirm" @click="confirm">确定</div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        board: false,
        start: 0,
        end: 24,
        start_c: 0,
        end_c: 24,
        flag: 0
      }
    },
    computed: {
      hours() {
        let filter = this.start_c < 10 ? '0' + this.start_c : this.start_c
        return filter + ':00-' + this.end_c + ':00'
      }
    },

    methods: {
      picker(e) {
        this.board = true
      },
      confirm() {
        this.start_c = this.start
        this.end_c = this.end
        this.board = false
      },
      onclick(i) {
        if (i === this.end || i === this.start) {
          return
        }

        if (this.flag === 0) { // start default
          this.end = null
          this.start = i
          this.flag = 1
        } else { // end
          if (i < this.start) {
            this.start = i
            this.flag = 1
          } else {
            this.end = i
            this.flag = 0
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .day-picker {
    position: relative;
    display: flex;
    input {
      margin-left: 15px;
      width: 108px;
    }
    .board {
      padding: 3px;
      padding-bottom: 35px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      width: 258%;
      height: 245px;
      position: absolute;
      left: -15px;
      top: 34px;
      background: #fff;
      z-index: 999;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      .item {
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 18%;
        &.start {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        &.end {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
        &.cover {
          cursor: pointer;
          color: #292b2c;
          background-color: #e6e6e6;
          border-color: #adadad;
        }
      }
      .confirm {
        font-size: 14px;
        width: 55px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 4px;
        height: 28px;
        right: 6px;
      }
      .cancel {
        font-size: 14px;
        width: 55px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 4px;
        height: 28px;
        right: 66px;
      }
    }
  }
</style>