import EN from './packs/en.js'
import CHS from './packs/chs.js'
import Tradition from './packs/tradition.js'

/**
 * Language 模块
 */

let LangCur = localStorage.LangCur

export default {
  data : {
    EN,
    CHS,
    Tradition
  },
  cur : LangCur
    ? LangCur
    : 'CHS'
}
