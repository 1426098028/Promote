# 移动端1px问题

#### https://www.duidaima.com/Group/Topic/OtherMobile/9561


## 伪元素+transform(常用)
### 原理 构建1个伪元素, border为1px, 再以transform缩放到50%
##### 最好在使用前也判断一下，结合 JS 代码，判断是否 Retina 屏
```
if(window.devicePixelRatio && devicePixelRatio >= 2){
  document.querySelector('ul').className = 'scale-1px';
}
```

#### 优点
##### 可以满足所有场景，且修改灵活
#### 缺点
##### 对于已使用伪类的元素（例如clearfix）要多层嵌套

## viewport + rem 实现(常用)
### 原理 同时通过设置对应viewport的rem基准值，这种方式就可以像以前一样轻松愉快的写1px了
#### 优点
##### 所有场景都能满足  一套代码，可以兼容基本所有布局
#### 缺点
##### 老项目修改代价过大，只适用于新项目

## 使用border-image实现  使用background-image实现
### 原理 都是border设置在边框的底部，所以使用的图片是2px高，上部的1px颜色为透明，下部的1px使用视觉规定的border的颜色
#### 优点
##### 可以设置单条、多条表框
#### 缺点
##### 更换颜色和样式麻烦，需要更改图片   某些设备上会模糊。

## 多背景渐变实现
### 原理 与background-image方案类似，只是将图片替换为css3渐变。设置1px的渐变背景，50%有颜色，50%透明
#### 优点
##### 可以设置单条、多条表框 边框的颜色随意设置
#### 缺点
##### 代码量多  圆角没法实现  多背景图片有兼容性问题

## 使用box-shadow模拟边框
### 原理 利用css 对阴影处理的方式实现0.5px的效果
#### 优点
##### 代码少，兼容性好。
#### 缺点
##### 边框有阴影，颜色变浅。