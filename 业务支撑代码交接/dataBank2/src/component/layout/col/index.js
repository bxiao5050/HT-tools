import Col from './col'
/* istanbul ignore next */
Col.install = function (Vue) {
  Vue.component(Col.name, Col);
};
export default Col;