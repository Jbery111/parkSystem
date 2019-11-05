<template>
  <!-- 找回密码页面 -->
  <div class="wy-login-container">
    <div class="wy-login-nav">
      <span>宅-物业管理系统</span>
      <ul style="cursor:pointer;">
        <li>关于我们</li>
        <div style="height:12px;border:1px solid white;margin-top:4px" />
        <li>客服服务</li>
        <div style="height:12px;border:1px solid white;margin-top:4px" />
        <li>反馈建议</li>
        <div style="height:12px;border:1px solid white;margin-top:4px" />
        <li>隐私政策</li>
      </ul>
    </div>
    <!-- 表单 -->
    <el-form ref="loginForm" :model="loginForm" class="login-form" label-position="left">
      <!-- 标题 -->
      <h3 class="title-container">找回密码</h3>
      <!-- 用户名 -->
      <el-form-item prop="username">
        <span class="icon-container">
          <svg-icon icon-class="username1" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入账号"
          name="username"
          type="text"
          @keyup.enter.native="handleRetri"
        />
      </el-form-item>
      <div class="mistake-toast">
        <p v-show="true" class="username-toast">{{ nameMsg }}</p>
      </div>
      <!-- 验证码 -->
      <el-form-item prop="password" class="verification">
        <span class="icon-container">
          <svg-icon icon-class="lock2" />
        </span>
        <el-input
          ref="password"
          v-model="loginForm.auth"
          placeholder="请输入验证码"
          name="password"
          class="passwordinput"
          @keyup.enter.native="handleRetri"
        />
        <!-- <p class="kongbai" /> -->
        <p v-if="codeLoading" class="codeSty">{{ time+'s' }}</p>
        <p v-else class="codeSty getverification" @click="handleGetCode">
          <span>获取验证码</span>
        </p>
      </el-form-item>
      <div class="mistake-toast">
        <p v-show="true" class="password-toast">{{ codeMsg }}</p>
      </div>
      <!-- //忘记密码 -->
      <div class="forget" @click="getVerification">无法获取验证码?</div>
      <!-- 提交 -->
      <!-- <el-button type="primary" @click.native.prevent="handleRetri" class="success" ref='success'>确认</el-button>
      <el-button type="primary" @click.native.prevent="handleGveUp" class="forgive" ref="forgive">放弃</el-button>-->
      <div class="reset-btn" @mouseleave="flag=1">
        <div :class="flag===1 ? 'btn1':'btn2'" @mouseover="flag=1" @click="handleRetri">确定</div>
        <div :class="flag!==1 ? 'btn1':'btn2'" @mouseover="flag=2" @click="handleGveUp">放弃</div>
      </div>
    </el-form>
    <div class="wy-login-bottom">
    <p class="zi">成都同享社圈智慧科技有限公司版权所有</p>
    <div style="height:12px;border:1px solid white;margin-top:4px;width:2px;margin-left:277px;display: inline-block;" ></div>
    <a href="http://www.miibeian.gov.cn/" target="_blank" style="margin-left:10px; white-space:nowrap;position:absolute;">蜀ICP备19024682号</a>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { login } from '@/api/user'
