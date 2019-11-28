import AgentState from './state'
import AgentMutations from './mutations'
import AgentGetters from './getters'
import AgentActions from './actions'

/**
 * Agent
 */
export default class AgentModule {

  /**
   * @type {boolean}
   */
  static namespaced = true;

  /**
   * @type {AgentState}
   */
  static state = AgentState;

  /**
   * @type {AgentMutations}
   */
  static mutations = AgentMutations;

  /**
   * @type {AgentGetters}
   */
  static getters = AgentGetters;

  /**
   * @type {AgentActions}
   */
  static actions = AgentActions
  
}