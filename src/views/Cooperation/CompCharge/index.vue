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
    <!-- 申请退款 -->
    <el-dialog
      title="申请退款"
      custom-class="myRefoundForm"
      class="position:fixed;top:10px;"
      :append-to-body="true"
      :visible.sync="refoundFormVisible"
      :before-close="handleRefoundClose"
    >
      <el-form ref="form" :model="refoundFormData" label-width="80px">
        <el-form-item label="项目名称:">
          <el-input v-model="refoundFormData.feelname" disabled />
        </el-form-item>

        <el-form-item label="公司名称:">
          <el-input v-model="refoundFormData.enterprisename" disabled />
        </el-form-item>

        <el-form-item label="起止时间:">
          <el-input v-model="refoundFormData.Start_time" disabled />
        </el-form-item>

        <el-form-item label="收费金额:">
          <el-input v-model="refoundFormData.money" disabled />
        </el-form-item>
        <el-form-item label="退款金额:">
          <el-input v-model.number="refoundFormData.tuimoney" @input="valifyMoney" />
          <p v-show="moneyTip">退款金额不能大于收款金额!</p>
        </el-form-item>

        <el-form-item label="上传凭证:" style="height:60px !important;margin-top:10px;">
          <!-- 图片列表box -->
          <div class="up-img">
            <el-upload
              :limit="3"
              action="#"
              :on-remove="handleRemove"
              :on-preview="handlePictureCardPreview"
              :on-change="handleChange"
              list-type="picture-card"
              :auto-upload="false"
            >
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt>
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in" />
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download" />
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete" />
                  </span>
                </span>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <p v-show="imgTip">凭证不能为空</p>

        <!-- 图片预览box -->
        <el-dialog
          style="width:100%;background:#999;padding-top:90px;"
          :visible.sync="ImgDiaLog.add"
          title="pic1"
          :modal="true"
          :append-to-body="true"
          :fullscreen="true"
        >
          <img width="100%;height:100%;" :src="ImgDiaLog.addSrc" alt>
        </el-dialog>

        <el-form-item label="退款理由:" style="height:125px !important;margin-top:20px;">
          <el-input v-model="refoundFormData.tuiconten" placeholder="退款理由" style="resize:none;" type="textarea" @input="valifyReason" />
          <p v-show="reasonTip">退款理由不能为空</p>
        </el-form-item>

        <div class="applyNow" @click="onSubmitRefound">申请退款</div>
      </el-form>
    </el-dialog>

    <!--搜索栏-->
    <div slot="header" class="clearfix">
      <div class="box-header">
        <span v-show="isSearch">
          <span class="add-btn" @click="handleBack">返回</span>
        </span>
        <span v-show="!isSearch">
          <span class="add-btn" @click="clickCharge">收费</span>
        </span>

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
      <!-- 收费列表  -->
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
              class="operateBtn btn-print"
              @click="handlePrintTicket(scope.row)"
            >打票</el-button>
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-refound"
              @click="handleTuikuan(scope.row)"
            >申请退款</el-button>
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-record"
              @click="handleRecordClick(scope.row)"
            >操作记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 操作记录 -->

      <el-dialog
        title="操作记录"
        :modal="true"
        :append-to-body="true"
        :visible.sync="RecordialogFormVisible"
        custom-class="myRecordForm"
      >
        <el-form :model="recordData">
          <el-form-item label="收费人" :label-width="formLabelWidth">
            <el-input v-model="recordData.uname" autocomplete="off" />
          </el-form-item>
          <el-form-item label="收费时间" :label-width="formLabelWidth">
            <el-input v-model="recordData.time" :disabled="true" autocomplete="off" />
          </el-form-item>
          <el-form-item label="打票人" :label-width="formLabelWidth">
            <el-input v-model="recordData.ticketname" autocomplete="off" />
          </el-form-item>
          <el-form-item label="打票时间" :label-width="formLabelWidth">
            <el-input v-model="recordData.tickettime" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div class="btn-confirm-record" @click="RecordialogFormVisible=false">确认</div>
      </el-dialog>

      <!-- 添加收费 -->
      <el-dialog
        title="收费"
        custom-class="myAddForm"
        class="position:fixed;top:10px;"
        :append-to-body="true"
        :visible.sync="AdddialogVisible"
        :before-close="handleClose"
      >
        <el-form ref="form" :model="addData" label-width="80px">
          <el-form-item label="项目名称:">
            <el-input v-model="addData.feelname" />
            <span class="tips">{{ addData.feelname?'':'请输入项目名称' }}</span>
          </el-form-item>

          <!-- <el-form-item label="公司ID:">
            <el-input v-model="addData.enterpriseId" />
            <span class="tips" >{{addData.enterpriseId?'':'请输入公司名称'}}</span>
          </el-form-item> -->
          <el-form-item label="公司名称:">
            <el-select v-model="addData.enterpriseId" filterable placeholder="请选择">
              <el-option
                v-for="item in companys"
                :key="item.enterpriseId"
                :label="item.Companyname"
                :value="item.enterpriseId"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="收费金额:">
            <el-input v-model="addData.money" />
            <span class="tips">{{ addData.money?'':'请输入收费金额' }}</span>
          </el-form-item>

          <el-form-item label="开始时间:">
            <el-input v-model="addData.start_time" />
            <span class="tips">{{ addData.start_time?'':'请输入开始时间' }}</span>
          </el-form-item>

          <el-form-item label="结束时间:">
            <el-input v-model="addData.end_time" />
            <span class="tips">{{ addData.end_time?'':'请输入结束时间' }}</span>
          </el-form-item>

          <el-form-item label="备注:" style="height:40px !important;margin-top:30px; resixe:none">
            <el-input v-model="addData.center" style="resize:none;" type="textarea" />
          </el-form-item>
          <el-form-item label="支付方式:" style="height:50px !important;margin-top:0px;">
            <el-radio-group v-model="addData.method">
              <el-radio label="1" value="1">微信</el-radio>
              <el-radio label="2" value="2">支付宝</el-radio>
              <el-radio label="3" value="3">现金</el-radio>
              <el-radio label="4" value="4">银行卡</el-radio>
            </el-radio-group>
            <span class="tips" style="display:block;">{{ addData.method?'':'请输入支付方式' }}</span>
          </el-form-item>

          <div class="addNow" style="cursor:pointer" @click="onSubmit">立即添加</div>
        </el-form>

      </el-dialog>
    </div>

    <el-dialog
      title="提示"
      :modal="true"
      :append-to-body="true"
      :visible.sync="TipdialogVisible"
      custom-class="isPrint-box"
    >
      <p>当前收费 <span class="price">{{ chargeMoney }}</span>收费后是否需要立即打票 </p>
      <div class="btn-confirm-record1" @click="TipdialogVisible=false">不需要</div>
      <div class="btn-confirm-record2" @click="handlePrintTicket">立即打票</div>
    </el-dialog>

  </div>
