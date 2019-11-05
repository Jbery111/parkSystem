<template>
  <div>
    <!--   -->
    <el-card class="box-card">
      <span v-if="isShowAddto" id="newadd" @click="isShow1">新增单元门</span>
      <span v-else class="newAdd" @click="exitBefore">返回上一级</span>
      <!-- 搜索框 -->
      <div v-if="isShowAddto" class="serach-box">
        <input
          v-model="serachContent"
          type="text"
          placeholder="请输入搜索内容"
          @keyup.enter="serachHandler"
        >
        <div class="serach" @click="serachHandler">
          <svg-icon icon-class="search1" />
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%;top:12px; min-width:1000px" empty-text="没有数据">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand" label-width="115px">
              <el-row>
                <!-- 人脸 -->
                <el-col v-if="props.row.equipmentnameRl" :span="8" style="width:30.4%">
                  <el-form-item label="设备名称:">
                    <span>{{ props.row.equipmentnameRl }}</span>
                  </el-form-item>
                  <el-form-item label="设备出厂号:">
                    <span>{{ props.row.factorynumberRl }}</span>
                  </el-form-item>
                  <el-form-item label="门禁控制器编号:">
                    <span>{{ props.row.ladderRl }}</span>
                  </el-form-item>
                </el-col>
                <!-- 蓝牙 -->
                <el-col v-if="props.row.equipmentnameLy" :span="8" style="width:29.4%">
                  <el-form-item label="设备名称:">
                    <span>{{ props.row.equipmentnameLy }}</span>
                  </el-form-item>
                  <el-form-item label="设备出厂号:">
                    <span>{{ props.row.factorynumberLy }}</span>
                  </el-form-item>
                  <el-form-item label="门禁控制器编号:">
                    <span>{{ props.row.ladderLy }}</span>
                  </el-form-item>
                </el-col>
                <!-- 二维码 -->
                <el-col v-if="props.row.equipmentnameEw" :span="8">
                  <el-form-item label="设备名称:">
                    <span>{{ props.row.equipmentnameEw }}</span>
                  </el-form-item>
                  <el-form-item label="设备出厂号:">
                    <span>{{ props.row.factorynumberEw }}</span>
                  </el-form-item>
                  <el-form-item label="门禁控制器编号:">
                    <span>{{ props.row.ladderEw }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="楼栋" prop="Tung" min-width="150" />
        <el-table-column label="单元" prop="single" min-width="150" />
        <el-table-column label="单元门名称" prop="door" min-width="150" />
        <!-- 操作 -->
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              style="background:#25BAD9; color:#fff; font-size:14px;height:30px; width:52px;
            border-color:#25BAD9; padding:5px;"
              @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              class="el-btn2"
              size="mini"
              type="danger"
              style="background:#BFBFBF; color:#fff; font-size:14px;height:30px; width:52px;
            border-color:#BFBFBF; padding:5px;"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
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
    <!-- 新增单元门遮罩层 -->
    <!-- 创建/修改职位遮罩层 -->
    <el-dialog
      :visible.sync="centerDialogVisible"
      center
      :append-to-body="true"
      :close-on-click-modal="false"
      class="add-class"
    >
      <span slot="title">新增单元门</span>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        label-width="115px"
        class="demo-ruleForm1"
        label-position="left"
      >
        <!-- 第一行大门名称： -->

        <div class="div-row">
          <el-form-item label="选择楼栋:" prop="gateName" class="building-class">
            <el-select v-model="value" placeholder="请选择楼栋" no-data-text="请选择楼栋">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.userHouseBuilding"
                :value="item.userHouseBuilding"
              >
                <span
                  class="chenp"
                  @click="hanPoid(item.userHouseBuilding)"
                >{{ item.userHouseBuilding }}</span>
              </el-option>
            </el-select>
            <div class="loudong-class">{{ buildoingContent }}</div>
          </el-form-item>
        </div>
        <div class="div-row">
          <el-form-item label="选择单元:" prop="gateName" class="building-class">
            <el-select v-model="value1" placeholder="请选择单元" no-data-text="请先选择楼栋">
              <el-option
                v-for="(item,index) in options1"
                :key="index"
                :label="item.userHouseUnit"
                :value="item.userHouseUnit"
              >
                <span class="chenp" @click="hanPoid1(item.userHouseUnit)">{{ item.userHouseUnit }}</span>
              </el-option>
            </el-select>
            <div class="loudong-class">{{ unitContent }}</div>
          </el-form-item>
        </div>
        <div class="div-row">
          <el-form-item label="单元门名称:" prop="gateName" class="building-class">
            <el-input v-model="ruleForm.Gatename" />
            <div class="loudong-class">{{ doorName }}</div>
          </el-form-item>
        </div>
        <div class="div-row">
          <el-form-item label="设备编号:" prop="gateName" class="building-class">
            <el-input v-model="ruleForm.equipment" />
            <div class="loudong-class">{{ equipmentContent }}</div>
          </el-form-item>
        </div>

        <!-- 第三模块（入口标题） -->
        <!-- <el-row :gutter="20" type="flex" justify="left">
          <el-col v-if="isEntryFcShow" :span="8" />
          <el-col v-if="isEntryBlShow" :span="8" />
          <el-col v-if="isEntryErShow" :span="8"/>
        </el-row>-->
        <!-- 第四模块 -->
        <div class="div-row1">
          <div class="flexBox">
            <!-- 入口人脸设备: -->
            <ul v-if="isEntryFcShow" :span="8">
              <div style="color:#A6ACC3">人脸设备</div>
              <el-form-item label="设备名称:" prop="pass">
                <el-input v-model="ruleForm.equipmentnameRl" />
              </el-form-item>
              <el-form-item label="设备出厂号" prop="pass">
                <el-input v-model="ruleForm.factorynumberRl" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" prop="pass">
                <el-input v-model="ruleForm.ladderRl" />
              </el-form-item>
            </ul>
            <!-- 入口设备编号: -->
            <ul v-if="isEntryBlShow" :span="8">
              <div style="color:#A6ACC3">蓝牙设备</div>
              <el-form-item label="设备名称:" prop="pass">
                <el-input v-model="ruleForm.equipmentnameLy" />
              </el-form-item>
              <el-form-item label="设备出厂号:" prop="pass">
                <el-input v-model="ruleForm.factorynumberLy" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" prop="pass">
                <el-input v-model="ruleForm.ladderLy" />
              </el-form-item>
            </ul>
            <!-- 入口二维码设备: -->
            <ul v-if="isEntryErShow" :span="8">
              <div style="color:#A6ACC3">二维码设备</div>
              <el-form-item label="设备名称:" prop="pass">
                <el-input v-model="ruleForm.equipmentnameEw" />
              </el-form-item>
              <el-form-item label="设备出厂号:" prop="pass">
                <el-input v-model="ruleForm.factorynumberEw" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" prop="pass">
                <el-input v-model="ruleForm.ladderEw" />
              </el-form-item>
            </ul>
          </div>
        </div>
        <!-- 错误提示 -->
        <el-row type="flex" justify="center">
          <p class="mistack-toast">{{ mistakeToast }}</p>
        </el-row>
        <!-- 提交 -->

        <el-button type="primary" class="btn-confirm" @click="addHandler()">确认</el-button>
      </el-form>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      :visible.sync="centerDialogVisible5"
      center
      :append-to-body="true"
      :close-on-click-modal="false"
      class="add-class"
      @close="closeEntryHandler"
    >
      <span slot="title">修改单元门</span>
      <el-form
        ref="ruleForm1"
        :model="ruleForm1"
        status-icon
        label-width="115px"
        class="demo-ruleForm1"
        label-position="left"
      >
        <!-- 第一行大门名称： -->
        <div class="div-row">
          <el-form-item label="选择楼栋:" prop="gateName" class="building-class">
            <el-select v-model="value" placeholder="请选择楼栋" no-data-text="请选择楼栋">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.userHouseBuilding"
                :value="item.userHouseBuilding"
              >
                <span
                  class="chenp"
                  @click="hanPoid(item.userHouseBuilding)"
                >{{ item.userHouseBuilding }}</span>
              </el-option>
            </el-select>
            <div class="loudong-class">{{ buildoingContent }}</div>
          </el-form-item>
        </div>
        <div class="div-row">
          <el-form-item label="选择单元:" prop="gateName" class="building-class">
            <el-select v-model="value1" placeholder="请选择单元" no-data-text="请先选择楼栋">
              <el-option
                v-for="(item,index) in options1"
                :key="index"
                :label="item.userHouseUnit"
                :value="item.userHouseUnit"
              >
                <span class="chenp" @click="hanPoid1(item.userHouseUnit)">{{ item.userHouseUnit }}</span>
              </el-option>
            </el-select>
            <div class="loudong-class">{{ unitContent }}</div>
          </el-form-item>
        </div>
        <div class="div-row">
          <el-form-item label="单元门名称:" prop="gateName" class="building-class">
            <el-input v-model="ruleForm1.door" />
            <div class="loudong-class">{{ doorName }}</div>
          </el-form-item>
        </div>
        <div class="div-row">
          <el-form-item label="设备编号:" prop="gateName" class="building-class">
            <el-input v-model="ruleForm1.equipment" />
            <div class="loudong-class">{{ equipmentContent }}</div>
          </el-form-item>
        </div>

        <!-- 第三模块（入口标题） -->
        <!-- <el-row :gutter="20" type="flex" justify="left">
          <el-col v-if="isEntryFcShow" :span="8"/>
          <el-col v-if="isEntryBlShow" :span="8"/>
          <el-col v-if="isEntryErShow" :span="8"/>
        </el-row>-->
        <!-- 第四模块 -->
        <div class="div-row1">
          <div class="flexBox">
            <!-- 入口人脸设备: -->
            <ul v-if="isEntryFcShow" :span="8">
              <div style="color:#A6ACC3">人脸设备</div>
              <el-form-item label="设备名称:" prop="pass">
                <el-input v-model="ruleForm1.equipmentnameRl" />
              </el-form-item>
              <el-form-item label="设备出厂号" prop="pass">
                <el-input v-model="ruleForm1.factorynumberRl" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" prop="pass">
                <el-input v-model="ruleForm1.ladderRl" />
              </el-form-item>
            </ul>
            <!-- 入口设备编号: -->
            <ul v-if="isEntryBlShow" :span="8">
              <div style="color:#A6ACC3">蓝牙设备</div>
              <el-form-item label="设备名称:" prop="pass">
                <el-input v-model="ruleForm1.equipmentnameLy" />
              </el-form-item>
              <el-form-item label="设备出厂号:" prop="pass">
                <el-input v-model="ruleForm1.factorynumberLy" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" prop="pass">
                <el-input v-model="ruleForm1.ladderLy" />
              </el-form-item>
            </ul>
            <!-- 入口二维码设备: -->
            <ul v-if="isEntryErShow" :span="8">
              <div style="color:#A6ACC3">二维码设备</div>
              <el-form-item label="设备名称:" prop="pass">
                <el-input v-model="ruleForm1.equipmentnameEw" />
              </el-form-item>
              <el-form-item label="设备出厂号:" prop="pass">
                <el-input v-model="ruleForm1.factorynumberEw" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" prop="pass">
                <el-input v-model="ruleForm1.ladderEw" />
              </el-form-item>
            </ul>
          </div>
        </div>
        <!-- 错误提示 -->
        <el-row type="flex" justify="center">
          <p class="mistack-toast">{{ mistakeToast }}</p>
        </el-row>
        <!-- 提交 -->
        <el-button type="primary" class="btn-confirm" @click="editHandler">确认</el-button>
      </el-form>
    </el-dialog>
    <!-- 删除遮罩层删除删除遮罩层删除删除遮罩层删除删除遮罩层删除删除遮罩层删除删除遮罩层删除删除遮罩层删除删除遮罩层删除 -->
    <!-- 遮罩三 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible3"
      :append-to-body="true"
      center
      class="chen"
      top="40vh"
      :close-on-click-modal="false"
    >
      <!-- <p>提示</p> -->
      <div>是否删除该条数据?</div>
      <span slot="footer" class="dialog-footer">
        <el-button class="quxiao1" @click="centerDialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="deletesHandler">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { postUnitSelect, postUnitStoried, postUnitSingle, postUnitInsert, postUnitDelete, postUnitUpdate, postUnitSearch } from '@/api/entranceGuard'
import { getInfo } from '@/utils/auth'
// import { Message } from 'element-ui'
export default {
  name: 'AccountAudit',
  // data数据
  data() {
    return {
      serachContent1: '',
      device: null,
      isShowAddto: true,
      serachContent: '',
      tableData: [],
      centerDialogVisible: false,
      centerDialogVisible5: false, // 修改
      centerDialogVisible3: false, // 删除
      ruleForm: {
        userHouseBuilding: null, // 楼栋
        userHouseUnit: null, // 单元
        Gatename: null, // 单元门名字
        equipment: null, // 设备编号
        equipmentnameRl: null, // 人脸设备名称
        factorynumberRl: null, // 人脸设备出厂号
        ladderRl: null, // 人脸门禁控制器编号
        equipmentnameLy: null, // 蓝牙设备名称
        factorynumberLy: null, // 蓝牙设备出厂号
        ladderLy: null, // 蓝牙门禁控制器编号
        equipmentnameEw: null, // 二维码设备名称
        factorynumberEw: null, // 二维码设备出厂号
        ladderEw: null // 二维码门禁控制器编号
      },
      ruleForm1: {
        Tung: null, // 楼栋
        single: null, // 单元
        door: null, // 门名称
        equipment: null, // 设备编号
        equipmentnameRl: null, // 人脸设备名称
        factorynumberRl: null, // 人脸设备出厂号
        ladderRl: null, // 人脸门禁控制器编号
        equipmentnameLy: null, // 蓝牙设备名称
        factorynumberLy: null, // 蓝牙设备出厂号
        ladderLy: null, // 蓝牙门禁控制器编号
        equipmentnameEw: null, // 二维码设备名称
        factorynumberEw: null, // 二维码设备出厂号
        ladderEw: null // 二维码门禁控制器编号
      },
      mistakeToast: '', // 错误提示
      userInfo: {},
      currentPage: 1,
      pageNums: null,
      listNum: 10,
      totalPage: null,
      options: [],
      value: '',
      options1: [],
      value1: '',
      unitdoorId: null,
      isEntryFcShow: true,
      isEntryBlShow: true,
      isEntryErShow: true,
      isExportFcShow: true,
      isExportBlShow: true,
      isExportErShow: true,
      buildoingContent: '', // 几个提示
      unitContent: '',
      doorName: '',
      equipmentContent: ''
    }
  },
  created() {
    const userInfo = JSON.parse(getInfo())
    this.userInfo = userInfo
    const Communityid = this.userInfo.data.Communityid
    // const page = this.currentPage
    postUnitSelect({ Communityid }).then(resp => {
      console.log(resp, '创建时的resp')
      this.tableData = resp.msg.data
      this.totalPage = resp.msg.total
      this.pageNums = resp.msg.pageNum
      this.device = resp.device
      if (this.device === 1) {
        this.isEntryFcShow = false
        this.isEntryBlShow = false
        this.isEntryErShow = false
        this.isExportFcShow = false
        this.isExportBlShow = false
        this.isExportErShow = false
      } else if (this.device === 2) {
        this.isEntryBlShow = false
        this.isEntryErShow = false
        this.isExportBlShow = false
        this.isExportErShow = false
      } else if (this.device === 3) {
        this.isEntryFcShow = false
        this.isEntryErShow = false
        this.isExportFcShow = false
        this.isExportErShow = false
      } else if (this.device === 4) {
        this.isEntryFcShow = false
        this.isEntryBlShow = false
        this.isExportFcShow = false
        this.isExportBlShow = false
      } else if (this.device === 5) {
        this.isEntryErShow = false
        this.isExportErShow = false
      } else if (this.device === 6) {
        this.isExportBlShow = false
        this.isEntryBlShow = false
      } else if (this.device === 7) {
        this.isEntryFcShow = false
        this.isExportFcShow = false
      }
    })
  },
  methods: {
    exitBefore() {
      console.log('点击上记忆')
      this.isShowAddto = true
      this.serachContent = ''
      const Communityid = this.userInfo.data.Communityid
      // const page = this.currentPage
      postUnitSelect({ Communityid }).then(resp => {
        console.log(resp, '创建时的resp')
        this.tableData = resp.msg.data
        this.totalPage = resp.msg.total
        this.pageNums = resp.msg.pageNum
        this.currentPage = Number(resp.msg.page)
      })
    },
    // 添加单元门门禁
    addHandler() {
      const Communityid = this.userInfo.data.Communityid
      const uname = this.userInfo.data.uname
      // var page = this.currentPage
      this.ruleForm.uname = uname
      this.ruleForm.Communityid = Communityid
      console.log('添加单元门门禁', this.ruleForm)
      postUnitInsert(this.ruleForm).then(resp => {
        console.log(resp, '添加添加单元的resp')
        if (resp.code === 405 || resp.code === 406 || resp.code === 407 || resp.code === 408) {
          this.mistakeToast = resp.msg
          setTimeout(() => {
            this.mistakeToast = ''
          }, 2000)
        } else if (resp.code === 401) {
          this.buildoingContent = resp.msg
          setTimeout(() => {
            this.buildoingContent = ''
          }, 2000)
        } else if (resp.code === 402) {
          this.unitContent = resp.msg
          setTimeout(() => {
            this.unitContent = ''
          }, 2000)
        } else if (resp.code === 403) {
          this.doorName = resp.msg
          setTimeout(() => {
            this.doorName = ''
          }, 2000)
        } else if (resp.code === 404) {
          this.equipmentContent = resp.msg
          setTimeout(() => {
            this.equipmentContent = ''
          }, 2000)
        } else {
          // 录入成功
          Message(resp.msg)
          // const nume = Number(this.totalPage) / Number(10)
          // var shu = ''
          // // console.log(nume, '429shu')
          // if (Math.round(nume) === nume) {
          //   // num是整数
          //   shu = Number(nume) + Number(1)
          // } else {
          //   shu = Math.ceil(nume)
          // }
          // page = shu
          postUnitSelect({ Communityid }).then(resp => {
            // console.log(resp, '创建时的resp')
            this.tableData = resp.msg.data
            this.totalPage = resp.msg.total
            this.pageNums = resp.msg.pageNum
            this.currentPage = Number(resp.msg.page)
            // this.currentPage = shu
            console.log(resp.msg.page, 'resp.msg.page')
          })
          // this.currentPage = shu
          // this.handleCurrentChange(shu)
          console.log(this.currentPage, 'shu')
          this.centerDialogVisible = !this.centerDialogVisible
        }
      })
    },
    // 选择楼栋时
    hanPoid(dataId) {
      // console.log(dataId, 'dataId')
      const userInfo = JSON.parse(getInfo())
      this.userInfo = userInfo
      const Communityid = this.userInfo.data.Communityid
      this.value = dataId
      this.value1 = null
      this.ruleForm.userHouseBuilding = this.value
      this.ruleForm1.userHouseBuilding = Number(this.value)
      this.ruleForm1.userHouseUnit = Number(this.value1)
      // 查询单元
      const userHouseBuilding = this.value
      postUnitSingle({ Communityid, userHouseBuilding }).then(resp => {
        // console.log(resp, { Communityid, userHouseBuilding }, '查询单元的resp')
        this.options1 = resp.msg
      })
    },
    // 选择单元
    hanPoid1(itemId) {
      console.log('选择单元', itemId)
      this.ruleForm.userHouseUnit = itemId
      this.ruleForm1.userHouseUnit = Number(itemId)
    },
    isShow1() {
      if (this.device === 1) {
        // console.log(this.device)
        Message('您暂未开通门禁管理,请联系17716136776')
        return
      }
      this.ruleForm = {}
      this.value = null
      this.value1 = null
      this.mistakeToast = ''
      const userInfo = JSON.parse(getInfo())
      this.userInfo = userInfo
      const Communityid = this.userInfo.data.Communityid
      // 查询楼栋
      postUnitStoried({ Communityid }).then(resp => {
        console.log(resp.msg, '查询楼栋的resp')
        this.options = resp.msg
      })

      this.centerDialogVisible = !this.centerDialogVisible
    },
    handleEdit(index, row) {
      if (this.device === 1) {
        // console.log(this.device)
        Message('您暂未开通门禁管理,请联系17716136776')
        return
      }
      this.value = row.Tung
      this.value1 = row.single
      this.mistakeToast = ''
      this.ruleForm1 = row
      const Communityid = this.userInfo.data.Communityid
      this.ruleForm1.userHouseBuilding = row.Tung
      this.ruleForm1.userHouseUnit = row.single
      // 查询楼栋
      postUnitStoried({ Communityid }).then(resp => {
        // console.log(resp.msg, '查询楼栋的resp')
        this.options = resp.msg
      })
      // 查询单元
      const userHouseBuilding = this.value
      postUnitSingle({ Communityid, userHouseBuilding }).then(resp => {
        // console.log(resp, { Communityid, userHouseBuilding }, '查询单元的resp')
        this.options1 = resp.msg
      })
      console.log(row, this.ruleForm1, '修改时的row')
      this.centerDialogVisible5 = !this.centerDialogVisible5
    },
    editHandler() {
      const Communityid = this.userInfo.data.Communityid
      const uname = this.userInfo.data.uname
      var { userHouseBuilding, userHouseUnit, equipment, equipmentnameRl, factorynumberRl, ladderRl, equipmentnameLy, factorynumberLy, ladderLy, equipmentnameEw, factorynumberEw, ladderEw } = this.ruleForm1
      const Gatename = this.ruleForm1.door
      const unitdoorId = this.ruleForm1.unitdoorId.toString()
      userHouseBuilding = Number(userHouseBuilding)
      userHouseUnit = Number(userHouseUnit)
      const editQuery = { uname, unitdoorId, userHouseBuilding, userHouseUnit, equipment, equipmentnameRl, factorynumberRl, ladderRl, equipmentnameLy, factorynumberLy, ladderLy, equipmentnameEw, factorynumberEw, ladderEw, Gatename }
      // console.log('修改单元门门禁', this.ruleForm1, editQuery)
      // postUnitUpdate(editQuery).then(resp => {
      //   console.log(resp, '修改时deresp')
      // })
      postUnitUpdate(editQuery).then(resp => {
        console.log(resp, '修改单元的222resp')
        if (resp.code === 405 || resp.code === 406 || resp.code === 408) {
          this.mistakeToast = resp.msg
          setTimeout(() => {
            this.mistakeToast = ''
          }, 2000)
        } else if (resp.code === 401) {
          this.buildoingContent = resp.msg
          setTimeout(() => {
            this.buildoingContent = ''
          }, 2000)
        } else if (resp.code === 402) {
          this.unitContent = resp.msg
          setTimeout(() => {
            this.unitContent = ''
          }, 2000)
        } else if (resp.code === 403) {
          this.doorName = resp.msg
          setTimeout(() => {
            this.doorName = ''
          }, 2000)
        } else if (resp.code === 404) {
          this.equipmentContent = resp.msg
          setTimeout(() => {
            this.equipmentContent = ''
          }, 2000)
        } else if (resp.code === 407) {
          this.centerDialogVisible5 = !this.centerDialogVisible5
          Message(resp.msg)
        } else {
          // 录入成功
          Message(resp.msg)
          const page = this.currentPage
          postUnitSelect({ Communityid, page }).then(resp => {
            console.log(resp, '创建时的resp')
            this.tableData = resp.msg.data
            this.totalPage = resp.msg.total
            this.pageNums = resp.msg.pageNum
          })
          this.centerDialogVisible5 = !this.centerDialogVisible5
        }
      })
    },
    closeEntryHandler() {
      const Communityid = this.userInfo.data.Communityid
      const page = this.currentPage
      postUnitSelect({ Communityid, page }).then(resp => {
        // console.log(resp.msg.data, '修改成功请求的渲染数据')
        this.totalPage = resp.msg.total
        this.pageNums = resp.msg.pageNum
        this.tableData = resp.msg.data
      })
    },
    handleDelete(index, row) {
      console.log(row.unitdoorId, 'roew')
      if (this.device === 1) {
        Message('您暂未开通门禁管理,请联系17716136776')
        // console.log(this.device)
        return
      }
      this.unitdoorId = row.unitdoorId
      this.centerDialogVisible3 = !this.centerDialogVisible3
    },
    deletesHandler() {
      const unitdoorId = this.unitdoorId
      postUnitDelete({ unitdoorId }).then(resp => {
        // console.log(resp)
        if (resp.code === 401) {
          Message(resp.msg)
        } else {
          // 删除成功
          Message(resp.msg)
          const Communityid = this.userInfo.data.Communityid
          const page = this.currentPage
          postUnitSelect({ Communityid, page }).then(resp => {
            console.log(resp, '创建时的resp')
            this.tableData = resp.msg.data
            this.totalPage = resp.msg.total
            this.pageNums = resp.msg.pageNum
            if (resp.msg.data.length === 0) {
              const page = this.currentPage - 1
              // console.log({ Communityid, page },'')
              postUnitSelect({ Communityid, page }).then(resp => {
                this.totalPage = resp.msg.total
                this.pageNums = resp.msg.pageNum
                this.tableData = resp.msg.data
              })
            }
          })
          this.centerDialogVisible3 = !this.centerDialogVisible3
        }
      })
    },
    // 搜索单元门
    serachHandler() {
      if (this.device === 1) {
        Message('您暂未开通门禁管理,请联系17716136776')
        // console.log(this.device)
        return
      } else {
        this.isShowAddto = false
        const Communityid = this.userInfo.data.Communityid
        const name = this.serachContent
        this.serachContent1 = this.serachContent
        postUnitSearch({ Communityid, name }).then(resp => {
          console.log(resp, '搜素')
          if (resp.code === 401) {
            Message(resp.msg)
          } else {
            // 查询成功
            this.tableData = resp.msg.data
            this.totalPage = resp.msg.total
            this.pageNums = resp.msg.pageNum
            this.tableData = resp.msg.data
          }
        })
        this.serachContent = ''
      }
    },
    // 分页设置
    handleCurrentChange(val) {
      this.currentPage = val
      const page = val
      const Communityid = this.userInfo.data.Communityid
      const name = this.serachContent1
      if (!this.isShowAddto) {
        console.log('点击搜索时候得分页')
        postUnitSearch({ Communityid, name, page }).then(resp => {
          // console.log(resp, '搜素')
          if (resp.code === 401) {
            Message(resp.msg)
          } else {
            // 查询成功
            this.tableData = resp.msg.data
            this.totalPage = resp.msg.total
            this.pageNums = resp.msg.pageNum
            // this.tableData = resp.msg.data
          }
        })
      } else {
        postUnitSelect({ Communityid, page }).then(resp => {
          console.log(resp, '点击分页时的表格数据表格数据')
          this.totalPage = resp.msg.total
          this.pageNums = resp.msg.pageNum
          this.tableData = resp.msg.data
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
//折叠样式
/deep/.demo-table-expand {
  font-size: 0;
  min-width: 1104px;
}
/deep/.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
/deep/.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  height: 48px !important;
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
  min-height: 730px;
  position: relative;
  width: 100%;
  box-shadow: none;
  border: none;
  /deep/.el-card__header {
    border: none;
    border-bottom: none;
    padding: 21px !important;
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
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(96, 98, 102, 1);
      .el-button--mini {
        background: rgba(37, 186, 217, 1);
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
//分页器的样式
.block {
  .record-data {
    cursor: default;
    display: inline-block;
    height: 11px;
    padding-left: 20px;
    margin-top: 11px;
    position: absolute;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  position: relative;
  top: 15px;
  height: 40px;
  width: 100%;
  .el-pagination {
    position: absolute;
    bottom: 0px;
    right: 87px;
    /deep/button {
      min-width: 24px !important;
      height: 24px;
      cursor: default;
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
        color: rgba(102, 102, 102, 1);
        outline: none;

        /deep/.el-input__inner {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          display: inline-block;
          margin-left: 48px;
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
/deep/ .demo-table-expand .el-form-item {
  width: 30% !important;
}
#newadd {
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 86px;
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
  padding: 20px 35px 0 54px !important;
}
.demo-ruleForm1 {
  width: 100%;
  .el-row {
    margin-bottom: 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
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
  // 新增大门表单样式
  .el-form-item {
    margin-bottom: 0;
    height: 48px !important;
  }
  .el-input {
    /deep/input {
      width: 220px;
      height: 30px;
      border: 1px solid rgba(210, 210, 210, 1) !important;
      border-radius: 2px;
    }
  }
  .submit-class {
    position: absolute;
    top: 0px;
    left: 40%;
    button {
      background: rgba(248, 172, 89, 1);
      border-radius: 2px;
      border-color: rgba(248, 172, 89, 1);
      width: 51px;
      height: 25px;
      line-height: 0px;
      text-align: left;
    }
  }
  /deep/.el-input__suffix {
    display: none;
  }
  /deep/ .el-form-item__error {
    top: 83% !important;
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
      // font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      .el-dialog__title {
        text-align: left;
        border-bottom: 1px solid #eff2f5;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }

      button {
        position: absolute;
        top: 17px;
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
      top: 15.7vh;
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
    .el button {
      color: #999999 !important;
    }
    .el-button--primary {
      color: #ffffff;
      background-color: #25bad9;
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
/deep/ .el-select .el-input__inner {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  display: inline-block;
  width: 119%;
  height: 30px !important;
  border: 1px solid rgb(210, 210, 210) !important;
  border-radius: 2px;
  outline: none;
}
.chenp {
  display: block;
  width: 100%;
}
.mistack-toast {
  position: absolute;
  top: 3px;
  text-align: center;
  color: red;
  width: 260px;
  height: 20px;
}
/deep/.el-table td {
  padding: 15px 0px !important;
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
/deep/ .el-select-dropdown__list {
  background-color: #f00 !important;
}
/deep/ .demo-table-expand .el-form-item {
  width: 100% !important;
}
.building-class {
  position: relative;
  height: 60px !important;
  .loudong-class {
    position: absolute;
    top: 26px;
    color: red;
  }
}
.add-class {
  /deep/.el-dialog {
    position: absolute;
    margin: 0 !important;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: inline-block;
    min-width: 927px;
    width: auto;
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
  margin-top: 13px;
}
.div-row1 {
  display: inline-block;
  margin-top: 12px;

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
  font-size: 16px;
  height: 35px;
  line-height: 0px;
  transform: translateX(-50%);
}
</style>
