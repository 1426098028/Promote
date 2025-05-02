const App = getApp()

Component({
  //使用多个插槽
  options: {
    //样式独立hua
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  data: {
    pagePath: '/pages/NavigationBar/index',
    list: [
      {
        "pagePath": "/pages/NavigationBar/index",
        "text": "自定义导航栏"
      },
      {
        "pagePath": "/pages/ListView/index",
        "text": "ListView"
      }
    ]
  },


  lifetimes: {
    created: function () {
      // console.log("created:组件生命周期函数-在组件实例刚刚被创建时执行，注意此时不能调用  setData")

    },
    attached: function () {
    },
    moved: function () {
      // console.log("moved:组件生命周期函数-在组件实例被移动到节点树另一个位置时执行")


    },
    detached: function () {

      // console.log("detached:组件生命周期函数-在组件实例被从页面节点树移除时执行")


    },
  },

  ready: function () {
    // console.log("ready:组件生命周期函数-在组件布局完成后执行")

  },

  pageLifetimes: {
    show: function () {
      // console.log("show")



    },
    hide: function () {
      // console.log("hide")



    },
    resize: function () {

      // console.log("resize")


    },
  },




  //事件函数处理
  methods: {
    async onChange({ currentTarget: { dataset } }) {
      this.setData({ pagePath: dataset.path });
      wx.switchTab({
        url: dataset.path
      });
    },
    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
});