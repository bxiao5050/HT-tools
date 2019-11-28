export default class FiveForceModelMutations {
  static data = (state, data) => {
    state.data = data
  }
  static curDate = (state, data) => {
    state.curDate = data
  }
}