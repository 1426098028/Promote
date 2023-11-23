<template>
  <div style="display: flex;align-items: center;gap: 10px;flex-wrap: wrap;">
    <div class="box">原生</div>
    <div class="box">viewport</div>
    <div class="box5px">0.5px</div>
    <div class="fake1px">伪元素</div>
    <div class="bordePng">border-image</div>
    <div class="bgPng">background-image</div>
    <div class="Gradient">多背景渐变实现</div>
    <div class="shadow">shadow模拟边框</div>
  </div>
</template>

<style scoped>
* {
  font-size: 10px;
  overflow: hidden;
  box-sizing: border-box;
}

.box {
  width: 30px;
  height: 30px;
  border: 1px solid red;
}

/* viewport + rem 实现(常用)     viewport适配方案(推荐)                   */
/* 同时通过设置对应viewport的rem基准值，这种方式就可以像以前一样轻松愉快的写1px了 */
/* devicePixelRatio = 2  */
/* <meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no"> */
/* devicePixelRatio = 3 */
/* <meta name="viewport" content="initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no"> */




.viewport {
  border: 1px solid red;

}

/* 0.5px边框 处理 */
.box5px {
  width: 30px;
  height: 30px;
  border: 0.5px solid red;
}

/* 伪元素+transform   推荐  */

.fake1px {
  position: relative;
  width: 30px;
  height: 30px;
  border: none;
}

.fake1px:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid red;
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  transform: scale(0.5);
  transform-origin: left top;
}



/* 使用border-image 处理 */
.bordePng {
  width: 30px;
  height: 30px;
  border: 1px solid;
  border-image: url('./border.png') 1 1 1 1 stretch;
}

/* 使用background-image 处理 */
.bgPng {
  width: 30px;
  height: 30px;
  background: url('./border.png') repeat-x left bottom;
  background-size: 100% 1px;
}

/* 多背景渐变实现 处理 */
.Gradient {
  width: 30px;
  height: 30px;
  background:
    linear-gradient(#000, #000 100%, transparent 100%) left / 1px 100% no-repeat,
    linear-gradient(#000, #000 100%, transparent 100%) right / 1px 100% no-repeat,
    linear-gradient(#000, #000 100%, transparent 100%) top / 100% 1px no-repeat,
    linear-gradient(#000, #000 100%, transparent 100%) bottom / 100% 1px no-repeat
}

/* 使用box-shadow模拟边框 处理 */
.shadow {
  width: 30px;
  height: 30px;
  box-shadow: inset 0px -1px 1px -1px red
}
</style>
