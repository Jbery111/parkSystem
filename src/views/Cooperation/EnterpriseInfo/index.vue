<template>
  <div id="enterprise-info" class="infor-warp">
    <!-- 分页 -->

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
    <div slot="header" class="clearfix">
      <div class="box-header">
        <span class="add-btn" @click="openAdd">添加企业信息</span>
        <span v-show="isSearch" class="back-btn" @click="backTable">返回</span>
        <span class="search-btn" @click="handleSearch">搜索</span>
        <el-input v-model="searchData" class="sreach-box" clearable placeholder="输入" />
      </div>
    </div>
    <!-- <div class="noInfo" v-if="!isShowCard">
      目前还没有相关数据!!
    </div>-->
    <el-card v-if="isShowCard" class="list-card">
      <!-- 图片预览框 -->
      <el-dialog
        :modal="true"
        :modal-append-to-body="true"
        :append-to-body="true"
        :visible.sync="ImgDiaLog.origin"
        width="100%"
        title="我的图片"
        custom-class="myLiscencePre"
        style="width: 800px;height:600px;overflow:hidden;position:fixed;top:50%;margin:-300px auto 0;"
        :before-close="handleImgClose"
      >
        <!-- 轮播图片 -->
        <el-carousel height="500px" :autoplay="true" indicator-position="outside">
          <el-carousel-item v-for="item in ImgDiaLog.originSrc" :key="item">
            <img :src="item" alt>
          </el-carousel-item>
        </el-carousel>
        <!-- <img src="http://test.txsqtech.com/uploads/20191013/44a2feb2642dd2f78ad66637e8e4aab6.jpg"> -->
      </el-dialog>

      <!-- 企业列表 -->
      <el-table
        empty-text="暂无数据"
        :data="tableData"
        row-class-name="myRow"
        cell-class-name="myCell"
        style="width: 100%; height:100%;"
      >
        <el-table-column prop="Companyname" label="公司名称" min-width="200" />
        <el-table-column prop="Companyaddress" label="地址" min-width="200" />
        <el-table-column prop="phonename" label="联系人" min-width="120" />
        <el-table-column prop="phone" label="联系电话" min-width="120" />
        <el-table-column prop="cente" label="备注" min-width="250" class="note" />
        <el-table-column label="操作" min-width="300" fixed="right">
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
              @click="handleLicenseClick(scope.row)"
            >工商执照</el-button>
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-delete"
              @click="handleDeleteClick(scope.row)"
            >删除</el-button>
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
        <el-form :model="operateRecord">
          <el-form-item label="上次操作员" :label-width="formLabelWidth">
            <el-input v-model="operateRecord.uname" autocomplete="off" />
          </el-form-item>
          <el-form-item label="上次操作时间" :label-width="formLabelWidth">
            <el-input v-model="operateRecord.time" :disabled="true" autocomplete="off" />
          </el-form-item>
          <el-form-item label="上次操作ip地址" :label-width="formLabelWidth">
            <el-input v-model="operateRecord.ip" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div class="btn-confirm-record" @click="RecordialogFormVisible=false">确认</div>
      </el-dialog>
      <!-- 分页 -->
      <!-- <div class="block">
      <el-pagination
        background
        :page-size="listNum"
        :current-page="currentPage"
        layout="prev, pager, next, jumper"

        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @next-click="nextClickHandler"
      />
      </div>-->
    </el-card>

    <!-- 添加企业信息 -->
    <el-dialog
      title="添加企业"
      custom-class="myAddForm"
      class="position:fixed;top:10px;"
      :append-to-body="true"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="addData" label-width="80px">
        <el-form-item label="公司名称:">
          <el-input v-model="addData.Companyname" />
        </el-form-item>
        <span class="tips" :class="inputData.Companyname?'':'text-waring'">请输入公司名称</span>
        <el-form-item label="公司地址:">
          <el-input v-model="addData.Companyaddress" />
        </el-form-item>
        <span class="tips" :class="inputData.Companyaddress?'':'text-waring'">请输入公司地址</span>
        <el-form-item label="联系人:">
          <el-input v-model="addData.phonename" />
        </el-form-item>
        <span class="tips" :class="inputData.phonename?'':'text-waring'">请输入联系人</span>
        <el-form-item label="联系电话:">
          <el-input v-model="addData.phone" />
        </el-form-item>
        <span ref="phoneNum" class="tips" :class="inputData.phone?'':'text-waring'">请输入联系电话</span>

        <el-form-item label="工商执照:" style="height:60px !important;margin-top:10px;">
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

        <!-- 图片预览box -->
        <el-dialog
          style="width:100%;background:#999;padding-top:90px;"
          :visible.sync="ImgDiaLog.add"
          title="pic1"
          :modal="mod"
          :append-to-body="true"
          :fullscreen="true"
        >
          <img width="100%;height:100%;" :src="ImgDiaLog.addSrc" alt>
        </el-dialog>

        <el-form-item label="备注:" style="height:125px !important;margin-top:20px;">
          <el-input v-model="addData.cente" style="resize:none;" type="textarea" />
        </el-form-item>

        <div class="addNow" @click="onSubmit">立即添加</div>
      </el-form>
    </el-dialog>

    <!-- 修改企业信息 -->
    <el-dialog
      title="修改企业"
      custom-class="myModifyForm"
      :append-to-body="true"
      :visible.sync="modifydialogFormVisible"
      :before-close="handleModifyClose"
    >
      <el-form ref="modifyForm" :model="modifyData" label-width="80px">
        <el-form-item label="公司名称:">
          <el-input v-model="modifyData.Companyname" />
        </el-form-item>
        <span class="tips" :class="inputData.Companyname?'':'text-waring'">请输入公司名称</span>
        <el-form-item label="公司地址:">
          <el-input v-model="modifyData.Companyaddress" />
        </el-form-item>
        <span class="tips" :class="inputData.Companyaddress?'':'text-waring'">请输入公司地址</span>
        <el-form-item label="联系人:">
          <el-input v-model="modifyData.phonename" />
        </el-form-item>
        <span class="tips" :class="inputData.phonename?'':'text-waring'">请输入联系人</span>
        <el-form-item label="联系电话:">
          <el-input v-model="modifyData.phone" />
        </el-form-item>
        <span ref="modifyPhoneNum" class="tips" :class="inputData.phone?'':'text-waring'">请输入联系电话</span>

        <el-form-item label="工商执照:" style="height:60px !important;margin-top:10px;">
          <div class="up-img">
            <el-upload
              action="#"
              :limit="3"
              :file-list="temImgArr1"
              :on-remove="handleRemove"
              :on-preview="handlePictureCardPreview1"
              :on-change="handleChange1"
              list-type="picture-card"
              :auto-upload="false"
            >
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{file}">
                <!-- <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
                >-->
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview1(file)"
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
            <!-- 图片预览box -->

            <el-dialog
              style="width:100%;background:#999;padding-top:90px;"
              :visible.sync="ImgDiaLog.modify"
              title="pic1"
              :modal="mod"
              :append-to-body="true"
              :fullscreen="true"
            >
              <img width="100%;height:100%;" :src="ImgDiaLog.modifySrc" alt>
            </el-dialog>
          </div>
        </el-form-item>

        <el-form-item label="备注:" style="height:125px !important;margin-top:20px;">
          <el-input v-model="modifyData.cente" style="resize:none;" type="textarea" />
        </el-form-item>

        <div class="addNow" @click="onSubmitModify">确认修改</div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
