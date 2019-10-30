<template>
  <div id="compcharge">
    <el-dialog
      title="审核退款"
      custom-class="myJudgeForm"
      class="position:fixed;top:10px;"
      :append-to-body="true"
      :visible.sync="judgeFormVisible"
      :before-close="handleJudgeClose"
    >
      <el-form ref="form" :model="judgeFormData" label-width="80px">
        <el-form-item label="项目名称:">
          <el-input v-model="judgeFormData.feelname" disabled />
        </el-form-item>

        <el-form-item label="公司名称:">
          <el-input v-model="judgeFormData.enterprise" disabled />
        </el-form-item>

        <el-form-item label="起止时间:">
          <el-input v-model="judgeFormData.Start_time" disabled />
        </el-form-item>

        <el-form-item label="收费金额:">
          <el-input v-model="judgeFormData.money" disabled />
        </el-form-item>
        <el-form-item label="退款金额:">
          <el-input v-model.number="judgeFormData.refundmoney" disabled />
        </el-form-item>

        <el-form-item label="上传凭证:" style="height:60px !important;margin-top:10px;">
          <!-- 图片列表box -->
          <div ref="imgs" class="img-box">
            图片们
          </div>
        </el-form-item>

        <el-form-item label="退款原因:" style="height:45px !important;margin-top:20px;">
          <el-input v-model="judgeFormData.Remarks" style="resize:none;" resize="none" type="textarea" />
        </el-form-item>
        <el-form-item label="审核结果:" style="height:45px !important;margin-top:20px;">
          <el-input v-model="judgeFormData.judgeResult" placeholder="请输入同意/拒绝理由" style="resize:none;" resize="none" type="textarea" />
        </el-form-item>
        <div class="btn btn-disagree" @click="clickDisagree">拒绝</div>
        <div class="btn btn-agree" @click="clickAgree">同意</div>
      </el-form>
    </el-dialog>
    <!-- 三级菜单出口 -->
    <!-- <router-view /> -->
    <!--
    <div class="top-button-box">
      <span class="btn1">收费</span>
      <span class="search-box">
        <input type="text">
      </span>

    </div> -->

    <!--搜索栏-->
    <!-- <div slot="header" class="clearfix">
      <div class="box-header">
        <span class="add-btn" @click="clickCharge">收费</span>
        <span class="search-btn" @click="handleSearch">搜索</span>
        <el-input
          class="sreach-box"
          v-model="searchData"
          clearable placeholder="输入">
        </el-input>
      </div>
    </div> -->
    <!-- 分页 -->
    <div class="page-box">
      <span class="page-tip">共{{ Math.ceil(pageInfo.total/pageInfo.listRows) }}页,{{ pageInfo.total }}条</span>
      <div class="my-pagination-box">

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
    </div>

    <div class="table-box">
      <!-- 企业列表 -->
      <el-table
        empty-text="暂无数据"
        :data="tableData"
        row-class-name="myRow"
        cell-class-name="myCell"
        style="width: 100%; height:100%;"
      >
        <el-table-column prop="uname" label="退款申请人" width="100" />
        <el-table-column prop="feelname" label="项目名称" width="80" />
        <el-table-column prop="enterprise" label="公司名称" width="80" />
        <el-table-column prop="money" label="收费金额" width="100" />
        <el-table-column prop="refundmoney" label="退款金额" width="80" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-modify"
              @click="handleJudge(scope.row)"
            >审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
