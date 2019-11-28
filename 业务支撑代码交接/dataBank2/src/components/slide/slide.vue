<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <transition-group tag="ul" class='slide-ul' :name="transitionName">
      <li v-for="(item , index ) in slides" :key="index" v-show="index===nowIndex">
        <a :href="item.href" :target="target">
          <img :src="item.src" alt="">
        </a>
      </li>
    </transition-group>
    <!-- <ul class="slide-pages">
      <li v-for="(item, index) in slides" :key="index"
          @click="goto(index)"
          class="slide-page-point"
      >
        <a :class="{'active': index === nowIndex}">{{ index + 1 }}</a>
      </li>
    </ul> -->
    <div class="control-wrapper">
      <a class="prev" @click="goto(prevIndex)"></a>
      <a class="next" @click="goto(nextIndex)"></a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      slides: {
        type: Array,
        default: []
      },
      auto:{
        type:Boolean,
        default:true
      },
      inv: {
        type: Number,
        default: 1000
      },
      name: {
        type: String,
        default: 'move'
      },
      target: {
        type: String,
        default: '_blank'
      },
      value: {
        type:Number,
        default:0
      }
    },
    data () {
      return {
        nowIndex: 0,
        transitionName: 'move-right'
      }
    },
    computed: {
      prevIndex () {
        if (this.nowIndex === 0) {
          return this.slides.length - 1
        } else {
          return this.nowIndex - 1
        }
      },
      nextIndex () {
        if (this.nowIndex === this.slides.length - 1) {
          return 0
        } else {
          return this.nowIndex + 1
        }
      }
    },
    methods: {
      goto (index) {
        if(this.name == 'fade'){
          this.transitionName = 'fade'
        } else {
          if(index < this.nowIndex){
            this.transitionName = 'move-left'
          } else{
            this.transitionName = 'move-right'
          }
        }
        this.nowIndex = index
      },
      runInv () {
        if(this.auto){
          this.invId = setInterval(() => {
            this.goto(this.nextIndex)
          }, this.inv)
        }
      },
      clearInv () {
        clearInterval(this.invId)
      }
    },
    mounted () {
      this.runInv()
    },
    watch:{
      nowIndex(v,ov){
        if(v!=ov){
          this.$emit('input',v)
        }
      },
      value(v,ov){
        if(v!=ov){
          this.nowIndex = v
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .slide-pages {
    position: absolute;
    bottom: 20px;
    right: 30px;
    li {
      display: inline-block;
      height: 18px;
      a {
        display: block;
        width: 6px;
        height: 6px;
        margin: 0 5px;
        border: 2px solid #fff;
        border-color: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
        text-align: left;
        text-indent: -9999px;
        overflow: hidden;
        _zoom: 1;
        background: #f5f5f5;
        background: rgba(0, 0, 0, 0.4);
        -webkit-transition: all .2s;
        transition: all .2s;
        &.active {
          background: #fff;
          background: rgba(255, 255, 255, 0.4);
          border-color: #757575;
          border-color: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }
  .control-wrapper {
    a {
      display: inline-block;
      position: absolute;
      top: 50%;
      width: 41px;
      height: 69px;
      transform: translateY(-50%);
    }
  }
  .prev {
    left: 0;
    background: url("http://c1.mifile.cn/f/i/2014/cn/icon/icon-slides.png") no-repeat -84px 50%;
    &:hover {
      background-position: 0 50%
    }
  }
  .next {
    right: 0;
    display: inline-block;
    background: url(//c1.mifile.cn/f/i/2014/cn/icon/icon-slides.png) no-repeat -125px 50%;
    &:hover {
      background-position: -42px 50%;
    }
  }
  .slide-show {
    width:100%;
    height:100%;
    position: relative;
    overflow: hidden;
  }
  .slide-ul {
    width: 100%;
    height: 100%;
    list-style:none;
    margin:0;
    padding:0;
    li {
      position: absolute;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  // .move-enter-active {
  //   transition: all 0.5s ease;
  //   transform: translateX(0)
  // }
  // .move-leave-active {
  //   transition: all 0.5s ease;
  //   transform: translateX(-100%);
  // }
  // .move-enter {
  //   transform: translateX(100%);
  // }
  // .move-leave {
  //   transform: translateX(0);
  // }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  /*move-right*/
   .move-right-enter-active {
    transition: all .5s ease;
    transform: translateX(0)
  }
  .move-right-leave-active {
    transition: all .5s ease;
    transform: translateX(-100%);
  }
  .move-right-enter {
    transform: translateX(100%);
  }
  .move-right-leave {
    transform: translateX(0);
  }
   /*move-left*/
   .move-left-enter-active {
    transition: all 0.5s ease;
    transform: translateX(0)
  }
  .move-left-leave-active {
    transition: all 0.5s ease;
    transform: translateX(100%);
  }
  .move-left-enter {
    transform: translateX(-100%);
  }
  .move-left-leave {
    transform: translateX(0);
  }
</style>