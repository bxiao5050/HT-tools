import LanguageState from './state'
import LanguageMutations from './mutations'
import LanguageGetters from './getters'
// import LanguageActions from './actions'

/**
 * Language 模块
 */
export default class LanguageModule {

  /**
   * @type {boolean}
   */
  static namespaced = true;

  /**
   * @type {LanguageState}
   */
  static state = LanguageState;

  /**
   * @type {LanguageMutations}
   */
  static mutations = LanguageMutations;

  /**
   * @type {LanguageGetters}
   */
  static getters = LanguageGetters;

  // /**
  //  * @type {LanguageActions}
  //  */
  // static actions = LanguageActions

}