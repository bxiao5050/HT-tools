import CommonState from './state'
import CommonMutations from './mutations'
// import CommonGetters from './getters'
import CommonActions from './actions'

/**
 * Common 模块
 */
export default class CommonModule {

  /**
   * @type {boolean}
   */
  static namespaced = true;

  /**
   * @type {CommonState}
   */
  static state = CommonState;

  /**
   * @type {CommonMutations}
   */
  static mutations = CommonMutations;

  // /**
  //  * @type {CommonGetters}
  //  */
  // static getters = CommonGetters;

  /**
   * @type {CommonActions}
   */
  static actions = CommonActions

}