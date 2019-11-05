<template>
  <!-- eslint-disable -->
  <!-- 重置密码页面 -->
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
      <h3 class="title-container">重置密码</h3>
      <!-- 账号 -->
      <el-form-item prop="username">
        <span class="icon-container">
          <svg-icon icon-class="username1" />
        </span>
        <el-input
          ref="username"
          placeholder="请输入账号"
          v-model="loginForm.phone"
          name="username"
          type="text"
          @keyup.enter.native="handleReset"
        />
      </el-form-item>
      <div class="mistake-toast">
        <p class="username-toast" v-show="true">{{phoneMsg}}</p>
      </div>
      <!-- 姓名 -->
      <el-form-item prop="ownname">
        <span class="icon-container">
          <svg-icon icon-class="name1" />
        </span>
        <el-input
          ref="name"
          placeholder="请输入姓名"
          v-model="loginForm.name"
          name="name"
          type="text"
          @keyup.enter.native="handleReset"
        />
      </el-form-item>
      <div class="mistake-toast">
        <p class="username-toast" v-show="true">{{nameMsg}}</p>
      </div>
      <!-- 新电话 -->
      <el-form-item prop="username">
        <span class="icon-container">
          <svg-icon icon-class="phone1" />
        </span>
        <el-input
          ref="username"
          placeholder="请输入新电话"
          v-model="loginForm.phones"
          name="username"
          type="text"
          @keyup.enter.native="handleReset"
        />
      </el-form-item>
      <div class="mistake-toast">
        <p class="username-toast" v-show="true">{{phonesMsg}}</p>
      </div>
      <!-- 验证码 -->
      <el-form-item prop="password" class="verification">
        <span class="icon-container">
          <svg-icon icon-class="lock2" />
        </span>
        <el-input
          ref="verificationcode"
          v-model="loginForm.codes"
          placeholder="请输入验证码"
          name="verificationcode"
          class="passwordinput"
          @keyup.enter.native="handleReset"
        />
        <!-- <p class="kongbai"></p> -->
        <p v-if="codeLoading" class="codeSty">{{ time+'s' }}</p>
        <p v-else class="codeSty getverification" @click="handleGetCode">
          <i>{{ '获取验证码' }}</i>
        </p>
      </el-form-item>
      <div class="mistake-toast">
        <p class="password-toast" v-show="true">{{codeMsg}}</p>
      </div>
      <!-- 提交 -->
      <!-- <el-button :loading="loading" type="primary" @click.native.prevent="handleReset" class="success btn1">确认</el-button>
      <el-button :loading="loading" type="primary" @click.native.prevent="handleGveUp" class="forgive btn2">放弃</el-button>-->
      <div class="reset-btn" @mouseleave="flag=1">
        <div @mouseover="flag=1" :class="flag===1 ? 'btn1':'btn2'" @click="handleReset">确定</div>
        <div @mouseover="flag=2" :class="flag!==1 ? 'btn1':'btn2'" @click="handleGveUp">放弃</div>
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
// import { setToken } from '@/utils/auth'
import { Message } from 'element-ui'
import { mapActions } from 'vuex'