</template>

<script>
// require('@assets/styles/myChargeStyle')
import axios from 'axios'
export default {
  name: 'CompCharge',
  data() {
    return {
      commonData: {
        token: '',
        Communityid: '',
        uname: ''
      },
      refoundFormVisible: false, // 退款弹窗
      refoundFormData: {
        'feelname': '篮球比赛', // 项目名字
        'enterprise': 'bbb', // 公司名字
        'Start_time': '2018', // 起止时间
        'money': '99', // 收费金额

        'tuimoney': '', // 退款金额
        'tuiimg': '', // 退款凭证
        'tuiconten': ''// 退款理由
      },
      ImgDiaLog: { // 图片弹窗显示与否
        add: false,
        addSrc: ''
      },

      refoundInfo: {
        'wid': '15', // 账单id
        'money': '11', // 退款金额
        'uname': 'mm', // 用户姓名
        'Remarks': 'zzz' // 退款备注
      },
      moneyTip: false,
      reasonTip: false,
      imgTip: false,
      fileLists: [], // 退款的凭证图片
      isSearch: false,
      searchData: '', // 搜索的内容
      // 分页信息
      pageInfo: {
        page: 1, // 当前页
        total: null, // 总条数
        listRows: null, // 每页多少条
        pageNum: null, // 总页数
        render: ''
      },
      TipdialogVisible: false, // 收费后是否打票
      AdddialogVisible: false, // 添加收费
      // 添加的收费信息
      addData: {
        'Communityid': '15', // 小区id
        'feelname': '', // 项目名字
        'enterpriseId': '', // 企业id
        'money': '', // 收费金额
        'start_time': '2018-10-10', // 开始时间
        'end_time': '2018-10-10', // 结束时间
        'center': '', // 备注
        'method': '1', // 1为微信2为支付宝3为现金4为银行卡
        'uname': 'sds'// 用户姓名
      },
      chargeMoney: '', // 打票的收费金额
      printId: '', // 添加收费后立即打票的id
      companys: [], // 已近入驻的企业
      tableData: [
        // {
        //   wid: '', // 账单id
        //   feelname: 'test', // 项目名字
        //   enterprise: 'ww', // 公司名字
        //   enterprisename: 'ee', // 公司联系人
        //   enterprisephone: '123', // 公司联系电话
        //   money: '999', // 价格
        //   Start_time: '2015-2018', // 起止时间
        //   center: '备注', // 备注
        //   method: '1', // 支付方式：1为微信2为支付宝3为现金4为银行卡
        //   ticket: '已打', // 打票状态1为未打票2未已打票
        //   time: '2019', // 操作时间
        //   uname: 'xx', // 操作人
        //   ip: '190.21.11', // 操作ip
        //   Auditor: 'bb', // 审核人
        //   times: '2019.08', // 审核时间
        //   Auditortype: '已近审核', // 审核状态
        //   ticketname: 'cc', // 打票人
        //   tickettime: '2018.06', // 打票时间
        //   Remarksa: '备注'// 审核备注
        // }
      ],
      // 操作记录
      formLabelWidth: '120px', // 记录表格宽度
      RecordialogFormVisible: false,
      recordData: {}
    }
  },
  created() {
    this.getCommonData()
    console.log(this.commonData)
    this.getChargeList()
    this.getCompanies()
  },
  // computed: {
  //   defaultCheack(){
  //     return this.addData.method.toString()
  //   }
  // },
  methods: {
    getCommonData() {
      const { uname, Communityid } = JSON.parse(localStorage.getItem('userInfo')).data
      const { token } = JSON.parse(localStorage.getItem('userInfo'))
      this.commonData.token = token
      this.commonData.uname = uname
      this.commonData.Communityid = Communityid
    },
    /* 退款表单事件 */
    // 图片事件 添加
    handleRemove(file, lis) {
      this.valifyImg()
      console.log(file, lis.length)
    },
    handlePictureCardPreview(file) {
      this.ImgDiaLog.addSrc = file.url
      this.ImgDiaLog.add = true // 添加预览
      console.log(123)
    },
    // 本地选中的图片变化
    handleChange(file, fileList) {
      if (fileList.length < 4) { // 允许最多上传三张图片
        this.fileLists = fileList
        console.log(this.fileLists.length, '11111111111111111111111111111')
      }
      this.valifyImg()
      if (fileList.length === 3) {
        this.$message({
          message: '已达到上限',
          type: 'warning'
        })
      }
    },
    // 关闭退款弹窗
    handleRefoundClose() {
      this.refoundFormVisible = false
      this.clearRefoundInput()
    },
    clearRefoundInput() {
      this.refoundFormData = {
        'feelname': '篮球比赛', // 项目名字
        'enterprise': 'bbb', // 公司名字
        'StartTime': '2018', // 起止时间
        'money': '99', // 收费金额
        'tuimoney': '', // 退款金额
        'tuiimg': '', // 退款凭证
        'tuiconten': ''// 退款理由
      }
    },

    // 点击收费
    clickCharge() {
      this.AdddialogVisible = true
    },
    handleBack() {
      alert('返回')
      this.isSearch = false
      this.getChargeList() // 重新获取收费列表
    },
    // 确认添加
    onSubmit() {
      if (this.validataInput()) {
        console.log(this.addData, '添加的数据')
        this.sendAddCharge()
      } else {
        this.$message({
          message: '请先完善添加信息',
          type: 'warning'
        })
      }
    },
    // 验证添加的内容
    validataInput() {
      let pass = true
      for (const item in this.addData) {
        if (this.addData[item] === '') {
          pass = false
        }
      }
      return pass
    },
    // 发送添加请求
    sendAddCharge() {
      const { token, uname, Communityid } = this.commonData
      this.addData.uname = uname
      this.addData.Communityid = Communityid
      // const token = JSON.parse(localStorage.getItem('userInfo')).token
      axios.post('http://test.txsqtech.com/index/Fees/charge',
        { ...this.addData },
        {
          headers: {
            token
          }
        }
      ).then(res => {
        // 如果添加收费成功 清除addData

        if (res.data.code === 200) {
          this.$message({
            message: '收费成功',
            type: 'success'
          })
          this.clearInput()
          this.chargeMoney = res.data.money
          this.printId = res.data.mes
          setTimeout(() => {
            this.TipdialogVisible = true
          }, 1000)
          // 获取最新的数据
          this.getChargeList()
        } else if (res.data.code === 10000) {
          this.$message({
            message: '当前token过期,请重新登录',
            type: 'warning'
          })
        } else {
          this.$message({
            message: '添加收费失败',
            type: 'warning'
          })
        }

        // 隐藏
        this.AdddialogVisible = false
        console.log(res, '收费后的返回值')
      })
    },
    // 关闭添加
    handleClose() {
      this.AdddialogVisible = false
      this.clearInput()
    },
    // 点击搜索
    handleSearch() {
      this.isSearch = true
      this.sendSearchRequest()
    },
    // 点击打票
    handlePrintTicket() {
      this.TipdialogVisible = false
      alert('打票')
    },
    // 点击申请退款
    handleTuikuan(v) {
      const { uname } = this.commonData
      // const token = JSON.parse(localStorage.getItem('userInfo')).token
      this.refoundFormVisible = true
      this.refoundFormData.feelname = v.feelname // 项目名
      this.refoundFormData.enterprisename = v.enterprisename // 公司名
      this.refoundFormData.Start_time = v.Start_time // 起止时间
      this.refoundFormData.money = v.money // 收款
      console.log(this.refoundFormData)
      console.log(v, '当前行的数据')
      this.refoundInfo.uname = uname
      this.refoundInfo.wid = v.wid
      // this.refoundInfo.money = this.refoundFormData.tuimoney //退款金额
      this.refoundInfo.Remarks = this.refoundFormData.tuiconten // 退款原因
      // console.log(v,'当前行的数据')
      // console.log(this.refoundFormData,'表单数据')
    },
    // 验证金额
    valifyMoney(val) {
      if (val > this.refoundFormData.money) {
        this.moneyTip = true
      } else {
        this.moneyTip = false
      }
      console.log(val, this.moneyTip)
    },
    valifyReason() {
      if (this.refoundFormData.tuiconten === '') {
        this.reasonTip = true
      } else {
        this.reasonTip = false
      }
      console.log(this.reasonTip, 'reason')
    },
    valifyImg() {
      if (this.fileLists.length === 0) {
        this.imgTip = true
      } else {
        this.imgTip = false
      }
    },
    // 立即申请退款
    onSubmitRefound() {
      this.valifyImg()
      this.valifyReason()
      console.log(!this.moneyTip, !this.reasonTip)
      if (!this.moneyTip && !this.reasonTip && !this.imgTip) {
        const upData = new FormData()
        console.log(this.refoundFormData, '表单数据')
        const { wid } = this.refoundInfo
        const { uname } = this.commonData
        const Remarks = this.refoundFormData.tuiconten
        const { tuimoney } = this.refoundFormData
        upData.append('wid', wid)
        upData.append('money', tuimoney) // 退款金额
        upData.append('uname', uname)
        upData.append('Remarks', Remarks)

        this.fileLists.forEach((item) => {
          upData.append('img[]', item.raw)
        })
        this.fileLists = []
        console.log(this.refoundInfo, '发送的数据')
        this.sendRefoundRequest(upData)
      } else {
        alert('不能这样就发送了')
      }
    },
    sendRefoundRequest(upData) {
      const { token } = this.commonData
      // const token = JSON.parse(localStorage.getItem('userInfo')).token
      console.log('开始发送请求')
      axios.post('http://test.txsqtech.com/index/Fees/apply',
        upData,
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
        if (res.data.msg.code === 200) {
          this.$message({
            message: '申请提交成功, 请耐心等待审核!',
            type: 'success'
          })
          this.ImgDiaLog.addSrc = ''
        }
      })
    },
    handleRecordClick(v) {
      this.RecordialogFormVisible = true
      this.recordData.tickettime = v.tickettime // 打票时间
      this.recordData.ticketname = v.ticketname // 打票人
      this.recordData.time = v.time // 收费时间
      this.recordData.uname = v.uname // 收费人
      console.log(this.recordData, 'record数据')
      // alert('记录')
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
    // 清空添加数据
    clearInput() {
      this.addData = {
        'Communityid': '15', // 小区id
        'feelname': '', // 项目名字
        'enterpriseId': '', // 企业id
        'money': '', // 收费金额
        'Start_time': '2018-10-10', // 开始时间
        'end_time': '2018-10-10', // 结束时间
        'center': '', // 备注
        'method': '1', // 1为微信2为支付宝3为现金4为银行卡
        'uname': 'test'// 用户姓名
      }
    },
    // 请求搜索结果
    sendSearchRequest() {
      alert('send')
      const { Communityid, token } = this.commonData
      // const token = JSON.parse(localStorage.getItem('userInfo')).token

      const name = this.searchData
      axios.post(`http://test.txsqtech.com/index/Fees/search`,
        {
          Communityid,
          name
        },
        {
          headers: {
            token
          }
        }
      ).then(res => {
        // 如果有结果
        if (res.data.code === 200) {
          this.pageInfo.total = res.data.msg.total
          this.pageInfo.listRows = res.data.msg.listRows
          this.pageInfo.pageNum = res.data.msg.pageNum
          console.log(res.data.msg.data)
          this.tableData = res.data.msg.data
          alert('搜索结果如下')
        } else if (res.data.code === 400) {
          this.$message({
            message: '数据错误',
            type: 'warning'
          })
        } else if (res.data.code === 401) {
          this.$message({
            message: '无结果',
            type: 'warning'
          })
        }
        // this.tableData = 结果
      })
    },
    // 请求收费列表
    getChargeList() {
      const { Communityid, token } = this.commonData
      // const token = JSON.parse(localStorage.getItem('userInfo')).token
      axios.post(`http://test.txsqtech.com/index/Fees/enterpris?page=${this.pageInfo.page}`,
        { Communityid },
        {
          headers: {
            token
          }
        }
      )
        .then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            this.pageInfo.total = res.data.msg.total
            this.pageInfo.listRows = res.data.msg.listRows
            this.pageInfo.pageNum = res.data.msg.pageNum
            console.log(res.data.msg.data, '后端回来的收费列表')
            this.tableData = res.data.msg.data
          }
        })
    },
    // 获取入驻的企业
    getCompanies() {
      const { Communityid, token } = this.commonData
      // const token = JSON.parse(localStorage.getItem('userInfo')).token
      axios.post('http://test.txsqtech.com/index/Fees/nterprise',
        {
          Communityid
        },
        {
          headers: {
            token
          }
        }
      ).then(res => {
        this.companys = res.data.msg
        console.log(res.data.msg, '获取到的入驻企业')
      })
    }

  }
}
</script>
<style lang="scss" scoped>
  /deep/.myAddForm{
    position: relative;
    height: 560px;
    top:50%;
    bottom: 50%;
    transform: translateY(-50%);
    margin-top:0 !important;
    /deep/.el-form-item{
      height: 40px !important;
      .el-form-item__content{
        margin-bottom: 15px !important;
        height: 40px !important;
        .el-input__inner{
          height: 40px !important;
        }
        .tips{
          color: red;
          position: absolute;
          bottom: -25px;
          left:0;
        }
      }
    }
    .addNow{
      position: absolute;
      height: 30px;
      padding: 0 5px;
      border-radius: 4px;
      line-height: 30px;
      background-color: #F8AC59;
      bottom: 20px;
      left:50%;
      margin-left: -20px;

    }
  }
  /deep/.isPrint-box{
    position: relative;
    height: 200px;
    width: 300px;
    background-color: #fff;
    position: absolute;
    margin-top: -100px !important;
    margin-left: -150px;
    left: 50%;
    top: 50%;
    bottom: 50%;
    .el-dialog__header{

    }
    .el-dialog__body{
      padding: 20px 30px 0 30px  !important;
      text-align: center;
      .price{
        color: red;
      }
      .btn-confirm-record1,.btn-confirm-record2{
        position: absolute;
        bottom: 20px;
        padding: 0 5px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        border-radius: 4px;
      }
      .btn-confirm-record1{
        border: 1px solid #CCCCCC;
        left: 20px;
        color: #999999;
        padding: 0 8px;
      }
      .btn-confirm-record2{
        color: #fff;
        background-color: #25BAD9;
        right: 20px;
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
        .cell{
          height: 30px;
          position: relative;
        //   button{
        //     position: absolute;
        //   }
        //   .btn-print{
        //     left: 0
        //   }
        //   .btn-refound{
        //     left: 40px;
        //   }
        //   .btn-record{}
        }

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
//申请退款框样式

/deep/.myRefoundForm {
  position: fixed !important;
  top: 0 !important;
  left: 50% !important;
  margin-top: 0 !important;
  margin-left: -250px !important;
  /deep/.applyNow{
    width: 60px;
    height: 30px;
    background-color: yellow;
    left: 50%;
    margin-left: -30px;
    position: absolute;
    cursor: pointer;
    bottom: 70px;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;

  }
}

</style>
