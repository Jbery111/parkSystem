<template>
  <div>
    <!--   -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-table :data="tableData" style="width: 100%" empty-text="没有数据">
          <el-table-column prop="uname" label="姓名" min-width="65" />
          <el-table-column prop="ucphone" label="旧账号" min-width="65" />
          <el-table-column prop="username" label="新账号" min-width="65" />
          <!-- 当前状态 -->
          <el-table-column label="当前状态" min-width="65">
            <template slot-scope="scope">
              <p>{{ tableData[scope.$index].type }}</p>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleTongyi(scope.$index, scope.row)">同意</el-button>
              <el-button
                class="el-btn2"
                size="mini"
                type="danger"
                @click="handleJujue(scope.$index, scope.row)"
              >拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="block">
        <p class="record-data">共{{ pageNums }}页 共{{ totalPage }}条</p>
        <el-pagination
          background
          :page-size="listNum"
          layout="prev, pager, next, jumper"
          :total="totalPage"
        />
      </div>-->
    </el-card>
    <p v-if="hongShow" class="hongdian" />
    <!-- 分页 -->
    <div class="block">
      <p class="record-data">共{{ pageNums }}页 共{{ totalPage }}条</p>
      <el-pagination
        background
        :page-size="listNum"
        layout="prev, pager, next, jumper"
        :total="totalPage"
        hide-on-single-page
      />
    </div>
    <!-- 删除遮罩层 -->
    <!-- 遮罩三 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible1"
      :append-to-body="true"
      center
      class="chen"
      top="40vh"
      :close-on-click-modal="false"
    >
      <!-- <p>提示</p> -->
      <div>同意修改账号?</div>
      <span slot="footer" class="dialog-footer">
        <el-button class="quxiao1" @click="centerDialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="querenHandler">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 遮罩四 -->
    <!-- 遮罩三 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible2"
      :append-to-body="true"
      center
      class="chen"
      top="40vh"
      :close-on-click-modal="false"
    >
      <!-- <p>提示</p> -->
      <div>拒绝修改账号?</div>
      <span slot="footer" class="dialog-footer">
        <el-button class="quxiao1" @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="querenHandler1">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInfo } from '@/utils/auth'
