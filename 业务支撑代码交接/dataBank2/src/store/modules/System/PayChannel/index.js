import PayChannelState from './state'
import PayChannelMutations from './mutations'
import PayChannelGetters from './getters'
import PayChannelActions from './actions'

/**
 * PayChannel
 */
export default class PayChannelModule {

  /**
   * @type {boolean}
   */
  static namespaced = true;

  /**
   * @type {PayChannelState}
   */
  static state = PayChannelState;

  /**
   * @type {PayChannelMutations}
   */
  static mutations = PayChannelMutations;

  /**
   * @type {PayChannelGetters}
   */
  static getters = PayChannelGetters;

  /**
   * @type {PayChannelActions}
   */
  static actions = PayChannelActions

}