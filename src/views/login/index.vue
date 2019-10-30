/* eslint-disable */
<template>
  <div class="wy-login-container">
    <div class="wy-login-nav">
      <span class="logo">宅-物业操作系统1.0</span>
      <ul style="cursor:pointer;">
        <li>关于我们</li>
        <div style="height:1.56vh;border:1px solid white;margin-top:3px" />
        <li>客服服务</li>
        <div style="height:1.56vh;border:1px solid white;margin-top:3px" />
        <li>反馈建议</li>
        <div style="height:1.56vh;border:1px solid white;margin-top:3px" />
        <li>隐私政策</li>
      </ul>
    </div>
    <!-- /* eslint-disable */ -->
    <el-form ref="loginForm" :model="loginForm" class="login-form" label-position="left">
      <!-- 标题 -->
      <h3 class="title-container">欢迎登录</h3>
      <!-- 用户名 -->
      <el-form-item prop="username" class="wy-form-item">
        <span class="icon-container svg-user">
          <svg-icon icon-class="username1" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入账号"
          name="username"
          type="text"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <div class="mistake-toast">
        <p v-show="true" class="username-toast">{{ nameMsg }}</p>
      </div>
      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="icon-container">
          <svg-icon icon-class="lock2" />
        </span>
        <el-input
          ref="password"
          :key="passwordType"
          v-model="loginForm.password"
          placeholder="请输入密码"
          name="password"
          :type="passwordType"
          class="input1"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div class="mistake-toast toast1">
        <p v-show="true" class="password-toast">{{ pwdMsg }}</p>
      </div>
      <!-- //忘记密码 -->
      <div class="forget" @click="foundPwd">忘记密码？</div>
      <!-- 提交 -->
      <el-button
        :loading="loading"
        type="primary"
        class="success"
        @click.native.prevent="handleLogin"
      >确认</el-button>
    </el-form>
    <p class="wy-login-bottom">成都同享社圈智慧科技有限公司版权所有</p>
  </div>
</template>

