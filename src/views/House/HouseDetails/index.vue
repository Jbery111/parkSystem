
<template>
  <div id="house-details">
    <span v-show="showDot" class="dot" />
    <div v-if="houseDetailShow">
      <!-- <router-view /> -->
      <!--搜索栏-->
      <div slot="header" class="clearfix">
        <div v-if="isMainBox" class="box-header">
          <span v-show="!isShowExcel" class="load-btn" @click="clickDownLoad">下载房屋模板</span>
          <!-- <a class="load-btn" target="_black" :href="dUrl">下载</a> -->
          <span v-show="!isShowExcel" class="add-btn" @click="clickAddHouse">添加房屋</span>

          <span v-if="!isError" v-show="isShowExcel" class="add-btn" @click="backToLastPage">返回上一级</span>
          <span v-if="!isError" v-show="isShowExcel" class="add-btn1" style="margin-left:14px;" @click="excelImport">确认导入</span>
          <span v-if="isError" v-show="isShowExcel" style="background:#F8AC59" class="add-btn" @click="ok">确认</span>
          <span v-if="isError" style="position:absolute;left:72px;top:5px;color:#f44; font-size:14px;">提示: 您有数据未导入成功,请记录并修改后再次重新导入</span>
          <el-upload
            v-show="!isShowExcel"
            action="#"
            multiple
            :before-upload="beforeUpload"
            :limit="1"
          >
            <el-button size="small" type="primary" class="add-btn1" @click="uploadFile">导入房屋</el-button>
          </el-upload>

          <span v-show="!isShowExcel" class="search-btn" @click="handleSearch"><svg-icon icon-class="search1" /></span>
          <el-input
            v-show="!isShowExcel"
            v-model="searchData"
            class="sreach-box"
            clearable
            placeholder="请输入搜索内容"
            @keyup.enter.native="handleSearch"
          />
        </div>

        <div v-if="!isMainBox" class="box-header">
          <span class="add-btn" style="background:#25BAD9;" @click="backToLastPage">返回上一页</span>
        </div>
      </div>
      <!-- 房屋列表  -->
      <div v-if="!isShowExcel" class="table-box">
        <el-table
          empty-text="暂无数据"
          :data="tableData"
          row-class-name="myRow"
          cell-class-name="myCell"
          style="width: 100%; height:100%;"
        >
          <el-table-column prop="userHouseBuilding" label="楼栋" min-width="50" />
          <el-table-column prop="userHouseUnit" label="单元" min-width="50" />
          <el-table-column prop="userHouseNumber" label="门牌号" min-width="65" />
          <el-table-column prop="Housingarea" label="房屋面积(m)" min-width="100" />
          <el-table-column prop="typeName" label="房屋类型" min-width="80" />
          <el-table-column prop="Price" label="物业费单价(元)" min-width="120" />
          <el-table-column
            label="房屋状态"
            min-width="90"
          >
            <template slot-scope="scope1">
              <p>
                {{ scope1.row.state }}
              </p>
              <p
                :class="scope1.row.zx_tapy==='装修未办理'?'red':''"
                style="font-size:12px;"
              >
                ({{ scope1.row.zx_tapy }})
              </p>

            </template slot-scope="scope1"></el-table-column></el-table></div></div></div></template>
        </el-table-column>
        <el-table-column prop="checktime" label="交房时间" min-width="100" />
        <el-table-column prop="wuye_price" label="物业费到期时间" min-width="120" />
        <el-table-column prop="centn" class-name="note" label="房屋备注"  min-width="80" />
        <el-table-column
          label="操作"
          fixed="right"
          min-width="280"
          >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-modify"
              @click="handleModifyClick(scope.row)"
              style="height:30px; width:52px; "
            >修改</el-button>
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-modify"
              @click="handleUserInfoClick(scope.row)"
              style="width:72px; height:30px; margin-left:8px; background:#1FBBA6"
            >住户信息</el-button>
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-modify"
              @click="handleCarInfoClick(scope.row)"
              style="width:72px; height:30px; margin-left:8px;"
            >车位信息</el-button>
            <el-button
              type="text"
              size="small"
              class="operateBtn btn-record"
              @click="handleRecordClick(scope.row)"
              style="width:72px; height:30px; margin-left:8px;"
            >操作记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if='isShowExcel' class="table-box">
      <!-- 展示Excel -->
      <el-table
        class="rollTable"
        v-if="isShowExcel"
        empty-text="正在解析..."
        :data="excelData"
        row-class-name="myRow"
        cell-class-name="myCell"
        style="width: 100%; height:100%;"
        >
        <el-table-column :prop="prop[0]" label="楼栋" min-width="100" />
        <el-table-column :prop="prop[1]" label="单元" min-width="100" />
        <el-table-column :prop="prop[2]" label="门牌号" min-width="100" />
        <el-table-column :prop="prop[3]" label="房屋面积(m²)" min-width="100" />
        <el-table-column :prop="prop[4]" label="房屋类型" min-width="100" />
        <el-table-column :prop="prop[5]" label="交房时间" min-width="100" />
        <el-table-column v-if="amazing" :prop="prop[6]" label="交房时间" min-width="100" />
        <!-- <el-table-column :prop="prop[6]" label="交房时间" min-width="100" /> -->
        <!-- <el-table-column :prop="prop[6]" label="物业费到期时间" min-width="100" /> -->
        <el-table-column v-if="prop.length===8" :prop="prop[7]" label="原因" min-width="100" />
      </el-table>
    </div>
    <!-- 分页 -->
    <div v-show="!isShowExcel" class="block">
      <p
        class="record-data"
      >共1{{ Math.ceil(pageInfo.total/pageInfo.listRows) }}页 共{{ pageInfo.total }}条</p>
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
      :append-to-body="true"
      :visible.sync="RecordialogFormVisible"
      :close-on-click-modal="false"
      custom-class="myRecordForm"
      >
      <el-form :model="recordData">
        <el-form-item label="上次操作员:" :label-width="formLabelWidth">
          <el-input v-model="recordData.uname" :disabled="true" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上次操作时间" :label-width="formLabelWidth">
          <el-input v-model="recordData.time" :disabled="true" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上次操作ip地址" :label-width="formLabelWidth">
          <el-input v-model="recordData.ip" :disabled="true" autocomplete="off" />
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

    <!-- 添加表格 -->
    <el-dialog
      title="添加房屋"
      custom-class="myAddForm"
      class="position:absolute;top:10px;"
      :append-to-body="true"
      :visible.sync="AdddialogVisible"
      :before-close="handleAddClose"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="addData" label-width="80px">
        <el-form-item label="房屋类型:">
          <el-select v-model="addData.oid" filterable placeholder="请选择">
            <el-option
              v-for="item in houseTypeList"
              :key="item.oid"
              :label="item.typeName"
              :value="item.oid"
            />
          </el-select>
          <span v-if="isShowTip" v-show="n1" class="tips">请选择房屋类型</span>
        </el-form-item>
        <el-form-item label="楼栋1:">
          <el-input v-model.number="addData.userHouseBuilding" @mousewheel.native.prevent type="number" />
          <span v-if="isShowTip" v-show="!n1&&n2" class="tips">请填写楼栋</span>
          <span v-if="isShowTip" v-show="!n1&&n2&&e" class="tips" style="background:#fff;">此房屋已存在,请检查楼栋</span>
        </el-form-item>
        <el-form-item label="单元:">
          <el-input v-model.number="addData.userHouseUnit" @mousewheel.native.prevent type="number" />
          <span v-if="isShowTip" v-show="!n1&&!n2&&n3" class="tips">请填写单元</span>
          <span v-if="isShowTip" v-show="!n1&&!n2&&n3&&e" class="tips" style="background:#fff;">此房屋已存在,请检查单元</span>
        </el-form-item>
        <el-form-item label="门牌号:">
          <el-input v-model.number="addData.userHouseNumber" @mousewheel.native.prevent type="number" />
          <span v-if="isShowTip" v-show="!n1&&!n2&&!n3&&n4" class="tips">请填写门牌号</span>
          <span v-if="isShowTip" v-show="!n1&&!n2&&!n3&&n4&&e" class="tips" style="background:#fff;">此房屋已存在,请检查门牌号</span>
        </el-form-item>
        <el-form-item label="房屋面积:">
          <el-input v-model.trim="addData.Housingarea" class="m" />
          <span v-if="isShowTip" v-show="!n1&&!n2&&!n3&&!n4&&n5" class="tips">请填写房屋面积</span>
        </el-form-item>
        <el-form-item label="交房时间:">
          <!-- <el-input v-model.number="addData.checktime" /> -->
          <div class="block">
            <el-date-picker
              v-model="addData.checktime"
              style="padding-left:20px"
              type="date"
              placeholder=""
            />
          </div>
        </el-form-item>
        <el-form-item v-show="addData.checktime" label="到期时间:">
          <el-date-picker
            v-model="addData.wuye_price"
            style="padding-left:20px"
            type="date"
            placeholder=""
          />
        </el-form-item>
        <div class="row" style="position:relative; height:90px;">
          <span style="position:absolute;left:0;padding-right:12px;">房屋备注:</span>
          <textarea
            v-model.trim="addData.centn"
            rows="1"
            cols="40"
            style="line-height: 18px;outline:none;min-width:220px;
            color: #bfbfbf;border:1px solid #D2D2D2;position:absolute;left:80px;resize:none;max-height:100px;padding:5px;overflow:scroll;overflow-y:hidden;overflow-x:hidden"
            onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},10);"
            onblur="clearInterval(this.clock);"
          />
        </div>
        <div class="addNow" style="cursor:pointer" @click="clickConfirmAdd">确认添加</div>
      </el-form>
    </el-dialog>

    <!-- 修改表格 -->
    <el-dialog
      title="修改"
      custom-class="myForm"
      class="position:fixed;top:10px;"
      :append-to-body="true"
      :visible.sync="ModifydialogVisible"
      :before-close="handleAddClose1"
      :close-on-click-modal="false"
      >
      <p style="position:absolute;right:20px;top:50px;cursor:pointer;color:#999999" @click="detailFormVisible=true;ModifydialogVisible=false">申请修改详情</p>
      <el-form ref="form1" :model="modifyData" label-width="80px">
        <el-form-item v-if="isShowHouseTime" label="交房时间:">
          <!-- <el-input v-model.number="addData.checktime" /> -->
          <div class="block">
            <el-date-picker
              v-model="modifyData.checktime"
              type="date"
              placeholder="选择日期"
            />
          </div>
          <p v-if="tips.checktime" class="tips">请填写时间</p>
        </el-form-item>
        <div class="row" style="position:relative; height:100px;">
          <span style="position:absolute;left:0">房屋备注:</span>
          <textarea
            :placeholder="originData.centn"
            v-model="modifyData.centn"
            rows="1"
            cols="40"
            style="width:250px;border:1px solod #d2d2d2;border-radius:4px;min-height:30px;outline:none;position:absolute;left:80px;resize:none;max-height:100px;padding:5px;overflow:scroll;overflow-y:hidden;overflow-x:hidden"
            onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},10);"
            onblur="clearInterval(this.clock);"
          />
        </div>

        <div class="addNow" style="cursor:pointer" @click="clickConfirmModify">确认修改</div>
      </el-form>
    </el-dialog>

    <!-- 修改详情 -->
    <el-dialog
      title="申请修改详情"
      custom-class="myAddForm"
      class="position:fixed;top:10px;"
      :append-to-body="true"
      :visible.sync="detailFormVisible"
      :close-on-click-modal="false"
      :before-close="handleAddClose2"
      >

      <el-checkbox class="de" v-model="isDeleteHouse">申请删除房屋</el-checkbox>

      <el-form ref="form2" :model="modifyData" label-width="380px">

        <div v-show="!isDeleteHouse">
          <div class="row">
            <span class="t1">房屋类型:</span>
            <span class="t2">{{ originData.typeName }}</span>
            <span class="t3">修改为:</span>
            <el-select v-model="modifyData.cid" filterable placeholder="请选择修改">
              <el-option
                v-for="item in houseTypeList"
                :key="item.oid"
                :label="item.typeName"
                :value="item.oid"
              />
            </el-select>
            <!-- {{modifyData.cid}} -->
          </div>
          <div class="row">
            <span class="t1">楼栋:</span>
            <span class="t2">{{ originData.userHouseBuilding }}</span>
            <span class="t3">修改为:</span>
            <input class="t4" v-model="modifyData.userHouseBuilding" @mousewheel.prevent type="number">
            <p v-if="tips.isExist" class="tips">此房屋已存在,请检查楼栋</p>
          </div>
          <div class="row">
            <span class="t1">单元:</span>
            <span class="t2">{{ originData.userHouseUnit }}</span>
            <span class="t3">修改为:</span>
            <input class="t4" v-model="modifyData.userHouseUnit" @mousewheel.prevent type="number">
            <p v-if="tips.isExist" class="tips">此房屋已存在,请检查单元</p>
          </div>
          <div class="row">
            <span class="t1">门牌号:</span>
            <span class="t2">{{ originData.userHouseNumber }}</span>
            <span class="t3">修改为:</span>
            <input class="t4" v-model="modifyData.userHouseNumber" @mousewheel.prevent type="number">
            <p v-if="tips.isExist" class="tips">此房屋已存在,请检查门牌号</p>
          </div>
          <div class="row">
            <span class="t1">房屋面积:</span>
            <span class="t2">{{ originData.Housingarea }}</span>
            <span class="t3">修改为:</span>
            <input class="t4" v-model="modifyData.Housingarea" type="text">
          </div>
          <div class="row">
            <span class="t1">物业费单价:</span>
            <span class="t2">{{ originData.Price }}</span>
            <span class="t3">修改为:</span>
            <input class="t4" v-model="modifyData.Price" type="text">
          </div>
        </div>

        <div class="row" style="position:relative; height:100px;">
          <span  class="t1">*申请理由:</span>
            <textarea
            v-model="modifyData.centns"
            rows="1"
            cols="40"
            style="height:23px;border-radius:4px;border:1px solid #d2d2d2;outline:none;position:absolute;left:85px;resize:none;max-height:100px;padding:5px;overflow:scroll;overflow-y:hidden;overflow-x:hidden"
            onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},10);"
            onblur="clearInterval(this.clock);"
          />
          <p v-if="tips.reason" class="tips" style="right:290px !important;top:23px">必填</p>
        </div>
        <div v-if="!isDeleteHouse" class="addNow" style="cursor:pointer" @click="clickConfirmModify1">确认修改</div>
        <div v-if="isDeleteHouse" class="addNow" style="cursor:pointer" @click="clickConfirmModify2">确认修改dd</div>
      </el-form>
    </el-dialog>
  </div>
    <resident-info
      v-else
      :houseid="houseid"
      :housenumber="housenumber"
      @isShowHouse="isShowHouse1"
    />
  </div>
