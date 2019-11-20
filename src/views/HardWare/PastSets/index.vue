<template>
  <div class="hard-setparamClass">
    <div class="setparam-container">
      <el-card class="box-card">
        <span id="newadd" @click="addDoor">新增门岗</span>
        <el-table :data="tableData" style="width: 100%" empty-text="暂无数据">
          <el-table-column prop="uname" label="门岗名称" min-width="150" />
          <el-table-column prop="ucphone" label="摄像头名称" min-width="150" />
          <el-table-column prop="ucphone" label="当前收费员" min-width="150" />
        </el-table>
      </el-card>
      <!-- 分页 -->
      <div class="block">
        <p class="record-data">共{{ pageNums }}页 共{{ totalPage }}条</p>
        <el-pagination
          background
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="totalPage"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 遮罩三 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible1"
      :append-to-body="true"
      center
      class="chen"
      top="35vh"
      :close-on-click-modal="false"
    >
      <!-- <p>提示</p> -->
      <div style="font-size:16px;">是否删除该条数据?</div>
      <span slot="footer" class="dialog-footer">
        <el-button class="quxiao1" style="font-size:14px;" @click="centerDialogVisible1 = false">取 消</el-button>
        <el-button type="primary" style="font-size:14px;" @click="deleteQuerenHandler">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// data数据
