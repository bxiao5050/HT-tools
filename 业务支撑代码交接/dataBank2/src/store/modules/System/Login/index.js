import LoginState from './state'
import LoginMutations from './mutations'
// import LoginGetters from './getters'
import LoginActions from './actions'

/**
 * Login 模块
 */
export default class LoginModule {

  /**
   * @type {boolean}
   */
  static namespaced = true;

  /**
   * @type {LoginState}
   */
  static state = LoginState;

  /**
   * @type {LoginMutations}
   */
  static mutations = LoginMutations;

  // /**
  //  * @type {LoginGetters}
  //  */
  // static getters = LoginGetters;

  /**
   * @type {LoginActions}
   */
  static actions = LoginActions

}