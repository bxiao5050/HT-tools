import BigCustomerTrendState from './state'
import BigCustomerTrendMutations from './mutations'
// import BigCustomerTrendGetters from './getters'
import BigCustomerTrendActions from './actions'

/**
 * BigCustomerTrend 模块
 */
export default class BigCustomerTrendModule {

  /**
   * @type {boolean}
   */
  static namespaced = true;

  /**
   * @type {BigCustomerTrendState}
   */
  static state = BigCustomerTrendState;

  /**
   * @type {BigCustomerTrendMutations}
   */
  static mutations = BigCustomerTrendMutations;

  // /**
  //  * @type {BigCustomerTrendGetters}
  //  */
  // static getters = BigCustomerTrendGetters;

  /**
   * @type {BigCustomerTrendActions}
   */
  static actions = BigCustomerTrendActions

}