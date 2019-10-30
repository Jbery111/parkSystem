<template>
  <div id="enterprise-info" class="infor-warp">
    <div slot="header" class="clearfix">
      <div class="box-header-right">
        <span class="add-btn" @click="exitBefore">返回上一级</span>
        <span class="add-btn add-btn2" @click="addUser">添加住户</span>
        <span class="add-btn">导入住户</span>
      </div>
      <div class="box-header-left">历史住户</div>
    </div>
    <!-- <div class="noInfo" v-if="!isShowCard">
      目前还没有相关数据!!
    </div>-->
    <el-card class="list-card" shadow="never">
      <!-- 企业列表 -->
      <el-table
        empty-text="暂无数据"
        :data="tableData"
        row-class-name="myRow"
        cell-class-name="myCell"
        style="width: 100%; height:100%;"
      >
        <el-table-column prop="housenumber" label="房屋编号" min-width="120" />
        <el-table-column prop="username" label="住户姓名" min-width="120" />
        <el-table-column prop="phone" label="联系电话" min-width="200" />
        <el-table-column prop="type" label="住户身份" min-width="100" />
        <el-table-column prop="conet" label="备注" min-width="250" class="note" />
        <el-table-column label="操作" min-width="400" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-modify"
              @click="handleModifyClick(scope.row)"
            >修改</el-button>
            <el-button
              size="small"
              class="operateBtn btn-licence"
              @click="handleDetailClick(scope.row)"
            >查看详情</el-button>
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-modify"
              @click="handleFaceClick(scope.row)"
            >人脸录入</el-button>
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-record"
              @click="handleExchangeClick(scope.row)"
            >变更</el-button>
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-record"
              @click="handleRecordClick(scope.row)"
            >操作记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加住户 -->
    <el-dialog
      title="添加住户"
      custom-class="myAddForm"
      class="position:fixed;top:10px;"
      :append-to-body="true"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="form" :model="addData" label-width="100px">
        <el-form-item label="房屋编号:">
          <el-input v-model="addData.housenumber" disabled />
        </el-form-item>
        <span class="tips" />
        <el-form-item label="住户姓名:">
          <el-input v-model="addData.name" />
        </el-form-item>
        <span class="tips" />
        <!-- 不会变动的联系方式 -->
        <!-- <el-form-item label="联系方式:">
          <el-input />
        </el-form-item>-->
        <!-- <span class="tips">请输入公司名称</span> -->
        <!-- 联系方式box -->
        <section v-for="(value, index) in contactData" :key="index">
          <!-- 联系方式加 -->
          <section v-if="index === 0">
            <el-form-item label="联系方式:" class="connect-class">
              <el-input v-model="contactData[index]" />
              <i class="el-icon-plus" @click="addlastitems(index)" />
            </el-form-item>
            <span :ref="`contactData${index}`" class="tips">请输入正确的手机号码</span>
          </section>
          <!-- 联系方式减(添加的子项目) -->
          <section v-if="index > 0">
            <el-form-item label="联系方式:" class="connect-class">
              <el-input v-model="contactData[index]" />
              <i class="el-icon-close" @click="rmlastitems(index)" />
            </el-form-item>
            <span :ref="`contactData${index}`" class="tips">请输入正确的手机号码</span>
          </section>
        </section>
        <!-- 身份证号 -->
        <el-form-item label="身份证号:">
          <el-input v-model="addData.identity" />
        </el-form-item>
        <span ref="phoneNum" class="tips">请输入联系电话</span>
        <el-form-item label="工作单位:">
          <el-input v-model="addData.Workunit" />
        </el-form-item>
        <span ref="phoneNum" class="tips">请输入联系电话</span>
        <el-form-item label="选择类别:">
          <el-radio-group v-model="radio" @change="radioHandler">
            <el-radio :label="1">房主</el-radio>
            <el-radio :label="2">家属</el-radio>
            <el-radio :label="3">租户</el-radio>
          </el-radio-group>
        </el-form-item>
        <span ref="phoneNum" class="tips">请输入联系电话</span>
        <el-form-item label="是否是党员:">
          <el-radio-group v-model="radio1" @change="radioHandler1">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <span ref="phoneNum" class="tips">请输入联系电话</span>
        <!-- 备注 -->
        <el-form-item label="备注:" style="height:125px !important;margin-top:20px;">
          <el-input v-model="addData.conet" style="resize:none;" type="textarea" />
        </el-form-item>

        <div class="addNow" @click="submitHandler">确认添加</div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
