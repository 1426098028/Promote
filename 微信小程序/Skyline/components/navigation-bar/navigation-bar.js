Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    extClass: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    background: {
      type: String,
      value: '',
    },
    color: {
      type: String,
      value: '',
    },
    back: {
      type: Boolean,
      value: true,
    },
    loading: {
      type: Boolean,
      value: false,
    },
    homeButton: {
      type: Boolean,
      value: false,
    },
    animated: {
      // 显示隐藏的时候opacity动画效果
      type: Boolean,
      value: true,
    },
    show: {
      // 显示隐藏导航，隐藏的时候navigation-bar的高度占位还在
      type: Boolean,
      value: true,
      observer: '_showChange',
    },
    // back为true的时候，返回的页面深度
    delta: {
      type: Number,
      value: 1,
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: 0,
    NavigationBar: 0,
    CapsuleWidth: 0,
    CapsuleHeight: 0,
  },
  lifetimes: {
    attached() {
      const windowInfo = wx.getWindowInfo();
      const menuButtonInfo = wx.getMenuButtonBoundingClientRect();

      // 可使用窗口宽度，单位px
      const WindowWidth = windowInfo.windowWidth;
      // 状态栏的高度，单位px
      const StatusBar = windowInfo.statusBarHeight;

      // const CapsuleHeight = menuButtonInfo.height
      // 胶囊宽度，单位px
      const CapsuleWidth = menuButtonInfo.width;
      // 胶囊高度，单位px
      const CapsuleHeight = menuButtonInfo.height;
      // 上边界坐标，单位：px
      const CapsuleTop = menuButtonInfo.top;
      // 右边界坐标，单位：px
      const CapsuleRight = menuButtonInfo.right;
      // 导航栏高度，单位px
      const NavigationBar = (CapsuleTop - StatusBar) * 2 + CapsuleHeight;

      // padding 左右距离
      const InnerBorder = WindowWidth - CapsuleRight;

      console.log('胶囊宽度，单位px', `${CapsuleWidth}px`);
      console.log('胶囊高度，单位px', `${CapsuleHeight}px`);

      console.log('状态栏的高度，单位px', `${StatusBar}px`);
      console.log('导航栏高度，单位px', `${NavigationBar}px`);
      console.log('padding 左右距离', `${InnerBorder}px`);

      console.log('整体高度：', StatusBar + NavigationBar, 'px');

      this.setData({
        StatusBar,
        NavigationBar,
        CapsuleWidth,
        CapsuleHeight,
        InnerBorder,
      });
    },
  },
  methods: {
    _showChange(newVal, oldVal) {
      // 在这里处理 show 属性变化的逻辑
      console.log('show 属性变化:', newVal, oldVal);
    },
  },
});
