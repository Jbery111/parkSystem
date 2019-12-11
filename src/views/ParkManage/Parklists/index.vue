<template>
  <div class="hard-setparamClass">
    <div class="setparam-container">
      <el-card class="box-card">
        <!-- 查询 -->
        <el-form
          style="margin-bottom: 20px;"
          size="small"
          :inline="true"
          :model="searchForm"
          class="demo-form-inline"
        >
          <el-form-item>
            <el-button class="newadd" type="text" @click="addor">增加车位</el-button>
          </el-form-item>
          <el-form-item>
            <el-button v-if="back" class="newadd" type="text" @click="clear">返回上一级</el-button>
          </el-form-item>
          <el-form-item>
            <el-input class="search" v-model="searchForm.orderNo" placeholder="输入搜索内容"></el-input>
          </el-form-item>

          <!-- 清除按钮和查询按钮 -->
          <el-form-item>
            <el-button class="btn" type="text" @click="search">
              <i class="iconfont icon-iconfonticonfontsousuo1"></i>
            </el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%" empty-text="暂无数据">
          <el-table-column prop="Parking" label="车位号" width="200" />
          <el-table-column prop="cartype" label="车位类型" width="200" />
          <el-table-column prop="longcar" label="长租车月租(元)" width="200" />
          <el-table-column prop="parkstate" label="车位状态" width="200" />
          <el-table-column prop="Longplate" label="长租车牌号" width="200"></el-table-column>
          <el-table-column prop="Linkbuilding" label="关联房屋" width="200" class="remark"></el-table-column>
          <el-table-column prop="centons" label="车位备注" width="350" class="remark"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button class="el-btn11" type="text" @click="compile(scope.row)">修改</el-button>
              <el-button class="el-btn44" type="text" @click="handle(scope.row)">操作记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 分页 -->
      <div class="block">
        <p class="record-data">共 {{ pageNums }}页,共 {{ totalPage }}条</p>
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
    <!-- 增加车位 -->
    <el-dialog
      title="操作记录"
      :visible.sync="centerDialogVisible1"
      :append-to-body="true"
      center
      class="specialvehicles"
      top="35vh"
      :close-on-click-modal="false"
      width="500px"
     >
      <el-form
        :label-position="labelPosition"
        label-width="90px"
        :model="Specialvehicle"
        class="el-myclass"
        ref="Specialvehicle"
        hide-required-asterisk
        :rules="rules"
      >
         <el-form-item label="车位类型"  prop="vehicle_car_number">
          <el-select v-model="Specialvehicle.vehicle_car_number" placeholder=""  >
            <el-option label="宝马车位" value="宝马车位"></el-option>
            <el-option label="大奔车位" value="大奔车位"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车位号:" prop="vehicle_name">
          <el-input
            v-model="Specialvehicle.vehicle_name"
            @keydown.native.enter="submitForm"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="车位状态:">
          <template>
            <el-radio-group v-model="Specialvehicle.radio" >
              <el-radio :label="3">已售</el-radio>
              <el-radio :label="6">未售</el-radio>
              <el-radio :label="9">已出租</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
          <el-form-item label="关联房屋:" prop="house">
          <el-input
            v-model="Specialvehicle.house"
            @keydown.native.enter="submitForm"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注:" class="input_two">
          <el-input
            v-model="Specialvehicle.centons"
            @keydown.native.enter="submitForm"
            autocomplete="off"
            class="input textarea"
            rows="4"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="footer-class">
        <span @click="submitForm">确认</span>
      </div>
    </el-dialog>

    <!-- 修改车位 -->
    <el-dialog
      title="修改车位"
      :visible.sync="Modification"
      :append-to-body="true"
      center
      class="specialvehicles"
      top="35vh"
      :close-on-click-modal="false"
      width="500px"
     >
      <el-form
        :label-position="labelPosition"
        label-width="90px"
        :model="Modificationcar"
        class="el-myclass"
        ref="Specialvehicle"
        hide-required-asterisk
        :rules="rules"
      >
         <el-form-item label="车位类型"  prop="vehicle_car_number">
          <el-select v-model="Modificationcar.vehicle_car_number" placeholder=""  >
            <el-option label="宝马车位" value="宝马车位"></el-option>
            <el-option label="大奔车位" value="大奔车位"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车位号:" prop="vehicle_name">
          <el-input
            v-model="Modificationcar.vehicle_name"
            @keydown.native.enter="affirm"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="车位状态:">
          <template>
            <el-radio-group v-model="Modificationcar.radio" >
              <el-radio :label="3">已售</el-radio>
              <el-radio :label="6">未售</el-radio>
              <el-radio :label="9">已出租</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
          <el-form-item label="关联房屋:" prop="house">
          <el-input
            v-model="Modificationcar.house"
            @keydown.native.enter="affirm"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注:" class="input_two">
          <el-input
            v-model="Modificationcar.centons"
            @keydown.native.enter="affirm"
            autocomplete="off"
            class="input textarea"
            rows="4"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="footer-class">
        <span @click="affirm">确认</span>
      </div>
    </el-dialog>
     <!-- 操作记录 -->
    <el-dialog
      title="操作记录"
      :visible.sync="operationss"
      :append-to-body="true"
      center
      class="operationnote"
      top="35vh"
      :close-on-click-modal="false"
      width="500px"
     >
      <el-form
        :label-position="labelPosition"
        label-width="120px"
        :model="operations"
        class="el-myclass"
        ref="Specialvehicle"
        hide-required-asterisk
        disabled
      >
          <el-form-item label="上次操作员:" >
          <el-input
            v-model="operations.operator"
            @keydown.native.enter="from"
            autocomplete="off"
          ></el-input>
        </el-form-item>
         <el-form-item label="上次操作时间:">
          <el-input
            v-model="operations.time"
            @keydown.native.enter="from"
            autocomplete="off"
          ></el-input>
        </el-form-item>
         <el-form-item label="上次操作IP地址:">
          <el-input
            v-model="operations.ip"
            @keydown.native.enter="from"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      
      </el-form>
      <div class="footer-class">
        <span @click="from">确认</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
