<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="box-header">
          <span v-if="isShowAddto" @click="addtoJusHandler">新增账号</span>
          <span v-else class="newAdd" @click="exitBefore">返回上一级</span>
          <!-- 搜索框 -->
          <div v-if="isShowAddto" class="serach-box">
            <input
              v-model="serachContent"
              type="text"
              placeholder="请输入搜索内容"
              @keyup.enter="searchHandler"
            >
            <div class="serach" @click="searchHandler">
              <svg-icon icon-class="search1" />
            </div>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%" empty-text="没有数据">
          <el-table-column prop="uname" label="姓名" min-width="150" />
          <el-table-column prop="ucphone" label="账号" min-width="150" />
          <el-table-column prop="poname" label="职位" min-width="150" />
          <!-- 当前状态 -->
          <!-- <el-table-column prop="po_notes" label="当前状态" min-width="90">
            <template slot-scope="scope">
              <p
                :class="[scope.row.ostates === 1 ? activeClass : '', dongjieClass]"
                v-html="scope.row.ostates===2? '离线': '在线'"
              >离线</p>
            </template>
          </el-table-column>-->
          <!-- 账号状态 -->
          <el-table-column prop="po_notes" label="账号状态" min-width="150">
            <template slot-scope="scope">
              <p
                size="mini"
                :class="[scope.row.isfreeze === 1 ? activeClass : '', dongjieClass]"
                @click="handleEdit(scope.$index, scope.row)"
                v-html="scope.row.isfreeze === 1 ? '使用中':'冻结'"
              >{{ scope.row.isfreeze === 1 ? '使用中':'冻结' }}</p>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" min-width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleOperation(scope.$index, scope.row)"
                @mouseleave.native="hideHandler"
                @mouse="hh"
              >
                操作
                <svg-icon icon-class="xsj" />
              </el-button>
              <div
                v-if="rowUid === scope.row.uid && flag ? true : false"
                class="choice-box"
                @click="operationHandler(scope.$index, scope.row)"
                @mouseleave="mouseHandler"
              >
                <p @click="updataHandler(scope.$index, scope.row)">修改信息</p>
                <p @click="loginRecordHandler(scope.$index, scope.row)">登录记录</p>
                <p @click="jiedongHandler(scope.$index, scope.row)">{{ jiedongData }}</p>
                <p @click="delteHandler(scope.$index, scope.row)">删除账号</p>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <p v-if="hongShow" class="hongdian" />
      <div class="block">
        <p class="record-data">共{{ pageNums }}页 共{{ totalPage }}条</p>
        <el-pagination
          background
          :page-size="listNum"
          layout="prev, pager, next, jumper"
          :total="totalPage"
          :current-page="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @next-click="nextClickHandler"
        />
      </div>-->
    </el-card>
    <!-- 分页 -->
    <p v-if="hongShow" class="hongdian" />
    <div class="block">
      <p class="record-data">共{{ pageNums }}页 共{{ totalPage }}条</p>
      <el-pagination
        background
        :page-size="listNum"
        layout="prev, pager, next, jumper"
        :total="totalPage"
        :current-page="currentPage"
        :hide-on-single-page="value1"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @next-click="nextClickHandler"
      />
    </div>
    <!-- 新增账号遮罩层 -->
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="400px"
      center
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <span slot="title">{{ titleName }}</span>
      <el-form :label-position="labelPosition" label-width="80px">
        <div class="form-item" style="height:60px">
          <el-form-item label="姓名:">
            <input v-model="formAlign.name" type="text" @focus="handlerName" >
            <p class="mistack-message">{{ mistakeToast1 }}</p>
          </el-form-item>
        </div>
        <div class="form-item" style="height:60px">
          <el-form-item label="账号:">
            <input
              ref="nameInput"
              v-model="formAlign.phone"
              type="text"
              placeholder="请输入手机号"
              @focus="handlerPhone"
            >
            <p class="mistack-message">{{ mistakeToast2 }}</p>
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="职位:" class="region-class">
            <!-- <input
              ref="nameInput"
              type="text"
              v-model="formAlign.region"
            >-->
            <el-select v-model="poname" placeholder="请选择职位" no-data-text="暂无数据">
              <el-option
                v-for="item in cities"
                :key="item.poname"
                :value="item.poname"
                @change="hanPoid(item.poid)"
              >
                <span class="chenp" @click="hanPoid(item.poid)">{{ item.poname }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
              </el-option>
            </el-select>
            <p class="mistack-message">{{ mistakeToast3 }}</p>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addtoHandler">确认</el-button>
      </span>
    </el-dialog>
    <!-- 修改权限 -->
    <el-dialog
      :visible.sync="centerDialogVisible1"
      width="400px"
      center
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <span slot="title">{{ titleName }}</span>
      <el-form :label-position="labelPosition" label-width="80px">
        <div class="form-item" style="height:60px">
          <el-form-item label="姓名:">
            <input v-model="formAlign.name" type="text" @focus="handlerName" >
            <p class="mistack-message1">{{ mistakeToast1 }}</p>
          </el-form-item>
        </div>
        <div class="form-item" style="height:60px">
          <el-form-item label="账号:">
            <input
              ref="nameInput"
              v-model="formAlign.phone"
              type="text"
              placeholder="请输入手机号"
              @focus="handlerPhone"
            >
            <p class="mistack-message1">{{ mistakeToast2 }}</p>
          </el-form-item>
        </div>
        <div class="form-item" style="height:6vh">
          <el-form-item label="职位:" class="region-class1">
            <!-- <input
              ref="nameInput"
              type="text"
              v-model="formAlign.region"
            >-->
            <el-select v-model="poname" placeholder="请选择职位" no-data-text="暂无数据">
              <el-option v-for="item in cities" :key="item.poname" :value="item.poname">
                <span class="chenp" @click="hanPoid(item.poid)">{{ item.poname }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
              </el-option>
            </el-select>
            <p class="mistack-message1">{{ mistakeToast3 }}</p>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addtoHandler1">确认</el-button>
      </span>
    </el-dialog>
    <!-- 登录记录 -->
    <el-dialog
      :visible.sync="centerDialogVisible2"
      width="24.43%"
      center
      :append-to-body="true"
      :close-on-click-modal="false"
      class="login-record"
    >
      <span slot="title">登录记录</span>
      <el-form :label-position="labelPosition" label-width="80px">
        <div class="form-item">
          <el-form-item label="姓名:">
            <input v-model="loginRecordData.name" type="text" disabled >
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="账号:">
            <input ref="nameInput" v-model="loginRecordData.phone" type="text" disabled >
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="职位:">
            <input ref="nameInput" v-model="loginRecordData.region" type="text" disabled >
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="最后操作时间:">
            <input ref="nameInput" v-model="loginRecordData.lastTime" type="text" disabled >
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="上次登录时间:">
            <input ref="nameInput" v-model="loginRecordData.lastTimes" type="text" disabled >
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="上次登录IP:">
            <input ref="nameInput" v-model="loginRecordData.lastTimesIp" type="text" disabled >
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addtoHandler2">确认</el-button>
      </span>
    </el-dialog>
    <!-- 删除遮罩层 -->
    <!-- 遮罩三 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible4"
      :append-to-body="true"
      center
      class="chen"
      top="40vh"
      :close-on-click-modal="false"
    >
      <!-- <p>提示</p> -->
      <div>是否删除该账号？</div>
      <span slot="footer" class="dialog-footer">
        <el-button class="quxiao1" @click="centerDialogVisible4 = false">取 消</el-button>
        <el-button
          v-loading="loading"
          type="primary"
          element-loading-spinner="el-icon-loading"
          @click="delteHandler1"
        >确 认</el-button>
      </span>
    </el-dialog>
    <!-- 冻结弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible5"
      :append-to-body="true"
      center
      class="chen"
      top="40vh"
      :close-on-click-modal="false"
    >
      <!-- <p>提示</p> -->
      <div>是否{{ toastJiedong }}该账号</div>
      <span slot="footer" class="dialog-footer">
        <el-button class="quxiao1" @click="centerDialogVisible5 = false">取 消</el-button>
        <el-button type="primary" @click="jiedongHandler1">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInfo } from '@/utils/auth'
import { Message } from 'element-ui'
import { postAccount, postAccaddto, postJurisdiction, postSearch, postupdatas, postDeletes, postDongjie, postToexamine } from '@/api/Jurisdiction'
// import M from 'minimatch'
export default {
  name: 'AccountManage',
  data() {
    return {
      loading: false,
      flag: false,
      hongShow: false,
      tableData: [],
      poname: '',
      cities: [],
      dataPoid: '',
      value: '',
      titleName: '新增账号',
      labelPosition: 'right',
      ishowAdd: true,
      isShowCb: false,
      centerDialogVisible: false,
      centerDialogVisible1: false,
      centerDialogVisible2: false,
      centerDialogVisible4: false,
      centerDialogVisible5: false,
      formAlign: {
        name: '',
        phone: ''
      },
      serachContent: '',
      mistakeToast1: '',
      mistakeToast2: '',
      mistakeToast3: '',
      dongjieClass: 'dongjie',
      activeClass: 'notdongjie',
      isShowAddto: true,
      updataquery: {},
      loginRecordData: {
        name: '1',
        phone: '2',
        region: '3',
        lastTime: '4',
        lastTimes: '5',
        lastTimesIp: '6'
      },
      listNum: null,
      totalPage: null,
      currentPage: null,
      pageNums: null,
      deleteQuery: {},
      jiedongData: '',
      toastJiedong: '',
      jiedongUid: null,
      jiedongIsfreeze: null,
      dataPoid1: null,
      showOperation: true,
      rowUid: null,
      value1: false
    }
  },
  computed: {
    // 存在本地的用户信息
    userInfoData() {
      return JSON.parse(getInfo())
    }
  },
  created() {
    const { Communityid, sition } = this.userInfoData.data
    postAccount({ Communityid, sition }).then(resp => {
      console.log({ Communityid, sition }, resp, '账号管理创建时后端返回的参数和数据')
      this.tableData = resp.msg.data
      this.listNum = resp.msg.listRows
      this.pageNums = resp.msg.pageNum
      this.currentPage = Number(resp.msg.page)
      this.totalPage = resp.msg.total
    })
    postToexamine({ Communityid, sition }).then(resp => {
      console.log(resp.msg.data, '65214')
      if (resp.msg.data.length) {
        this.hongShow = true
      }
    })
  },
  methods: {
    hh() {
      console.log(555)
    },
    hideHandler() {
      console.log('89898989898989')
      if (this.flag === true) {
        this.flag = true
      } else {
        this.flag = false
      }
    },
    mouseHandler() {
      console.log('444444444444444444444')
      this.flag = false
    },
    hanPoid(poid) {
      console.log(poid, '选择职位')
      this.dataPoid = poid
      // this.dataPoid1 = poid
      this.mistakeToast3 = ''
    },
    handlerName() {
      console.log('handlerName')
      this.mistakeToast1 = ''
    },
    handlerPhone() {
      this.mistakeToast2 = ''
    },
    handleOperation(index, row) {
      this.flag = !this.flag
      this.rowUid = row.uid
      row.isfreeze === 1 ? this.jiedongData = '冻结' : this.jiedongData = '解冻'
    },
    // handlerOperatio1(row, column, event) {
    //   console.log(row, column, event)
    //   // this.flag = false
    //   // this.rowUid = null
    //   // row.operationVisible = false
    // },
    handleDelete(index, row) {
      // console.log(index, row)
    },
    operationHandler(index, row) {
      // this.tableData[index].operationVisible = !this.tableData[index].operationVisible
      this.rowUid = null
    },
    // 点击新增权限
    addtoJusHandler() {
      this.titleName = '新增账号'
      this.mistakeToast1 = ''
      this.mistakeToast2 = ''
      this.mistakeToast3 = ''
      this.centerDialogVisible = true
      this.formAlign.name = ''
      this.formAlign.phone = ''
      this.poname = ''
      const { Communityid, sition } = this.userInfoData.data
      this.dataPoid = null
      postJurisdiction({ Communityid, sition }).then(resp => {
        console.log(resp, '230')
        this.cities = resp.msg
      })
    },
    exitBefore() {
      this.isShowAddto = true
      this.serachContent = ''
      const { Communityid, sition } = this.userInfoData.data
      postAccount({ Communityid, sition }).then(resp => {
        this.listNum = resp.msg.listRows
        this.pageNums = resp.msg.pageNum
        this.totalPage = resp.msg.total
        this.currentPage = Number(resp.msg.page)
        this.tableData = resp.msg.data
      })
    },
    ponameHandler(item) {
      // console.log(444)
    },
    // 点击新增账号
    addtoHandler() {
      var { name, phone } = this.formAlign
      const { Communityid, sition } = this.userInfoData.data
      const propertyId2 = this.userInfoData.data.propertyId
      const propertyId = propertyId2.toString()
      const poid = this.dataPoid
      phone = Number(phone)
      console.log({ Communityid, propertyId, poid, sition, name, phone }, '新增权限的请求参数')
      postAccaddto({ Communityid, propertyId, poid, sition, name, phone }).then(resp => {
        // this.dataPoid = null
        console.log(resp, '354')
        if (resp.code === 401 || resp.code === 303) {
          this.mistakeToast1 = resp.msg
        } else if (resp.code === 402 || resp.code === 300 || resp.code === 301 || resp.code === 302) {
          this.mistakeToast2 = resp.msg
        } else if (resp.code === 403) {
          this.mistakeToast3 = resp.msg
        } else if (resp.code === 400 || resp.code === 404) {
          Message(resp.msg)
        } else {
          // 添加成功
          postAccount({ Communityid, sition }).then(resp => {
            this.listNum = resp.msg.listRows
            this.pageNums = resp.msg.pageNum
            this.totalPage = resp.msg.total
            this.currentPage = Number(resp.msg.page)
            this.tableData = resp.msg.data
          })
          Message(resp.msg)
          this.centerDialogVisible = !this.centerDialogVisible
        }
      })
    },
    addtoHandler1() {
      // console.log('修复')
      const { name, phone } = this.formAlign
      const { Communityid, uid } = this.updataquery
      var poid = this.dataPoid
      console.log(this.poname, '531')
      if (this.poname === '请选择职位') {
        poid = ''
      }
      console.log({ Communityid, poid, uid, name, phone }, '77777777777777777')
      postupdatas({ Communityid, poid, uid, name, phone }).then(resp => {
        // console.log(resp, '286')
        if (resp.code === 401) {
          this.mistakeToast1 = resp.msg
        } else if (resp.code === 402 || resp.code === 404) {
          this.mistakeToast2 = resp.msg
        } else if (resp.code === 403) {
          this.mistakeToast3 = resp.msg
        } else if (resp.code === 400 || resp.code === 405) {
          this.centerDialogVisible1 = !this.centerDialogVisible1
          Message(resp.msg)
        } else {
          // 添加成功
          const { Communityid, sition } = this.userInfoData.data
          // console.log(this.currentPage, '449449449449')
          const page = this.currentPage
          postAccount({ Communityid, sition, page }).then(resp => {
            this.listNum = resp.msg.listRows
            this.pageNums = resp.msg.pageNum
            this.totalPage = resp.msg.total
            this.currentPage = Number(resp.msg.page)
            this.tableData = resp.msg.data
          })
          Message(resp.msg)
          this.centerDialogVisible1 = !this.centerDialogVisible1
        }
      })
    },
    addtoHandler2() {
      this.centerDialogVisible2 = !this.centerDialogVisible2
    },
    updataHandler(index, row) {
      this.mistakeToast3 = ''
      console.log(row, '487行')
      this.centerDialogVisible1 = true
      this.titleName = '修改账号'
      // 将值赋在input框
      this.formAlign.name = row.uname
      this.formAlign.phone = row.ucphone
      this.poname = row.poname
      if (this.poname === '') {
        this.poname = '请选择职位'
      }
      // 获取点击确认按钮时调用接口所用的参数
      this.updataquery.poid = row.poid
      this.updataquery.uid = row.uid
      this.updataquery.Communityid = row.Communityid
      console.log(this.updataquery, '修改账号')
      const { Communityid, sition } = this.userInfoData.data
      postJurisdiction({ Communityid, sition }).then(resp => {
        console.log(resp.msg, '578578')
        const lists = resp.msg
        if (lists.length) {
          lists.forEach(item => {
            if (item.poname === this.poname) {
              this.dataPoid = item.poid
            }
          })
        }
        // console.log(this.poname, '点击修改时的poname')

        this.cities = resp.msg
      })
    },
    loginRecordHandler(index, row) {
      this.centerDialogVisible2 = !this.centerDialogVisible2
      this.loginRecordData.name = row.uname
      this.loginRecordData.phone = row.ucphone
      this.loginRecordData.region = row.poname
      this.loginRecordData.lastTime = row.sess_time
      this.loginRecordData.lastTimes = row.time
      this.loginRecordData.lastTimesIp = row.ip
    },
    delteHandler(index, row) {
      console.log('000')
      this.centerDialogVisible4 = true
      // this.deleteQuery.Communityid = row.Communityid
      this.deleteQuery.uid = row.uid
      this.deleteQuery.sition = row.sition
    },
    delteHandler1() {
      // Loading.service(options)
      // this.loading = true
      const { Communityid } = this.userInfoData.data
      const { uid } = this.deleteQuery
      console.log('点击删除', { uid, Communityid })
      postDeletes({ uid, Communityid }).then(resp => {
        this.loading = true
        console.log(resp, '42828')
        if (resp.code === 200) {
          const page = this.currentPage
          const { Communityid, sition } = this.userInfoData.data
          postAccount({ Communityid, sition, page }).then(resp => {
            console.log({ Communityid, sition, page }, resp, '459')
            // this.tableData = resp.msg.data
            this.listNum = resp.msg.listRows
            this.pageNums = resp.msg.pageNum
            this.totalPage = resp.msg.total
            this.currentPage = Number(resp.msg.page)
            console.log(resp.msg.data, '511511511')
            if (resp.msg.data.length === 0) {
              const page = this.currentPage - 1
              console.log(page, '466')
              // console.log(page, 'pagepaehehbhj')
              postAccount({ Communityid, sition, page }).then(resp => {
                console.log({ Communityid, sition, page }, '请求的参数')
                console.log(resp, '517')
                this.listNum = resp.msg.listRows
                this.pageNums = resp.msg.pageNum
                this.totalPage = resp.msg.total
                this.currentPage = Number(resp.msg.page)
                this.tableData = resp.msg.data
              })
            } else {
              console.log(resp, '472')
              this.tableData = resp.msg.data
            }
          })
          this.centerDialogVisible4 = false
          // setTimeout(() => {
          // }, 2000)
        } else {
          Message(resp.msg)
        }
      })
    },
    searchHandler() {
      // console.log(this.serachContent, '275')
      const name = this.serachContent
      // console.log()
      const { Communityid, sition } = this.userInfoData.data
      postSearch({ name, Communityid, sition }).then(resp => {
        // TODOS:
        console.log({ name, Communityid, sition }, resp, '搜索传的参数和数据')
        if (resp.code === 200) {
          this.tableData = resp.msg.data
          this.tableData = resp.msg.data
          this.listNum = resp.msg.listRows
          this.pageNums = resp.msg.pageNum
          this.currentPage = Number(resp.msg.page)
          this.totalPage = resp.msg.total
          this.isShowAddto = false
        } else {
          Message(resp.msg)
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`, '326')
    },
    // 分页设置
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      // console.log(this.tableData, '308')
      // for(var i=0,len=data.length;i<len;i+=4){
      //    result.push(data.slice(i,i+4));
      // }
      // const len = this.total
      // for (var i = val, i<len; i+=10) {
      this.currentPage = val
      // const tableList = []
      // const table = this.tableData.slice((val - 1) * 10, (val - 1) * 10 + 10)
      // tableList.push(...table)
      // console.log(tableList, '315')
      // this.tableList = tableList
      // }
      const page = val
      const { Communityid, sition } = this.userInfoData.data
      postAccount({ Communityid, sition, page }).then(resp => {
        console.log(resp, '461')
        this.tableData = resp.msg.data
        this.listNum = resp.msg.listRows
        this.pageNums = resp.msg.pageNum
        this.currentPage = Number(resp.msg.page)
        this.totalPage = resp.msg.total
      })
    },
    nextClickHandler(val) {
      console.log(val, '354')
    },

    jiedongHandler(index, row) {
      this.centerDialogVisible5 = true
      // console.log(row.isfreeze)
      this.jiedongIsfreeze = row.isfreeze
      this.jiedongIsfreeze === 2 ? this.toastJiedong = '解冻' : this.toastJiedong = '冻结'
      console.log(this.toastJiedong, '561')
      this.jiedongUid = row.uid
    },
    jiedongHandler1() {
      // if(this.jiedongIsfreeze === 1)
      const uid = this.jiedongUid
      postDongjie({ uid }).then(resp => {
        if (resp.code === 200) {
          const { Communityid, sition } = this.userInfoData.data
          const page = this.currentPage
          this.centerDialogVisible5 = false
          postAccount({ Communityid, sition, page }).then(resp => {
            this.listNum = resp.msg.listRows
            this.pageNums = resp.msg.pageNum
            this.totalPage = resp.msg.total
            this.currentPage = Number(resp.msg.page)
            console.log(resp.msg.data, '640行解冻后的重新请求的当前页的数据', { Communityid, sition, page })
            this.tableData = resp.msg.data
          })
        }
      })
    }
  }
}
</script>
// <style lang="scss" scoped>
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
  .box-header {
    height: auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
    span {
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
      padding: 0.65vw 0.78vh;
    }
    //搜索框样式
    .serach-box {
      width: 180px;
      height: 30px;
      right: 60px;
      top: 20px;
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
          // padding: 0 0 20px 0;
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
  }
}

// /deep/.el-table__header {
// col {
//     width: 125px;
// }
// }

// /deep/.el-table__body {
// col {
//     width: 100px !important;
// }
// }
.box-card {
  min-height: 775px;
  width: 100%;
  box-shadow: none;
  border: none;
  overflow: inherit;
  /deep/.el-card__header {
    border: none;
    border-bottom: none;
    padding: 20px !important;
    .el-table--striped .el-table__body tr.el-table__row--striped td {
      background-color: #eff2f5;
    }
    .el-table {
      overflow: inherit;
    }
    .el-table__body-wrapper {
      overflow: inherit;
    }
    .el-table td {
      padding: 15px 0 !important;
    }
    .el-table th {
      // padding: 14px 55px !important;
      font-size: 10px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(144, 147, 153, 1);
    }
    .el-table .cell {
      // background-color: #f00;
      height: 30px !important;
      padding: 0 0 0 65px;
      line-height: 30px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      .el-button--mini {
        width: 60px;
        height: 30px;
        background: rgba(248, 172, 89, 1);
        border-radius: 4px;
        border-radius: 4px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        border: none;
        padding: 0px;
        line-height: 30px;
        position: relative;
        span {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        svg {
          font-size: 12px;
          transform: scale(0.6);
        }
      }
      //操作
      .choice-box {
        width: 126px;
        height: 140px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(238, 238, 238, 1);
        box-shadow: 0px 6px 5px 0px rgba(153, 153, 153, 0.08);
        position: absolute;
        z-index: 3169 !important;
        left: 0;
        cursor: pointer;
        p {
          width: 100%;
          height: 35px;
          line-height: 35px;
          padding-left: 10px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          &:hover {
            background: rgba(239, 242, 245, 1);
          }
        }
      }
      .dongjie {
        color: red;
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
//表格行样式
.tableRowStyle {
  color: #f00 !important;
  background: #f00 !important;
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
/deep/.el-dialog {
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
    padding: 20px 48px 27px 30px !important;
    .form-item {
      height: 40px;

      .el-form-item {
        margin-bottom: 0px;
        margin-top: 1px;
        &__label {
          width: 64px !important;
          height: 30px;
          display: inline-block;
          padding: 0 !important;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
        &__content {
          margin-left: 64px !important;
          input {
            position: relative;
            height: 30px;
            width: 100% !important;
            padding-left: 8px;
            border: 1px solid rgba(210, 210, 210, 1);
            border-radius: 3px;
            outline: none;
            color: #333333;
            padding-left: 8px;
          }
        }
        input {
          outline: none;
          font-size: 14px;
          border-radius: 3px;
          margin-left: 12px;
          width: 90% !important;
          height: 32px !important;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
      //下拉菜单
      .region-class {
        .el-form-item__content {
          margin-left: 64px !important;
          .el-input {
            width: 126%;
          }
          .el-input__suffix {
            left: 195px;
          }
        }
        input {
          border-radius: 3px;
          border: 1px solid rgba(210, 210, 210, 1) !important;
        }
      }
      .region-class1 {
        .el-form-item__content {
          margin-left: 64px !important;
          .el-input {
            width: 126%;
          }
          .el-input__suffix {
            left: 195px;
          }
        }
        input {
          // background-color: #f00 !important;
          border-radius: 3px;
          border: 1px solid rgba(210, 210, 210, 1) !important;
          // border: 1px solid rgba(210, 210, 210, 1);
        }
      }

      .mistack-message {
        position: relative;
        color: red;
        top: -12px;
        text-align: left;
        margin-left: 0px;
        box-sizing: border-box;
        font-size: 14px;
        transform: scale(0.9);
        font-family: Microsoft YaHei;
        font-weight: 400;
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
//登录记录样式
.login-record {
  /deep/.el-dialog {
    border-radius: 4px !important;
    .el-dialog__body {
      padding: 18px 38px 21px 43px !important;
      .el-form-item__content {
        margin-left: 87px !important;
        padding-left: 8px;
      }
      .el-form-item__label {
        width: 95px !important;
      }
    }
  }
}
//删除
.chen {
  /deep/.el-dialog {
    background-color: #fff !important;
    width: 18.23%;
    height: 210px;
    /deep/.el-dialog__header {
      border-bottom: 1px solid #eff2f5;
      .el-dialog__title {
        border-bottom: none;
        font-size: 16px;
      }
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
        margin-left: 8px;
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
//下拉滚动
// /deep/.el-select-dropdown  {
//   width: 1000px !important;
//  .el-select-dropdown__item  {
//   background: #f00 !important;

//   }
// }
/deep/.chenp {
  display: block;
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
/deep/.el-pagination.is-background .btn-next:disabled {
  cursor: default;
}
/deep/.el-pagination.is-background .btn-prev:disabled {
  cursor: default;
}
/deep/ .el-loading-spinner {
  top: 100% !important;
}
/deep/.el-pagination__editor {
  background-color: #5fafe4 !important;
  height: 20px;
  width: 30px;
  color: white;
  cursor: pointer;
  margin-left: 0.25vw;
}
</style>
