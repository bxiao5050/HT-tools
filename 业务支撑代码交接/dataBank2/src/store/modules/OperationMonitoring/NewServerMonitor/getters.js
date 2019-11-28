export default class FiveForceModelGetters {

  static data = (state) => {
    if (state.data) {
      let tmp = {}
      state.data.forEach(e => {
        switch (e.id) {
          case 13:
            tmp[13] = e;
            break;
          case 14:
            tmp[14] = e;
            break;
          case 27:
            tmp[27] = e;
            break;
          case 20:
            tmp[20] = e;
            break;
          case 6:
            tmp[6] = e;
            break;
          case 38:
            tmp[38] = e;
            break;
          case 39:
            tmp[39] = e;
            break;
          case 8:
            tmp[8] = e;
            break;
          case 2:
            tmp[2] = e;
            break;
          case 9:
            tmp[9] = e;
            break;
          case 1:
            tmp[1] = e;
            break;
        }
      })
      return tmp
    } else {
      return null
    }
  }

}