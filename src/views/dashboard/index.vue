<template>
  <div class="wy-homepage">
    <!-- 删除遮罩层 -->
    <!-- 遮罩三 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible4"
      :append-to-body="true"
      center
      class="chen"
      top="40vh"
      :close-on-click-modal="false"
    >
      <!-- <p>提示</p> -->
      <div>请设置停车场参数!</div>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-loading="loading"
          type="primary"
          element-loading-spinner="el-icon-loading"
          @click="cc"
        >确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      centerDialogVisible4: false
    }
  },
  created () {
    localStorage.setItem('setParamState', 2)
    const dashNumber = localStorage.getItem('dashCreate')
    const isSetParams = JSON.parse(localStorage.getItem('items')).state_type
    console.log(typeof (isSetParams), 'isisiisisisi')
    if (dashNumber === '2') {
      this.centerDialogVisible4 = false
    } else if (isSetParams === 1 && dashNumber === '1') {
      this.centerDialogVisible4 = true
    }
  },
  methods: {
    cc () {
      console.log('vv')
      localStorage.setItem('dashCreate', 2)
      this.centerDialogVisible4 = false
      this.$router.push('/hardware/SetParamss')
    }
  }
}
</script>

<style lang="scss" scoped>
.wy-homepage {
  background-color: #cdcdcd;
  height: 100%;
  padding-bottom: 20px;
  padding-right: 46px;
  padding-left: 30px;
  padding-top: 30px;
}
//删除
.chen {
  /deep/.el-dialog {
    background-color: #fff !important;
    width: 18.23%;
    height: 210px;
    /deep/.el-dialog__header {
      border-bottom: 1px solid #eff2f5;
      .el-dialog__title {
        border-bottom: none;
        font-size: 16px;
      }
      button {
        z-index: 19999;
      }
    }
    .el-dialog--center {
      text-align: left;
    }
    .el-dialog__body {
      background-color: #fff;
      height: 110px !important;
      position: relative;
      div {
        width: 100%;
        height: 110px;
        line-height: 78px;
        margin-left: 8px;
        font-size: 16px;
        text-align: center;
      }
    }
    .el-dialog__footer {
      position: absolute;
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
          font-size: 14px;
          border-radius: 3px !important;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 254, 254, 1);
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
      background-color: #fcb048ff;
      border: none;
    }
  }
}
</style>