</template>

<script>
// require('@assets/styles/myChargeStyle')
import axios from 'axios'
import ResidentInfo from './ResidentInfo'
export default {
  name: 'HouseDetails',
  components: {
    ResidentInfo
  },
  data() {
    return {
      showDot: false,
      amazing: true,
      tips: {
        checktime: false, // 交房时间是否为空
        isExist: false, // 要修改的房屋是否已存在
        reason: false // 是否填写申请理由
      },
      housenumber: '',
      houseid: null,
      houseDetailShow: true,
      prop: ['1', '2', '3', '4', '5', '6', '7'],
      isShowTip: false,
      isError: false,
      dr_nameId: '', // 点击确认导入传给后台
      excelData: [],
      isShowExcel: false,
      fileList: [],
      originData: '',
      isShowHouseTime: true,
      isDeleteHouse: false, // 申请删除房屋
      isMainBox: true,
      token: '',
      searchData: '', // 搜索的内容
      // 分页信息
      pageInfo: {
        page: 1, // 当前页
        total: 1, // 总条数
        listRows: 10, // 每页多少条
        pageNum: 1, // 总页数
        render: ''
      },
      // pt: '',
      // pn: '',
      // 操作记录
      formLabelWidth: '120px', // 记录表格宽度
      RecordialogFormVisible: false,
      recordData: {},
      houseTypeList: [{
        oid: 55,
        typeName: '商业'
      }], // 房屋类型列表
      existedType: [], // 已近存在的房屋类型
      tableData: [
        // {
        //   'userHouseId': 1, // 房屋主键id
        //   'userHouseBuilding': 0, // 楼栋
        //   'userHouseUnit': 0, // 单元
        //   'userHouseNumber': 0, // 门牌
        //   'Housingarea': null, // 房屋面积
        //   'typeName': null, // 房屋类型名称
        //   'Price': null, // 物业费单价
        //   'state': '未交房', // 是否交房
        //   'zx_tapy': '装修未办理', // 装修是否办理
        //   'checktime': null, // 交房时间
        //   'wuye_price': null, // 房屋物业到期时间
        //   'centn': null, // 房屋备注
        //   'time': null, // 操作时间
        //   'uname': null, // 添加修改操作人
        //   'ip': null, // 上次操作ip
        //   'usname': null, // 审核人
        //   'times': null, // 审核时间
        //   'Result': ''// 审核结果
        // }
      ],
      tableData1: [], // 存储搜索或添加后的结果
      n1: false, // 不为空
      n2: false,
      n3: false,
      n4: false,
      n5: false,
      e: false,
      AdddialogVisible: false, // 添加框
      ModifydialogVisible: false, // 修改框
      addData: {
        'Communityid': '', // 小区id
        'oid': '', // 房屋类型id
        'userHouseBuilding': '', // 楼栋
        'userHouseUnit': '', // 单元
        'userHouseNumber': '', // 门牌号
        'Housingarea': '', // 房屋面积
        'checktime': '', // 交房时间
        'wuye_price': '', // 到期时间
        'centn': '', // 房屋备注
        'uname': ''// 操作人
      },
      modifyData: {
        'uname': '', // 操作人
        'userHouseId': '', // 房屋主键id (已交房 只修改备注)

        'centn': '', // 修改的备 (未交房 修改备注和时间)
        'checktime': '', // 交房时间

        'Communityid': '', // 小区id (已交房和未交房)
        'cid': '', // 房屋类型主键id
        'Housingarea': '', // 房屋面积
        'Price': '', // 物业单价
        'userHouseBuilding': '', // 楼栋
        'userHouseUnit': '', // 单元
        'userHouseNumber': '', // 门牌
        'centns': ''// 申请理由
      },
      modifyType: {
        centOnly: false,
        centAndTime: false
      },
      detailFormVisible: false,

      userInfo: { // 登录用户相关信息
        token: '',
        uname: '',
        Communityid: ''
      }
    }
  },
  computed: {
    dUrl() {
      return `http://test.txsqtech.com/index/House/downloadFile?token=${this.userInfo.token}`
    }

  },
  watch: {
    'addData.Housingarea': {
      handler(n, o) {
        n = String(n)
        if (Number(n) == n) {
          if (n.includes('.')) {
            this.addData.Housingarea = n.slice(0, n.indexOf('.') + 3)
          }
        } else {
          this.addData.Housingarea = o
        }
      },
      deep: true,
      immediate: true
    },
    'modifyData.Housingarea': {
      handler(n, o) {
        n = String(n)
        if (Number(n) == n) {
          if (n.includes('.')) {
            this.modifyData.Housingarea = n.slice(0, n.indexOf('.') + 3)
          }
        } else {
          this.modifyData.Housingarea = o
        }
      },
      deep: true,
      immediate: true
    },
    'modifyData.Price': {
      handler(n, o) {
        n = String(n)
        if (Number(n) == n) {
          if (n.includes('.')) {
            this.modifyData.Price = n.slice(0, n.indexOf('.') + 3)
          }
        } else {
          this.modifyData.Price = o
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.userInfo = this.getUserInfo()
    this.userInfo.token = JSON.parse(localStorage.getItem('userInfo')).token
    this.getJudgeList()
    this.getHouseType()
    this.getHouseList()
  },
  methods: {
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
        if (res.data.code === 200) {
          if (res.data.msg.data.length > 0) {
            this.showDot = true
          }
        }
      })
    },
    ok() {
      this.isShowExcel = false
      this.isError = false
    },
    isShowHouse1() {
      this.houseDetailShow = true
    },
    beforeUpload(file) {
      const { token, Communityid } = this.userInfo
      var fd = new window.FormData()
      fd.append('excel', file)
      fd.append('Communityid', Communityid)
      axios.post('http://test.txsqtech.com/index/House/excel', fd,
        {
          headers: {
            token
          }
        }).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.msg.data, '本地的excel')
          this.excelData = res.data.msg.data
          this.dr_nameId = res.data.msg.dr_nameId
          this.prop = ['1', '2', '3', '4', '5', '6', '7']
          this.isShowExcel = true
          this.amazing = false
          setTimeout(() => {
            this.amazing = true
          }, 1)
        } else if (res.data.code === 10000) {
          this.$router.push('/')
        }
        console.log(this.dr_nameId, 'aaaaaaa')
      })
      return false // 返回false不会自动上传
    },

    // Excel导入数据库
    excelImport() {
      this.$confirm('确认导入以下房屋?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { uname, Communityid, token } = this.userInfo
        const dr_nameId = this.dr_nameId
        console.log(dr_nameId, 'idididid')
        axios.post('http://test.txsqtech.com/index/House/excelImport',
          {
            uname, Communityid, dr_nameId
          },
          {
            headers: {
              token
            }
          }).then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length > 0) {
              // 提示导入数据失败
              this.isError = true
            }
            if (res.data.data.length === 0) {
              this.$message({
                message: '导入成功',
                type: 'success'
              })
              this.isShowExcel = false
              this.getHouseList()
            }
            console.log(res.data.data, '回来的excel')
            this.prop = ['userHouseBuilding', 'userHouseUnit', 'userHouseNumber', 'Housingarea', 'cid', 'checktime', 'wuye_price', 'Reason']
            this.excelData = res.data.data
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消导入'
        })
      })
    },
    uploadFile() {
      // this.isShowExcel = true
    },
    // 返回上一页
    backToLastPage() {
      this.searchData = ''
      this.isMainBox = true
      this.isShowExcel = false
      // this.pageInfo.total = this.pt
      // this.pageInfo.pageNum = this.pn
      this.getHouseList()
    },
    // 返回上一级
    backToLastPage1() {

    },
    // 下载模板
    clickDownLoad() {
      const { token } = this.userInfo
      const url = 'http://test.txsqtech.com/index/House/downloadFile'
      axios.get(url, {
        headers: {
          token
        },
        responseType: 'blob' // 二进制流
      }).then(function(res) {
        if (!res) return
        const blob = new Blob([res.data], { type: 'application/vnd.ms-excel;charset=utf-8' })
        const url = window.URL.createObjectURL(blob)
        const aLink = document.createElement('a')
        aLink.style.display = 'none'
        aLink.href = url
        aLink.setAttribute('download', '房屋模板.xls')
        document.body.appendChild(aLink)
        aLink.click()
        document.body.removeChild(aLink)
        window.URL.revokeObjectURL(url)
      }).catch(function(error) {
        console.log(error)
      })
    },
    getHouseType() {
      const { Communityid, token } = this.userInfo
      axios.post('http://test.txsqtech.com/index/House/typeSelect',
        { Communityid },
        {
          headers: {
            token
          }
        }).then(res => {
        this.houseTypeList = res.data.msg // 房屋类型列表
        // console.log(this.houseTypeList, '房屋类型列表')
      })
    },
    getUserInfo() {
      return JSON.parse(localStorage.getItem('userInfo')).data
    },
    // 格式化时间
    //   formatDate(now) {
    //     var year = now.getFullYear()
    //     var month = now.getMonth() + 1
    //     var date = now.getDate()
    //     var hour = now.getHours()
    //     var minute = now.getMinutes()
    //     var second = now.getSeconds()
    //     return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    //   },
    handleUserInfoClick(v) {
      console.log(v, '639')
      this.houseid = v.userHouseId
      this.housenumber = v.housenumber
      this.houseDetailShow = false
    },
    handleCarInfoClick(v) {
      // alert('车位信息')
    },
    handleRecordClick(v) {
      console.log(v, 'r')
      // var d = new Date(v.time * 1000) // 创建一个指定的日期对象
      this.RecordialogFormVisible = true
      // this.recordData.ip = v.ip // ip
      // this.recordData.time = v.time // 操作时间
      // this.recordData.uname = v.uname // 操作人员
      this.recordData = v
      // console.log(this.recordData, 'record数据')
      // alert('记录')
    },
    // 点击添加房屋
    clickAddHouse() {
      this.AdddialogVisible = true
    },
    // 点击导入房屋
    clickImportHouse() {
      // alert('导入')
    },
    sendExcel() {
      const { Communityid } = this.userInfo
      axios.post('http://test.txsqtech.com/index/House/excel',
        {
          Communityid
        })
    },
    // 点击修改
    handleModifyClick(v) {
      console.log(v)
      if (v.state === '已交房') {
        // alert('已交房')
        this.modifyType.centOnly = true
        // 隐藏交房时间
        this.isShowHouseTime = false
      }
      if (v.state === '未交房') {
        // alert('未交房')
        this.modifyType.centOnly = false
        this.isShowHouseTime = true
      }
      this.originData = v
      this.ModifydialogVisible = true
    },
    // 确认修改
    clickConfirmModify() {
      // this.modifyData.checktime = this.originData.checktime
      // this.modifyData.centn = this.originData.centn
      const { userHouseId } = this.originData
      const { uname } = this.userInfo
      const { centn, checktime } = this.modifyData
      console.log(this.modifyData, '提交修改的数据')
      if (this.modifyType.centOnly) { // 已交房 只修改备注
        // alert('已交房 只修改备注')
        this.sendModifyRequest(uname, userHouseId, centn)
      } else { // 未交房 修改时间和备注
        // alert('未交房 修改时间和备注')
        if (checktime) {
          this.sendModifyRequest1(uname, userHouseId, centn, checktime)
        } else {
          this.tips.checktime = true
          setTimeout(() => {
            this.tips.checktime = false
          }, 3000)
        }
      }

      // else { //修改房屋详情
      //   this.sendModifyRequest2(uname, userHouseId, centns, userHouseNumber, userHouseUnit, userHouseBuilding, Price, Housingarea, cid, Communityid)
      // }
    },
    // 确认修改详情
    clickConfirmModify1() {
      this.modifyData.checktime = this.originData.checktime
      this.modifyData.centn = this.originData.centn
      console.log(this.userInfo)
      const { Communityid, uname } = this.userInfo
      // const { cid } = this.houseTypeList.oid
      console.log(this.houseTypeList)
      const { userHouseId } = this.originData
      const {
        cid,
        centn, checktime,
        Housingarea, Price, userHouseBuilding,
        userHouseUnit, userHouseNumber, centns } = this.modifyData
      console.log(this.modifyData, '提交修改的数据')
      // 修改房屋详情
      if (centns) {
        this.sendModifyRequest2(uname, userHouseId, centns, userHouseNumber, userHouseUnit, userHouseBuilding, Price, Housingarea, cid, Communityid)
      } else {
        this.tips.reason = true
        setTimeout(() => {
          this.tips.reason = false
        }, 3000)
      }
    },
    // 确认删除
    clickConfirmModify2() {
      if (this.modifyData.centns) {
        this.sendDeleteRequest()
      } else {
        this.tips.reason = true
        setTimeout(() => {
          this.tips.reason = false
        }, 3000)
      }
    },
    sendDeleteRequest() {
      const { uname, token } = this.userInfo
      const { userHouseId } = this.originData
      const centns = this.modifyData.centns
      axios.post('http://test.txsqtech.com/index/House/houseDetele',
        {
          uname, userHouseId, centns
        },
        {
          headers: {
            token
          }
        }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.detailFormVisible = false
          this.isDeleteHouse = false
          this.getHouseList()
          this.clearModifyData()
          this.$message({
            message: '申请删除房屋成功22',
            type: 'success'
          })
        } else if (res.data.code === 10000) {
          this.$router.push('/')
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    useData() {},
    /* 添加表单相关事件 */
    // 确认添加
    clickConfirmAdd() {
      console.log(this.addData, '添加的数据')
      this.varifyData(this.addData) // 验证数据
      if (!this.n1 && !this.n2 && !this.n3 && !this.n4 && !this.n5) {
        if (!this.addData.checktime) {
          this.addData.wuye_price = null
        }
        this.sendAddRequest()
      } else {
        // alert('no')
      }
    },
    varifyData(d) {
      this.isShowTip = true
      setTimeout(() => {
        this.isShowTip = false
      }, 4000)
      if (d.oid === '') this.n1 = true
      else this.n1 = false
      if (d.userHouseBuilding === '') this.n2 = true
      else this.n2 = false
      if (d.userHouseUnit === '') this.n3 = true
      else this.n3 = false
      if (d.userHouseNumber === '') this.n4 = true
      else this.n4 = false
      if (d.Housingarea === '') this.n5 = true
      else this.n5 = false
    },
    // clickConfirmModify() {
    //   console.log(this.modifyData, '修改的数据')
    //   this.sendModifyRequest()
    // },
    sendAddRequest() {
      const { Communityid, uname, token } = this.userInfo
      this.addData.Communityid = Communityid
      this.addData.uname = uname
      axios.post('http://test.txsqtech.com/index/House/houseInsert',
        {
          ...this.addData
        },
        {
          headers: {
            token
          }
        }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.clearAddData()
          this.e = false
          this.AdddialogVisible = false
          const userHouseId = res.data.msg
          // 跳转
          this.isMainBox = false // 显示返回上一页
          // console.log(res)
          this.sendSingleSelectRequest(userHouseId)

          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } else if (res.data.code === 300) { // 房屋已存在
          this.e = true
          this.$message({
            type: 'warning',
            message: '该房屋已存在'
          })
        } else if (res.data.code === 406) {
          this.e = false
          this.$message({
            message: '添加失败',
            type: 'error'
          })
        } else if (res.data.code === 10000) {
          this.e = false
          this.$router.push('/')
        }
        console.log(res)
      })
    },
    // 添加成功后查询单个房屋
    sendSingleSelectRequest(userHouseId) {
      const { token } = this.userInfo
      axios.post('http://test.txsqtech.com/index/House/singleSelect',
        {
          userHouseId, // 房屋主键id
          'page': '1', // 当前页码(选填：默认为1)
          'count': '10' // 每页多少条(选填：默认为10)
        },
        {
          headers: {
            token
          }
        }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          console.log(res.data.msg.data)
          res.data.msg.data.forEach((item) => {
            item.checktime = item.checktime.slice(0, -9)
            item.wuye_price = item.wuye_price.slice(0, -9)
          })
          this.tableData = res.data.msg.data
          this.pageInfo.pageNum = res.data.msg.pageNum
          this.pageInfo.total = res.data.msg.total
        }
      })
    },

    handleAddClose() {
      this.AdddialogVisible = false
      this.n1 = false
      this.n2 = false
      this.n3 = false
      this.n4 = false
      this.n5 = false
      this.e = false
      this.clearAddData()
    },
    /* 修改表单相关事件 */
    // 确认修改

    handleAddClose1() {
      this.ModifydialogVisible = false
      setTimeout(() => {
        this.clearModifyData()
      }, 1000)
    },
    handleAddClose2() {
      this.detailFormVisible = false
      this.isDeleteHouse = false
      setTimeout(() => {
        this.clearModifyData()
      }, 1000)
    },
    clearAddData() {
      this.addData = {
        'Communityid': '', // 小区id
        'oid': '', // 房屋类型id
        'userHouseBuilding': '', // 楼栋
        'userHouseUnit': '', // 单元
        'userHouseNumber': '', // 门牌号
        'Housingarea': '', // 房屋面积
        'checktime': '', // 交房时间
        'wuye_price': '', // 到期时间
        'centn': '', // 房屋备注
        'uname': ''// 操作人
      }
    },
    clearModifyData() {
      this.modifyData = {
        'uname': '', // 操作人
        'userHouseId': '', // 房屋主键id (已交房 只修改备注)

        'centn': '', // 修改的备 (未交房 修改备注和时间)
        'checktime': '', // 交房时间

        'Communityid': '', // 小区id (已交房和未交房)
        'cid': '', // 房屋类型主键id
        'Housingarea': '', // 房屋面积
        'Price': '', // 物业单价
        'userHouseBuilding': '', // 楼栋
        'userHouseUnit': '', // 单元
        'userHouseNumber': '', // 门牌
        'centns': ''// 申请理由
      }
    },
    // 点击搜索
    handleSearch() {
      if (this.searchData === '') {
        this.$message({
          message: '搜索内容不能为空',
          type: 'warning'
        })
      } else {
        this.pageInfo.page = 1
        this.sendSearchRequest()
      }
    },
    sendSearchRequest() {
      const { Communityid, token } = this.userInfo
      axios.post(`http://test.txsqtech.com/index/House/searchSelect`,
        {
          Communityid,
          name: this.searchData,
          page: this.pageInfo.page,
          count: '10'
        },
        {
          headers: {
            token
          }
        }).then(res => {
        if (res.data.code === 200) {
          this.isMainBox = false
          res.data.msg.data.forEach((item) => {
            item.checktime = item.checktime.slice(0, -9)
            item.wuye_price = item.wuye_price.slice(0, -9)
          })
          this.tableData = res.data.msg.data
          // this.pt = this.pageInfo.total // 总条数
          this.pageInfo.total = res.data.msg.total
          // this.pn = this.pageInfo.pageNum // 总页数
          this.pageInfo.pageNum = res.data.msg.pageNum
        }
        if (res.data.code === 10000) {
          // alert('token过期 跳转登录')
          this.$router.push('/')
        } else if (res.data.code === 401) {
          this.$message({
            message: '查询无结果',
            type: 'warning'
          })
        }
        console.log(res)
      })
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
      // console.log(val)
    },
    nextClickHandler(val) {
      // console.log(val, '354')
    },
    // 请求列表
    getHouseList() {
      // console.log(this.userInfo)
      axios.post(`http://test.txsqtech.com/index/House/houseSelect?page=${this.pageInfo.page}`, { Communityid: this.userInfo.Communityid },
        {
          headers: {
            token: this.token
          }
        })
        .then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            this.pageInfo.total = res.data.msg.total
            // this.pageInfo.page = this.pageInfo.pageNum
            this.pageInfo.pageNum = res.data.msg.pageNum
            // console.log(res.data.msg)
            // console.log(res.data.msg.data)
            res.data.msg.data.forEach((item) => {
              item.checktime = item.checktime.slice(0, -9)
              item.wuye_price = item.wuye_price.slice(0, -9)
            })
            this.tableData = res.data.msg.data
          } else if (res.data.code === 10000) {
            // alert('token过期,即将跳转登录页面')
            this.$router.push('/')
          }
        })
    },

    /* 修改请求 */
    // 修改备注
    sendModifyRequest(uname, userHouseId, centn) {
      // console.log('修改的请求数据', this.modifyData)
      // const { oid, typename, money } = this.modifyData
      // const uname = this.userInfo.uname
      axios.post('http://test.txsqtech.com/index/House/houseUpdete',
        {
          uname, userHouseId, centn
        },
        {
          headers: {
            token: this.token
          }
        }).then(res => {
        this.clearModifyData()
        if (res.data.code === 200) {
          this.getHouseList()
          this.ModifydialogVisible = false // 关闭添加
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else if (res.data.code === 401) {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        }
      })
    },
    // 修改交房时间和备注
    sendModifyRequest1(uname, userHouseId, centn, checktime) {
      // console.log('修改的请求数据', this.modifyData)
      // const { oid, typename, money } = this.modifyData
      // const uname = this.userInfo.uname
      axios.post('http://test.txsqtech.com/index/House/houseUpde',
        {
          uname, userHouseId, centn, checktime
        },
        {
          headers: {
            token: this.token
          }
        }).then(res => {
        this.clearModifyData()
        if (res.data.code === 200) {
          this.getHouseList()
          this.ModifydialogVisible = false // 关闭添加
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        }
      })
    },
    // 修改详情
    sendModifyRequest2(uname, userHouseId, centns, userHouseNumber, userHouseUnit, userHouseBuilding, Price, Housingarea, cid, Communityid) {
      // console.log('修改的请求数据', this.modifyData)
      // const { oid, typename, money } = this.modifyData
      // const uname = this.userInfo.uname

      axios.post('http://test.txsqtech.com/index/House/houseUpdet',
        {
          uname, userHouseId, centns,
          userHouseNumber, userHouseUnit, userHouseBuilding,
          Price, Housingarea, cid, Communityid
        },
        {
          headers: {
            token: this.token
          }
        }).then(res => {
        this.clearModifyData()
        if (res.data.code === 200) {
          this.getHouseList()
          this.ModifydialogVisible = false // 关闭添加
          this.detailFormVisible = false
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        } else if (res.data.code === 402) {
          this.tips.isExist = true
          setTimeout(() => {
            this.tips.isExist = false
          }, 3000)
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      })
    }
  }
  // filters: {
  //   dateFormat(time){
  //     console.log(time)
  //     let arr=[]
  //     for(let i=0,len=time.length; i<len; i++){
  //       arr.push[time[i]+'a']
  //     }
  //     return arr
  //   }
  // }
}
</script>