import { Message } from 'element-ui'
import { postToexamine, postTongyi, postJujue } from '@/api/Jurisdiction'
export default {
  name: 'AccountAudit',
  data() {
    return {
      dongjieClass: 'dongjie',
      // tableData: [{
      //   uname: '', // 姓名
      //   ucphone: '', // 旧账号
      //   username: '', // 新账号
      //   type: null // 状态
      // }],
      tableData: [],
      muid: null,
      value: false,
      centerDialogVisible1: false,
      centerDialogVisible2: false,
      currentState: '',
      ishowAdd: true,
      hongShow: false,
      totalPage: null, // 总条数
      listNum: null,
      currentPage: 1, // 当前页数
      pageNums: null// 总页数
    }
  },
  computed: {
    // 存在本地的用户信息
    userInfoData() {
      return JSON.parse(getInfo())
    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    tableData: function(newQuestion, oldQuestion) {
      if (newQuestion.length === 0) {
        this.hongShow = false
      }
    }
  },
  created() {
    const { Communityid, sition } = this.userInfoData.data
    // console.log({ Communityid, sition }, '5555555')
    postToexamine({ Communityid, sition }).then(resp => {
      if (resp.msg.data.length) {
        console.log(resp.msg, '65')
        this.hongShow = true
      }
      if (resp.msg.data) {
        this.listNum = resp.msg.listRows
        this.totalPage = resp.msg.total
        this.pageNums = resp.msg.pageNum
        this.tableData = resp.msg.data
      }
      this.tableData.forEach(item => {
        if (item.type === 3) {
          item.type = '申请修改账号并初始化密码'
        } else if (item.type === 2) {
          item.type = '已重置'
        } else {
          item.type = '未重置'
        }
        console.log(item.type, '81')
        return item
      })
    })
  },
  methods: {
    handleTongyi(index, row) {
      // console.log(index, row)
      this.muid = row.uid
      this.centerDialogVisible1 = true
    },
    querenHandler() {
      const uid = this.muid
      postTongyi({ uid }).then(resp => {
        console.log(resp, '103')
        // if (resp.code === 200) {
        //   this.centerDialogVisible1 = false
        // }
        Message(resp.msg)
        this.centerDialogVisible1 = false
        const { Communityid, sition } = this.userInfoData.data
        // console.log({ Communityid, sition }, '5555555')
        postToexamine({ Communityid, sition }).then(resp => {
          console.log(resp.msg, '65')
          if (resp.msg.data) {
            this.hongShow = true
            this.listNum = resp.msg.listRows
            this.totalPage = resp.msg.total
            this.pageNums = resp.msg.pageNum
            this.tableData = resp.msg.data
          }
          this.tableData.forEach(item => {
            if (item.type === 3) {
              item.type = '申请修改账号并初始化密码'
            } else if (item.type === 2) {
              item.type = '已重置'
            } else {
              item.type = '未重置'
            }
            console.log(item.type, '81')
            return item
          })
        })
      })
    },
    handleJujue(index, row) {
      console.log(index, row)
      this.muid = row.uid
      this.centerDialogVisible2 = true
    },
    querenHandler1() {
      const uid = this.muid
      postJujue({ uid }).then(resp => {
        console.log(resp, '103')
        // if (resp.code === 200) {
        //   this.centerDialogVisible1 = false
        // }
        Message(resp.msg)
        this.centerDialogVisible2 = false
        const { Communityid, sition } = this.userInfoData.data
        // console.log({ Communityid, sition }, '5555555')
        postToexamine({ Communityid, sition }).then(resp => {
          console.log(resp.msg, '65')
          if (resp.msg.data) {
            this.hongShow = true
            this.listNum = resp.msg.listRows
            this.totalPage = resp.msg.total
            this.pageNums = resp.msg.pageNum
            this.tableData = resp.msg.data
          }
          this.tableData.forEach(item => {
            if (item.type === 3) {
              item.type = '申请重置'
            } else if (item.type === 2) {
              item.type = '已重置'
            } else {
              item.type = '未重置'
            }
            console.log(item.type, '81')
            return item
          })
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
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
    // line-height: 50px;
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
  min-height: 550px;
  position: relative;
  width: 100%;
  box-shadow: none;
  border: none;
  /deep/.el-card__header {
    border: none;
    border-bottom: none;
    padding: 21px !important;
    .el-table--striped .el-table__body tr.el-table__row--striped td {
      background-color: #eff2f5;
    }
    .el-table td {
      padding: 8px 12px 8px 0px;
    }
    .el-table th {
      // padding: 14px 55px !important;
      font-size: 10px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(144, 147, 153, 1);
    }
    .el-table .cell {
      // background-color: #f00;
      padding: 0px 0px 0px 65px;
      height: 3.7vh !important;
      line-height: 3.7vh;
      margin: 0px;
      font-size: 0.75vw;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(96, 98, 102, 1);
      .el-button--mini {
        width: 2.82vw;
        height: 3.4vh;
        background: rgba(37, 186, 217, 1);
        border-radius: 3px;
        font-size: 0.75vw;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        border: none;
        padding: 0px;
        line-height: 3.4vh;
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
    height: 20px;
    width: 1000px;
    // background-color: green;
    // float: right;
    padding-left: 4.5vw;
    margin-top: 15px;
    position: absolute;
    font-size: 0.8vw;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  position: absolute;
  margin-right: 1.4vw;
  // bottom: 100px;
  top: 85vh;
  // left: -2vw;
  right: 2vw;
  height: 40px;
  width: 100%;
  // padding-left: 90px;
  .el-pagination {
    // background-color: green;
    position: absolute;
    bottom: 0;
    right: 3.3vw;
    height: 2.8vh !important;
    margin-right: -1.9vw !important;
    /deep/button {
      // background-color: #f00 !important;
      min-width: 1.6vw !important;
      height: 2.8vh;
    }
    /deep/.el-pagination__jump {
      // background-color: #f00;
      position: relative;
      margin-left: 0px;
      color: #fff;
      font-size: 0px;
      //input和ul是否居中
      margin-top: 0px;
      // &::before {
      //   content: "前往";
      //   color: #000;
      // }
      .el-input {
        // border: 1px solid;
        font-family: Microsoft YaHei;
        font-weight: 400;
        height: 2.8vh;
        min-width: 2.5vw;
        color: rgba(102, 102, 102, 1);
        outline: none;
        /deep/.el-input__inner {
          font-size: 10px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          display: inline-block;
          // background-color: #f00 !important;
          // border: 1px solid !important;
          width: 44px;
          height: 2.8vh !important;
          border: 1px solid rgba(239, 242, 245, 1) !important;
          border-radius: 2px;
          // margin-left: 12px;
          outline: none;
        }
        &::before {
          content: "前往";
          color: #fff;
          font-size: 0.8vw;
          margin-left: 0.35vw;
          margin-right: 0.95vw;
          margin-top: 0.1vh !important;
          text-align: center;
        }
        &:after {
          content: "页";
          padding-left: 0.5vw !important;
          font-size: 0.8vw;
        }
      }
    }
    /deep/.el-pager li {
      min-width: 1.6vw;
      height: 2.8vh;
      border-radius: 2px;
      font-size: 10px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 2.8vh;
    }
  }
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #5fafe4;
    color: rgba(255, 255, 255, 1);
  }
}
//红点样式
.hongdian {
  width: 8px;
  height: 8px;
  background-color: #f00;
  border-radius: 5px;
  position: absolute;
  top: 2.9vh;
  left: 15.3vw;
}
.chen {
  /deep/.el-dialog {
    background-color: #fff !important;
    width: 18.2vw;
    height: 22vh;
    border-radius: 0.2vw;
    // background-color: #fff;
    // z-index: 888888888888888888888888888;
    // .el-dialog__header {
    //   button {
    //     z-index: 19999;
    //   }
    // }
    .el-dialog__header {
      padding: 1.3vh 0px 1vh 1.02vw;
      // padding: 2.2vh 0px 1.2vh 0px;
      // margin: 0px 1.02vw;
      text-align: left;
      border-bottom: 1px solid #eff2f5;
      font-size: 0.87vw;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      .el-dialog__title {
        text-align: left;
        border-bottom: 1px solid #eff2f5;
        font-size: 0.95vw;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      // /deep/.el-dialog__headerbtn {
      //   top: 3vh !important;
      // }
      button {
        position: absolute;
        top: 1.4vh;
      }
    }
    .el-dialog--center {
      text-align: left;
    }
    .el-dialog__body {
      background-color: #fff;
      height: 110px !important;
      width: 100%;
      padding: 2.8vh 0 21px 0 !important;
      position: relative;
      // p {
      //   width: 100%;
      //   border-bottom: 1px solid #eff2f5;
      //   position: absolute;
      //   top: 1.8vh;
      //   right: 0px;
      //   // padding-left: 14px !important;
      //   padding-bottom: 0.92vh;
      //   color: #333333;
      //   font-size: 0.95vw;
      //   // float: left;
      //   text-align: left;
      // }
      div {
        width: 100%;
        height: 110px;
        line-height: 5.2vh;
        font-size: 0.85vw;
        text-align: center;
      }
    }
    .el-dialog__footer {
      position: absolute;
      top: 15.7vh;
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 0.75vw;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      span {
        width: 100%;
        display: flex;
        justify-content: space-around;
        button {
          width: 4vw;
          height: 3.5vh;
          line-height: 0.36vh;
          font-size: 0.8vw;
          border-radius: 3px !important;
          font-size: 0.8vw;
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
      background-color: #25bad9;
    }
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
  margin-left: 0.25vw;
}
</style>
