<template>
  <div id="compcharge">
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
    <div slot="header" class="clearfix">
      <div class="box-header">
        <!-- <span class="add-btn" @click="clickCharge">收费</span>  -->
        <span class="search-btn" @click="handleSearch">搜索</span>
        <el-input
          v-model="searchData"
          class="sreach-box"
          clearable
          placeholder="输入"
        />
      </div>
    </div>
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
      <!-- 退款列表  -->
      <el-table
        empty-text="暂无数据"
        :data="tableData"
        row-class-name="myRow"
        cell-class-name="myCell"
        style="width: 100%; height:100%;"
      >
        <el-table-column prop="feelname" label="项目名称" width="80" />
        <el-table-column prop="enterprise" label="公司名称" width="80" />

        <el-table-column prop="enterprisename" label="联系人" width="80" />
        <el-table-column prop="enterprisephone" label="联系电话" width="80" />
        <el-table-column prop="money" label="收费金额(元)" width="100" />
        <el-table-column prop="money" label="余额(元)" width="80" />
        <el-table-column prop="Start_time" label="起止时间" width="150" />
        <el-table-column prop="ticket" label="打票状态" width="80" />
        <el-table-column prop="center" label="备注" width="80" class="note" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-modify"
              @click="handleDetailClick(scope.row)"
            >退款详情</el-button>
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-record"
              @click="handleRecordClick(scope.row)"
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
  name: 'CompCharge',
  data() {
    return {
      searchData: '', // 搜索的内容
      // 分页信息
      pageInfo: {
        page: 1, // 当前页
        total: 5, // 总条数
        listRows: 10, // 每页多少条
        pageNum: null, // 总页数
        render: ''
      },
      tableData: [
        // {
        //   "feelname":'test',//项目名字
        //   "enterprise":'',//公司名字
        //   "enterprisename":'',//联系人
        //   "enterprisephone":'',//联系电话
        //   "money":'',//收费金额
        //   "method":'',//1为微信2为支付宝3为现金4为银行卡
        //   "Start_time":'',//起止时间
        //   "ticket":'',//打票状态
        //   "center":'',//备注
        //   "uname":'',//收费人
        //   "time":'',//收费时间
        //   "ticketname":'',//打票人
        //   "tickettime":'',//打票时间
        //   "name":'',//退款人
        //   "tuimoney":'',//退款金额
        //   "tuitime":'',//退款时间
        //   "tuiimg":'',//退款凭证
        //   "tuiconten":'',//退款备注
        //     "shenname":'',//审核人
        //   "shenconten":'',//审核备注
        //   "shentime":'',//审核时间
        // }
      ]
    }
  },
  created() {
    this.getRefundList()
  },
  methods: {
    handleDetailClick() {
      alert('详情')
    },
    handleRecordClick() {
      alert('记录')
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
      this.getChargeList()
    },
    nextClickHandler(val) {
      console.log(val, '354')
    },
    // 请求列表
    getRefundList() {
      const token = JSON.parse(localStorage.getItem('userInfo')).token
      axios.post(`http://test.txsqtech.com/index/Fees/refundlist`, { Communityid: '15' },
        {
          headers: {
            token
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            // alert('得到退款列表')
            this.pageInfo.total = res.data.msg.total
            this.pageInfo.listRows = res.data.msg.listRows
            this.pageInfo.pageNum = res.data.msg.pageNum
            this.tableData = res.data.msg.data
            console.log(res.data.msg, '退款列表')
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  #compcharge{
    position: relative;
    height: 80%;
    background-color: #ddd;
    .table-box{ //table
      position: absolute;
      width: 100%;
      top: 60px;
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
