import ChargeHotListState from './state'
import ChargeHotListMutations from './mutations'
import ChargeHotListGetters from './getters'
import ChargeHotListActions from './actions'

/**
 * ChargeHotList 模块
 */
export default class ChargeHotListModule {

  /**
   * @type {boolean}
   */
  static namespaced = true;

  /**
   * @type {ChargeHotListState}
   */
  static state = ChargeHotListState;

  /**
   * @type {ChargeHotListMutations}
   */
  static mutations = ChargeHotListMutations;

  /**
   * @type {ChargeHotListGetters}
   */
  static getters = ChargeHotListGetters;

  /**
   * @type {ChargeHotListActions}
   */
  static actions = ChargeHotListActions

}