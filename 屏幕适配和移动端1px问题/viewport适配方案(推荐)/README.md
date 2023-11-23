# vw 适配方案(推荐)

和viewport适配方案(推荐) 几乎一样 区别是meta标签

## 只需 添加下面标签 
```
<meta name="viewport" content="width={设计稿宽度}, initial-scale={屏幕逻辑像素宽度/设计稿宽度}, maximum-scale={屏幕逻辑像素宽度/设计稿宽度}, minimum-scale={屏幕逻辑像素宽度/设计稿宽度}, user-scalable=no"></meta>
<meta name="viewport" content="width=375, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```
## 或者通过js添加meta
```
(function flexible(window, document) {
    var docElwidth = screen.width
    var design = 375         //设计图宽  基准值          支持函数 
    function setmeta() {
        document?.querySelector('[name="viewport"]')?.remove()   // 删除已经有的  meta name="viewport"
        // <meta name="viewport" content="width={设计稿宽度}, initial-scale={屏幕逻辑像素宽度/设计稿宽度}, maximum-scale={屏幕逻辑像素宽度/设计稿宽度}, minimum-scale={屏幕逻辑像素宽度/设计稿宽度}, user-scalable=no"></meta>
        var scale = docElwidth / design
        var viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = `width=${design}, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`;
        document.head.appendChild(viewportMeta);
    }
    setmeta()
    window.addEventListener('resize', setmeta)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setmeta()
        }
    })
}(window, document))

```



#### 但是要吧px单位换成vw单位

### 辅助工具  postcss-px-to-viewport     配置把px转换成vw
```
npm i postcss-px-to-viewport
```


## 配置postcss-px-to-viewport
#### 在vite.config.js中写入
```
import postcsspxtoviewport from 'postcss-px-to-viewport'
```
#### 在defineConfig({...,})中写入
```
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: 'px',
          viewportWidth: 375, // 设计图宽  基准值          支持函数 
          unitPrecision: 6, // 单位转换后保留的精度
          propList: ['*'], // 能转化为vw的属性列表
          viewportUnit: 'vw', // 希望使用的视口单位
          fontViewportUnit: 'vw', // 字体使用的视口单位
          selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
          minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
          mediaQuery: true, // 媒体查询里的单位是否需要转换单位
          replace: true, //  是否直接更换属性值，而不添加备用属性
          exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          include: [], // 如果设置了include，那将只有匹配到的文件才会被转换
          landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
          landscapeUnit: 'vw', // 横屏时使用的单位
          landscapeWidth: 1024, // 横屏时使用的视口宽度
        })
      ]
    }
  }
```


