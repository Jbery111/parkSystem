<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar
          :huanying-name="huanyingName"
          :dingwei-name="dingweiName"
          @isShowTHander="isShowT3Hander"
          @isShowT4Hander="isShowT4Hander"
        />
      </div>
      <!-- 主题内容 -->
      <div class="fix-appmain">
        <app-main />
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="wy-cover">
      <!-- 遮罩一 -->
      <div>
        <el-dialog
          v-if="type === 1"
          :title="`系统将在${dueToTheTime}天后到期，为了能正常使用系统，请及时续费。`"
          :show-close="false"
          width="38%"
          top="40vh"
          :modal-append-to-body="false"
          :visible.sync="dialogVisible1"
          :close-on-click-modal="false"
        >
          <span @click="isCover1">我知道了</span>
          <br />
          <br />
        </el-dialog>
        <div v-if="type===2" class="outClass" @click="exitHandler()">直接退出</div>
      </div>
      <!-- 遮罩二 -->
      <el-dialog
        v-if="type===2"
        :modal-append-to-body="false"
        title="系统已欠费，为了能正常使用系统，请及时续费。"
        :show-close="false"
        width="38%"
        top="40vh"
        :visible.sync="dialogVisible2"
        :close-on-click-modal="false"
      >
        <span class="exit" @click="isCover2">{{ countdown + 's' }}秒后自动退出</span>
        <br />
        <br />
      </el-dialog>
      <!-- 遮罩三 -->
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        :append-to-body="true"
        center
        class="chen"
        top="40vh"
        :close-on-click-modal="false"
      >
        <div>是否退出登录?</div>
        <span slot="footer" class="dialog-footer">
          <el-button class="quxiao1" @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="logoutHandler">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 遮罩四 -->
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible2"
        :append-to-body="true"
        center
        class="chen"
        top="40vh"
        :close-on-click-modal="false"
      >
        <div>是否切换停车场?</div>
        <span slot="footer" class="dialog-footer">
          <el-button class="quxiao1" @click="centerDialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="qiehuanHandler">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { setInterval, clearInterval } from 'timers'
