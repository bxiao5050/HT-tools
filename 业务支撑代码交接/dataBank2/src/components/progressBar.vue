<template>
  <div id="progressBar">
    <div class="progress"></div>
    <div id="progress_thumb" class="progress_thumb" :style="'transform: translateX('+x+'px)'"></div>
    <!--<div class="progress_thumb"></div>-->
  </div>


</template>
<script>

// import { Observable } from 'rxjs'

export default {
  data() {
    return {
      isMoving: false,
      x: 0,
    }
  },
  mounted() {
    let width = progressBar.offsetWidth
    let left = progress_thumb.getBoundingClientRect().left
    let right = width + left
    let init, initX;
    let this_ = this
    // Observable.fromEvent(, 'mousedown')
    //   .subscribe(e => {

    //   })

    progress_thumb.onmousedown = (e) => {
      this_.isMoving = true
      init = e.screenX
      initX = this_.x
    }

    progress_thumb.ondragstart = (e) => {
      e.preventDefault()
    }

    window.onmousemove = (e) => {
      if (this_.isMoving && e.screenX >= left && e.screenX <= right) {
        this_.x = initX + e.screenX - init     
      }
    }

    window.onmouseup = () => {
      this_.isMoving = false
    }

    progressBar.onmousedown = (e) => {
      if (e.screenX >= left && e.screenX <= right) {
        this_.isMoving = true
        this_.x = e.screenX - left - 12
      }
    }

    // Observable.fromEvent(document.body, 'mousemove')
    //   // .throttleTime(16)
    //   .subscribe(e => {
    //     if (this_.isMoving && e.screenX >= left && e.screenX <= right) {
    //       this_.x = initX + e.screenX - init
    //     }
    //   })

    // Observable.fromEvent(document.body, 'mouseup')
    //   .subscribe(() => {

    //   })

  },
  methods: {
    ThumbDown() {
      this.valite = true;
      // console.log(this.valite)
    },
    ThumbUp() {
      this.valite = false;
    }
  }
}
</script>
<style lang="scss" scoped>
#progressBar {
  width: 100%;
  height: 10px;
  background-color: #ccc;
  margin: 0 auto;
  margin-top: 50px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  cursor: pointer;
  .progress {
    width: 0px;
    height: 10px;
    background-color: #ff4400;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }
  .progress_thumb {
    height: 24px;
    width: 24px;
    background-color: #efefef;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
    border: 1px solid #ccc;
    -webkit-box-shadow: 0px 0px 5px #ccc;
    -moz-box-shadow: 0px 0px 5px #ccc;
    box-shadow: 0px 0px 5px #ccc;
    position: absolute;
    margin-top: -18px;
    cursor: pointer;
  }
}
</style>

