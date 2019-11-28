import NewServerMonitorState from './state'
import NewServerMonitorMutations from './mutations'
// import NewServerMonitorGetters from './getters'
import NewServerMonitorActions from './actions'

/**
 * NewServerMonitor 模块
 */
export default class NewServerMonitorModule {

  /**
   * @type {boolean}
   */
  static namespaced = true;

  /**
   * @type {NewServerMonitorState}
   */
  static state = NewServerMonitorState;

  /**
   * @type {NewServerMonitorMutations}
   */
  static mutations = NewServerMonitorMutations;

  // /**
  //  * @type {NewServerMonitorGetters}
  //  */
  // static getters = NewServerMonitorGetters;

  /**
   * @type {NewServerMonitorActions}
   */
  static actions = NewServerMonitorActions

}