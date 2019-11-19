<template>
  <!-- eslint-disable -->
  <div class="choice-container">
    <div class="wy-login-nav">
      <span class="logo">宅-停车场管理系统</span>
      <ul style="cursor: pointer;">
        <li>关于我们</li>
        <div style="height:12px;border:1px solid white;margin-top:4px" />
        <li>客服服务</li>
        <div style="height:12px;border:1px solid white;margin-top:4px" />
        <li>反馈建议</li>
        <div style="height:12px;border:1px solid white;margin-top:4px" />
        <li>隐私政策</li>
      </ul>
    </div>
    <div class="choice-main" v-show="true">
      <!-- 选择套餐组件 -->
      <choice-tc v-if="isChoiceTcShow"></choice-tc>
    </div>
    <div class="wy-login-bottom">
      <p class="zi">成都同享社圈智慧科技有限公司版权所有</p>
      <div
        style="height:12px;border:1px solid white;margin-top:4px;width:2px;margin-left:277px;display: inline-block;"
      ></div>
      <a
        href="http://www.miibeian.gov.cn/"
        target="_blank"
        style="margin-left:10px; white-space:nowrap;position:absolute;"
      >蜀ICP备19024682号</a>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ChoiceTc from "./components/ChoiceTc";
import ChoiceYear from "./components/ChoiceYear";
// import WyInvoice from "./components/WyInvoice"
import { mapGetters, mapState } from "vuex";
import { getYears } from '@/api/pay'
import { Message } from 'element-ui'

export default {
  name: "pay",
  data () {
    return {
      isChoiceTcShow: true,
      getYearLists: []
    }
  },
  components: {
    ChoiceTc,
    ChoiceYear,
    // WyInvoice
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    choiceYearFanhui () {
      this.isChoiceTcShow = !this.isChoiceTcShow
    }
  },
};
</script>

<style lang="scss" scoped>
.choice-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    -45deg,
    rgba(95, 126, 255, 1) 0%,
    rgba(88, 199, 255, 1) 100%
  );
  position: relative;
  .wy-login-nav {
    cursor: default;
    color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-between;
    padding: 20px 29px 0 40px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    span {
      font-size: 18px;
      white-space: nowrap !important;
    }
    ul {
      display: flex;
      padding-top: 3px;
      cursor: pointer !important;
      z-index: 5623;
      float: right;
      li {
        white-space: nowrap !important;
        padding: 0 16px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
      }
    }
  }
  .choice-main {
    width: 50vw;
    height: 50vh;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    overflow: hidden;
    padding: 4.7vh 1.7vw 4vh 1.7vw;
    // background-color: #fff;
    background: rgba(255, 255, 255, 1);
    border-radius: 11px;
    .el-col {
      margin-top: 30px;
      // cursor: pointer;
    }
  }
}
.wy-login-bottom {
  position: absolute;
  bottom: 12px;
  color: #fff;
  font-size: 14px;
  margin: 0 38%;
  width: 100%;
  white-space: nowrap !important;
  .zi {
    position: absolute;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    font-family: MicrosoftYaHei;
    font-weight: 400;
    cursor: default;
    white-space: nowrap;
    width: 280px;
  }
}
</style>
