# Rem适配方案

## 库 amfe-flexible postcss-pxtorem       postcss-pxtorem （只是px转rem工具，非必须）

### 安装
```
npm i amfe-flexible postcss-pxtorem
```

## html添加
```
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```
## 引入 amfe-flexible

#### 在main.js中写入
```
import "amfe-flexible/index.js";
```
## 配置postcss-pxtorem   
#### 在vite.config.js中写入
```
import postCssPxToRem from 'postcss-pxtorem'
```
#### 在defineConfig({...,})中写入
```
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 375/10,
          propList: ['*'],
          unitPrecision: 6 // 转换精度，保留的小数位数
        })
      ]
    }
  }
```

## 缺陷


#### 内联样式无法转换 需要通过js转换处理