// console.log("login")
export default {
  name: 'loginresetpwd',
  data () {
    return {
      loginForm: {
        phone: '',
        name: '',
        phones: '',
        codes: '',//输入的验证码
        code: ''//返回的验证码
      },
      codeLoading: false,
      time: 60,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: '' }],
        password: [{ required: true, trigger: 'blur', validator: '' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      phoneMsg: '',
      nameMsg: '',
      phonesMsg: '',
      codeMsg: '',
      flag: 1
    }
  },
  // watch: {
  //   $route: {
  //     handler: function(route) {
  //       this.redirect = route.query && route.query.redirect
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    ...mapActions(['resetPwd', "getCodes"]),
    // showPwd() {
    //   if (this.passwordType === 'password') {
    //     this.passwordType = ''
    //   } else {
    //     this.passwordType = 'password'
    //   }
    //   this.$nextTick(() => {
    //     this.$refs.password.focus()
    //   })
    // },
    handleReset () {
      localStorage.setItem('isRefresh', true)
      this.resetPwd(this.loginForm).then((resp) => {
        console.log('重置密码')
        console.log(resp)
        if (resp.code === 501 || resp.code === 700 || resp.code === 401) {
          this.phoneMsg = resp.msg
          setTimeout(() => {
            this.phoneMsg = ''
          }, 2000)
        }
        if (resp.code === 502 || resp.code === 504) {
          this.nameMsg = resp.msg
          setTimeout(() => {
            this.nameMsg = ''
          }, 2000)
        }
        if (resp.code === 503 || resp.code === 402 || resp.code === 403 || resp.code === 404 || resp.code === 405 || resp.code === 508 || resp.code === 701) {
          // console.log(resp)
          this.phonesMsg = resp.msg
          setTimeout(() => {
            this.phonesMsg = ''
          }, 2000)
        }
        if (resp.code === 505 || resp.code === 506 || resp.code === 507) {
          console.log(resp.code)
          this.codeMsg = resp.msg
          setTimeout(() => {
            this.codeMsg = ''
          }, 2000)
        }
        if (resp.code === 200) {
          Message(resp.msg)
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000)
        }
      })
    },
    //获取验证码
    handleGetCode () {
      // const phones = this.loginForm
      const { phone, phones, name } = this.loginForm
      this.getCodes({ phone, phones, name }).then((resp) => {
        console.log('重置获取验证码', this.loginForm)
        console.log(resp.code)
        if (resp.code === 501 || resp.code === 700 || resp.code === 401) {
          this.phoneMsg = resp.msg
          setTimeout(() => {
            this.phoneMsg = ''
          }, 2000)
        } else if (resp.code === 502 || resp.code === 504) {
          this.nameMsg = resp.msg
          setTimeout(() => {
            this.nameMsg = ''
          }, 2000)
        } else if (resp.code === 503 || resp.code === 402 || resp.code === 403 || resp.code === 404 || resp.code === 405 || resp.code === 508 || resp.code === 701) {
          // console.log(resp)
          this.phonesMsg = resp.msg
          setTimeout(() => {
            this.phonesMsg = ''
          }, 2000)
        } else {
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
        console.log(resp, '返回的验证码')
        // this.loginForm.code = resp.code
        // console.log(this.loginForm,222222)
      })
    },
    handleGveUp () {
      this.$router.push('/loginretripwd')
    },
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  position: absolute;
  top: 17vh;
  right: 10vw;
  width: 21.8vw;
  height: auto;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  border-radius: 14px;
  padding: 5.6vh 2.6vw 3.4vh 2.6vw;
  .el-form-item {
    position: relative;
    width: 100%;
    height: 50px;
    margin-bottom: 0px;
    border-bottom: 1px solid rgba(160, 160, 160, 1);
    .el-input {
      width: 82%;
      border: none;
      font-size: 0.9vw;
      margin-top: 1vh;
      .el-input__inner {
        border: none;
        outline: none;
        height: 4.5vh !important;
      }
    }
  }
  .el-button {
    width: 100%;
    height: 5vh;
    padding-top: 1.5vh;
    background: rgba(37, 186, 217, 1);
    border-radius: 3px;
    // margin-bottom:30px;
    margin-top: 10px;
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
    }
    ul {
      display: flex;
      padding-top:3px;
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
      margin: 0 0 5vh 0;
    }
    .icon-container {
      box-sizing: border-box;
      font-size: 1.6vw;
      // padding: 0px 5px 0px 5px;
      color: rgba(102, 102, 102, 1);
      margin-top: 0.65vh;
    }
    .verification {
      position: relative;
      .passwordinput {
        width: 50%;
      }
      .kongbai {
        width: 4.5vw;
        height: 1.6vh;
        background-color: #fff;
        position: absolute;
        top: -0.4vh;
        right: 0;
        // border: 1px solid red;
      }
      .codeSty {
        // width: 5vw;
        height: 3vh;
        line-height: 3vh;
        padding: 0 0.3vw;
        text-align: center;
        border-radius: 2px;
        background: rgba(240, 242, 245, 1);
        float: right;
        // font-size: 0.9vw;
        color: rgba(102, 102, 102, 1);
        margin-top: 2vh;
      }
      .getverification {
        cursor: pointer;
        font-size: 0.7vw !important;
      }
    }
    .mistake-toast {
      // background-color: #f00;
      color: red;
      height: 3.3vh;
      width: 100%;
      font-size: 0.7vw;
      padding-top: 0.4vh;
      box-sizing: border-box;
    }
    .reset-btn {
      // width: 100%;
      // height: $btn-height;
      // background-color: #f00;
      cursor: pointer;
      text-align: center;
      margin-top: 2.9vh;
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
    font-size: 0.78vw;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    cursor: pointer;
  }
  .forgive {
    padding: 0px;
    margin-left: 0px;
    background-color: #fff;
    color: rgba(153, 153, 153, 1);
    border: 0px;
    font-size: 0.7vw;
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
<style lang="scss" scoped>
.el-form {
  position: absolute;
  top: 21vh;
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
    margin-bottom: 0px;
    border-bottom: 1px solid rgba(160, 160, 160, 1);
    .el-input {
      width: 82%;
      border: none;
      .el-input__inner {
        border: none !important;
        outline: none;
      }
      .el-input__inner::-webkit-input-placeholder {
        font-size: 0.9vw;
      }
      .el-input__inner::-moz-placeholder {
        font-size: 0.9vw;
      }
    }
  }
  .svg-icon {
    vertical-align: -0.35em !important;
  }
  .el-button {
    width: 100%;
    height: 5vh;
    padding-top: 1.5vh;
    background: rgba(37, 186, 217, 1);
    border-radius: 3px;
    // margin-bottom:30px;
    // margin-top: 20px;
    font-size: 0.9vw;
  }
}
</style>
<style lang="scss">
.el-input__inner {
  border: none !important;
  outline: none;
  background-color: rgb(255, 255, 255) !important;
}
</style>
// 重置密码