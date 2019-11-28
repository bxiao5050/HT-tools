import RegChannelState from './state'
import RegChannelMutations from './mutations'
import RegChannelGetters from './getters'
import RegChannelActions from './actions'

/**
 * RegChannel
 */
export default class RegChannelModule {

  /**
   * @type {boolean}
   */
  static namespaced = true;

  /**
   * @type {RegChannelState}
   */
  static state = RegChannelState;

  /**
   * @type {RegChannelMutations}
   */
  static mutations = RegChannelMutations;

  /**
   * @type {RegChannelGetters}
   */
  static getters = RegChannelGetters;

  /**
   * @type {RegChannelActions}
   */
  static actions = RegChannelActions

}