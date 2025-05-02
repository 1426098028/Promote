const worklet = wx.worklet;
Page({
  data: {
    PanGestureHandlerItem: Array.from({ length: 100 }, (item, index) => index),
    gestureStatus: '未开始',
  },

  onGesture(event) {
    'worklet';
    console.log(worklet);
    console.log(event);
    this.setData({
      gestureStatus: '手势进行中',
    });
  },
  onShouldResponseOnMove(event) {
    'worklet';
    console.log(worklet);
    console.log(event);
    this.setData({
      gestureStatus: '手势移动中',
    });
  },
  onGestureEnd(event) {
    'worklet';
    console.log(worklet);
    console.log(event);
    this.setData({
      gestureStatus: '手势结束',
    });
  },
});
