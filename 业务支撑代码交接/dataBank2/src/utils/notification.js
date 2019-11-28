/**
 * 检测用户权限
 */
const checkNotification = () => {
  if (Notification.permission === 'granted') {
    console.log('用户允许通知')
  } else if (Notification.permission === 'denied') {
    console.log('用户拒绝通知')
  } else {
    console.log('用户还未选择，需要向用户申请权限')
    requestPermission()
  }
}
/**
 * 请求用户通知权限
 */
const requestPermission = () => {
  Notification.requestPermission().then(function(permission){
    if(permission === 'granted'){
      console.log('用户允许通知')
    } else if(permission === 'denied'){
      console.log('用户拒绝通知')
    }
  })
}

checkNotification()