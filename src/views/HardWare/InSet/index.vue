<template>
  <div class="hard-setparamClass">
    <div class="setparam-container">
      <div v-if="isShowAdd">
        <el-card class="box-card" v-if="isShowCard">
          <span id="newadd" @click="addClick">新增内场</span>
          <el-table :data="tableData" style="width: 100%" empty-text="暂无数据">
            <el-table-column prop="setting_name" label="内场名称" min-width="150" />
            <!-- 操作 -->
            <el-table-column label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  style="background:#25BAD9; color:#fff; font-size:14px;height:30px; width:52px;
            border-color:#25BAD9; padding:5px;"
                  @click="handleEdit(scope.$index, scope.row)"
                >修改</el-button>
                <el-button
                  size="mini"
                  style="background:#25BAD9; color:#fff; font-size:14px;height:30px; width:52px;
            border-color:#25BAD9; padding:5px;"
                  @click="handleBandi(scope.$index, scope.row)"
                >绑定</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <modify-params v-else @isShowCardFunc="isShowCardFunc1" :inSetId="inSetId"></modify-params>
      </div>
      <add-inset v-if="!isShowAdd" @isShowCardFunc1="isShowCardFunc2"></add-inset>
      <!-- 分页 -->
      <div v-if="isShowAdd">
        <div class="block" v-if="isShowCard">
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
    </div>
    <!-- 绑定遮罩三 -->
    <el-dialog
      title="绑定停车场"
      :visible.sync="centerDialogVisible1"
      :append-to-body="true"
      center
      top="35vh"
      :close-on-click-modal="false"
      class="bangding-class"
    >
      <!-- <p>提示</p> -->
      <el-form label-position="right" label-width="80px">
        <div class="form-item">
          <el-form-item label="选择停车场:" class="region-class">
            <el-select v-model="setting_name" placeholder="请选择停车场">
              <el-option v-for="item in parkLists" :key="item.id" :value="item.setting_name">
                <span class="chenp" @click="hanid(item.id)">{{ item.setting_name }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
              </el-option>
            </el-select>
            <!-- <p class="mistack-message">{{ mistakeToast3 }}</p> -->
          </el-form-item>
          <!-- //选择停车场备选组 -->
          <el-form-item label="选择门岗:">
            <el-checkbox-group v-model="doorLists1">
              <el-checkbox
                v-for="item in doorLists"
                :label="item.id"
                :key="item.door_post_name"
              >{{item.door_post_name}}</el-checkbox>
            </el-checkbox-group>
            <!-- <p class="mistack-message">{{ mistakeToast3 }}</p> -->
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" style="font-size:14px;" @click="bangdingDid">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { postBindingCar, postBindingInfo, postBindingInfoBach } from '@/api/hardware'
import ModifyParams from './ModifyParams.vue'
import AddInset from './AddInset.vue'
// data数据
export default {
  components: {
    ModifyParams,
    AddInset
  },
  data () {
    return {
      set_id: null,//选择的内场id
      inSetId: '',//内场id
      isShowAdd: true,
      parkid: null,
      totalPage: 10,
      pageNums: 1,
      currentPage: null,// 当前页
      centerDialogVisible1: false, // 新增门岗
      isShowCard: true,
      parkLists: [],
      doorLists1: [],
      setting_name: '',
      doorLists: [],
      tableData: []
    }
  },
  computed: {},
  watch: {

  },
  created () {
    // console.log('内场管理创建')
    this.parkid = JSON.parse(localStorage.getItem('items')).id
    this.getInsetList()
  },
  mounted () {

  },
  methods: {
    hanid (id) {
      console.log(id, 'handpoid')
      this.set_id = id
    },
    bangdingDid () {
      console.log(this.doorLists1.join(','), 'checkListcheckListcheckList')
      const door_id = this.doorLists1.join(',')
      const set_id = this.set_id
      const id = this.inSetId
      postBindingInfoBach({ id, set_id, door_id, parkid: this.parkid }).then(resp => {
        console.log(resp, '绑定的多多resp')
        if (resp.data === '绑定成功') {
          Message(resp.data)
          this.centerDialogVisible1 = false
        }
      })
    },
    //请求内场数据列表
    getInsetList (page = 1, size = 10, parkid = this.parkid) {
      // const parkid = this.parkid
      postBindingCar({ page, size, parkid }).then(resp => {
        console.log(resp, '内场response')
        this.tableData = resp.data.data
        this.pageNums = resp.data.pageNum
        this.totalPage = resp.data.total
        this.currentPage = resp.data.page
      })
    },
    handleCurrentChange (val) {
      console.log(val)
    },
    handleBandi (index, row) {

      console.log(row, 'row')
      this.inSetId = row.id
      const id = row.id
      postBindingInfo({ id: id, parkid: this.parkid }).then(resp => {
        console.log(resp, '绑定的输出')

        if (resp.data.seting_info) {
          // const arr1 = resp.data.door_info
          this.doorLists = resp.data.door_list
          this.parkLists = resp.data.set_list
          this.set_id = resp.data.seting_info.id
          this.setting_name = resp.data.seting_info.setting_name
          //后端返回的checklist
          this.$nextTick(function () {
            this.doorLists1 = resp.data.door_info
          })
          console.log('ioioioioioioi')
        } else {
          console.log('第一一次绑定')
          this.setting_name = ''
          this.doorLists1 = []
          this.doorLists = resp.data.door_list
          this.parkLists = resp.data.set_list
        }
      })
      this.centerDialogVisible1 = true
    },
    handleEdit (index, row) {
      this.isShowCard = false
      // console.log(row, 'row')
      this.inSetId = row.id
    },
    isShowCardFunc1 (data) {
      this.isShowCard = data
      this.getInsetList()
    },
    isShowCardFunc2 (data) {
      this.isShowAdd = data
      this.getInsetList()
    },
    //新增内场
    addClick () {
      this.isShowAdd = false
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
  width: 100%;
}
/deep/.el-table .cell {
  height: 30px !important;
}
.bangding-class {
  /deep/.el-dialog {
    width: 500px;
    height: 273px !important;
    .el-dialog__body {
      height: 200px;
    }
  }
}
</style>