<script>
/* eslint-disable */
import { login } from '@/api/user'
import { getToken, getInfo, setReplaceData } from '@/utils/auth'
import { mapMutations, mapActions, mapState } from 'vuex'
import { setTimeout } from 'timers';
import { Message } from 'element-ui'
import { userInfo } from 'os';
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      nameMsg: '',
      pwdMsg: '',
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: '' }],
        password: [{ required: true, trigger: 'blur', validator: '' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  beforeRouteEnter (to, from, next) {
    // console.log(,), 1111)
    console.log('login')
    if (getToken() && getInfo()) {
      const info = JSON.parse(getInfo())
      if (info.Jurisdiction === 1) {
        console.log('超级管理员')
        next('/community')
      }
      if (info.Jurisdiction === 2) {
        console.log('物业老板')
        next('/community')
      }
      if (info.Jurisdiction === 3) {
        this.$store.commit('permission/CLEAR_MENU')
        this.$store.commit('permission/CLEAR_PERMISSION')
        this.$store.dispatch('permission/FETCH_PERMISSION')
        console.log('普通员工')
        if (info.amg === 1) {
          next('/dashboard?Ju=1')
        }
        if (info.amg === 2) {
          next('/dashboard?Ju=1')
        }
      }
      if (info.Jurisdiction === 4) {
        console.log('高级员工')
        next('/community')
      }
    } else {
      console.log("12232131")
    }
    next()
  },
  components: {
    // UserFrom
  },
  methods: {
    // ...mapMutations(['setUserInfo']),
    ...mapMutations(['setDueToTheTime']),
    ...mapActions(['login']),
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
    foundPwd () {
      this.$router.replace({
        path: '/loginretripwd'
      })
    },
    handleLogin () {
      localStorage.setItem('isRefresh', true)
      // console.log('chenshaungxue')
      this.login({
        name: this.loginForm.username,
        password: this.loginForm.password
      }).then((response) => {
        console.log(response, '登录页面666')
        if (response.code === 200) {
          console.log(response)
          setReplaceData(response.data)
          if (response.Jurisdiction === 1) {
            console.log('超级管理员', '跳转选择小区，不涉及缴费')
            this.$router.replace('/community')
          } else if (response.Jurisdiction === 2) {
            console.log('物业老板')
            this.$router.replace({
              path: '/community'
            })
          } else if (response.Jurisdiction === 3) {
            this.$store.commit('permission/CLEAR_MENU')
            this.$store.commit('permission/CLEAR_PERMISSION')
            this.$store.dispatch('permission/FETCH_PERMISSION')
            console.log('普通员工')
            if (response.amg === 1) {
              this.$router.replace('/dashboard')
              // this.$router.replace({ path: 'dashboard', query: { amg: '1' }})
            } else if (response.amg === 2) {
              console.log(response)
              this.setDueToTheTime(response.time)
              this.$router.replace('/dashboard?Ju=1')//（跳到首页提示小区系统还有多久到期，页面加蒙城）
            }
          } else if (response.Jurisdiction === 4) {
            console.log('高级员工')
            this.$router.replace('/community')
          }
        } else if (response.code === 601 || response.code === 501 || response.code === 700) {
          this.nameMsg = response.msg
          setTimeout(() => {
            this.nameMsg = ''
          }, 2000)
        } else if (response.code === 602 || response.code === 502 || response.code === 402) {
          this.pwdMsg = response.msg
          setTimeout(() => {
            this.pwdMsg = ''
          }, 2000)
        } else if (response.code === 302) { // 跳到首页
          // this.nameMsg = response.msg
          this.$router.replace('/dashboard?Ju=2')//跳到首页提示小区系统已欠费,请缴费，页面加蒙城30秒倒计时
        } else if (response.code === 401) {
          this.$router.replace(`/loginentermore?phone=${this.loginForm.username}`)
        } else if (response.code === 400) {
          Message(response.msg ? response.msg : response.msg)
        } else if (response.code === 301) {
          Message(response.msg ? response.msg : response.msg)
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped >
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: rgba(51, 51, 51, 1);
$btn-height: 4.2vh;
input {
  border: none;
}
.el-input__inner {
  border: none;
  outline: none;
}

.wy-login-container {
  position: relative;
  // min-height: 100%;
  min-height: 100%;
  min-width: 100%;
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
    padding: 3.1vh 2.9vw 0 4vw;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    span {
      font-size: 1vw;
    }
    ul {
      display: flex;
      padding-top: 0.3vh;

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
}
.el-form {
  padding: 5.6vh 2.6vw 7.4vh 2.6vw;
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
    .svg-user {
      font-size: 1.8vw;
    }
    .svg-icon {
      margin-bottom: -0.4vh;
      // vertical-align: -0.3em !important;
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
    // position: relative;
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
  cursor: pointer;
  width: auto;
  // position: absolute;
  margin-bottom: 5.8vh;
  // top: 10px;
}
.success {
  margin-top: 4vh !important;
  // background-color: #f00 !important;
  border-color: #25bad9;
}
.show-pwd {
  position: absolute;
  right: 0.7vw;
  top: 1.2vh;
  font-size: 1vw;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
.wy-login-bottom {
  position: absolute;
  bottom: 1.3vh;
  right: 43vw;
  color: rgba(255, 255, 255, 1);
  font-size: 0.8vw;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  cursor: default;
}
</style>


<style lang="scss" scoped>
$btn-height: 4.2vh;
.el-form {
  position: absolute;
  top: 24vh;
  right: 10vw;
  min-width: 21.8vw;
  height: auto;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  border-radius: 14px;
  padding: 5.6vh 2.6vw 7.5vh 2.6vw !important;
  .el-form-item {
    position: relative;
    width: 100%;
    height: 5.3vh;
    margin-bottom: 0px !important;
    margin-top: 3.1vh;
    border-bottom: 1px solid rgba(160, 160, 160, 1);
    .el-input {
      width: 82%;
      border: none;
      font-size: 0.9vw;
      margin-top: 1vh;
      .el-input__inner {
        border: none;
        outline: none;
        padding: 0 1.09vw;
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
  // .wy-form-item {
  //   margin-bottom: 2.2vh !important;
  //   // background-color: #f00;
  // }

  .el-button {
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
    // margin-top: 6.5vh !important;
    justify-content: center;
    align-items: center;
    padding-top: 1vh;
    // padding-bottom: 1.95vh !important;
    box-sizing: border-box;
  }
}
</style>
