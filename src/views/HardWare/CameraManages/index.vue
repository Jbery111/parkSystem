<template>
  <div class="hard-setparamClass">
    <div class="setparam-container">
      <el-card class="box-card">
        <span id="newadd" @click="addCamer">新增摄像头</span>
        <el-table :data="tableData" style="width: 100%" empty-text="暂无数据">
          <el-table-column prop="door_name" label="门岗名称" min-width="80" />
          <el-table-column  label="出/入口" min-width="80" >
            <template slot-scope="scope">
              <span v-html="scope.row.camera_door === 1 ? '入口' : '出口'"></span>
            </template>
          </el-table-column>
          <el-table-column prop="camera_name" label="设备名称" min-width="80" />
          <el-table-column prop="camera_sn" label="设备序列号" min-width="100" />
          <el-table-column prop="camera_host" label="设备IP地址" min-width="90" />
          <el-table-column prop="end_time" label="最后一次提交时间" min-width="110" />
          <el-table-column label="设备状态" min-width="70">
            <template slot-scope="scope">
              <span v-html="scope.row.camera_state === 1 ? '已启用' : '已禁用'"></span>
            </template>
          </el-table-column>
          <el-table-column label="网络状态" min-width="60">
            <template slot-scope="scope">
              <span v-html="scope.row.camera_internet_state === 1 ? '已连接' : '断网'"></span>
            </template>
          </el-table-column>
          <el-table-column prop="camera_time" label="设备时间" min-width="70" />
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
                v-if="scope.row.operation === 1"
                class="el-btn2"
                size="mini"
                type="danger"
                style="background:#FA5C5CFF; color:#fff; font-size:14px;height:30px; width:52px;
            border-color:#FA5C5CFF; padding:5px;"
                @click="handleJinyong(scope.$index, scope.row)"
              >禁用</el-button>
              <el-button
                v-else
                class="el-btn2"
                size="mini"
                type="danger"
                style="background:#46C346FF; color:#fff; font-size:14px;height:30px; width:52px;
            border-color:#46C346FF; padding:5px;"
                @click="handleQiyong(scope.$index, scope.row)"
              >启用</el-button>
            </template>
          </el-table-column>
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
    <!--启用 遮罩三 -->
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
      <div style="font-size:16px;">是否启用该摄像头?</div>
      <span slot="footer" class="dialog-footer">
        <el-button class="quxiao1" style="font-size:14px;" @click="centerDialogVisible1 = false">取 消</el-button>
        <el-button type="primary" style="font-size:14px;" >确 认</el-button>
      </span>
    </el-dialog>
    <!-- 禁用遮罩 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible4"
      :append-to-body="true"
      center
      class="chen"
      top="35vh"
      :close-on-click-modal="false"
    >
      <!-- <p>提示</p> -->
      <div style="font-size:16px;">是否禁用该摄像头?</div>
      <span slot="footer" class="dialog-footer">
        <el-button class="quxiao1" style="font-size:14px;" @click="centerDialogVisible4 = false">取 消</el-button>
        <el-button type="primary" style="font-size:14px;" >确 认</el-button>
      </span>
    </el-dialog>
    <!-- 新增摄像头遮罩层 -->
   <el-dialog
      :visible.sync="centerDialogVisible2"
      width="400px"
      center
      class="addCame-class"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <span slot="title">新增摄像头</span>
      <el-form :label-position="labelPosition" label-width="120px">
        <div class="form-item">
          <el-form-item label="门岗名称:" class="region-class">
            <el-select v-model="door_post_name" placeholder="请选择职位" class="width:73.5% !important">
              <el-option
                v-for="item in doorNameLists"
                :key="item.door_post_name"
                :value="item.door_post_name"
              >
                <span class="chenp" @click="hanPoid_AddCamera(item.id)">{{ item.door_post_name }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
              </el-option>
            </el-select>
            <!-- <p class="mistack-message">{{ mistakeToast3 }}</p> -->
          </el-form-item>
        </div>
        
        <div class="form-item" style="height:60px">
          <el-form-item label="设备名称:">
            <input
              ref="nameInput"
              v-model="formAddContent.camera_name"
              type="text"
              placeholder="请输入设备名称"
            />
            <!-- <p class="mistack-message">{{ mistakeToast2 }}</p> -->
          </el-form-item>
        </div>
        <div class="form-item" style="height:60px">
          <el-form-item label="设备序列号:">
            <input
              ref="nameInput"
              v-model="formAddContent.camera_sn"
              type="text"
              placeholder="请输入设备序列号"
            />
            <!-- <p class="mistack-message">{{ mistakeToast2 }}</p> -->
          </el-form-item>
        </div>
        <div class="form-item" style="height:60px">
          <el-form-item label="设备IP地址:">
            <input v-model="formAddContent.camera_host" type="text" />
            <!-- <p class="mistack-message">{{ mistakeToast1 }}</p> -->
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="选择出/入口:" class="region-class">
            <el-select v-model="inOut" class="width:73.5% !important" empty-text="暂无数据" placeholder="请选择出/入口">
              <el-option
                v-for="item in options_In_outLists"
                :key="item.value"
                :value="item.label"
              >
                <span class="chenp" @click="hanPoid_InOut(item.value)">{{ item.label }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
              </el-option>
            </el-select>
            <!-- <p class="mistack-message">{{ mistakeToast3 }}</p> -->
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCamerDid">确认</el-button>
      </span>
    </el-dialog>
    <!-- 修改摄像头 -->
    <el-dialog
      :visible.sync="centerDialogVisible3"
      width="400px"
      center
      class="addCame-class"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <span slot="title">修改摄像头</span>
      <el-form :label-position="labelPosition" label-width="120px">
        <div class="form-item">
          <el-form-item label="门岗名称:" class="region-class">
            <el-select v-model="poname" placeholder="请选择职位" class="width:73.5% !important">
              <el-option
                v-for="item in cities"
                :key="item.poname"
                :value="item.poname"
              >
                <span class="chenp" @click="hanPoid(item.poid)">{{ item.poname }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
              </el-option>
            </el-select>
            <!-- <p class="mistack-message">{{ mistakeToast3 }}</p> -->
          </el-form-item>
        </div>
        
        <div class="form-item" style="height:60px">
          <el-form-item label="设备名称:">
            <input
              ref="nameInput"
              v-model="formAlign1.phone"
              type="text"
              placeholder="请输入手机号"
            />
            <p class="mistack-message">{{ mistakeToast2 }}</p>
          </el-form-item>
        </div>
        <div class="form-item" style="height:60px">
          <el-form-item label="设备序列号:">
            <input
              ref="nameInput"
              v-model="formAlign1.phone"
              type="text"
              placeholder="请输入手机号"
            />
            <p class="mistack-message">{{ mistakeToast2 }}</p>
          </el-form-item>
        </div>
        <div class="form-item" style="height:60px">
          <el-form-item label="设备IP地址:">
            <input v-model="formAlign1.name" type="text" />
            <p class="mistack-message">{{ mistakeToast1 }}</p>
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="选择出/入口:" class="region-class">
            <el-select v-model="poname" placeholder="请选择职位" class="width:73.5% !important">
              <el-option
                v-for="item in cities"
                :key="item.poname"
                :value="item.poname"
              >
                <span class="chenp" @click="hanPoid(item.poid)">{{ item.poname }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
              </el-option>
            </el-select>
            <!-- <p class="mistack-message">{{ mistakeToast3 }}</p> -->
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" >确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postCameraList,postDoorListId,postCamerAdd } from '@/api/hardware'
// data数据
export default {
  components: {},
  data() {
    return {
      centerDialogVisible2:false,//新增摄像头
      centerDialogVisible3:false,//修改摄像头
      centerDialogVisible1: false, // 启用
      centerDialogVisible4:false,// 禁用
      isActived: false,
      formAlign1:{
        name:'',
        phone:''
      },
      poname:'',//新增摄像头下拉选择数据
      mistakeToast1:'',
      mistakeToast2:'',
      tableData: [],
      userInfoList: {},//localStorage的userInfo
      pageNums: null,//总页数
      totalPage: null,//总条数
      doorName: '',//增加的门岗名称
      labelPosition: 'right',
      parkid: null,
      currentPage: null,// 当前页
      doorNameLists: [
        {
            "id": 69,
            "door_post_name": "色温若"
        },
        {
            "id": 70,
            "door_post_name": "让他也让"
        },
        {
            "id": 71,
            "door_post_name": "而也让"
        },
        {
            "id": 72,
            "door_post_name": "区位图"
        },
      ],
      options_In_outLists:[
        {
          label:'出口',
          value: 2
        },{
          label:'入口',
          value: 1
        }
      ],
      //新增摄像头传给后端的参数
      formAddContent: {
        door_id: '',//门岗绑定的id
        camera_name: '',//摄像头名称
        camera_sn:'',//摄像头设备序列号
        camera_host: '',//设备的ip地址
        camera_door: ''//1是入口2是出口
      },
      door_post_name: '',//门岗名称
      inOut: ''//出入口
    }
  },
  computed: {},
  watch: {

  },
  created() {
    this.parkid = JSON.parse(localStorage.getItem('items')).id
    this.getCamereList(1, 10, this.parkid)
  },
  mounted() {

  },
  methods: {
    hanPoid_AddCamera(id) {
      console.log(id,'点击门岗下拉')
      this.formAddContent.door_id = id
    },
    hanPoid_InOut(value) {
      console.log(value,'点击churu下拉')
      this.formAddContent.camera_door = value
    },
    addCamer() {
      this.centerDialogVisible2 = true
      // alert('新增门岗')
      postDoorListId({parkid: this.parkid}).then(resp => {
        console.log(resp,'门岗类型列表')
        this.doorNameLists = resp.data
      })

    },
    addCamerDid() {
      const addCamerQuery = {
        ...this.formAddContent,
        park_id: this.parkid
      }
      console.log(addCamerQuery,'内容formAddContent')
      postCamerAdd(addCamerQuery).then(resp => {
        console.log(resp,'新增摄像头的response')
        if(resp.data === "设备添加成功") {
          this.centerDialogVisible2 = false
          this.getCamereList(this.currentPage, 10, this.park_id)
        }
      })
    },
    handleEdit(index,row) {
      this.centerDialogVisible3 = true
    },
    handleQiyong(index,row) {
      this.centerDialogVisible1 = true
    },
    handleJinyong(index,row) {
      this.centerDialogVisible4 = true
    },
    handleCurrentChange(val) {
      //分页设置
      console.log(val)
    },
    //查询摄像头列表
    getCamereList(page = 1,size = 10,parkid = this.parkid) {
       postCameraList({page,size,parkid}).then(resp=> {
        console.log(resp,'查询摄像头列表')
        this.tableData = resp.data.data
        this.pageNums = resp.data.pageNum
        this.totalPage = resp.data.total
        this.currentPage = res.data.page
      })
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
  height: 100%;
  overflow: auto;
}
.setparam-container {
  // height: 2000px;
  // background-color: green;
  width: 100%;
  position: relative;
}
/deep/.el-table .cell{
  height: 30px !important;
}
.addCame-class{

}
</style>
