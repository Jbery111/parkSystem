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
      <el-form :label-position="labelPosition" label-width="85px" :model="formLabelAlign" class="el-myclass">
      <el-form-item label="门岗名称:">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      
    </el-form>
    <div class="footer-class">
        <span>确认</span>
    </div>
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
        }
      ],
      labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
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
//卡片的样式
/deep/.createJobDialog .el-dialog .el-dialog--center {
  background-color: #f44 !important;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  min-height: 775px;
  position: relative;
  width: 100%;
  box-shadow: none;
  border: none;
  /deep/.el-card__header {
    border: none;
    border-bottom: none;
    padding: 20px !important;
    .el-table--striped .el-table__body tr.el-table__row--striped td {
      background-color: #eff2f5 !important;
    }
    .el-table thead {
      color: #909399 !important;
    }
    .el-table td {
      padding: 15px 0 !important;
      z-index: 222;
    }
    .el-table th {
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(144, 147, 153, 1);
    }
    /deep/.el-table .cell {
      text-overflow: ellipsis !important;
      overflow: hidden !important;
      white-space: nowrap;
      cursor: default;
      width: 400px;
      height: 30px !important;
      line-height: 30px;
      font-size: 14px;
      padding: 0 0 0 65px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      span {
        width: 100%;
        p {
          text-overflow: ellipsis !important;
          overflow: hidden !important;
          white-space: nowrap;
        }
      }
      .el-button--mini {
        width: 52px;
        height: 30px;
        background: rgba(37, 186, 217, 1);
        border-radius: 4px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        border: none;
        padding: 0px;
        line-height: 30px;
        span {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
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
  position: relative;
  top: -30px;
  height: 40px;
  width: 100%;
  .el-pagination {
    position: absolute;
    bottom: 0;
    right: 87px;
    /deep/button {
      min-width: 24px !important;
      height: 24px;
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
        outline: none;
        color: rgba(102, 102, 102, 1);

        /deep/.el-input__inner {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          display: inline-block;
          width: 40px;
          margin-left: 48px;
          height: 24px !important;
          border: 1px solid rgba(239, 242, 245, 1) !important;
          border-radius: 3px;
          outline: none;
        }
        &::before {
          content: "前往";
          color: #fff;
          font-size: 14px;
          margin-left: 4px;
          position: absolute;
          margin-top: 3px;
          text-align: center;
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
// /deep/ .el-dialog {
//   background-color: #fff;
//   margin-top: 0% !important;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   -webkit-transform: translate(-50%, -50%);
//   -moz-transform: translate(-50%, -50%);
//   min-width: 380px;
//   border-radius: 5px;
//   .el-dialog__wrapper {
//     overflow: auto;
//   }
//   .el-dialog__header {
//     padding: 12px 0 10px 16px;
//     text-align: left;
//     border-bottom: 1px solid #eff2f5;
//     font-size: 16px;
//     font-family: Microsoft YaHei;
//     font-weight: 400;
//     color: rgba(51, 51, 51, 1);
//     .el-dialog__title {
//       text-align: left;
//       font-size: 16px;
//       font-family: Microsoft YaHei;
//       font-weight: 400;
//       color: rgba(51, 51, 51, 1);
//     }

//     button {
//       position: absolute;
//       top: 14px;
//     }
//   }
//   /deep/.el-dialog__body {
//     overflow: hidden;
//     padding: 20px 50px 6px 48px !important;
   
//   }
//   .el-dialog__footer {
//     padding-top: 0px;
//     button {
//       width: 62px;
//       height: 30px;
//       line-height: 0;
//       outline: none;
//       border: none;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       margin: 0 auto;
//       background: rgba(248, 172, 89, 1);
//       border-radius: 3px;
//       font-size: 14px;
//       font-family: Microsoft YaHei;
//       font-weight: 400;
//       color: rgba(255, 254, 254, 1);
//       margin-bottom: 4px;
//     }
//   }
// }

.chen {
  /deep/.el-dialog {
    width: 500px;
    height: 188px;
    .el-dialog__header{
      text-align: left;
      height: 47px !important;
      border-bottom: 1px solid #EFF2F5;
    }
    /deep/.el-dialog__body {
    text-align: initial;
    padding: 24px 25px 25px 0px;
    .el-myclass {
      padding-left: 55px;
      height: 65px !important;
      /deep/ .el-form-item__label {
        padding: 0 24px 0 0;
      }
        /deep/.el-input__inner {
          // background-color: #f00;
          width:266px !important;
          height:32px !important;
          border:1px solid rgba(210,210,210,1) !important;
          border-radius:4px !important;
        }
      }
    }
    .footer-class {
      // background-color: #f00;
      display: flex;
      justify-content: center;
      height: 30px;
      span {
        width:72px;
        height:30px;
        border-radius:4px;
        background-color: #FCB048;
        border-color: #FCB048;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
    }
  }
}
.hongdian {
  width: 6px;
  height: 6px;
  background-color: #f00;
  border-radius: 5px;
  position: absolute;
  top: 26px;
  left: 240px;
}
/deep/.el-tree-node {
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(108, 108, 108, 1);
  .el-tree-node__label {
    font-size: 14px !important;
  }
  .el-tree-node__content {
    height: 30px !important;
  }
  .el-checkbox__inner {
    width: 20px;
    height: 20px;
  }
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #409eff;
    border-color: #409eff;
    color: #fff !important;
    cursor: default !important;
    &::after {
      color: #fff !important;
      cursor: default !important;
    }
  }
}
/deep/.el-checkbox__inner::after {
  height: 10px;
  left: 6px;
  top: 2px;
  width: 4px;
}
/deep/.el-pagination.is-background .btn-next:disabled {
  cursor: default;
}
/deep/.el-pagination.is-background .btn-prev:disabled {
  cursor: default;
}

.total-class {
  position: relative;

  .div-class {
    width: 100px;
    height: 100px;
    position: absolute;
    background: green !important;
    top: -10px;
    z-index: 25633333334444444444655555555555555555555566666666666612789;
  }
}
/deep/.el-popover {
  top: 0px !important;
  left: 10px !important;
  z-index: 56789356345554555;
}

#newadd {
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 72px;
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
/deep/.el-pagination__editor {
  background-color: #5fafe4 !important;
  height: 20px;
  width: 30px;
  color: white;
  cursor: pointer;
}
.hard-setparamClass {
  height: 100%;
}
.setparam-container {
  // height: 2000px;
  // background-color: green;
  width: 100%;
}
/deep/.el-table .cell{
  height: 30px !important;
}

</style>
