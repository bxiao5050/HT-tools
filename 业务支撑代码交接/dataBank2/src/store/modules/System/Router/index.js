import RouterState from './state'
// import RouterMutations from './mutations'
// import RouterGetters from './getters'
// import RouterActions from './actions'

/**
 * Router 模块
 */
export default class RouterModule {

  /**
   * @type {boolean}
   */
  static namespaced = true;

  /**
   * @type {RouterState}
   */
  static state = RouterState;

  // /**
  //  * @type {RouterMutations}
  //  */
  // static mutations = RouterMutations;

  // /**
  //  * @type {RouterGetters}
  //  */
  // static getters = RouterGetters;

  // /**
  //  * @type {RouterActions}
  //  */
  // static actions = RouterActions

}