<template>
  <!-- eslint-disable -->
  <div class="choice-container">
    <div class="wy-login-nav">
      <span class="logo">宅-物业操作系统1.0</span>
      <ul style="cursor: pointer;">
        <li>关于我们</li>
        <div style="height:1.56vh;border:1px solid white;margin-top:3px" />
        <li>客服服务</li>
        <div style="height:1.56vh;border:1px solid white;margin-top:3px" />
        <li>反馈建议</li>
        <div style="height:1.56vh;border:1px solid white;margin-top:3px" />
        <li>隐私政策</li>
      </ul>
    </div>
    <div class="choice-main" v-show="true">
      <!-- 选择套餐组件 -->
      <choice-tc v-if="isChoiceTcShow"></choice-tc>
    </div>
    <p class="wy-login-bottom">成都同享社圈智慧科技有限公司版权所有</p>
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
    padding: 3.1vh 2.9vw 0 4vw;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    span {
      font-size: 1vw;
    }
    ul {
      display: flex;
      padding-top: 0.3vh;
      cursor: pointer !important;
      z-index: 5623;
      li {
        // height: 0.8vw;
        // border-right: 1px solid white;
        padding: 0 1vw 0 0.8vw;
        font-size: 0.8vw;
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
  .wy-login-bottom {
    cursor: default;
    position: absolute;
    bottom: 1.3vh;
    right: 43vw;
    color: rgba(255, 255, 255, 1);
    font-size: 0.8vw;
    font-family: MicrosoftYaHei;
    font-weight: 400;
  }
}
</style>
