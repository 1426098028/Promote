const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  avatar: state => state.user.userInfo.staffPhoto,
  company: state => state.user.userInfo.company,
  departmentName: state => state.user.userInfo.departmentName,
  name: state => state.user.userInfo.username,
  roles: state => state.user.userInfo.roles,
  routes: state => state.user.routes,
  MessageList: state => state.MessageNotification.MessageList,
  UnreadTimes: state => state.MessageNotification.UnreadTimes,
}
export default getters
