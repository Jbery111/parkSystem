<template>
  <div id="audit-changes">
    <span class="dot"></span>
    <!-- 审核修改1 <button @click="change">切换</button> -->

    <!-- 表格 -->
    <Table :data="judgeList" :isShowDetail="isShowDetail" @bridge="getMesFromChild" 
      @fun1="handleDetailClick" @fun2="handleJudgeClick" @fun3="handleModifyClick" @fun4="handleUserClick"
      @fun5="handleCarClick" @fun6="handleRecordClick" @back="back" />

    <!-- 页码 -->
    <Pages v-show="isShowPage" v-if="pageInfo.page" :pageInfo="pageInfo" @handleSizeChange="handleSizeChange" 
      @handleCurrentChange="handleCurrentChange" @nextClickHandler="nextClickHandler"/>

    <!-- 申请修改详情弹窗 -->
    <!-- <DetailDialog :detailData='detailData' @agreen="agreen" @refuse="refuse"/> -->
    <el-dialog
      title="申请修改详情"
      custom-class="myDetailForm"
      class="position:fixed;top:10px;"
      :append-to-body="true"
      :visible.sync="detailFormVisible"
      :close-on-click-modal="false"
      :before-close="handleDetailClose"
      >
      <el-form label-width="380px">

        <div v-if="detailFormVisible">
          <div class="row">
            <span class="t1">房屋类型:</span>
            <span class="t2">{{detailData.data.typeName}}</span>
            <span class="t3">修改为:</span>
            <span class="t4">{{detailData.data.typeNames}}</span>
          </div>
          <div class="row">
            <span class="t1">楼栋:</span>
            <span class="t2">{{detailData.data.userHouseBuilding}}</span>
            <span class="t3">修改为:</span>
            <span class="t4">{{detailData.data.userHouseBuildings}}</span>
          </div>
          <div class="row">
            <span class="t1">单元:</span>
            <span class="t2">{{detailData.data.userHouseUnit}}</span>
            <span class="t3">修改为:</span>
            <span class="t4">{{detailData.data.userHouseUnits}}</span>
          </div>
          <div class="row">
            <span class="t1">门牌号:</span>
            <span class="t2">{{detailData.data.userHouseNumber}}</span>
            <span class="t3">修改为:</span>
            <span class="t4">{{detailData.data.userHouseNumbers}}</span>
          </div>
          <div class="row">
            <span class="t1">房屋面积:</span>
            <span class="t2">{{detailData.data.Housingarea}}</span>
            <span class="t3">修改为:</span>
            <span class="t4">{{detailData.data.Housingareas}}</span>
          </div>
          <div class="row">
            <span class="t1">物业费单价:</span>
            <span class="t2">{{detailData.data.Price}}</span>
            <span class="t3">修改为:</span>
            <span class="t4">{{detailData.data.Prices}}</span>
          </div>
          <div class="row" style="position:relative; height:100px;">
            <span style="position:absolute;left:0">*申请理由:</span>
            <textarea
              v-model="detailData.data.centns"
              disabled
              rows="1"
              cols="40"
              style="position:absolute;width:228px;right:0;resize:none;max-height:100px;padding:5px;overflow:scroll;overflow-y:hidden;overflow-x:hidden"
              onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},10);"
              onblur="clearInterval(this.clock);"
            />
          </div>
        </div>

        
        <div class="btn agreen" style="cursor:pointer" @click="agreen">同意</div>
        <div class="btn refuse" style="cursor:pointer" @click="refuse">拒绝</div>
      </el-form>
    </el-dialog>

    <!-- 操作记录 -->
    <!-- 操作记录 -->
    <el-dialog
      v-if="showRecord"
      title="操作记录"
      :modal="true"
      :append-to-body="true"
      :visible.sync="RecordialogFormVisible"
      :close-on-click-modal="false"
      custom-class="myRecordForm"
      >
      <el-form>
        <el-form-item v-if="recordData.data.uname" label="上次操作员:" :label-width="formLabelWidth">
          <el-input v-model="recordData.data.uname" :disabled="true" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="recordData.data.uname" label="上次操作时间" :label-width="formLabelWidth">
          <el-input v-model="recordData.time" :disabled="true" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="recordData.data.uname" label="上次操作ip地址" :label-width="formLabelWidth">
          <el-input v-model="recordData.data.ip" :disabled="true" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="recordData.usname" label="上次审核人:" :label-width="formLabelWidth">
          <el-input v-model="recordData.usname" :disabled="true" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="recordData.usname" label="上次审核时间" :label-width="formLabelWidth">
          <el-input v-model="recordData.times" :disabled="true" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="recordData.usname" label="上次审核结果" :label-width="formLabelWidth">
          <el-input v-model="recordData.Result" :disabled="true" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div class="btn-confirm-record" @click="RecordialogFormVisible=false">确认</div>
    </el-dialog>

    <el-dialog
      title="拒绝"
      custom-class="myDetailForm"
      class="position:fixed;top:10px;"
      :append-to-body="true"
      :visible.sync="refuseFormVisible"
      :close-on-click-modal="false"
      :before-close="handleRefuseClose"
      >
      <el-form label-width="380px">
        <div class="row" style="position:relative; height:100px;">
            <span style="position:absolute;left:0">*拒绝理由:</span>
            <textarea
              v-model="refuseReason.centnsa"
              rows="1"
              cols="40"
              style="border-radius:4px;position:absolute;width:228px;right:0;resize:none;max-height:100px;padding:5px;overflow:scroll;overflow-y:hidden;overflow-x:hidden"
              onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},10);"
              onblur="clearInterval(this.clock);"
            />
            <p v-if="tips.reason" class="tips" style="position:absolute;top:27px;left:102px;font-size:12px;color:#f44;">必填</p>
          </div>
          <div class="btn confirm" style="cursor:pointer" @click="didRefuse">确认</div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import Table from './TableList'