<style lang="scss" scoped>

.dot{
      display: inline-block;
      z-index: 10;;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #F44;
      position: absolute;
      top: -28px;
      left: 240px;
    }
.tips{
    color: red;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
}
.red{
  color: red;
}
  /deep/.rollTable{
    overflow-y: auto;
  }
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
    padding: 4px;
    font-size: 14px;
  }
  //添加表单样式
  /deep/ .myAddForm{
    width: 520px !important;
    .el-input__inner::-webkit-outer-spin-button,
    .el-input__inner::-webkit-inner-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }
    /* 火狐 */
    /* 谷歌 */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }
    /* 火狐 */
    input{
        -moz-appearance:textfield;
    }
    .el-input__inner{
        -moz-appearance:textfield;
    }
    .el-input__inner{
      width: 96%;
      margin-left: 2px;
      padding-left: 12px;
    }
    margin-top: 0 !important;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    left: 50%;
    max-width: 600px;
    min-width: 380px;
    padding-bottom: 30px;
    .el-dialog__header{ //header
      border-bottom: 1px solid #dfdfdf;
      .el-dialog__title{
        color: #333333;
      }
    }
    .el-dialog__body{
      position: relative;
        padding: 40px 60px 30px !important;
        .de{
          position: absolute;
          left: 30px;
          top: 10px;
          padding-bottom: 10px;
        }
        .el-form{
          .row{
            position: relative;
            padding-bottom: 18px;
            .tips{
              position: absolute;
              right: 99px;
            }
            .textArea{

            }
            span{
              display: inline-block;
            }
            .t1{

              width: 100px;
            }
            .t2{
              width: 80px;
            }
            .t3{
              padding-right: 15px;
            }
            .t4{
              width: 150px;
              border: 1px solid #d2d2d2;
              height: 23px;
              padding-left: 5px;
              padding-right: 5px;
              outline: none;
              border-radius: 4px;
            }
            /deep/.el-select{
              width: 150px;
              padding-left: 5px;
              border: 1px solid #d2d2d2;
              border-radius: 4px;
              .el-input__inner{
                  padding-left: 0;
                }
              .el-input__suffix-inner{
                height: 100%;
                .el-input__icon{
                  line-height: 1;
                }
              }
            }
          }
        }
      }
    .addNow{
      height: 30px;
      padding: 0 8px;
      position: absolute;
      background-color: #F8AC59;
      line-height: 30px;
      color: #FFFEFE;
      border-radius: 4px;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
    .el-form-item{
      height: 40px !important;
      margin-bottom: 25px;
      .el-form-item__label{ //lable
        color: #666666;
        text-align: left;
      }
      .el-form-item__content{ //content
        border: 1px solid #D2D2D2;
        margin-left: 85px !important;
        border-radius: 4px;
        height: 100%;
        .m::after{
          content:'m²';
          position: absolute;
          right:-25px;
        }
        .el-select{
          width: 100%;
        }
        .tips{ //tips
          color: red;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          position: absolute;
          bottom: -22px;
          left: 0;
        }
      }
    }
  }
  /deep/.myForm{
    margin-top: 0 !important;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    left: 50%;
    width: 400px;
    padding-bottom: 30px;
    .el-dialog__body{
      padding-top: 40px;
    }
    .el-dialog__header{ //header
      position: relative;
      height: 40px;
      border-bottom: 1px solid #dfdfdf;
      .el-dialog__title{
        position: absolute;
        top:0;
        height: 40px;
        line-height: 40px;
        color: #333333;
      }
      .el-dialog__headerbtn {
        top: 12px;
      }

    }
    .el-form-item__label{
        height: 30px;
        line-height: 30px;
        text-align: left !important;
      }
      .el-form-item{
        height: 40px !important;
        margin-bottom: 15px;
        .el-form-item__content{
          border-radius: 4px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #d2d2d2;
          width: 250px;
          .el-input__icon{
            line-height: 30px;
          }
        }
      }
      .addNow{
      height: 30px;
      padding: 0 8px;
      position: absolute;
      background-color: #F8AC59;
      line-height: 30px;
      color: #FFFEFE;
      border-radius: 4px;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }

  }
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

  #house-details{
    position: relative;
    padding: 20px;
    height: 90%;
    background-color: #fff;
    .table-box{ //table
      position: relative;
      width: 100%;
      top: 13px;
      min-width: 1266px;
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
        padding: 7px 0;
      }
      /deep/.myCell {
        border-collapse: collapse;
        }
      /deep/.note{
        position: relative;
        .cell{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        // .cell:hover{
        //     background: #fff;

        //     white-space: normal;
        //     overflow: auto;
        // }

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
      height: 30px;
      position: relative;
      .add-btn{
        cursor: pointer;
        background-color: #1FBBA6;
        color: #fff;
        height: 30px;
        line-height: 30px;
        position: absolute;
        top: 43%;
        font-size: 14px;
        bottom: 50%;
        margin-top: -13px;
        padding: 0 8px;
        border-radius: 4px;
    }
    .load-btn{
      cursor: pointer;
      color: #25BAD9;
      position: absolute;
      font-size: 12px;
      right: 0px;
      top: -45px;
    }
    .add-btn1{
        cursor: pointer;
        background-color: #25BAD9;
        border: 1px solid #25bad9;
        color: #fff;
        height: 30px;
        line-height: 28px;
        font-size: 14px;
        position: absolute;
        top: 42%;
        bottom: 50%;
        left: 82px;
        margin-top: -13px;
        padding: 0 8px;
        border-radius: 4px;
    }
    .search-btn{
        position: absolute;
        height: 30px;
        background-color: #bfbfbf;
        top: 42%;
        bottom: 50%;
        right: 0px;
        border-radius: 0 3px 3px 0;
        margin-top: -13px;
        z-index: 9;
        color: #fff;
        font-size: 14px;
        line-height: 30px;
        padding: 0 5px;
        cursor: pointer;
      }
    .sreach-box{
      width: 200px;
      height: 30px;
      position: absolute;
      top: 42%;
      right: 0px;
      border-radius: 3px;
      margin-top: -13px;
      border: 1px solid #bfbfbf;
      /deep/.el-input__inner{
        height: 100% !important;
        padding-left: 7px !important;
      }
    }
  }
  //分页器的样式
  .block {
    .record-data {
      cursor: default;
    display: inline-block;
    line-height: 18px;
    margin-top: 15px;
    position: absolute;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    }
    position: absolute;
    top: 742px;
    height: 40px;
    width: 100%;
    .el-pagination {
      position: absolute;
    top: 10px;
    right: 68px;
    width: 235px;
      /deep/button {
        min-width: 24px !important;
      height: 24px;
      cursor: default;
      }
      /deep/.el-pagination__jump {
        position: relative;
      margin-left: 5px;
      background: #5FAFE4;
      height: 24px;
      border-radius: 3px;
      color: #fff;
      font-size: 0px;
      //input和ul是否居中
      margin-top: 0px;
        .el-input {
          font-family: Microsoft YaHei;
        font-weight: 400;
        height: 24px;
        width: 40px;
        margin-left: 3px;
        border-radius: 3px;
        color: rgba(102, 102, 102, 1);
        outline: none;
        text-align: center;
          /deep/.el-input__inner {
            font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          display: inline-block;
          margin-left: 48px ;
          width: 40px;
          height: 24px !important;
          border: 1px solid rgba(239, 242, 245, 1) !important;
          border-radius: 3px;
          outline: none;
          }
          &::before {
             content: "前往";
          color: #fff;
          font-size: 14px;
          display: inline-block;
          position: absolute;
          margin-left: 4px;
          text-align: center;
          margin-top: 3px;
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
      border-radius: 2px;
      font-size: 10px;
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
  }
</style>
