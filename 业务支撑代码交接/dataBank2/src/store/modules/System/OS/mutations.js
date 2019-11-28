export default {
  initOS : (state) => {
    state.OSList = [
      {
        id: 1,
        name: 'IOS',
        checked: true
      }, {
        id: 2,
        name: '安卓',
        checked: true
      }
    ]
  },
  clearInfo : (state) => {
    state.OSList = null
  }
}