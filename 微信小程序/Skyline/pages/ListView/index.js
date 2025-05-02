// index.js
Page({
  data: {
    ListItem: Array.from({ length: 100 }, (item, index) => index)
  },
  onShow() {
    this.getTabBar().init(); //底部按钮切换
  }
})