// import { Message } from 'element-ui'
import { postHouseholdSelect } from '@/api/residerInfo'
import { getInfo } from '@/utils/auth'
export default {
  name: 'ResidentInfo',
  props: ['houseid', 'housenumber'],
  // data数据
  data() {
    return {
      radio: null,
      radio1: null,
      contactData: [''],
      rightConct: [],
      dialogFormVisible: false, // 添加住户dialog
      // 查询企业信息
      tableData: [
        {
          id: 4, // 住户主键id
          username: '李梦莹', // 住户名字
          phone: '18981275447, 15183994119', // 住户电话
          Houseid: 1, // 房屋主键id
          Communityid: 15, // 小区id
          type: 1, // 1为户主2为家属3为租客
          time: '2019-04-15 10:55:58', // 添加修改时间
          state: 1, // 1为未对比2为已对比(app用户对比用)
          userid: null, // app用户id
          Workunit: null, // 工作单位
          identity: null, // 身份证号
          zt: 1, // 1为正常2为注销
          conet: null, // 备注
          dang: 2, // 1是党员2不是党员
          uname: null, // 操作人
          ip: null, // ip地址
          img: null, // 人脸图片
          picture: '', // 身份证图片
          housenumber: '1111' // 房屋编号
        }
      ],

      addData: {
        housenumber: '', // 房屋编号
        name: '', // 住户姓名
        phone: '', // 住户电话
        identity: '', // 住户身份证号
        Workunit: '', // 住户工作单位
        type: '',
        dang: '',
        conet: ''
      },
      userInfoData: {},
      // 验证输入是否正确
      inputData: {
        Companyname: true,
        Companyaddress: true,
        phonename: true,
        phone: true,
        phone1: true
      },
      phoneToast: ['']
    }
  },
  // watch: {
  //   // 如果 `question` 发生改变，这个函数就会运行
  //   question: function (newQuestion, oldQuestion) {
  //     this.answer = 'Waiting for you to stop typing...'
  //     this.debouncedGetAnswer()
  //   }
  // },
  created() {
    console.log(this.houseid, this.housenumber, 'housei222d')
    console.log('2224422')
    // 拉取用户信息
    const userInfo = JSON.parse(getInfo())
    // console.log(userInfo, '用户信息的信息')
    this.userInfoData = userInfo.data
    const { Communityid } = this.userInfoData
    const Houseid = this.houseid
    postHouseholdSelect({ Communityid, Houseid }).then(resp => {
      console.log(resp, '191')
    })
  },
  methods: {
    // 添加房屋里的添加联系方式
    addlastitems(index) {
      // // 验证手机号码
      // if (this.contactData.length) {
      //   this.contactData.forEach((item, index) => {
      //     // console.log(item, 'hahah')
      //     // 循环验证
      //     if ((/^1[3456789]\d{9}$/.test(item))) {
      //       console.log('手机号码正确')
      //       this.contactData.push('')
      //       this.phoneToast.push('')
      //       this.inputData.phone = true
      //       this.phoneToast[index] = ''
      //       // this.$refs.phoneNum.innerHTML="手机号码正确"
      //       // this.inputData.phone = true
      //     } else {
      //       this.inputData.phone = false
      //       this.phoneToast[index] = '请输入正确的手机号码'
      //       // setTimeout(() => {
      //       //   this.centerDialogVisible1 = false
      //       // }, 2000)
      //       console.log('手机号码cuowu', this.phoneToast)
      //       // this.$refs.phoneNum.innerHTML = '请输入正确的手机号码'
      //     }
      //   })
      // }

      //   // console.log(this.$refs.phoneNum)
      // } else {
      //   this.inputData.phone = false
      // }
      // if (type === '1') {
      //   // const lastItem = this.contactData[this.contactData.length - 1]
      //   // if (lastItem.trim() === '') {
      //   //   Message('请您填写完一项后继续追加')
      //   // } else {
      this.contactData.push('')
      this.phoneToast.push('')
      //   // }
      // }
    },
    // 添加房屋里的删除联系方式
    rmlastitems(index) {
      this.contactData.splice(index, 1)
      this.phoneToast.splice(index, 1)
    },
    // 返回上一级
    exitBefore() {
      this.$emit('isShowHouse')
    },
    // 点击添加住户
    addUser() {
      this.addData.housenumber = this.housenumber
      this.radio1 = null
      this.radio = null
      this.dialogFormVisible = !this.dialogFormVisible
    },
    // 点击选择类别：
    radioHandler() {
      console.log(this.radio, 'this.radio')
    },
    // 点击选择类别：
    radioHandler1() {
      console.log(this.radio1, 'this.radio')
    },
    // 点击修改
    handleModifyClick(row) {
      console.log(row)
      alert('修改')
    },
    // 点击查看详情
    handleDetailClick(row) {
      alert('查看详情')
      console.log(row)
    },
    // 点击人脸录入
    handleFaceClick(row) {
      alert('人脸录入')
      console.log(row)
    },
    // 点击变更
    handleExchangeClick(row) {
      alert('变更')
      console.log(row)
    },
    // 点击操作记录
    handleRecordClick(row) {
      alert('操作记录')
      console.log(row)
    },
    // 点击添加房屋遮罩层的确认添加
    submitHandler() {
      if (this.contactData.length) {
        // 循环验证
        this.contactData.forEach((item, index) => {
          if (index) {
            // 如果为添加的项目，则为空时不提示，有内容且填错才提示
            if (item === '') {
              this.$refs[`contactData${index}`][0].style.color = ''
            } else {
              if ((/^1[3456789]\d{9}$/.test(item))) {
                this.$refs[`contactData${index}`][0].style.color = ''
                this.rightConct.push(item)
              } else {
                this.$refs[`contactData${index}`][0].style.color = 'red'
                console.log(this.$refs[`contactData${index}`][0])
                setTimeout(() => {
                  this.$refs[`contactData${index}`][0].style.color = ''
                }, 2000)
              }
            }
          } else {
            // 如果为第一项
            if ((/^1[3456789]\d{9}$/.test(item))) {
              this.$refs[`contactData${index}`][0].style.color = ''
            } else {
              this.$refs[`contactData${index}`][0].style.color = 'red'
              console.log(this.$refs[`contactData${index}`][0])
              setTimeout(() => {
                this.$refs[`contactData${index}`][0].style.color = ''
              }, 2000)
            }
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.myRow {
  height: 30px;
  padding: 0;
}
/deep/.myRow > td {
  padding: 0;
}
/deep/.myCell {
  border-collapse: collapse;
  .cell {
    white-space: nowrap !important;
  }
}
/deep/.el-card__body {
  padding-top: 0 !important;
}
/deep/.infor-warp {
  height: 500px;
  background-color: green;
}

.operateBtn {
  color: #fff;
  display: inline-block;
  border-radius: 4px;
  padding: 4px;
  font-size: 14px;
}
.btn-modify {
  background: #25bad9;
}
.btn-licence {
  background: #1fbba6;
}
.btn-delete {
  background-color: #bfbfbf;
}
.btn-record {
  background-color: #bfbfbf;
}
/deep/.note {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/.up-img {
  //width: 60px;
  z-index: 999;
  height: 60px;
  overflow: hidden;
  .el-upload-list .el-upload-list--picture-card {
  }
  .el-icon-plus {
    position: absolute;
    left: 15px;
    top: 15px;
  }
  .el-upload--picture-card {
    position: relative;
    width: 60px !important;
    height: 60px !important;
  }
  .el-upload-list--picture-card {
    height: 60px !important;
    width: 60px !important;
    .el-upload-list__item {
      width: 60px !important;
      height: 60px !important;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      height: 60px !important;
    }
  }
}
.addNow {
  display: block;
  width: 104px;
  height: 35px;
  background: rgba(248, 172, 89, 1);
  border-radius: 4px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -50px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 254, 254, 1);
  line-height: 35px;
  text-align: center;
  cursor: pointer;
}
.addNow :hover {
  color: #f44;
}
.noInfo {
  background-color: #ddd;
  color: #f44;
  text-align: center;
}
// 添加表单的样式
/deep/ .el-dialog {
  width: 500px;
  height: 600px;
  background-color: #fff;
  .el-dialog__header {
    height: 40px;
    border-bottom: 1px solid #eff2f5;
    .el-dialog__title {
      cursor: default;
      position: absolute;
      top: 0;
      left: 20px;
      line-height: 40px;
      font-size: 18px;
      color: #333;
      font-weight: 400;
    }
    .el-dialog__headerbtn .el-dialog__close {
      width: 16px;
      height: 16px;
      color: #333;
      top: 12px;
      right: 21px;
      font-size: 18px;
    }
  }
}
.tips {
  color: #fff;
  font-size: 12px;
  margin-left: 80px;
}
.text-waring {
  color: #f44;
}
/deep/ .el-dialog__body {
  padding: 20px 0;
  height: 400px;
  overflow-x: hidden;
  .el-form {
    margin: 0 72px;

    .el-form-item {
      height: 30px !important;
      margin: 0;
      .el-form-item__label {
        padding-right: 20px;
        height: 30px;
        line-height: 30px;
        color: #666666;
      }
      .el-form-item__content {
        line-height: 30px;
        height: 30px;
        .el-input {
          height: 30px;
          border: 1px solid #d2d2d2;
          border-radius: 4px;
          .el-input__inner {
            padding: 0;
            cursor: default;
            height: 98% !important;
            width: 100% !important;
          }
        }
        .el-textarea {
          height: 125px;
          .el-textarea__inner {
            padding: 0;
            height: 100% !important;
            width: 100% !important;
          }
        }
      }
    }
  }
  .el-form-item__label {
    padding-right: 20px;
    height: 30px;
    line-height: 30px;
  }
}
//添加框样式
/deep/.myAddForm,
/deep/.myRecordForm,
/deep/.myModifyForm {
  position: fixed !important;
  top: 0 !important;
  left: 50% !important;
  margin-top: 0 !important;
  margin-left: -250px !important;
}
/deep/.myRecordForm {
  height: 300px;
  top: 50% !important;
  margin-top: -150px !important;
  /deep/.el-dialog__header {
    position: relative;
    border-bottom: 1px solid rgb(207, 201, 201);
    .el-dialog__title {
      font-size: 18px;
      color: #333333;
    }
    .el-dialog__headerbtn {
      position: absolute;
      right: 0;
      width: 21px;
      height: 21px;
      top: 50%;
      right: 21px;
      margin-top: -10px;
      .el-dialog__close {
        font-size: 21px !important;
      }
    }
  }
  .el-dialog__body {
    .el-form {
      padding-bottom: 30px;
      .el-form-item {
        margin-bottom: 10px;
        .el-form-item__label {
          text-align: left !important;
        }
        .el-form-item__content {
          .el-input {
            height: 31px;
            padding-left: 5px;
            .el-input__inner {
            }
          }
        }
      }
    }
  }
}

//record-style
.btn-confirm-record {
  cursor: pointer;
  color: #fff;
  margin: 10px auto;
  width: 72px;
  height: 35px;
  border-radius: 4px;
  background-color: #f8ac59;
  text-align: center;
  line-height: 35px;
  font-size: 15px;
}
/deep/[data-v-147bdae0] .el-dialog {
  // position: fixed !important;
  // left: 50% !important;
  // margin-left:-250px !important;
  // width: 500px;
}
/deep/[data-v-147bdae0] .el-dialog .el-dialog__header .el-dialog__title {
  // color: #333333 !important;
}
// /deep/.el-dialog__headerbtn{
//   top:10px !important;
// }
// /deep/[data-v-147bdae0] .el-dialog__body{
//   width:500px !important;
//   padding: 0 !important;
//   .el-form{
//     margin: 10px 40px !important;
//     padding: 0 0 20px !important;
//     .el-form-item{
//       margin: 10px 0 !important;
//       .el-form-item__label{
//         text-align: left !important;

//       }
//       .el-input{
//           height: 31px;
//         }
//     }
//   }

// }

//添加工商执照预览图片

/deep/.el-dialog.is-fullscreen {
  width: 800px !important;
}

//点击工商执照出现的大图
/deep/.myLiscencePre {
  width: 800px !important;
  .el-dialog__body {
    padding: 0;
    img {
      height: 100%;
      width: 100%;
    }
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/deep/.list-card {
  position: relative;
  // background-color: #ddd !important;
  height: 100%;
}
#enterprise-info {
  height: 80%;
  position: relative;
  .my-pagination-box {
    z-index: 9999;
    position: absolute;
    bottom: 0;
    right: 0;

    /deep/.el-pagination__editor.el-input .el-input__inner {
      height: 28px !important;
      border: 1px solid #999 !important;
    }
  }
  .page-tip {
    z-index: 9999;
    position: absolute;
    left: 0;
    bottom: 10px;
  }
}
.clearfix {
  width: 100%;
  padding: 0 30px 0 12px;
  .box-header-right {
    float: left;
    height: 60px;
    display: flex;
    justify-content: space-around;
    width: 300px;
    .add-btn {
      cursor: pointer;
      background-color: #25bad9;
      color: #fff;
      height: 26px;
      margin-top: 20px;
      padding: 0 12px;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .add-btn2 {
      background-color: #1fbba6ff;
    }
  }
  .box-header-left {
    float: right;
    cursor: pointer;
    background-color: #25bad9;
    color: #fff;
    height: 26px;
    margin-top: 20px;
    padding: 0 12px;
    border-radius: 4px;
    box-sizing: border-box;
  }
}
.connect-class {
  position: relative;
  // background-color: #f00;
  .el-icon-plus {
    position: absolute;
    cursor: pointer;
    top: 7px;
    right: -25px;
    // background-color: green;
  }
  .el-icon-close {
    position: absolute;
    cursor: pointer;
    top: 7px;
    right: -25px;
  }
}
</style>