import { removeToken } from '@/utils/auth'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  data () {
    return {
      dialogVisible1: true,
      dialogVisible2: true,
      time: 150,
      type: 1,
      countdown: 30, // 倒计时
      centerDialogVisible: false,
      centerDialogVisible2: false,
      huanyingName: '',
      dingweiName: ''
    }
  },
  computed: {
    ...mapState(['dueToTheTime', 'userInfo']),
    sidebar () {
      return this.$store.state.app.sidebar
    },
    device () {
      return this.$store.state.app.device
    },
    fixedHeader () {
      return this.$store.state.settings.fixedHeader
    },
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    countdown: function (newVal, oldVal) {
      // this.answer = 'Waiting for you to stop typing...'
      if (newVal === 1) {
        // const Jurisd = JSON.parse(localStorage.getItem('userInfo')).Jurisdiction
        // console.log(Jurisd)
        // console.log('退出登录')
        // console.log(JSON.parse(localStorage.getItem('userInfo')))
        const userInfoData = JSON.parse(localStorage.getItem('userInfo'))
        // console.log(userInfoData)
        this.logout(userInfoData).then(() => {
          // console.log('退出退出')
        })
        const Jurisd = JSON.parse(localStorage.getItem('userInfo')).Jurisdiction
        if (Jurisd === 3) {
          removeToken()
          localStorage.removeItem('userInfo')
          localStorage.clear()
          this.$router.push('/login')
        } else {
          // TODO:退出时清空小区id
          this.$router.push('/community')
        }
      }
    }
  },
  created () {
    localStorage.setItem('isPark',true)
    this.dialogVisible = this.hasWyCover1
    // console.log(this.type)
    // console.log(this.$route)
    if (this.$route.query.Ju === '1') {
      this.type = 1
    } else if (this.$route.query.Ju === '2') {
      this.type = 2
    } else {
      this.type = ''
    }
    if (this.type === 2) {
      var timer = setInterval(() => {
        if (this.countdown === 0) {
          clearInterval(timer)
          this.countdown = 3
          this.codeLoading = false
        } else {
          this.countdown = this.countdown - 1
        }
      }, 1000)
    }
    this.huanyingName = this.userInfo.data.uname
    if (this.userInfo.Jurisdiction === 3) {
      this.dingweiName = this.userInfo.data.propertyName
      console.log(this.userInfo)
    } else {
      const items = JSON.parse(localStorage.getItem('items'))
      this.dingweiName = items.propertyName
    }
    if (!this.$store.state.permission.permissionList) {
      // 如果没有permissionList
      // console.log('opopop')
      // console.log(this.$store.state.permission.permissionList)
      this.$store.dispatch('permission/FETCH_PERMISSION')
    }
  },
  methods: {
    ...mapActions(['logout']),
    handleClickOutside () {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    isCover1 () {
      this.dialogVisible1 = !this.dialogVisible1
      // this.type === ''
      console.log(this.dialogVisible1, this.hasWyCover1, '这里是dialogVisible')
    },
    isCover2 () {
      // this.dialogVisible2 = !this.dialogVisible1
      // this.$nextTick(this.type === '')
      // this.type === ''
      // console.log(this.dialogVisible2, this.hasWyCover1, '这里是dialogVisible')
    },
    // 退出登录
    exitHandler () {
      // console.log('退出登录')
      // console.log(JSON.parse(localStorage.getItem('userInfo')))
      const userInfoData = JSON.parse(localStorage.getItem('userInfo'))
      // console.log(userInfoData)
      this.logout(userInfoData).then(() => {
        console.log('退出退出')
      })
      const Jurisd = JSON.parse(localStorage.getItem('userInfo')).Jurisdiction
      if (Jurisd === 3) {
        removeToken()
        localStorage.removeItem('userInfo')
        localStorage.clear()
        this.$router.push('/login')
      } else {
        // TODO:退出时清空小区id
        this.$router.push('/community')
      }
    },
    isShowT3Hander () {
      this.centerDialogVisible = !this.centerDialogVisible
    },
    isShowT4Hander () {
      this.centerDialogVisible2 = !this.centerDialogVisible2
    },
    // nav退出登录
    logoutHandler () {
      // const userInfoData = JSON.parse(localStorage.getItem('userInfo'))
      // console.log(userInfoData)
      this.logout(this.userInfo)
    },
    qiehuanHandler () {
      this.$router.push('/community')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
/deep/.el-dialog {
  background-color: #fff;
  margin-top: 0% !important;
  position: absolute;
  top: 50%;
  left: 50%;
  background: none;
  box-shadow: none;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  min-width: 380px;
  border-radius: 5px;
  .el-dialog__header {
    padding: 0px;
    .el-dialog__title {
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1) !important;
      color: black;
      padding: 0px;
    }
  }

  .el-dialog__body {
    border-radius: 4px;
    span {
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(254, 141, 79, 1);
      float: right;
      cursor: pointer;
    }
  }
}
.outClass {
  position: absolute;
  top: 10%;
  right: 5%;
  cursor: pointer;
  color: #ccc;
  font-family: Microsoft YaHei;
  font-weight: 400;
  z-index: 19999999999;
}
.fix-appmain {
  @include clearfix;
  position: fixed;
  height: 100%;
  width: 100%;
  margin-left: 16px;
  box-sizing: border-box;
  // z-index: 100000;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: relative;
  top: 0;
  right: 0;
  z-index: 9;
  // width: calc(100% - #{$sideBarWidth});
  width: 100%;
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
  width: 100%;
}

.hideSidebar .app-main {
  height: 93.5%;
  margin-right: 86px;
}
.mobile .fixed-header {
  width: 100%;
}

//切换小区弹框//
.chen {
  /deep/.el-dialog {
    background-color: #fff !important;
    width: 18.23%;
    height: 210px;
    .el-dialog__header {
      padding: 12px 0 10px 16px;
      text-align: left;
      border-bottom: 1px solid #eff2f5;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      .el-dialog__title {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1) !important;
      }

      button {
        position: absolute;
        top: 14px;
      }
    }
    .el-dialog--center {
      text-align: left;
    }
    .el-dialog__body {
      background-color: #fff;
      height: 110px !important;
      width: 100%;
      position: relative;

      div {
        width: 100%;
        height: 110px;
        line-height: 68px;
        font-size: 16px;
        text-align: center;
      }
    }
    .el-dialog__footer {
      position: absolute;
      padding-top: 0 !important;
      width: 100%;
      display: flex;
      justify-content: center;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      span {
        width: 100%;
        display: flex;
        justify-content: space-around;
        button {
          width: 72px;
          height: 30px;
          line-height: 0px;
          font-size: 14px;
          border-radius: 3px !important;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 254, 254, 1);
          border: 1px solid #25bad9;
        }
      }
      .quxiao1 {
        color: rgba(153, 153, 153, 1);
        background-color: #fff;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 3px;
      }
    }
    .el button {
      color: #999999 !important;
    }
    .el-button--primary {
      color: #ffffff;
      background-color: #25bad9;
    }
  }
}
</style>
