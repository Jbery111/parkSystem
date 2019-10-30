
<template>
  <div id="HouseType">
    <!-- 三级菜单出口 -->
    <!-- <router-view /> -->
    <!--
    <div class="top-button-box">
      <span class="btn1">收费</span>
      <span class="search-box">
        <input type="text">
      </span>

    </div>-->

    <!--搜索栏-->
    <div slot="header" class="clearfix">
      <div class="box-header">
        <span class="add-btn" @click="clickAddHouseType">添加房屋类型</span>
        <!-- <span class="search-btn" @click="handleSearch">搜索</span>
        <el-input
          v-model="searchData"
          class="sreach-box"
          clearable
          placeholder="输入"
        />-->
      </div>
    </div>
    <!-- 分页 -->
    <div class="block">
      <p
        class="record-data"
      >共{{ Math.ceil(pageInfo.total/pageInfo.listRows) }}页,{{ pageInfo.total }}条</p>
      <el-pagination
        background
        :page-size="pageInfo.listRows"
        layout="prev, pager, next, jumper"
        :total="pageInfo.total"
        :current-page="pageInfo.page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @next-click="nextClickHandler"
      />
    </div>
    <!-- 操作记录 -->
    <el-dialog
      title="操作记录"
      :modal="true"
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="RecordialogFormVisible"
      custom-class="myRecordForm"
    >
      <el-form :model="recordData">
        <el-form-item label="上次操作员:" :label-width="formLabelWidth">
          <el-input v-model="recordData.uname" :disabled="true" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上次操作时间:" :label-width="formLabelWidth">
          <el-input v-model="recordData.time" :disabled="true" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上次操作IP地址:" :label-width="formLabelWidth">
          <el-input v-model="recordData.ip" :disabled="true" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div class="btn-confirm-record" @click="RecordialogFormVisible=false">确认</div>
    </el-dialog>
    <!-- 添加表格 -->
    <el-dialog
      title="添加房屋类型"
      custom-class="myAddForm"
      class="position:fixed;top:10px;"
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="AdddialogVisible"
      :before-close="handleAddClose"
      
      >
      <el-form ref="form" :model="addData" label-width="80px" >
        <el-form-item label="房屋类型:">
          <el-input v-model.trim="addData.typename" @input="addData.typeTip.isExist=false" />
          <!-- <span class="tips" >{{addData.typename?'':'请填写房屋类型'}}</span> -->
          <span v-show="isShowTip" class="tips">{{ addData.typename===''?addData.typeTip.tips[1]:(addData.typeTip.isExist?addData.typeTip.tips[2]:addData.typeTip.tips[0]) }}</span>
        </el-form-item>
        <el-form-item label="物业单价:">
          <el-input v-model.trim="addData.money" @input="addData.money = addData.money.replace(/[^\d.^\d{1,2}]/g,'')" />
          <!-- <el-input v-model.number="modifyData.money" /> -->
          <span v-show="isShowTip&&addData.typename!==''" class="tips">{{ addData.money?((/^\d+\.?\d{0,2}$/).test(addData.money)?'':'请输入正确的价格'):'请填写价格' }}</span>
        </el-form-item>
        <div class="addNow" style="cursor:pointer" @click="clickConfirmAdd">确认添加</div>
      </el-form>
    </el-dialog>
    <!-- 修改表格 -->
    <el-dialog
      title="修改房屋类型"
      custom-class="myAddForm"
      :close-on-click-modal="false"
      class="position:fixed;top:10px;"
      :append-to-body="true"
      :visible.sync="ModifydialogVisible"
      :before-close="handleAddClose1"
    >
      <el-form ref="form" :model="modifyData" label-width="80px">
        <el-form-item label="房屋类型:">
          <el-input v-model.trim="modifyData.typename" @input="modifyData.typeTip.isExist=false" />
          <!-- <span class="tips" >{{addData.typename?'':'请填写房屋类型'}}</span> -->
          <span v-show="isShowTip" class="tips">{{ modifyData.typename===''?modifyData.typeTip.tips[1]:(modifyData.typeTip.isExist?modifyData.typeTip.tips[2]:modifyData.typeTip.tips[0]) }}</span>
        </el-form-item>
        <el-form-item label="物业单价:">
          <el-input v-model.trim="modifyData.money" />
          <!-- <el-input v-model.number="modifyData.money" /> -->
          <span v-show="isShowTip&&modifyData.typename!==''" class="tips">{{ modifyData.money?((/^\d+\.?\d{0,2}$/).test(modifyData.money)?'':'请输入正确的价格'):'请填写价格' }}</span>
        </el-form-item>
        <div class="addNow" style="cursor:pointer" @click="clickConfirmModify">确认修改</div>
      </el-form>
    </el-dialog>

    <div class="table-box">
      <!-- 退款列表  -->
      <el-table
        empty-text="暂无数据"
        :data="tableData"
        row-class-name="myRow"
        cell-class-name="myCell"
        style="width: 100%; height:100%;"
      >
        <el-table-column prop="typea" label="房屋类型" min-width="300" />
        <el-table-column prop="pacic" label="物业费单价(元)" min-width="300" />
        <el-table-column
          label="操作"
          fixed="right"
          min-width="150"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-modify"
              @click="handleModifyClick(scope.row)"
            >修改</el-button>
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-record"
              @click="handleRecordClick(scope.row)" style="width:83px;"
            >操作记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// require('@assets/styles/myChargeStyle')
