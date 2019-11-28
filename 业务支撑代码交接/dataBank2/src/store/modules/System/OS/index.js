import OSState from './state'
import OSMutations from './mutations'
import OSGetters from './getters'

/**
 * Agent
 */
export default class OS {

  /**
   * @type {boolean}
   */
  static namespaced = true;

  /**
   * @type {OSState}
   */
  static state = OSState;

  /**
   * @type {OSMutations}
   */
  static mutations = OSMutations;

  /**
   * @type {OSGetters}
   */
  static getters = OSGetters;

}