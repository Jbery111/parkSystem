<template>
  <!-- 输入新密码页面 -->
  <div class="wy-login-container">
    <div class="wy-login-nav">
      <span>宅-物业操作系统1.0</span>
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
    <!-- 表单 -->
    <el-form ref="loginForm" :model="loginForm" class="login-form" label-position="left">
      <!-- 标题 -->
      <h3 class="title-container">输入新密码</h3>
      <!-- 新密码 -->
      <el-form-item prop="password">
        <span class="icon-container">
          <svg-icon icon-class="lock1" />
        </span>
        <el-input
          ref="password"
          :key="passwordType"
          v-model="loginForm.password"
          placeholder="请输入新密码"
          name="password"
          :type="passwordType"
          @keyup.enter.native="handlenewpwd"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div class="mistake-toast">
        <p v-show="true" class="password-toast">{{ firstMsg }}</p>
      </div>
      <!-- 再次输入新密码 -->
      <el-form-item prop="password">
        <span class="icon-container">
          <svg-icon icon-class="lock1" />
        </span>
        <el-input
          ref="password"
          :key="passwordType"
          v-model="loginForm.pwd"
          placeholder="请再次输入新密码"
          name="password"
          :type="passwordType"
          @keyup.enter.native="handlenewpwd"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div class="mistake-toast">
        <p v-show="true" class="password-toast">{{ secondMsg }}</p>
      </div>
      <!-- 提交 -->
      <!-- <el-button :loading="loading" type="primary" @click.native.prevent="handlenewpwd" class="save-btn" >确认</el-button>
      <el-button :loading="loading" type="primary" @click.native.prevent="handleforgive" class="forgive">放弃</el-button>-->
      <div class="reset-btn" @mouseleave="flag=1">
        <div :class="flag===1 ? 'btn1':'btn2'" @mouseover="flag=1" @click="handlenewpwd">确定</div>
        <div :class="flag!==1 ? 'btn1':'btn2'" @mouseover="flag=2" @click="handleforgive">放弃</div>
      </div>
    </el-form>
    <p class="wy-login-bottom">成都同享社圈智慧科技有限公司版权所有</p>
  </div>
</template>

<script>
/* eslint-disable */
import { login } from '@/api/user'
import { setToken, getToken, getInfo, setReplaceData } from '@/utils/auth'
import { mapActions, mapMutations, mapState } from 'vuex'
import { Message } from 'element-ui';
// import { getToken, getInfo, setReplaceData } from '@/utils/auth'
import { setInfo } from '@/utils/auth'
export default {
  name: 'Loginenternewpwd',
  data () {
    return {
      loginForm: {
        password: '',
        pwd: '',
        phone: ''
      },
      secondMsg: '',
      firstMsg: '',
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: '' }],
        password: [{ required: true, trigger: 'blur', validator: '' }]
      },
      loading: false,
      passwordType: 'password',
      flag: 1
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    // 查询字符串， query‘
    this.loginForm.phone = this.$route.query.phone
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setDueToTheTime']),
    ...mapActions(['enterPwd']),
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
    handlenewpwd () {
      localStorage.setItem('isRefresh', true)
      this.enterPwd(this.loginForm).then((resp) => {
        console.log(resp, '修改密码')
        setReplaceData(resp.data)
        console.log(resp, 'sdsadas');
        if (resp.code === 200) {
          Message(resp.msg)
          setTimeout(() => {
            if (resp.Jurisdiction === 2) {
              console.log('物业老板')
              this.$router.push('/community')
            } else if (resp.Jurisdiction === 3) {
              console.log('普通员工')
              if (resp.amg === 1) {
                this.setDueToTheTime(resp.time)
                this.$router.push('/dashboard')//跳到首页
              } else if (resp.amg === 2) {
                // console.log('amg===2')
                this.setDueToTheTime(resp.time)
                this.$router.push('/dashboard?Ju=1')//跳到首页提示小区系统还有多久到期，页面加蒙层
              }
            } else if (resp.Jurisdiction === 4) {
              console.log('高级员工')
              this.$router.push('/community')
            }
          }, 2000)
        } else if (resp.code === 502 || resp.code === 503 || resp.code === 401 || resp.code === 402 || resp.code === 403 || resp.code === 301) {
          this.secondMsg = resp.msg
          setTimeout(() => {
            this.secondMsg = ''
          }, 2000)
        } else if (resp.code === 501) {
          this.firstMsg = resp.msg
          setTimeout(() => {
            this.firstMsg = ''
          }, 2000)
        } else if (resp.code === 302) {
          Message(resp.msg)
          setTimeout(() => {
            this.setDueToTheTime(resp.time)
            this.$router.push('/dashboard?Ju=2')//跳到首页提示小区系统已欠费,请缴费，页面加蒙城30秒倒计时
          }, 2000)

        }
      })
    },
    handleforgive () {
      console.log(this.$route)
      this.$router.push({
        path: '/loginretripwd'
      })
      // this.$router.push('/login')
      // console.log('放弃')1)
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
  padding: 5.6vh 2.6vw 3.4vh 2.6vw;
  .el-form-item {
    position: relative;
    width: 100%;
    height: 5.3vh;
    margin-bottom: 0;
    margin-top: 3vh;
    border-bottom: 1px solid rgba(160, 160, 160, 1);
    .el-input {
      width: 82%;
      border: none;
      font-size: 0.9vw;
      margin-top: 1vh;
      .el-input__inner {
        border: none;
        outline: none;
      }
      .el-input__inner::-webkit-input-placeholder {
        font-size: 0.9vw;
        // margin-bottom: 1vh;
      }
      .el-input__inner::-moz-placeholder {
        font-size: 0.9vw;
      }
    }
  }
  .el-button {
    width: 100%;
    height: 5vh;
    font-size: 1.1vw;
    padding-top: 1.5vh;
    background: rgba(37, 186, 217, 1);
    border-radius: 3px;
    // margin-bottom:1.5vh;
    margin-top: 0vh;
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
        height: 1.3vw;
        // border-right: 1px solid white;
        padding: 0 1vw 0 0.8vw;
        font-size: 0.8vw;
        font-family: MicrosoftYaHei;
        font-weight: 400;
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
      margin: 0 0px 8.6vh 0px;
    }
    .icon-container {
      box-sizing: border-box;
      font-size: 1.38vw;
      // padding: 0px 5px 0px 5px;
      color: rgba(102, 102, 102, 1);
      margin-top: 0.65vh;
    }
    .mistake-toast {
      // background-color: #f00;
      color: red;
      height: 1.8vh;
      width: 100%;
      font-size: 0.7vw;
      padding-top: 0.6vh;
      box-sizing: border-box;
      // position: relative;
    }
    .svg-icon {
      // vertical-align: -0.27em;
      vertical-align: -0.27em !important;
    }
    .reset-btn {
      // width: 100%;
      // height: $btn-height;
      // background-color: #f00;
      cursor: pointer;
      text-align: center;
      margin-top: 6.5vh;
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
  .forgive {
    padding: 0;
    margin-left: 0;
    color: rgba(153, 153, 153, 1);
    background: #fff;
    border: 0;
    font-size: 0.7vw;
    margin-top: 0;
    margin-bottom: 0;
  }
  .show-pwd {
    position: absolute;
    right: 0.7vw;
    top: 0.9vh;
    font-size: 1vw;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
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

// 输入新密码