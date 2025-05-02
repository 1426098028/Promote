Page({
  data: {
    DraggableSheetItem: Array.from({ length: 100 }, (item, index) => index)

  },
  onReady() {
    this.createSelectorQuery()
      .select(".sheet")
      .node()
      .exec(res => {
        const sheetContext = res[0].node
        sheetContext.scrollTo({
          size: 1,
          pixels: 600,
          animated: true,
          duration: 300,
          easingFunction: 'ease'
        })
      })
  },
  onSizeUpdate(e) {
    'worklet'
    console.info(`sizeUpdate pixels: ${e.pixels} size: ${e.size}`)
  }
})

