<template>
  <div>
    <!-- //滚动条样式 -->
    <div class="scroll-container">
      <p class="row">雲青青兮欲雨，水澹澹兮生煙</p>
      <p class="row">雲青青兮欲雨，水澹澹兮生煙</p>
      <p class="row">雲青青兮欲雨，水澹澹兮生煙</p>
      <p class="row">雲青青兮欲雨，水澹澹兮生煙</p>
      <p class="row">雲青青兮欲雨，水澹澹兮生煙</p>
      <p class="row">雲青青兮欲雨，水澹澹兮生煙</p>
      <p class="row">雲青青兮欲雨，水澹澹兮生煙</p>
      <p class="row">雲青青兮欲雨，水澹澹兮生煙</p>
      <p class="row">雲青青兮欲雨，水澹澹兮生煙</p>
      <p class="row">雲青青兮欲雨，水澹澹兮生煙</p>
      <p class="row">雲青青兮欲雨，水澹澹兮生煙</p>
      <p class="row">雲青青兮欲雨，水澹澹兮生煙</p>
    </div>
    <!-- 垂直居中 -->
    <!-- <div class="parentment">
      <div class="childrenment">陈</div>
    </div>-->
    <!-- 气泡儿 -->
    <div class="poptip btn" aria-controls="弹出气泡">
      <div class="pao">{{ maopao }}</div>
      <div>点击弹出可爱小泡泡</div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      maopao: 'hahah'
    }
  },
  computed: {},
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang='scss' scoped>
.scroll-container {
  height: 200px;
  border: 1px solid #ddd;
  overflow: auto;
  width: 500px;
  margin: 0 auto;
  background-color: #fff;
  .row {
    margin: 10px;
    padding-left: 20px;
  }
  &::-webkit-scrollbar {
    width: 10px;
    background: white; //滚动条背景颜色
  }
  &::-webkit-scrollbar-corner, /* 滚动条角落 */
 &::-webkit-scrollbar-thumb,
 &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  &::-webkit-scrollbar-corner,
  &::-webkit-scrollbar-track {
    /* 滚动条轨道 */
    background-color: rgba(180, 160, 120, 0.1);
    box-shadow: inset 0 0 1px rgba(180, 160, 120, 0.5);
  }
  &::-webkit-scrollbar-thumb {
    /* 滚动条手柄 */
    background-color: #00adb5;
  }
}
//垂直居中样式
.parentment {
  position: relative;
  width: 500px;
  height: 300px;
  background-color: red;
  // 方法1   transform: translateY(-50%);
  .childrenment {
    background-color: green;
    position: absolute;
    width: 100px;
    height: 50px;
    top: 50%;
    transform: translateY(-50%);
  }
}
//气泡
$poptipBg: #ccc;
$color: #fff;
$triangle: 8px;
$distance: -12px;
.poptip {
  // 按钮
  width: 500px;
  margin-top: 100px;
  position: relative;
  z-index: 101;
  &::before,
  .pao {
    visibility: hidden;
    opacity: 0;
    transform: translate3d(0, 0, 0);
    transition: all 0.3s ease 0.2s;
    box-sizing: border-box;
  }
  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: $triangle $triangle 0 $triangle;
    border-color: $poptipBg transparent transparent transparent;
    left: calc(50% - #{$triangle});
    top: 0px;
    transform: translateX(0%) translateY($distance);
  }

  .pao {
    width: 100px;
    height: 100px;
    font-size: 14px;
    color: $color;
    position: absolute;
    padding: 6px 12px;
    white-space: nowrap;
    z-index: 100;
    left: 50%;
    bottom: 100%;
    transform: translateX(-50%) translateY($distance);
    background: $poptipBg;
    line-height: 1;
    border-radius: 2px;
  }
  &:hover::before,
  &:hover .pao {
    visibility: visible;
    opacity: 1;
  }
}

.btn {
  min-width: 100px;
  line-height: 1.5;
  padding: 5px 10px;
  color: #fff;
  background: #00adb5;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
}
</style>
