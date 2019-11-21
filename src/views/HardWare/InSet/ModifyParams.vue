<template>
  <div class="modify-main" style="position:relative;">
<div class="card-main">
  <span id="newadd" @click="isExit">返回上一级</span>
</div>
<el-collapse v-model="activeNames1" @change="handleChange">
        <!-- 基础设置 -->
        <el-collapse-item title="基础设置" name="1">
          <!-- 总 -->
          <div class="sum-class">
            <!-- 左部分 -->
            <div class="sumbox left-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="内场名称:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                </el-form>
            </div>
            <!-- 右部分 -->
            <div class="sumbox right-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="车位总数:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场详细地址" />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-collapse-item>
        <!-- 开闸管理 -->
        <el-collapse-item title="开闸管理" name="2">
          <!-- 总 -->
          <div class="sum-class">
            <!-- 左部分 -->
            <div class="sumbox left-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
            <!-- 右部分 -->
            <div class="sumbox left-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                    <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-collapse-item>
        <!-- 收费设置 -->
        <el-collapse-item title="收费设置" name="3">
          <!-- 总 -->
          <div class="sum-class">
            <!-- 左部分 -->
            <div class="sumbox left-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
              </el-form>
            </div>
            <!-- 右部分 -->
            <div class="sumbox right-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="显示屏设置" name="4">
          <!-- 总 -->
          <div class="sum-class">
            <!-- 左部分 -->
            <div class="sumbox left-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
              </el-form>
            </div>
            <!-- 右部分 -->
            <div class="sumbox right-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="button-class">
        <span class="button">确认</span>
      </div>

     
  
  </div>
</template>

<script>
// data数据
export default {
  components: {},
  data() {
    return {
      centerDialogVisible1: false, // 新增门岗
      isShowCard1:true,
      activeNames1: ['1', '2', '3', '4'], // 展开列
      labelPosition: 'top',
      radio: 3, // 开闸管理
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
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
      //子组件像父组件传值
    isExit() {
        this.$emit('isShowCardFunc',this.isShowCard1)
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


/deep/ .el-dialog {
  background-color: #fff;
  margin-top: 0% !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  min-width: 380px;
  border-radius: 5px;
  .el-dialog__wrapper {
    overflow: auto;
  }
  .el-dialog__header {
    padding: 12px 0 10px 16px;
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

    button {
      position: absolute;
      top: 14px;
    }
  }
  /deep/.el-dialog__body {
    overflow: hidden;
    padding: 20px 50px 6px 48px !important;
    .form-item {
      height: 60px;
      .zhiwei {
        margin-bottom: 0px;
        .el-form-item__label {
          display: inline-block;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          padding: 0 !important;
          white-space: nowrap;
          color: rgba(102, 102, 102, 1);
          text-align: right !important;
        }
        .el-form-item__content {
          input {
            width: 87% !important;
            border: 1px solid rgba(210, 210, 210, 1);
            border-radius: 3px;
            outline: none;
            color: #333333;
            padding-left: 8px;
          }
        }
      }
      .el-form-item {
        margin-bottom: 0px;
        margin-top: 1px;
        text-align: center;
        &__label {
          height: 30px;
          display: inline-block;
          font-size: 14px;
          padding: 0 !important;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
        &__content {
          input {
            position: relative;
            height: 30px;
            width: 87% !important;
            border: 1px solid rgba(210, 210, 210, 1);
            border-radius: 3px;
            outline: none;
            color: #333333;
            padding-left: 8px;
          }
        }
      }

      .mistack-message {
        position: relative;
        top: -13px;
        text-align: left;
        margin-left: 5px;
        box-sizing: border-box;
        font-size: 14px;
        transform: scale(0.9);
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 0, 0, 1);
      }
    }
  }
  .el-dialog__footer {
    padding-top: 0px;
    button {
      width: 62px;
      height: 30px;
      line-height: 0;
      outline: none;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      background: rgba(248, 172, 89, 1);
      border-radius: 3px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 254, 254, 1);
      margin-bottom: 4px;
    }
  }
}

.chen {
  /deep/.el-dialog {
    background-color: #fff !important;
    width: 18.23%;
    height: 210px;
    /deep/.el-dialog__header {
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
      background-color: #25bad9;
    }
  }
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
  overflow: auto;
}
.setparam-container {
  // height: 2000px;
  // background-color: green;
  position: relative;
  width: 100%;
  .card-main{
    //   background-color: #f00;
      margin: 20px;
  }
   .sum-class {
    display: flex;
    // height: ;
    margin: 0px 20px;
    .left-class {
      margin-right: 100px;
      margin-left: 78px;
      box-sizing: border-box;
    }
    // .right-class {
    //   margin-right: ;
    // }
  }
}
/deep/.el-input__inner {
  border: 1px solid #dcdfe6ff !important;
  width: 400px !important;
  height: 32px !important;
}
.sumbox {
  width: 50%;
  height: 100%;
}
/deep/.el-form--label-top .el-form-item__label {
  padding: 0px !important;
  height: 27px;
}
.button-class {
  position: absolute;
  height: 30px;
  bottom: -150px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  box-sizing: border-box;
  .button {
    background-color: #f00;
    border: none;
    width: 72px;
    height: 30px;
    background: rgba(252, 176, 72, 1);
    border-radius: 4px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 254, 254, 1);
  }
}
/deep/.el-table .cell{
  height: 30px !important;
}

</style>