export default {
  components: {},
  data() {
    return {
      centerDialogVisible1: false, // 新增门岗
      tableData: [
        {
          uname: 'chen',
          ucphone: '45454545'
        },
        {
          uname: 'chen',
          ucphone: '45454545'
        },
        {
          uname: 'chen',
          ucphone: '45454545'
        },
        {
          uname: 'chen',
          ucphone: '45454545'
        },
        {
          uname: 'chen',
          ucphone: '45454545'
        },
        {
          uname: 'chen',
          ucphone: '45454545'
        },
        {
          uname: 'chen',
          ucphone: '45454545'
        },
        {
          uname: 'chen',
          ucphone: '45454545'
        },
        {
          uname: 'chen',
          ucphone: '45454545'
        },
        {
          uname: 'chen',
          ucphone: '45454545'
        },
        {
          uname: 'chen',
          ucphone: '45454545'
        },
        {
          uname: 'chen',
          ucphone: '45454545'
        },
        {
          uname: 'chen',
          ucphone: '45454545'
        },
        {
          uname: 'chen',
          ucphone: '45454545'
        },
        {
          uname: 'chen',
          ucphone: '45454545'
        },
        {
          uname: 'chen',
          ucphone: '45454545'
        }
      ]
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
    addDoor() {
      // alert('新增门岗')
      this.centerDialogVisible1 = true
    }
  }
}
</script>
<style lang="scss" scoped>
//折叠样式
/deep/.demo-table-expand {
  font-size: 0;
  margin: 8px 0 8px 58px;
}
/deep/.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
/deep/.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  height: 40px !important;
}
//卡片的样式
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix {
  span {
    display: inline-block;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f00;
    color: #fff;
    width: 57px;
    height: 23px;
    background: rgba(37, 186, 217, 1);
    border-radius: 4px;
    font-size: 10px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
}
.box-card {
  min-height: 510px;
  position: relative;
  width: 100%;
  box-shadow: none;
  border: none;
  /deep/.el-card__header {
    border: none;
    border-bottom: none;
    .el-table--striped .el-table__body tr.el-table__row--striped td {
      background-color: #eff2f5;
    }
    .el-table th {
      font-size: 10px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(144, 147, 153, 1);
    }
    .el-table .cell {
      padding: 0px 0px 0px 65px;
      margin: 0px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(96, 98, 102, 1);
      /deep/.el-button {
        background: rgba(37, 186, 217, 1) !important;
        border-radius: 3px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        border: none;
        padding: 0px;
        span {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      .dongjie {
        color: #606266;
        background-color: #fff;
      }
      .notdongjie {
        color: #606266;
      }
      .el-btn2 {
        background-color: #bfbfbf;
      }
    }
  }
}
//表格行样式
.tableRowStyle {
  color: #f00 !important;
  background: #f00 !important;
}
.page {
  position: absolute;
  bottom: 70px;
  right: 4px;
  font-size: 10px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
//分页器的样式
//分页器的样式
.block {
  .record-data {
    cursor: default;
    display: inline-block;
    line-height: 11px;
    padding-left: 20px;
    margin-top: 15px;
    position: absolute;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  // position: absolute;
  // bottom: 80px;
  height: 40px;
  width: 100%;
  .el-pagination {
    position: absolute;
    bottom: 0px;
    right: 87px;
    /deep/button {
      min-width: 24px !important;
      height: 24px;
      cursor: default;
    }
    /deep/.el-pagination__jump {
      position: relative;
      margin-left: 0px;
      color: #fff;
      font-size: 0px;
      //input和ul是否居中
      margin-top: 0px;

      .el-input {
        font-family: Microsoft YaHei;
        font-weight: 400;
        height: 24px;
        width: 40px;
        margin-left: 5px;
        border-radius: 3px;
        color: rgba(102, 102, 102, 1);
        outline: none;
        /deep/.el-input__inner {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          display: inline-block;
          margin-left: 48px;
          width: 40px;
          height: 24px !important;
          border: 1px solid rgba(239, 242, 245, 1) !important;
          border-radius: 3px;
          outline: none;
        }
        &::before {
          content: "前往";
          color: #fff;
          font-size: 14px;
          display: inline-block;
          position: absolute;
          margin-left: 4px;
          text-align: center;
          margin-top: 3px;
          height: 24px;
        }
        &:after {
          content: "页";
          padding-left: 10px !important;
          font-size: 14px;
          position: absolute;
          top: 3px;
        }
      }
    }
    /deep/.el-pager li {
      min-width: 24px;
      height: 24px;
      border-radius: 3px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 24px;
    }
  }
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #5fafe4;
    color: rgba(255, 255, 255, 1);
  }
}

/deep/.el-pagination.is-background .btn-prev:disabled {
  cursor: default;
}
/deep/.el-pagination__editor {
  background-color: #5fafe4 !important;
  height: 20px;
  width: 30px;
  color: white;
  cursor: pointer;
}
/deep/ .demo-table-expand .el-form-item {
  width: 30% !important;
}
#newadd {
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 86px;
  min-height: 30px;
  line-height: 30px;
  background: rgba(37, 186, 217, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.newAdd {
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f00;
  color: #fff;
  width: 93px;
  height: 30px;
  line-height: 30px;
  background: rgba(37, 186, 217, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
/deep/.el-dialog--center .el-dialog__body {
  padding: 0px 35px 0px 54px !important;
}
.demo-ruleForm1 {
  width: 100%;
  .el-row {
    margin-bottom: 0;
    &:last-child {
      margin-bottom: 0;
      .el-col-8 {
        width: 28.8% !important;
      }
    }
  }
  .el-col {
    border-radius: 4px;
    margin-top: 10px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  // 新增大门表单样式
  .el-form-item {
    margin-bottom: 0;
    height: 48px !important;
  }
  .el-input {
    /deep/input {
      min-width: 220px;
      height: 21px;
      border: 1px solid rgba(210, 210, 210, 1) !important;
      border-radius: 4px;
    }
  }
  .submit-class {
    button {
      background: rgba(248, 172, 89, 1);
      border-radius: 4px;
      border-color: rgba(248, 172, 89, 1);
      width: 51px;
      height: 25px;
      padding: 0px;
    }
  }
  /deep/.el-input__suffix {
    display: none;
  }
  /deep/ .el-form-item__error {
    top: 83% !important;
  }
}
.chen {
  /deep/.el-dialog {
    background-color: #fff !important;
    width: 350px;
    min-height: 210px;
    border-radius: 4px;

    .el-dialog__header {
      padding: 10px 0 7px 20px;
      text-align: left;
      border-bottom: 1px solid #eff2f5;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      .el-dialog__title {
        text-align: left;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      // /deep/.el-dialog__headerbtn {
      //   top: 17px !important;
      // }
      button {
        position: absolute;
        top: 10px;
        .el-dialog__close {
          // background: #f00;
          top: 5px !important;
        }
      }
    }
    .el-dialog--center {
      text-align: left;
    }
    .el-dialog__body {
      background-color: #fff;
      height: 110px !important;
      width: 100%;
      padding: 47px 0 50px 0 !important;
      position: relative;

      div {
        width: 100%;
        height: 110px;
        text-align: center;
      }
    }
    .el-dialog__footer {
      position: absolute;
      top: 145px;
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
          width: 80px;
          height: 31px;
          line-height: 0.36vh;
          font-size: 16px;
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
    .elbutton {
      color: #999999 !important;
    }
    /deep/ .el-button--primary {
      color: #ffffff;
      background-color: #25bad9 !important;
      border-color: #25bad9 !important;
    }
  }
}
//搜索框样式
.serach-box {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 180px;
  height: 30px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(191, 191, 191, 1);
  border-radius: 3px;
  display: flex;
  input {
    float: left;
    width: 155px;
    background: rgba(255, 255, 255, 1);
    border-right: none;
    outline: none;
    flex: 7;
    padding-left: 7px;
    border: none;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    &::-webkit-input-placeholder {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    &::-moz-placeholder {
      font-size: 10px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
  .serach {
    float: right;
    flex: 1;
    font-size: 14px;
    border-left: none;
    background: rgba(191, 191, 191, 1);
    text-align: center;
    line-height: 28px;
    padding: 0 3px;
    cursor: pointer;
  }
}
.el-table {
  display: relative;
  overflow: inherit;
}
.entry-table-class {
  overflow-x: hidden !important;
  border-bottom: none !important;
  top: 12px;
  min-width: 940px;
}
/deep/.entry-table-class td {
  padding: 15px 0px !important;
}
.gatename-mistacktoast {
  color: red;
  width: auto;
  position: absolute;
  height: 20px;
  left: 120px;
  top: 28px;
  line-height: 35px;
  display: inline-block;
}
.mistack-toast {
  position: absolute;
  top: 3px;
  text-align: center;
  color: red;
  width: 260px;
  height: 20px;
}
/deep/ .demo-table-expand .el-form-item {
  width: 100% !important;
}

.add-class {
  /deep/.el-dialog {
    position: absolute;
    margin: 0 !important;
    left: 50%;
    top: 50%;
    border-radius: 4px;
    transform: translateX(-50%) translateY(-50%);
    display: inline-block;
    max-width: 1150px;
    height: 665px;
    width: auto;
    .el-dialog__title {
      font-size: 16px;
    }
    /deep/ .el-input__inner {
      // background-color: #f00 !important;
      height: 32px !important;
      border-radius: 4px !important;
    }
  }
}
/deep/.el-dialog__header {
  padding: 1.2vh 0px 0.8vh 20px;
  text-align: left;
  border-bottom: 1px solid #eff2f5;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333;
}
/deep/.el-dialog__body {
  display: inline-block;
}
.div-row {
  width: 300px;
  height: 47px;
}
.div-row1 {
  display: inline-block;
  margin-top: 14px;

  .flexBox {
    display: flex;
  }
  ul {
    justify-content: flex-start;
    box-sizing: border-box;
    padding-right: 20px;
  }
}

/deep/.demo-ruleForm1 {
  position: relative;
  padding-bottom: 50px;
  margin-top: 20px;
}
.btn-confirm {
  position: relative;
  bottom: 24px;
  border-radius: 3px;
  top: 30px;
  left: 50%;
  background: #f8ac59;
  border-color: #f8ac59;
  min-width: 72px;
  font-size: 14px;
  height: 30px;
  line-height: 0px;
  transform: translateX(-50%);
}
/deep/.el-dialog__close {
  color: #909399;
  position: absolute;
  top: -7px;
  right: 0px;
}
/deep/.el-dialog__title {
  cursor: default;
}
.modify-class {
  /deep/.el-dialog {
    // background-color: #f00 !important;
    height: 420px;
  }
}
.hard-setparamClass {
  height: 550px;
  overflow: auto;
}
.setparam-container {
  // height: 2000px;
  // background-color: green;
  width: 100%;
  position: relative;
}
</style>