// import qs from 'qs'
export default {
  name: 'EnterpriseInfo',
  data() {
    return {
      commonData: {
        token: '',
        Communityid: '',
        uname: ''
      },
      isSearch: false, // 是否显示
      searchData: '',
      SearchResult: [],
      temImgArr1: [], // 缩略图
      formLabelWidth: '120px', // 记录表格宽度
      // 操作记录
      operateRecord: {
        ip: '',
        uname: '',
        time: ''
      },
      ImgDiaLog: { // 图片弹窗显示与否
        origin: false,
        originSrc: '',
        add: false,
        addSrc: '',
        modify: false,
        modifySrc: ''

      },
      mod: false, // 不需要遮罩层
      fullScreen: true,

      // 验证输入是否正确
      inputData: {
        Companyname: false,
        Companyaddress: false,
        phonename: false,
        phone: false
      },

      // 显示与影藏
      isShowCard: false, // 是否显示表格
      dialogFormVisible: false, // 增加框初始隐藏
      modifydialogFormVisible: false, // 修改框
      RecordialogFormVisible: false, // 记录框
      dialogVisible: false, // 添加框
      dialogVisible1: false, // 修改框
      disabled: false,

      // 分页信息
      pageInfo: {
        page: 1, // 当前页
        total: null, // 总条数
        listRows: null, // 每页多少条
        pageNum: null, // 总页数
        render: ''
      },
      tableDataOld: [], // 临时保存的data
      // 查询企业信息
      tableData: [
        {
          Companyname: '', // 公司名字
          enterpriseId: '', // 主键id
          Companyaddress: '',
          phonename: '', // 联系人
          phone: '',
          img: [], // 工商执照
          cente: '', // 备注
          ip: '', // IP地址
          time: '', // 操作时间
          uname: '', // 操作人
          Communityid: '' // 小区id
        }
      ],

      fileLists: [], // 添加的图片列表
      fileLists1: [], // 修改的图片列表
      // 添加的公司信息
      addData: {
        Communityid: '',
        uname: '', // 用户名
        Companyname: '',
        Companyaddress: '',
        phonename: '',
        phone: '',
        img: [], // 添加的图片
        cente: '' // 备注

      },
      // 旧图片地址
      oldImgs: '',
      // 修改的公司信息
      modifyData: {
        enterpriseId: '', // 社区id
        Companyname: '', // 公司名字
        Companyaddress: '', // 公司地址
        phonename: '', // 联系人
        phone: '', // 联系人电话
        imgs: 'old', // 原有的图片
        img: 'new', // 新加的图片
        cente: '',
        uname: ''
      }
    }
  },
  watch: { // 监听并验证添加的信息
    'addData.Companyname': function() {
      if (this.addData.Companyname !== '') {
        this.inputData.Companyname = true
      } else {
        this.inputData.Companyname = false
      }
    },
    'modifyData.Companyname': function() {
      if (this.modifyData.Companyname !== '') {
        this.inputData.Companyname = true
      } else {
        this.inputData.Companyname = false
      }
    },
    'addData.Companyaddress': function() {
      if (this.addData.Companyaddress !== '') {
        this.inputData.Companyaddress = true
      } else {
        this.inputData.Companyaddress = false
      }
    },
    'modifyData.Companyaddress': function() {
      if (this.modifyData.Companyaddress !== '') {
        this.inputData.Companyaddress = true
      } else {
        this.inputData.Companyaddress = false
      }
    },
    'addData.phonename': function() {
      if (this.addData.phonename !== '') {
        this.inputData.phonename = true
      } else {
        this.inputData.phonename = false
      }
    },
    'modifyData.phonename': function() {
      if (this.modifyData.phonename !== '') {
        this.inputData.phonename = true
      } else {
        this.inputData.phonename = false
      }
    },
    'addData.phone': function() {
      if (this.addData.phone !== '') {
        // 验证手机号码
        if ((/^1[3456789]\d{9}$/.test(this.addData.phone))) {
          console.log('手机号码正确')
          // this.$refs.phoneNum.innerHTML="手机号码正确"
          this.inputData.phone = true
        } else {
          this.inputData.phone = false
          this.$refs.phoneNum.innerHTML = '请输入正确的手机号码'
        }

        // console.log(this.$refs.phoneNum)
      } else {
        this.inputData.phone = false
      }
    },
    'modifyData.phone': function() {
      if (this.modifyData.phone !== '') {
        // 验证手机号码
        if ((/^1[3456789]\d{9}$/.test(this.modifyData.phone))) {
          console.log('手机号码正确')
          // this.$refs.phoneNum.innerHTML="手机号码正确"
          this.inputData.phone = true
        } else {
          this.inputData.phone = false
          this.$refs.modifyPhoneNum.innerHTML = '请输入正确的手机号码'
        }
      } else {
        this.inputData.phone = false
      }
    }
  },
  created() {
    this.getCommonData()
    console.log(this.commonData)
    this.getComList()
    document.addEventListener('keydown', this.aa, false)
  },
  methods: {
    aa(e) {
      if (e.keyCode === 116) {
        e.preventDefault()
      }
    },
    getCommonData() {
      const { uname, Communityid } = JSON.parse(localStorage.getItem('userInfo')).data
      const { token } = JSON.parse(localStorage.getItem('userInfo'))
      this.commonData.token = token
      this.commonData.uname = uname
      this.commonData.Communityid = Communityid
    },
    // 点击搜索返回
    backTable() {
      this.isSearch = false
      this.tableData = this.tableDataOld
      // 重新获取新的数据
      this.getComList()
    },
    handleSearch() {
      const { Communityid, token } = this.commonData
      if (this.searchData === '') {
        alert('请输入搜索内容!')
      } else {
        axios.post('http://test.txsqtech.com/index/Enterprise/search',
          {
            Communityid,
            name: this.searchData
          },
          {
            headers: {
              token
            }
          }).then(res => {
          this.searchData = ''
          if (res.data.data.data.length < 1) {
            alert('没有找到相关数据!')
          } else {
            this.isSearch = true
            this.SearchResult = res.data.data.data
            // 显示搜索结果
            console.log(this.tableData, '9990909090')
            this.tableDataOld = this.tableData
            this.tableData = this.SearchResult
            console.log(this.SearchResult, '搜索的结果')
          }
        })
      }
    },
    handleImgClose() {
      console.log('关闭预览')
      this.ImgDiaLog.origin = false // 工商执照
    },
    /* 点击操作记录*/
    handleRecordClick(v) {
      this.RecordialogFormVisible = true
      console.log(v)
      this.operateRecord.uname = v.uname
      this.operateRecord.time = new Date(v.time).toLocaleString()
      this.operateRecord.ip = v.ip
    },
    /* 点击工商执照*/
    handleLicenseClick(v) {
      console.log('aaaa', v.img)
      if (v.img) {
        const imgArr = v.img.split(',')
        const imgs = []

        for (let i = 0; i < imgArr.length; i++) {
          if (imgArr[i]) {
            if (imgArr[i].includes('http://test.txsqtech.com/uploads/')) {
              imgs.push('' + imgArr[i])
            } else {
              imgs.push('http://test.txsqtech.com/uploads/' + imgArr[i])
            }
          }
        }
        this.ImgDiaLog.originSrc = imgs
        this.ImgDiaLog.origin = true
      } else {
        this.$message({
          message: '目前尚未上传执照',
          type: 'warning'
        })
      }

      // console.log(this.imgDialogSrc)
      console.log(this.ImgDiaLog.originSrc)
    },
    /* 点击删除*/
    handleDeleteClick(v) {
      const enterpriseId = v.enterpriseId
      this.sendDeleteRequest(enterpriseId)
    },
    /* 点击修改*/
    handleModifyClick(v) {
      this.modifyData = v
      if (v.img) {
        const imgArr = v.img.split(',')
        let j = 0
        for (let i = 0; i < imgArr.length; i++) {
          if (imgArr[i]) {
            console.log(imgArr[i], 'aaaaaaaaaaaaaaaaaa')
            if (imgArr[i].includes('http://test.txsqtech.com/uploads/')) {
              imgArr[j] = '' + imgArr[i]
              // this.temImgArr.push(imgArr[j])
            } else {
              imgArr[j] = 'http://test.txsqtech.com/uploads/' + imgArr[i]
            }
            this.temImgArr1.push({ url: imgArr[j] }) // 缩略图
            j++
          }
        }

        this.modifyData.imgs = imgArr // 原有图片
      }
      this.modifydialogFormVisible = true

      console.log(this.temImgArr, '以前的图片')

      console.log(this.modifyData, '修改数据上传')
      console.log(this.temImgArr1, '缩略图地址11')
    },

    /* 确认修改*/
    onSubmitModify() {
      const { uname, Communityid } = this.commonData
      // const replcaeData = JSON.parse(localStorage.getItem('replcaeData'))
      // console.log(replcaeData)
      // this.modifyData.Communityid = replcaeData.Communityid
      // this.modifyData.uname = replcaeData.uname

      const formData1 = new FormData()
      formData1.append('Communityid', Communityid)
      formData1.append('enterpriseId', this.modifyData.enterpriseId)
      formData1.append('uname', uname)
      formData1.append('Companyname', this.modifyData.Companyname)
      formData1.append('Companyaddress', this.modifyData.Companyaddress)
      formData1.append('phonename', this.modifyData.phonename)
      formData1.append('phone', this.modifyData.phone)
      let imgStr = ''
      this.temImgArr1.forEach(item => {
        console.log(item.url)
        imgStr += item.url
        imgStr += ','
      })
      imgStr = imgStr.slice(0, -1)
      console.log(imgStr, 'str//////')
      formData1.append('imgs', imgStr) // 旧图片
      formData1.append('cente', this.modifyData.cente)
      this.fileLists1.forEach((item) => {
        console.log(item.raw)
        if (item.raw) {
          formData1.append('img[]', item.raw) // 新图片
        }
      })

      // formData1.append('imgs[]', this.temImgArr) //旧图片

      console.log(this.modifyData, '修改请求数据')
      console.log(this.fileLists1)

      this.sendModifyRequest(formData1)
    },
    // 发送修改请求
    sendModifyRequest(formData1) {
      let isDone = true // 信息是否完善
      const obj = this.inputData
      for (const i in obj) {
        if (!obj[i]) {
          isDone = false
        }
      }
      if (isDone) { // 向后端发送请求
        // 清空输入的数据
        this.addData =
          {
            Communityid: '',
            uname: '', // 用户名
            Companyname: '',
            Companyaddress: '',
            phonename: '',
            phone: '',
            img: [], // 添加的图片
            cente: '' // 备注
          }
        const { token } = this.commonData
        axios.post('http://test.txsqtech.com/index/Enterprise/addtos',
          formData1
          ,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              token
            }
          }
        )
          .then(res => {
            if (res.data.code === 405) {
              this.$message({
                message: '该企业已近存在',
                type: 'warning'
              })
            }
            if (res.data.code === 500) {
              this.$message({
                message: '服务器错误',
                type: 'warning'
              })
            }
            if (res.data.code === 400) {
              this.$message({
                message: '数据错误',
                type: 'warning'
              })
            }
            if (res.data.code === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.temImgArr1 = [] // 缩略图
              this.fileLists1 = []
              this.getComList() // 获取跟新的数据
              this.isShowCard = true// 是否显示表格
              this.modifydialogFormVisible = false // 修改框框隐藏
            }
          })
      }
    },
    // 发送删除请求
    sendDeleteRequest(enterpriseId) {
      axios.post('http://test.txsqtech.com/index/Enterprise/delete',
        { enterpriseId },
        {
          headers: {
            token: this.commonData.token
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '成功删除',
              type: 'success'
            })
            this.getComList() // 获取跟新的数据
          }
        })
    },
    /* 请求企业信息 */
    getComList() {
      const { token, Communityid } = this.commonData
      // const token = JSON.parse(localStorage.getItem('userInfo')).token
      axios.post(`http://test.txsqtech.com/index/Enterprise/nterprise?page=${this.pageInfo.page}`,
        { Communityid },
        {
          headers: {
            token
          }
        }
      )
        .then(res => {
          if (res.data.code === 200) {
            this.isSearch = false
            this.pageInfo.page = Number(res.data.data.page)
            this.pageInfo.total = res.data.data.total
            this.pageInfo.listRows = res.data.data.listRows
            this.pageInfo.pageNum = res.data.data.pageNum
            this.pageInfo.render = res.data.data.render
            // console.log(this.pageInfo)
            // this.listNum = res.data.data.listRows //每页显示的条数
            // this.totalPage = res.data.data.total //总条数
            // this.pages = Math.ceil(this.totalPage/this.listNum)
            // console.log(this.listNum,this.totalPage,this.totalPage)
            // console.log('数据条数: '+res.data.data.data.length)
            if (res.data.data.data.length !== 0) { // 有公司信息
              this.tableData = res.data.data.data
              console.log(this.tableData)
              this.isShowCard = true // 显示公司列表
              console.log(res.data.data.data, '得到的数据')
            } else {
              console.log('目前还没有公司')
            }
          } else {
            console.log('error')
          }
        })
    },
    /* 添加企业信息 */
    addComList() {

    },

    // 图片事件 添加
    handleRemove(file, fileList) {
      this.fileLists = fileList
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.ImgDiaLog.addSrc = file.url
      this.ImgDiaLog.add = true // 添加预览
      console.log(123)
    },
    handlePictureCardPreview1(file) {
      this.ImgDiaLog.modifySrc = file.url
      this.ImgDiaLog.modify = true // 修改预览
      console.log(123)
    },
    // 本地选中的图片变化
    handleChange(file, fileList) {
      if (fileList.length < 4) { // 允许最多上传三张图片
        this.fileLists = fileList
      }
      if (fileList.length === 3) {
        this.$message({
          message: '已达到上限',
          type: 'warning'
        })
      }
    },
    handleChange1(file, fileList) {
      console.log(fileList.length, 'dddddddddddddddddddddddddddd')
      if (fileList.length < 4) {
        this.fileLists1 = fileList
        console.log('当前的图片们', this.fileLists1)
        if (fileList.length === 3) {
          this.$message({
            message: '已达到上限',
            type: 'warning'
          })
        }
      }
    },
    openAdd() {
      this.dialogFormVisible = true
      this.isShowCard = false
    },

    // 添加公司
    onSubmit() {
      const { token, Communityid, uname } = this.commonData
      // const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      // console.log(replcaeData)
      // this.addData.Communityid = userInfo.data.Communityid
      // this.addData.uname = userInfo.uname

      const formData = new FormData()
      formData.append('Communityid', Communityid)
      formData.append('uname', uname)
      formData.append('Companyname', this.addData.Companyname)
      formData.append('Companyaddress', this.addData.Companyaddress)
      formData.append('phonename', this.addData.phonename)
      formData.append('phone', this.addData.phone)

      formData.append('cente', this.addData.cente)

      this.fileLists.forEach((item) => {
        formData.append('img[]', item.raw)
      })
      this.fileLists = []
      console.log(formData)

      let isDone = true // 信息是否完善
      const obj = this.inputData
      for (const i in obj) {
        if (!obj[i]) {
          isDone = false
        }
      }
      if (isDone) { // 向后端发送请求
        // const token = JSON.parse(localStorage.getItem('userInfo')).token
        axios.post('http://test.txsqtech.com/index/Enterprise/addto',
          formData
          ,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              token
            }
          }
        )
          .then(res => {
            if (res.data.code === 405) {
              this.$message({
                message: '该企业已近存在',
                type: 'warning'
              })
            }
            if (res.data.code === 400) {
              this.$message({
                message: '数据错误',
                type: 'warning'
              })
            }
            if (res.data.code === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.addData = {
                Communityid: '',
                uname: '', // 用户名
                Companyname: '',
                Companyaddress: '',
                phonename: '',
                phone: '',
                img: [], // 添加的图片
                cente: '' // 备注
              }
              this.getComList() // 获取跟新的数据
              this.isShowCard = true// 是否显示表格
              this.dialogFormVisible = false // 增加框初始隐藏
            }
          })
      }
    },

    addCom() { // 点击添加公司

      // Vue.set(this.tableData,2,this.newData)
    },
    // 关闭添加
    handleClose() {
      this.getComList()
      this.dialogFormVisible = false
      this.isShowCard = true
      // console.log('close 弹窗')
    },
    // 关闭修改
    handleModifyClose() {
      this.temImgArr1 = [] // 缩略图
      this.temImgArr = [] // 临时旧图
      this.modifydialogFormVisible = false
      this.isShowCard = true
    },

    // 页码相关事件
    handleSizeChange() {
      console.log(11)
    },
    handleCurrentChange(val) {
      console.log(val)
      this.pageInfo.page = val
      this.getComList()
    },
    nextClickHandler(val) {
      console.log(val, '354')
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
// /deep/.el-card__body{
//   tbody{
//     .el-table__row{
//       height: 30px !important;
//     }
//   }
// }
// /deep/.el-table__row > td{
//   height: 30px;
//   padding: 0
// }
/deep/.el-card__body {
  padding-top: 0 !important;
}
/deep/.infor-warp {
  height: 500px;
  background-color: green;
}
// .addCom{
//   margin-top: 20px;
//   margin-left: 20px;
//   color: #fff;
//   width: 82px;
//   height: 40px;
//   padding: 0;
//   height: 25px;
//   font-size: 12px;
// }
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
            height: 100% !important;
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
.box-header {
  height: 60px;
  position: relative;
  .add-btn {
    cursor: pointer;
    background-color: #25bad9;
    color: #fff;
    height: 26px;
    line-height: 26px;
    position: absolute;
    top: 50%;
    bottom: 50%;
    left: 20px;
    margin-top: -13px;
    padding: 0 12px;
    border-radius: 4px;
  }
  .back-btn {
    position: absolute;
    height: 26px;
    background-color: #666;
    top: 50%;
    bottom: 50%;
    padding: 0 5px;
    font-size: 14px;
    line-height: 26px;
    margin-top: -13px;
    right: 250px;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
  }
  .search-btn {
    position: absolute;
    height: 26px;
    background-color: #25bad9;
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
  .sreach-box {
    width: 200px;
    height: 26px;
    position: absolute;
    top: 50%;
    bottom: 50%;
    right: 20px;
    margin-top: -13px;
    background-color: #ddd;
    border: 1px solid #ddd;
    /deep/.el-input__inner {
      height: 100% !important;
      padding-left: 0 !important;
    }
  }
}
</style>

