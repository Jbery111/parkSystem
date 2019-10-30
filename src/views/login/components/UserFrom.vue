<template>
  <!-- 表单 -->
  <el-form
    ref="loginForm"
    :model="loginForm"
    class="login-form"
    auto-complete="on"
    label-position="left"
  >
    <!-- 标题 -->
    <h3 class="title-container">欢迎登录</h3>
    <!-- 用户名 -->
    <el-form-item prop="username">
      <span class="icon-container">
        <svg-icon icon-class="user1" />
      </span>
      <el-input
        ref="username"
        v-model="loginForm.username"
        placeholder="请输入账号"
        name="username"
        type="text"
        auto-complete="on"
      />
    </el-form-item>
    <div class="mistake-toast">
      <p v-show="true" class="username-toast">请输入正确的账号</p>
    </div>
    <!-- 密码 -->
    <el-form-item prop="password">
      <span class="icon-container">
        <svg-icon icon-class="lock" />
      </span>
      <el-input
        ref="password"
        v-model="loginForm.password"
        placeholder="请输入密码"
        name="password"
        auto-complete="on"
      />
    </el-form-item>
    <div class="mistake-toast">
      <p v-show="true" class="password-toast">请输入正确的密码</p>
    </div>
    <!-- //忘记密码 -->
    <div class="forget" @click="foundPwd">忘记密码？</div>
    <!-- 提交 -->
    <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">确认</el-button>
  </el-form>
</template>

<script>
/* eslint-disable */


export default {
  data() {
    return {
      loginForm: {
        username: '18224451556',
        password: '123'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: '' }],
        password: [{ required: true, trigger: 'blur', validator: '' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  methods: {
    ...mapActions(['login']),
    foundPwd() {
      this.$router.push({
        path: '/loginretripwd'
      })
    }
  }
}
</script>

<style lang="scss">
</style>