import Pages from '../Pages'
// import DetailDialog from './DetailDialog'
export default {
  name: 'AuditChanges',
  data () {
    return {
      showRecord: false,
      formLabelWidth: '120px', // 记录表格宽度
      RecordialogFormVisible: false,
      tips: {
        reason: false, // 拒绝理由是否填写
      },
      refuseReason: {
        centnsa: ""
      },
      refuseFormVisible: false,
      detailFormVisible: false,
      isShowPage: true,
      isShowDetail: false,
      userInfo: { // 用户信息
      }, 
      recordData: {
      },
      judgeList: [], //审核列表
      judgeListC: [],
      detailData: {},
      pageInfo: { // 分页信息
        listRows: 10
      }
    }
  },
  components: {
    Table,
    Pages,
    // DetailDialog
  },
  created() {
    this.getUserInfo()
    console.log(this.userInfo)
    this.getJudgeList()
  },
  methods: {
    handleDetailClose() {
      this.detailFormVisible = false;
    },
    change() {
      this.isShowDetail = !this.isShowDetail
    },
    // 页码相关事件
    handleSizeChange() {
      console.log(11)
    },
    handleCurrentChange(val) {
      if (this.isMainBox) {
        this.pageInfo.page = val
        this.getHouseList()
      } else {
        this.pageInfo.page = val
        this.sendSearchRequest()
      }
      //console.log(val)
    },
    nextClickHandler(val) {
      //console.log(val, '354')
    },
    // 点击详情
    handleDetailClick(v) { 
      console.log(v.data.centn)
      v.data.checktime = v.data.checktime.slice(0,-9)
      v.data.wuye_price = v.data.wuye_price.slice(0,-9)
      let d = []
      d.push(v)
      this.isShowPage = false
      this.isShowDetail = true
      this.judgeListC = this.judgeList
      this.judgeList = d
      console.log(d,'22')
    },
    // 点击返回
    back() {
      this.isShowPage = true
      this.isShowDetail = false
      this.judgeList = this.judgeListC
    },
    // 点击审核
    handleJudgeClick(v) { 
      this.detailFormVisible = true
      this.detailData = v
      console.log(v)
      //显示审核表格
    },
    agreen() {
      // alert("同意")
      this.sendAgreenRequest() 
    },
    refuse() {
      // alert("拒绝") 
      this.detailFormVisible = false
      this.refuseFormVisible = true
      
    },
    handleRefuseClose() {
      this.refuseReason.centnsa = ''
      this.refuseFormVisible = false
      this.detailFormVisible = true
    },
    didRefuse() {
      if(this.refuseReason.centnsa){
        this.sendRefuseRequest() 
      } else {
        this.tips.reason = true
        setTimeout(() => {
          this.tips.reason = false
        }, 3000);
      }
      
    },
    sendAgreenRequest() {
      const { userHouseId } = this.detailData
      const{ token,uname } = this.userInfo
      axios.post("http://test.txsqtech.com/index/Toexamine/agree",
      {
        userHouseId,
        usname: uname
      },
      {
        headers: {
          token
        }
      }
      ).then(res => {
        if(res.data.code === 200){
          this.getJudgeList()
          this.detailFormVisible = false
          this.$message({
            message: "已同意",
            type: "success"
          })
        }
        console.log(res)
      })
    },
    sendRefuseRequest() {
      const { userHouseId } = this.detailData
      const { token, uname } = this.userInfo
      const { centnsa } = this.refuseReason
      axios.post("http://test.txsqtech.com/index/Toexamine/refuse",
      {
        userHouseId,
        usname: uname,
        centnsa
      },
      {
        headers: {
          token
        }
      }
      ).then(res => {
        if(res.data.code === 200){
          this.getJudgeList()
          this.refuseFormVisible = false
          this.refuseReason.centnsa = ''
          this.$message({
            message: "已拒绝",
            type: "success"
          })
        }
        console.log(res)
      })
    },
    // 点击修改
    handleModifyClick(v) {
      // alert("modify")
    },
    // 点击住户
    handleUserClick(v) {
      // alert("user")
    },
    // 点击车位
    handleCarClick(v) {
      // alert("car")
    },
    // 点击记录
    handleRecordClick(v) {
      this.recordData = v
      this.showRecord = true
      this.RecordialogFormVisible = true
      console.log(v)
      // alert("record")
    },
    getMesFromChild(v) { //获取子组件传递过来的值
      console.log(v,'22222222222')
    },
    //从本地获取登录用户信息
    getUserInfo() {
      const local = JSON.parse(localStorage.getItem('userInfo'))
      this.userInfo.token = local.token
      this.userInfo.Communityid = local.data.Communityid
      this.userInfo.uname = local.data.uname
    },
    //获取审核列表
    getJudgeList() {
      const { Communityid, token } = this.userInfo
      axios.post('http://test.txsqtech.com/index/Toexamine/examine',
      {
        Communityid,
        page: '1',
        count: '10'
      },
      {
        headers: {
          token
        }   
      }).then(res => {
        if(res.data.code === 200) {
            this.judgeList = res.data.msg.data
            this.pageInfo.page = Number(res.data.msg.page)
            this.pageInfo.pageNum = res.data.msg.pageNum
            this.pageInfo.total = res.data.msg.total
            

        }
        console.log(this.judgeList, this.pageInfo,'审核列表')
      })
    }
  }
  
}
</script>
<style lang="scss" scoped>
    // .dot{
    //   display: inline-block;
    //   z-index: 10;;
    //   width: 6px;
    //   height: 6px;
    //   border-radius: 50%;
    //   background-color: #F44;
    //   position: absolute;
    //   top: 18px;
    //   left: 248px;
    // }
      //操作记录表格样式
  /deep/.myRecordForm{
    min-width: 380px;
    max-width: 480px;
    .el-dialog__header{
      height: 30px;
      .el-dialog__title{
        position: absolute;
        top: 5px;
        font-size: 16px;
      }
      .el-dialog__headerbtn{
        top: 6px;
      }
    }
    .el-dialog__body{
      position: relative;
      padding-left: 30px;
      padding-bottom: 40px;
      .el-form-item{
        min-height: 30px;
        .el-form-item__content{
          border: 1px solid #d2d2d2;
          border-radius: 4px;
        }
        .el-input__inner{
          height: 100% !important;
        }
      }
    }
    .el-input__inner{
      cursor: default !important;
    }
    .el-form-item__label{
      text-align: left;
    }
    .btn-confirm-record{
      position: absolute;
      bottom: 10px !important;
      left: 50%;
      transform: translateX(-50%);
      background-color: #F8AC59;
      min-width: 36px;
      text-align: center;
      padding: 5px 8px;
      color: #FFFEFE;
      border-radius: 4px;
      bottom: 10px;
      cursor: pointer;
    }
  }
  /deep/.myDetailForm{
    
    width: 400px;
    .el-dialog__header{
      height: 30px;
      .el-dialog__title{
        font-size: 16px;
      }
      .el-dialog__headerbtn{
        top: 6px;
      }
    }
    .el-dialog__body{
      padding: 15px 35px; 
      .el-form{
        padding-bottom: 30px;
        position:relative;
      }
      .row{
        padding-bottom: 15px;
        span{
          display: inline-block;
        }
        .t1{
          width: 100px;
        }
        .t2{
          width: 90px;
        }
        .t3{

        }
        .t4{

        }
      }
    }
    .btn{
      padding: 5px 10px;
      position: absolute;
      bottom: 0;
      color: #fff;
      border-radius:4px;
    }
    .refuse{
      left: 30px;
      background:#5FAFE4;
    }
    .agreen{
      right: 30px;
      background:#25BAD9;
    }
    .confirm{
      background-color: #F8AC59;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>>