// data数据
export default {
  components: {},
  data() {
    return {
      rules: {
        vehicle_car_number: [{ required: true, message: "车位类型不能为空" }],
        vehicle_name: [{ required: true, message: "车位号不能为空" }],
        vehicle_phone: [
          { required: true, message: "电话不能为空" },
          { type: "number", message: "电话必须为数字" }
        ],
        house:[{required: true, message: "房屋不能为空" }]
      },
      tableData: [],
      back: false,//返回上一级
      pageNums: 1, //总页数
      totalPage: null, //总条数
      disabled: true,
      labelPosition: "right",
      park_id: null, //停车场id
      parkid: "",
      currentPage: 1, // 当前页
      pageSize: 10, // 当前页条数
      centerDialogVisible1: false, //增加车位
      Modification: false, //修改车位
      operationss:false,//操作记录
      //修改车辆
      Modificationcar: {
        vehicle_car_number: "", //车位类型
        vehicle_name: "", //车位号
        centons: "", //备注
        radio:6,//车位状态
        house:''//关联房屋
      },
      //新增车辆
      Specialvehicle: {
        vehicle_car_number: "", //车位类型
        vehicle_name: "", //车位号
        centons: "", //备注
        radio:6,//车位状态
        house:''//关联房屋
      },
      //操作记录
      operations:{
        operator:'邓长平',
        time:'2019-12-11',
        ip:'127.0.0.1',
      },
      //查询
      searchForm: {
        orderNo: ""
      }
    };
  },
  created() {
    //获取列表
    const user = JSON.parse(localStorage.getItem("userInfo"));
    this.parkid = user.data.Communityid;
    this.park_id = user.data.Communityid;
    //console.log(user.list );
   let obj=[{
     Parking:'A11',
     cartype:'宝马车位',
     longcar:'100',
     parkstate:'已售',
     Longplate:'川AQBZ95',
     Linkbuilding:'1-1-305',
     centons:'哈哈哈哈',
   }]
   this.tableData=obj
  
  },
  methods: {
    // 分页设置
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //编辑
    compile(row) {
      this.Modification = true;
      let {
        cartype,
        Parking,
        parkstate,
        Linkbuilding,
        centons
      } = row;
    
      this.Modificationcar.vehicle_car_number = cartype;
      this.Modificationcar.vehicle_name = Parking;
      this.Modificationcar.house = Linkbuilding;
      this.Modificationcar.centons = centons;
    },
    //操作记录
    handle(){
      this.operationss=true;
    },
    from(){
      this.operationss=false;
    },
    //确认编辑
    affirm() {
      this.$refs.addCartype.validate(async valid => {
        if (valid) {
         console.log(this.amendCartype);
        } else {
          return false;
        }
      });
    },
    //新增弹框打开
    addor() {
      this.centerDialogVisible1 = true;
      // 去除验证
      this.$nextTick(() => {
        this.$refs.Specialvehicle.resetFields();
      });
    },
    //新增提交
    async submitForm() {
      //   console.log(this.Specialvehicle);

      //  if(obj==="添加成功"){
      //   this.centerDialogVisible1=false
      //  }
      this.$refs.Specialvehicle.validate(async valid => {
        if (valid) {
          //console.log( valid);
          //发送请求
          let obj = await addspecialcar({
            vehicle_name: this.Specialvehicle.vehicle_name,
            vehicle_phone: this.Specialvehicle.vehicle_phone,
            vehicle_car_number: this.Specialvehicle.vehicle_car_number,
            park_id: this.park_id,
            centons: this.Specialvehicle.centons
          });
          //console.log(obj);
          if (obj === "添加成功") {
            this.centerDialogVisible1 = false;
            // 再此获取列表
            this.parkList();
            Message({
              type: "success",
              message: "添加成功"
            });
          } else {
            // 失败
            Message.error("添加失败");
          }
        } else {
          return false;
        }
      });
    },
    //查询
    async search() {
      //console.log(this.searchForm.orderNo);
      if (this.searchForm.orderNo) {
        let obj = await searchList({
          page: this.currentPage,
          size: this.pageSize,
          parkid: this.parkid,
          name: this.searchForm.orderNo
        });
        console.log(obj);
        this.tableData = obj.data;
        this.totalPage = obj.total; // 总条数
        this.pageNums = obj.pageNum; //总页数
        this.back = true;
      }
      //  date=obj.data
      //   date.foreach(v=>{
      //     console.log(v);

      //   })
    },
    //获取列表
    async parkList() {
      const obj = await specialcarlist({
        page: this.currentPage,
        size: this.pageSize,
        parkid: this.parkid
      });
      this.tableData = obj.data;
      this.totalPage = obj.total; // 总条数
      this.pageNums = obj.pageNum; //总页数
      console.log(obj);
    },
    //清除
    clear() {
      this.tableData = "";
      this.back = false;
      this.parkList();
    }
  }
};
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
      line-height: 30px !important;
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

