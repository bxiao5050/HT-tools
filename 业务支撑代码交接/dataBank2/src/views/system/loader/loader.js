import Vue from 'vue'
let LoaderConstructor = Vue.extend(require('./loader.vue'));

export default class Loader {
  static id = 'loader-com'
  static instance
  static init = function () {
    this.instance = new LoaderConstructor();
    this.instance.vm = this.instance.$mount();
    document.body.appendChild(this.instance.vm.$el);
    this.instance.dom = this.instance.vm.$el;
  }
  // 首次加载loading,后续调用load加loadingCount
  static load = function () {
    if (this.instance) {
      this.instance.load()
    } else {
      this.init()
      this.load()
    }
  }
  // load结束
  static loadend = function () {
    if (this.instance) {
      this.instance.loadend()
    }
  }
  // load关闭
  static loadclose = function () {
    if (this.instance) {
      this.instance.loadclose()
    }
  }
  // 点击关闭
  static loadclickclose = function () {
    if (this.instance) {
      this.instance.loadclickclose()
    }
  }
}