import { setToken } from '@/utils/auth'
import { mapMutations, mapActions, mapState } from 'vuex'
import { setTimeout, setInterval, clearInterval } from 'timers';
import { userInfo } from 'os';
import { Message } from 'element-ui'
export default {
  name: 'Loginretripwd',
  data () {
    return {
      loginForm: {
        username: '',
        code: '',
        auth: ''
      },
      codeLoading: false,
      time: 60,
      nameMsg: '',
      codeMsg: '',
      disabled: true,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: '' }],
        code: [{ required: true, trigger: 'blur', validator: '' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      flag: 1
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    ...mapActions(['getCode', 'retrieve']),
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 获取验证码
    handleGetCode () {
      console.log('点击获取验证码')
      this.getCode(this.loginForm).then((resp) => {
        const { code } = resp
        if (resp.code === 400 || resp.code === 700) {
          this.nameMsg = resp.msg
          setTimeout(() => {
            this.nameMsg = ''
          }, 2000)
          console.log('获取验证码的resp1')
        } else if (resp.code === 401) {
          console.log('获取验证码的resp2')
          Message(resp.msg)
        } else {
          console.log('获取验证码的resp3')
          // 发送成功之后
          this.codeLoading = true
          var timer = setInterval(() => {
            if (this.time === 0) {
              clearInterval(timer)
              this.time = 60
              this.codeLoading = false
            } else {
              this.time = this.time - 1
            }
          }, 1000)
        }
        this.loginForm.code = resp.msg
      })
    },
    // 找回密码
    handleRetri () {
      console.log('找回密码')
      this.retrieve(this.loginForm).then((resp) => {
        console.log(resp, '找回密码resp')
        if (resp.code === 301 || resp.code === 403 || resp.code === 404 || resp.code === 400 || resp.code === 700) {
          this.nameMsg = resp.msg
          setTimeout(() => {
            this.nameMsg = ''
          }, 2000)
          console.log(resp, '找回密码resp11111')
        }
        if (resp.code === 302 || resp.code === 401 || resp.code === 303) {
          this.codeMsg = resp.msg
          setTimeout(() => {
            this.codeMsg = ''
          }, 2000)
        }
        if (resp.code === 200) {
          // 路由传参数
          this.$router.push(`/loginenternewpwd?phone=${resp.msg}`)
        }
        if (resp.code === 405) {
          Message()
        }
      })
    },
    handleGveUp () {
      this.$router.push({
        path: '/login'
      })
    },
    getVerification () {
      this.$router.push('/loginresetpwd')
    }
  }
}
</script>


<style lang="scss" scoped>
.el-form {
  position: absolute;
  top: 24vh;
  right: 10vw;
  width: 21.8vw;
  height: auto;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  border-radius: 14px;
  padding: 5.6vh 2.6vw 3.4vh 2.6vw !important;
  .el-form-item {
    position: relative;
    width: 100%;
    height: 5.3vh;
    margin-top: 3.1vh;
    margin-bottom: 0;
    border-bottom: 1px solid rgba(160, 160, 160, 1);
    .el-input {
      width: 82%;
      border: none;
      position: absolute;
      margin-top: 1vh;
      font-size: 0.9vw;
      // top: 1px;
      //  .svg-icon {
      //    vertical-align: 0.2em !important;
      //    }
      .el-input__inner {
        border: none;
        outline: none;
        height: 2.5vw !important;
      }
      .el-input__inner::-webkit-input-placeholder {
        font-size: 0.9vw;
        // padding: 0 0 20px 0;
      }
      .el-input__inner::-moz-placeholder {
        font-size: 0.9vw;
      }
    }
  }
  .el-button {
    width: 100%;
    height: 5vh;
    // padding-top: 1.5vh;
    border-radius: 3px;
    margin-bottom: 0px !important;
    margin-top: 0px !important;
    background: rgba(37, 186, 217, 1);
    // margin-top: 2vh;
    font-size: 0.9vw;
  }
  .el-button--primary.is-disabled,
  .el-button--primary.is-disabled:active,
  .el-button--primary.is-disabled:focus,
  .el-button--primary.is-disabled:hover {
    background: rgba(37, 186, 217, 0.5);
  }
  .svg-icon {
    vertical-align: -0.4em !important;
  }
}
</style>

<style lang="scss" scoped >
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: rgba(51, 51, 51, 1);
$btn-width: 16.7vw;
$btn-height: 4.2vh;

.wy-login-container {
  position: relative;
  height: 100%;
  min-height: 100%;
  width: 100%;
  background: linear-gradient(
    -45deg,
    rgba(95, 126, 255, 1) 0%,
    rgba(88, 199, 255, 1) 100%
  );
  overflow: hidden;
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
      float: right;

      li {
        padding: 0 16px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        white-space: nowrap !important;
      }
    }
  }
  .login-form {
    .title-container {
      cursor: default;
      width: auto;
      height: 1.95vh;
      font-size: 1.4vw;
      box-sizing: border-box;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin: 0px 0px 8.6vh 0px;
    }
    .icon-container {
      box-sizing: border-box;
      font-size: 1.6vw;
      // padding: 0px 5px 0px 5px;
      color: rgba(102, 102, 102, 1);
      //  margin-top: 0.65vh;
      // display: inline-block;
      //   width: 30px;
      //   height: 30px;
    }
    .verification {
      position: relative;
      .passwordinput {
        width: 50%;
      }
      //  .kongbai {
      //   width: 4.5vw;
      //   height: 3vh;
      //   background-color: #fff;
      //   position: absolute;
      //    top: -0.4vh;
      //   right: 0;
      //  border: 1px solid red;
      // }
      .codeSty {
        // width: 5vw;
        height: 3vh;
        line-height: 3vh;
        text-align: center;
        border-radius: 3px;
        padding: 0 0.3vw;
        background: rgba(240, 242, 245, 1);
        float: right;
        // font-size: 0.9vw;
        color: rgba(102, 102, 102, 1);
        margin-top: 1.6vh;
      }
      .getverification {
        cursor: pointer;
        font-size: 0.7vw !important;
      }
    }
    .mistake-toast {
      // background-color: #f00;
      color: red;
      height: 0.87vw;
      width: 100%;
      font-size: 0.7vw;
      padding-top: 0.4vh;
      box-sizing: border-box;
    }
    .reset-btn {
      // width: 100%;
      // height: $btn-height;
      // background-color: #f00;
      // margin-top: 6.5vh;
      cursor: pointer;
      text-align: center;
      .btn1 {
        width: 100%;
        height: $btn-height;
        // background: #f00;
        background: rgba(37, 186, 217, 1);
        border-radius: 4px;
        // margin: 1.5vh 0 1.5vh 0;
        font-size: 0.95vw;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .btn2 {
        width: 100%;
        height: $btn-height;
        background: #fff;
        // background:rgba(37,186,217,1);
        border-radius: 4px;
        font-size: 0.7vw;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .forget {
    float: right;
    right: 1.8vw;
    height: 0.78vh;
    font-size: 0.8vw;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    // cursor: pointer;
    margin-bottom: 5.8vh;
    margin-top: 0vh !important;
    cursor: pointer;
  }
  .success {
    margin-top: 5vh !important;
  }
  .forgive {
    padding: 0;
    margin-left: 0;
    background-color: #fff;
    color: rgba(153, 153, 153, 1);
    border: 0;
    font-size: 0.7vw;
    margin-top: 0 !important;
  }
  
}
.wy-login-bottom{
  position: absolute;
  bottom: 12px;
  color: #fff;
  font-size: 14px;
  margin: 0 38%;
  width: 100%;
  white-space:nowrap !important;
.zi {
     position: absolute;
     text-align: center;
     color: rgba(255, 255, 255, 1);
     font-family: MicrosoftYaHei;
     font-weight: 400;
     cursor: default;
     white-space:nowrap;
     width: 280px;
     
     }
    
  }
</style>
// 找回密码