// require('@assets/styles/myChargeStyle')
import axios from 'axios'
// import { type } from 'os'
export default {
  name: 'CompCharge',
  data() {
    return {
      searchData: '', // 搜索的内容
      // 分页信息
      pageInfo: {
        page: 1, // 当前页
        total: null, // 总条数
        listRows: null, // 每页多少条
        pageNum: null, // 总页数
        render: ''
      },
      tableData: [
        // {
        //   "wid":1,//账单id
        //   "feelname":'dfds',//项目名字
        //   "enterprise":'czxc',//公司名字
        //   "Start_time":'',//起止时间
        //   "money":'100',//收费金额
        //   "img":'',//退款凭证
        //   "Remarks":'scc',//退款备注
        //   "refundmoney":'sxcsz',//退款金额
        //   "uname":'sd',//退款申请人
        // }
      ],
      // 审核退款表单
      judgeFormVisible: false,
      judgeFormData: {
        feelname: '',
        enterprise: '',
        Start_time: '',
        money: '',
        refundmoney: '',
        Remarks: '',
        judgeResult: ''
      }
    }
  },
  created() {
    this.getJudgeList()
  },
  methods: {
    // 点击收费
    clickCharge() {

    },
    // 点击搜索
    handleSearch() {

    },
    // 点击审核
    handleJudge(v) {
      console.log(v)
      this.judgeFormData.feelname = v.feelname
      this.judgeFormData.enterprise = v.enterprise
      this.judgeFormData.Start_time = v.Start_time
      this.judgeFormData.money = v.money
      this.judgeFormData.refundmoney = v.refundmoney
      this.judgeFormData.Remarks = v.Remarks
      const img = v.img.split(',')
      const imgSrc = []
      img.forEach(item => {
        item = 'http://test.txsqtech.com/uploads/' + item
        imgSrc.push(item)
      })
      console.log(imgSrc)
      setTimeout(() => {
        console.log(this.$refs.imgs)
        const p = this.$refs.imgs
        const img = document.createElement('img')
        imgSrc.forEach((item) => {
          img.src = item
          p.appendChild(img)
        })
      }, 0)

      this.judgeFormVisible = true
    },
    // 页码相关事件
    handleSizeChange() {
      console.log(11)
    },
    handleCurrentChange(val) {
      console.log(val)
      this.pageInfo.page = val
      this.getChargeList()
    },
    nextClickHandler(val) {
      console.log(val, '354')
    },
    // 关闭审核
    handleJudgeClose() {
      this.judgeFormVisible = false
      this.judgeFormData.judgeResult = ''
    },
    clickDisagree() {
      const token = JSON.parse(localStorage.getItem('userInfo')).token
      axios.post(`http://test.txsqtech.com/index/Fees/agrees`,
        {
          'wid': '15', // 账单id
          'Remarksa': '拒绝', // 审核备注
          'uname': 'zx'// 用户姓名
        },
        {
          headers: {
            token
          }
        }
      ).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '已拒绝',
            type: 'success'
          })
        }
        // 清空输入
        console.log(res)
      })

      alert('拒绝')
    },
    clickAgree() {
      const token = JSON.parse(localStorage.getItem('userInfo')).token
      axios.post(`http://test.txsqtech.com/index/Fees/agree`,
        {
          'wid': '15', // 账单id
          'Remarksa': '同意', // 审核备注
          'uname': 'zx'// 用户姓名
        },
        {
          headers: {
            token
          }
        }
      ).then(res => {
        this.judgeFormVisible = false
        if (res.data.code === 200) {
          this.$message(
            {
              type: 'success',
              message: '审核同意'
            }
          )
        }
        console.log(res)
      })
    },
    // 请求列表
    getJudgeList() {
      const token = JSON.parse(localStorage.getItem('userInfo')).token
      axios.post(`http://test.txsqtech.com/index/Fees/texamine`,
        { Communityid: '15' },
        {
          headers: {
            token
          }
        }
      )
        .then(res => {
          if (res.data.code === 200) {
            // alert('成功得到')
            this.pageInfo.total = res.data.msg.total
            this.pageInfo.listRows = res.data.msg.listRows
            this.pageInfo.pageNum = res.data.msg.pageNum
            this.tableData = res.data.msg.data
          }
          console.log(res.data.msg.data, '审核列表')
        })
    }
  }
}
</script>
<style lang="scss" scoped>
 /deep/.myJudgeForm{
    width: 500px;
    height: 600px;
    margin-top: 0 !important;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    .el-dialog__header{
      position: relative;
      height: 40px;
      border-bottom: 1px solid #eff2f5;
      .el-dialog__title{
        position: absolute;
        left: 20px;
        top: 0;
        line-height: 40px;
      }
      .el-dialog__headerbtn{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 20px;

      }
    }
    .el-dialog__body{
      padding-top: 21px !important;
      .el-form{
        .img-box{
          background-color: #eee;
          height: 60px;
          img{
            height: 60px;
            width: 60px;
          }
        }
        .el-form-item{
          height: 40px !important;
          margin-bottom: 10px !important;
        }
        .btn{
          position: absolute;
          padding: 4px 12px;
          bottom: 20px;
          cursor: pointer;
          color: #fff;
          border-radius: 4px;
        }
        .btn-disagree{
          left: 30px;
          background-color: #5FAFE4;
        }
        .btn-agree{
          right: 30px;
          background-color: #25BAD9;
        }
      }
    }
  }
  #compcharge{
    position: relative;
    height: 80%;
    background-color: #ddd;
    .table-box{ //table
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 32px;
      /deep/.el-table__header{
        width: 100% !important;
      }
      /deep/.el-table__body{

      }
      /deep/.myRow {
        height: 30px;
        padding: 0;
      }
      /deep/.myRow > td {
        padding: 0;
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
    height: 60px;
    position: relative;
    .add-btn{
      cursor: pointer;
      background-color: #25BAD9;
      color: #fff;
      height: 26px;
      position: absolute;
      top: 50%;
      bottom: 50%;
      left: 20px;
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
      }
    }
  }

  }
</style>