.newadd {
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 72px;
  height: 30px;
  line-height: 5px;
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
/deep/.el-table .cell {
  height: 30px !important;
  line-height: 30px;
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /*规定段落中的文本不进行换行 */
  width: 250px; /*需要配合宽度来使用*/
}
.el-btn11 {
  display: inline-block;
  text-align: center;
  color: #fff;
  width: 52px;
  height: 30px;
  line-height: 5px;
  background: rgba(37, 186, 217, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.el-btn22 {
  display: inline-block;
  text-align: center;
  margin-left: 8px;
  color: #fff;
  line-height: 5px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  width: 52px;
  height: 30px;
  background: #fa5c5c;
  border-radius: 4px;
}
.el-btn33 {
  margin-left: 8px;
  display: inline-block;
  text-align: center;
  color: #fff;
  width: 52px;
  height: 30px;
  line-height: 5px;
  background: #46c346;
  border-radius: 4px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.el-btn44 {
  display: inline-block;
  text-align: center;
  margin-left: 8px;
  color: #fff;
  line-height: 5px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  width: 72px;
  height: 30px;
  background: rgba(204, 204, 204, 1);
  border-radius: 4px;
}
.operationnote {
  /deep/.el-dialog {
    min-width: 400px;
    height: 286px;
    .el-dialog__header {
      text-align: left;
      height: 47px !important;
      border-bottom: 1px solid #eff2f5;
    }
    /deep/.el-dialog__body {
      text-align: initial;
      padding: 24px 25px 25px 0px;
      .el-myclass {
        padding-left: 55px;
        height: 65px !important;
        /deep/ .el-form-item__label {
          padding: 0 8px 0 0;
          text-align: left;
        }
        /deep/.el-input__inner {
          // background-color: #f00;
          width: 266px !important;
          height: 32px !important;
          border: 1px solid rgba(210, 210, 210, 1) !important;
          border-radius: 4px !important;
          color: #333333;
          padding: 0px 7px;
        }
      }
    }
    .footer-class {
      // background-color: #f00;
      cursor: pointer;
      height: 30px;
      display: flex;
      justify-content: center;
      margin-top: 110px;
      span {
        width: 72px;
        height: 30px;
        border-radius: 4px;
        background-color: #fcb048;
        border-color: #fcb048;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
    }
    .el-form-item {
      margin-bottom: 0;
      height: 50px !important;
    }
  }
}
.units {
  position: absolute;
  right: 42px;
}
.specialvehicles {
  /deep/.el-dialog {
    min-width: 400px;
    height: 468px;
    .el-dialog__header {
      text-align: left;
      height: 47px !important;
      border-bottom: 1px solid #eff2f5;
    }
    /deep/.el-dialog__body {
      text-align: initial;
      //padding: 24px 25px 25px 0px;
      .el-myclass {
        padding-left: 55px;
        height: 65px !important;
        /deep/ .el-form-item__label {
          padding: 0 8px 0 0;
          text-align: left;
        }
        /deep/.el-input__inner {
          // background-color: #f00;
          width: 248px !important;
          height: 32px !important;
          border: 1px solid rgba(210, 210, 210, 1) !important;
          border-radius: 4px !important;
          color: #333333;
          padding: 0px 7px;
        }
      }
    }
    .footer-class {
      // background-color: #f00;
      cursor: pointer;
      height: 30px;
      display: flex;
      justify-content: center;
      margin-top: 277px;
      span {
        width: 72px;
        height: 30px;
        border-radius: 4px;
        background-color: #fcb048;
        border-color: #fcb048;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
    }
    .el-form-item {
      margin-bottom: 6px;
      height: 50px !important;
      .el-form-item__error {
        padding-top: 0px !important;
      }
    }
    .input_two {
      .el-form-item__content {
        .el-input {
          .el-input__inner {
            height: 88px !important;
            vertical-align: text-top !important;
          }
        }
        .textarea {
          .el-textarea__inner {
            font-family: "Microsoft" !important;
            font-size: 14px !important;
            // overflow-y: scroll;
            width: 248px;
            height: 88px;
            margin-top: 2px;
          }
          .el-textarea__inner:focus {
            border-color: #d2d2d2;
          }
        }
      }
    }
  }
}
.demo-form-inline {
  height: 30px !important;
  margin-bottom: 2px !important;
  .search {
    /deep/.el-input__inner {
      // background-color: #f00;
      width: 177px !important;
      height: 30px !important;
      border: 1px solid rgba(210, 210, 210, 1) !important;
      border-radius: 4px 0 0 4px !important;
      color: #333333;
      padding: 0px 7px;
      position: absolute;
      left: 1457px;
      bottom: -10px;
    }
  }
  .btn {
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    width: 24px;
    height: 30px;
    line-height: 5px;
    background: rgba(204, 204, 204, 1);
    border-radius: 0px 4px 4px 0px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;

    position: absolute;
    left: 1624px;
    bottom: -31px;
  }
}
.active {
  color: red;
}
.reminder {
  /deep/.el-dialog {
    min-width: 380px;
    height: 210px;
    .el-dialog__header {
      text-align: left;
      height: 47px !important;
      border-bottom: 1px solid #eff2f5;
    }
    /deep/.el-dialog__body {
      text-align: initial;
      //padding: 24px 25px 25px 0px;
      padding: 0px;
      .el-myclass {
        padding-left: 55px;
        height: 65px !important;
        /deep/ .el-form-item__label {
          padding: 0 8px 0 0;
          text-align: left;
        }
        /deep/.el-input__inner {
          // background-color: #f00;
          width: 266px !important;
          height: 32px !important;
          border: 1px solid rgba(210, 210, 210, 1) !important;
          border-radius: 4px !important;
          color: #333333;
          padding: 0px 7px;
        }
      }
    }
    .footer-one {
      width: 380px;
      height: 112px;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
    .footer-class {
      // background-color: #f00;
      cursor: pointer;
      height: 30px;
      display: flex;
      justify-content: center;

      .two {
        width: 72px;
        height: 30px;
        border-radius: 4px;
        background-color: #25bad9;
        border-color: #25bad9;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin-left: 98px;
      }
      .one {
        width: 72px;
        height: 30px;
        border-radius: 4px;
        background-color: #ffffff;
        border: 1px solid rgba(204, 204, 204, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999999;
      }
    }
    .el-form-item {
      margin-bottom: 0;
      height: 50px !important;
    }
  }
}
// body::-webkit-scrollbar {
//     display: none;
// }
</style>
