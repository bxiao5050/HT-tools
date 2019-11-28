<template>
  <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper" style="height: 100%;">
    <!-- slides -->
    <swiper-slide v-for="(item,index) in slides" :key="index"><img :src="item.src" alt="" :style="imageStyle"/></swiper-slide>
    <!-- Optional controls -->
    <!-- <div class="swiper-pagination"  slot="pagination"></div> -->
    <!-- <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div> -->
    <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
  </swiper>
</template>
<script>
import { swiperPlugins } from "vue-awesome-swiper";
export default {
  props: {
    slides: {
      type: Array,
      default: []
    },
    imageStyle: {
      type: String,
      default: ""
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
      // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
      notNextTick: true,
      swiperOption: {
        // swiper options 所有的配置同swiper官方api配置
        autoplay: 3000,
        // direction: 'horizontal',
        // grabCursor: true,
        // setWrapperSize: true,
        autoHeight: false,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",
        loop: true,
        // scrollbar: '.swiper-scrollbar',
        // mousewheelControl: true,
        // observeParents: true,
        // if you need use plugins in the swiper, you can config in here like this
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true,
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        onSlideChangeStart: swiper => (this.activeIndex = swiper.realIndex)
      },
      // more Swiper configs and callbacks...
      // ...
      activeIndex: 0
    };
  },
  // you can find current swiper instance object like this, while the notNextTick property value must be true
  // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    slideToIndex(index) {
      this.swiper.slideTo(index + 1, 1000, true);
    }
  },
  watch: {
    activeIndex(v, ov) {
      if (v != ov) {
        this.$emit("input", v);
      }
    },
    value(v, ov) {
      if (v != ov) {
        this.activeIndex = v;
      }
    }
  }
};
</script>