import axios from 'axios'
export default {
  name: 'HouseType',
  data() {
    return {
      selfType: '',
      isShowTip: false,
      account: '',
      inputMaxL: '',
      token: '',
      searchData: '', // 搜索的内容
      // 分页信息
      pageInfo: {
        page: 1, // 当前页
        total: 1, // 总条数
        listRows: 1, // 每页多少条
        pageNum: 1, // 总页数
        render: ''
      },
      // 操作记录
      formLabelWidth: '120px', // 记录表格宽度
      RecordialogFormVisible: false,
      recordData: {},

      existedType: [], // 已近存在的房屋类型
      tableData: [
        // {
        //   "oid":32,//房屋主键id
        //   "typea":"住宅",//房屋类型名字
        //   "Communityid":15,//小区id
        //   "time":1571299120,//添加修改时间
        //   "pacic":1.8,//物业单价
        //   "uname":"李永爱",//操作人名字
        //   "ip":"127.0.0.1",//ip地址
        //   "typexiu":null,//修改前的类容
        //   "pacics":null//修改前的物业费单价
        //   }
      ],
      AdddialogVisible: false, // 添加框
      ModifydialogVisible: false, // 修改框
      addData: {
        'Communityid': '', // 小区id
        'typename': '', // 房屋类型名称
        'typeTip': {
          isExist: false,
          tips: ['', '请填写房屋类型', '房屋类型已经存在']
        },
        'money': '', // 房屋单价,
        'uname': '' // 用户名字(操作人名字),
      },
      modifyData: {
        'Communityid': '', // 小区id
        'oid': '', // 房屋类型id
        'typename': '', // 房屋类型名称
        'money': '', // 房屋单价
        'uname': '', // 用户名字(操作人名字),
        'typeTip': {
          isExist: false,
          tips: ['', '请填写房屋类型', '房屋类型已经存在']
        }
      },
      userInfo: '' // 登录用户相关信息
    }
  },
  watch: {
    'modifyData.money': {
      handler(n, o) {
        n = String(n)
        if (Number(n) == n) {
          if (n.includes('.')) {
            this.modifyData.money = n.slice(0, n.indexOf('.') + 3)
          }
        } else {
          this.modifyData.money = o
        }
      },
      deep: true,
      immediate: true
    },
    'addData.money': {
      handler(n, o) {
        n = String(n)
        if (Number(n) == n) {
          if (n.includes('.')) {
            this.addData.money = n.slice(0, n.indexOf('.') + 3)
          }
        } else {
          this.addData.money = o
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.userInfo = this.getUserInfo()
    // console.log('用户信息如下', this.userInfo)
    this.token = JSON.parse(localStorage.getItem('userInfo')).token
    this.getHouseList()
  },
  methods: {
    getUserInfo() {
      return JSON.parse(localStorage.getItem('userInfo')).data
    },
    // 格式化时间
    formatDate(now) {
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var date = now.getDate()
      var hour = now.getHours()
      var minute = now.getMinutes()
      var second = now.getSeconds()
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    },
    handleRecordClick(v) {
      console.log(v)
      var d = new Date(v.time * 1000) // 创建一个指定的日期对象
      console.log(v.time, d, this.formatDate(d))
      this.RecordialogFormVisible = true
      this.recordData.ip = v.ip // ip
      this.recordData.time = this.formatDate(d) // 操作时间
      this.recordData.uname = v.uname // 操作人员
      console.log(this.recordData, 'record数据')
      // alert('记录')
    },
    // 点击收费
    clickAddHouseType() {
      this.AdddialogVisible = true
    },
    // 点击修改
    handleModifyClick(v) {
      this.selfType = v.typea
      this.modifyData.typename = v.typea
      this.modifyData.oid = v.oid
      this.modifyData.money = v.pacic
      // console.log(v)
      this.ModifydialogVisible = true
    },
    /* 添加表单相关事件 */
    // 确认添加
    clickConfirmAdd() {
      this.isShowTip = true
      setTimeout(() => {
        this.isShowTip = false
      }, 3000)
      // if (this.existedType.includes(this.addData.typename)) {
      //   this.addData.typeTip.isExist = true // 显示已存在
      // }
      if ( this.addData.money !== '' && (/^\d+\.?\d{0,2}$/).test(this.addData.money)) {
        this.sendAddRequest()
      } else {
        // this.$message({
        //   message: '请先完善相关信息',
        //   type: 'warning'
        // })
      }
    },
    handleAddClose() {
      this.isShowTip = false
      this.AdddialogVisible = false
      this.clearAddData()
    },
    /* 修改表单相关事件 */
    // 确认修改
    clickConfirmModify() {
      this.isShowTip = true
      setTimeout(() => {
        this.isShowTip = false
      }, 3000)

      // if (this.existedType.includes(this.modifyData.typename)) {
      //   this.modifyData.typeTip.isExist = true // 新改的名字已存在
      // }
      if (this.selfType === this.modifyData.typename) {
        this.modifyData.typeTip.isExist = false // 只改动该房屋类型的价格
      }
      if (this.modifyData.typename !== '' && (/^\d+\.?\d{0,2}$/).test(this.modifyData.money)) {
        this.sendModifyRequest()
      } else {
        // this.$message({
        //   message: '请先完善相关信息',
        //   type: 'warning'
        // })
      }
    },
    handleAddClose1() {
      this.isShowTip = false
      this.ModifydialogVisible = false
      this.clearModifyData()
    },

    // 点击搜索
    handleSearch() {

    },
    // 页码相关事件
    handleSizeChange() {
      console.log(11)
    },
    handleCurrentChange(val) {
      console.log(val)
      this.pageInfo.page = val
      this.getHouseList()
    },
    nextClickHandler(val) {
      console.log(val, '354')
    },
    // 请求列表
    getHouseList() {
      // console.log(this.userInfo)
      axios.post(`http://test.txsqtech.com/index/Housing/query?page=${this.pageInfo.page}`, { Communityid: this.userInfo.Communityid },
        {
          headers: {
            token: this.token
          }
        })
        .then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            this.pageInfo.total = res.data.data.total
            this.pageInfo.listRows = res.data.data.listRows
            this.pageInfo.pageNum = res.data.data.pageNum
            this.tableData = res.data.data.data
            // if (res.data.data.data.length > 0) {
            //   res.data.data.data.forEach((item) => {
            //     this.existedType.push(item.typea) // 记录已有的房屋类型
            //   })
            // }
            console.log(this.existedType)
          }
        })
    },
    // 添加请求
    sendAddRequest() {
      const { typename, money } = this.addData
      const { Communityid, uname } = this.userInfo
      if (this.addData.typename !== '') {
        axios.post('http://test.txsqtech.com/index/Housing/addto',
          {
            Communityid, // 小区id,
            uname, // 用户名字(操作人名字),
            typename, // 房屋类型名称,
            money // 房屋单价,
          },
          {
            headers: {
              token: this.token
            }
          }).then(res => {
          if (res.data.code === 200) {
            this.isShowTip = false
            // this.pageInfo.page = this.pageInfo.pageNum
            this.getHouseList()
            //console.log(res)

            this.AdddialogVisible = false // 关闭添加
            setTimeout(() => {
              this.addData = { // 还原数据
                'Communityid': '', // 小区id
                'typename': '', // 房屋类型名称
                'typeTip': {
                  isExist: false,
                  tips: ['', '请填写房屋类型', '房屋类型已经存在']
                },
                'money': '', // 房屋单价,
                'uname': '' // 用户名字(操作人名字),
              }
            }, 1000)
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          } else if(res.data.code === 300){
            this.addData.typeTip.isExist = true
            // this.$message({
            //   message: '呦呦呦呦了',
            //   type: 'warning'
            // })
          }
           else if (res.data.code === 401) {
            this.$message({
              message: '添加失败',
              type: 'error'
            })
          }
        })
      }
    },
    clearModifyData() {
      this.modifyData = {
        'Communityid': '', // 小区id
        'oid': '', // 房屋类型id
        'typename': '', // 房屋类型名称
        'money': '', // 房屋单价
        'uname': '', // 用户名字(操作人名字),
        'typeTip': {
          isExist: false,
          tips: ['', '请填写房屋类型', '房屋类型已经存在']
        }
      }
    },
    clearAddData() {
      this.addData = {
        'Communityid': '', // 小区id
        'oid': '', // 房屋类型id
        'typename': '', // 房屋类型名称
        'money': '', // 房屋单价
        'uname': '', // 用户名字(操作人名字),
        'typeTip': {
          isExist: false,
          tips: ['', '请填写房屋类型', '房屋类型已经存在']
        }
      }
    },
    // 修改请求
    sendModifyRequest() {
      console.log('修改的请求数据', this.modifyData)
      const { oid, typename, money } = this.modifyData
      const uname = this.userInfo.uname
      axios.post('http://test.txsqtech.com/index/Housing/updete',
        {
          oid, typename, money, uname
        },
        {
          headers: {
            token: this.token
          }
        }).then(res => {
        if (res.data.code === 200) {
          setTimeout(() => {
            this.clearModifyData()
          }, 1000)
          this.isShowTip = false
          this.pageInfo.page = this.pageInfo.page
          this.ModifydialogVisible = false // 关闭添加
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getHouseList()
        } else if (res.data.code === 300) {
          // this.$message({
          //   message: 'eeeeeYoule',
          //   type: 'warning'
          // })
          this.modifyData.typeTip.isExist = true
        } else if (res.data.code === 10000) {
          this.$message({
            message: '请重新登录',
            type: 'warning'
          })
        } else if (res.data.code === 401) {
          this.$message({
            message: '您未修改任何内容或修改失败',
            type: 'warning'
          })
          this.ModifydialogVisible = false
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  /deep/.btn-modify{
    background: #25bad9;
  }
  /deep/.btn-record{
    background-color: #bfbfbf;
  }
  /deep/.operateBtn{
    color: #fff;
    display: inline-block;
    border-radius: 4px;
    height: 32px;
    width: 56px;
    padding: 4px;
    font-size: 14px;
  }
  //添加表单样式
  /deep/ .myAddForm{
    padding-bottom: 24px;
    width: 26.04%;
    height: 28.5%;
    border-radius: 4px;
    margin-top:35vh !important;
    .el-dialog__header{ //header
        border-bottom: 1px solid #eff2f5;
          padding: 14px 0 10px 20px !important;
        .el-dialog__title{
          color: #333333;
        }
      }
      .el-dialog__body{
        padding: 24px 60px;
      }
    .addNow{
      height: 35px;
      padding: 0 8px;
      position: absolute;
      background-color: #F8AC59;
      line-height: 35px;
      color: #FFFEFE;
      font-size: 16px;
      border-radius: 4px;
      width: 103px;
      text-align: center;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
    }
    .el-form-item{
      height: 40px !important;
      margin-bottom: 25px;
      .el-form-item__label{ //lable
        color: #666666;
      font-size: 16px;
        
      }
      .el-form-item__content{ //content
        border: 1px solid #D2D2D2;
        border-radius: 4px;
        height: 100%;
        .tips{ //tips
          color: red;
          font-size: 14px;
          position: absolute;
          bottom: -31px;
          left: 0;
        }
      }
    }
  }
  //操作记录表格样式
  /deep/.myRecordForm{
    min-width: 500px;
    .el-form-item__content{
      border: 1px solid #d2d2d2;
      border-radius: 4px;
      cursor: default;
      .el-input__inner{
        cursor: default !important;
      }
    }
    .el-form-item__label{
      text-align: left;
    }
    .btn-confirm-record{
      position: absolute;
      bottom: 0;
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

  #HouseType{
    position: relative;
    height: 90%;
    margin: 30px 20px;
    background-color: #fff;
    .table-box{ //table
      position: absolute;
      width: 100%;
      top: 44px;
      height: 618px;
      bottom: 32px;
      /deep/.el-table__header{
        width: 100% !important;
      }
      /deep/.myRow {
        height: 30px;
        padding: 0;
      }
      /deep/.myRow > td {
        padding: 12px 0 12px 0;
      }
      /deep/.myCell {
        border-collapse: collapse;
      }
    }
    .page-box{
      position: absolute;
      bottom: 0;
    }
    .my-pagination-box{
      display: inline-block;
    }
    .top-button-box{
      position: relative;
      background-color: #999;
      height: 60px;
      .btn1{
        position: absolute;
        top: 50%;
        bottom: 50%;
        margin-top: -13px;
        left: 20px;
        width:52px;
        height: 26px;
        cursor: pointer;
        text-align: center;
        line-height: 28px;
        border-radius: 4px;
        background-color: #25BAD9;
        display: inline-block;
        color: #fff;
        padding: 0 12px;
        font-size: 14px;
      }
      .search-box{
        height: 26px;
        position: absolute;
        top: 50%;
        right: 20px;
        bottom: 50%;
        margin-top: -13px;
        input{
          outline: none;
          border: none;

        }
      }
    }

    .box-header{
      height: 26px;
      position: relative;
      .add-btn{
        cursor: pointer;
        background-color: #25BAD9;
        color: #fff;
        height: 32px;
        line-height: 32px;
        position: absolute;
        font-size: 14px;
        top: 50%;
        bottom: 50%;
        margin-top: -13px;
        padding: 0 12px;
        border-radius: 4px;
    }
    .search-btn{
        position: absolute;
        height: 26px;
        background-color: #25BAD9;
        top: 50%;
        bottom: 50%;
        right: 20px;
        margin-top: -13px;
        z-index: 9;
        color: #fff;
        font-size: 14px;
        line-height: 26px;
        padding: 0 5px;
        cursor: pointer;
      }
    .sreach-box{
      width: 200px;
      height: 26px;
      position: absolute;
      top: 50%;
      bottom: 50%;
      right: 20px;
      margin-top: -13px;
      background-color: #ddd;
      border: 1px solid #ddd;
      /deep/.el-input__inner{
        height: 100% !important;
        padding-left: 0 !important;
        cursor: default;
      }
    }
  }
  //分页器的样式
  .block {
    .record-data {
      cursor: pointer;
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
    bottom: 30px;
    right: 2vw;
    height: 40px;
    width: 100%;
    // padding-left: 90px;
    .el-pagination {
      // background-color: green;
      position: absolute;
      bottom: 0px;
      right: 50px;
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
          font-size: 10px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          outline: none;
          /deep/.el-input__inner {
            font-size: 14px;
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
            margin-left: 12px;
            outline: none;
          }
          &::before {
            content: "前往";
            color: rgba(102, 102, 102, 1);
            font-size: 0.8vw;
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
  }
</style>
