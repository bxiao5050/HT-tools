import FiveForceModelState from './state'
import FiveForceModelMutations from './mutations'
import FiveForceModelGetters from './getters'
import FiveForceModelActions from './actions'

/**
 * FiveForceModel 模块
 */
export default class FiveForceModelModule {

  /**
   * @type {boolean}
   */
  static namespaced = true;

  /**
   * @type {FiveForceModelState}
   */
  static state = FiveForceModelState;

  /**
   * @type {FiveForceModelMutations}
   */
  static mutations = FiveForceModelMutations;

  /**
   * @type {FiveForceModelGetters}
   */
  static getters = FiveForceModelGetters;

  /**
   * @type {FiveForceModelActions}
   */
  static actions = FiveForceModelActions

}