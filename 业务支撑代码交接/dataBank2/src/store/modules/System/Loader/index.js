import LoaderState from './state'
import LoaderMutations from './mutations'
// import LoaderGetters from './getters'
// import LoaderActions from './actions'

/**
 * Loader 模块
 */
export default class LoaderModule {

  /**
   * @type {boolean}
   */
  static namespaced = true;

  /**
   * @type {LoaderState}
   */
  static state = LoaderState;

  /**
   * @type {LoaderMutations}
   */
  static mutations = LoaderMutations;

  // /**
  //  * @type {LoaderGetters}
  //  */
  // static getters = LoaderGetters;

  // /**
  //  * @type {LoaderActions}
  //  */
  // static actions = LoaderActions

}