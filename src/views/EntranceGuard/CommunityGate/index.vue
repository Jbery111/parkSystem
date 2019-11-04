<template>
  <div>
    <!--   -->
    <el-card class="box-card">
      <span v-if="isShowAddto" id="newadd" @click="isShow1">新增小区门</span>
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
      <el-table :data="tableData" style="width: 100%" class="entry-table-class" empty-text="没有数据">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row>
                <!-- 人脸 -->
                <el-col v-if="props.row.equipmentnameRl" :span="8" style="width:28.4%">
                  <el-form-item v-if="props.row.equipmentnameRl" label="人脸名称:" label-width="115px">
                    <span>{{ props.row.equipmentnameRl }}</span>
                  </el-form-item>
                  <el-form-item v-if="props.row.factorynumberRl" label="设备出厂号:" label-width="115px">
                    <span>{{ props.row.factorynumberRl }}</span>
                  </el-form-item>
                  <el-form-item v-if="props.row.ladderRl" label="门禁控制器编号:" label-width="115px">
                    <span>{{ props.row.ladderRl }}</span>
                  </el-form-item>
                </el-col>
                <!-- 蓝牙 -->
                <el-col v-if="props.row.equipmentnameLy" :span="8" style="width:28.8%">
                  <el-form-item v-if="props.row.equipmentnameLy" label="蓝牙名称:" label-width="115px">
                    <span>{{ props.row.equipmentnameLy }}</span>
                  </el-form-item>
                  <el-form-item v-if="props.row.factorynumberLy" label="设备出厂号:" label-width="115px">
                    <span>{{ props.row.factorynumberLy }}</span>
                  </el-form-item>
                  <el-form-item v-if="props.row.ladderLy" label="门禁控制器编号:" label-width="115px">
                    <span>{{ props.row.ladderLy }}</span>
                  </el-form-item>
                </el-col>
                <!-- 二维码 -->
                <el-col v-if="props.row.equipmentnameEw" :span="8">
                  <el-form-item v-if="props.row.equipmentnameEw" label="二维码名称:" label-width="115px">
                    <span>{{ props.row.equipmentnameEw }}</span>
                  </el-form-item>
                  <el-form-item v-if="props.row.factorynumberEw" label="设备出厂号:" label-width="115px">
                    <span>{{ props.row.factorynumberEw }}</span>
                  </el-form-item>
                  <el-form-item v-if="props.row.ladderEw" label="门禁控制器编号:" label-width="115px">
                    <span>{{ props.row.ladderEw }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="大门名称" prop="Gatename" min-width="150" />
        <el-table-column label="入/出口" prop="type" min-width="150">
          <template slot-scope="scope">
            <p v-html="scope.row.type === 1 ? '入口':'出口'" />
          </template>
        </el-table-column>
        <el-table-column label="入/出口设备编号" prop="equipment" min-width="150" />
        <!-- 操作 -->
        <el-table-column label="操作">
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
    <!-- 新增小区遮罩层 新增小区遮罩层新增小区遮罩层新增小区遮罩层新增小区遮罩层新增小区遮罩层新增小区遮罩层新增小区遮罩层-->
    <el-dialog
      :visible.sync="centerDialogVisible"
      center
      title="新增小区门"
      :append-to-body="true"
      :close-on-click-modal="false"
      class="add-class"
    >
      <el-form
        ref="ruleForm1"
        :model="ruleFrom1"
        status-icon
        label-width="120px"
        class="demo-ruleForm1"
        label-position="left"
      >
        <!-- 第一行大门名称： -->
        <div class="div-row">
          <el-form-item label="大门名称:" prop="gateName" label-width="120px">
            <el-input v-model="ruleFrom1.Gatename" @focus="gateFocusHandler" />
          </el-form-item>
          <div class="gatename-mistacktoast">{{ gateToast }}</div>
        </div>
        <!-- 第二行 入口设备编号-->
        <div class="div-row" style="margin-top:12px">
          <div>
            <el-form-item label="入口设备编号:" prop="pass" label-width="120px">
              <el-input v-model="ruleFrom1.equipment" />
            </el-form-item>
          </div>
        </div>
        <!-- 第三模块（入口标题） -->
        <!-- <el-row :gutter="20" type="flex"> -->
        <!-- <el-col v-if="isEntryFcShow" :span="8">
            <div>入口人脸设备:</div>
          </el-col>
          <el-col v-if="isEntryBlShow" :span="8">
            <div>入口蓝牙设备:</div>
          </el-col>
          <el-col v-if="isEntryErShow" :span="8">
            <div>入口二维码设备:</div>
        </el-col>-->
        <!-- </el-row> -->
        <!-- 第四模块 -->
        <div class="div-row1">
          <!-- 入口人脸设备: -->
          <div class="flexBox">
            <ul v-if="isEntryFcShow">
              <div style="color:#A6ACC3">入口人脸设备</div>
              <el-form-item label="设备名称:" prop="pass" label-width="120px">
                <el-input v-model="ruleFrom1.equipmentnameRl" />
              </el-form-item>
              <el-form-item label="设备出厂号:" prop="pass" label-width="120px">
                <el-input v-model="ruleFrom1.factorynumberRl" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" prop="pass" label-width="120px">
                <el-input v-model="ruleFrom1.ladderRl" />
              </el-form-item>
            </ul>
            <!-- 入口设备编号: -->
            <ul v-if="isEntryBlShow">
              <div style="color:#A6ACC3">入口蓝牙设备</div>
              <el-form-item label="设备名称:" label-width="120px">
                <el-input v-model="ruleFrom1.equipmentnameLy" />
              </el-form-item>
              <el-form-item label="设备出厂号:" label-width="120px">
                <el-input v-model="ruleFrom1.factorynumberLy" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" label-width="120px">
                <el-input v-model="ruleFrom1.ladderLy" />
              </el-form-item>
            </ul>
            <!-- 入口二维码设备: -->
            <ul v-if="isEntryErShow">
              <div style="color:#A6ACC3">入口二维码设备</div>
              <el-form-item label="设备名称:" label-width="120px">
                <el-input v-model="ruleFrom1.equipmentnameEw" />
              </el-form-item>
              <el-form-item label="设备出厂号:" label-width="120px">
                <el-input v-model="ruleFrom1.factorynumberEw" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" label-width="120px">
                <el-input v-model="ruleFrom1.ladderEw" />
              </el-form-item>
            </ul>
          </div>
        </div>
        <!-- 第五模块出口设备编号： -->
        <div class="div-row">
          <el-col>
            <el-form-item label="出口设备编号:" prop="pass" label-width="120px">
              <el-input v-model="ruleFrom1.equipments" />
            </el-form-item>
          </el-col>
        </div>
        <!-- 第六模块（出口标题） -->
        <!-- <el-row :gutter="20" type="flex">
          <el-col v-if="isExportFcShow" :span="8" />
          <el-col v-if="isExportBlShow" :span="8"></el-col>
          <el-col v-if="isExportErShow" :span="8"></el-col>
        </el-row>-->
        <!-- 第七模块 -->

        <div class="div-row1">
          <!-- 出口人脸设备 -->
          <div class="flexBox">
            <ul v-if="isExportFcShow">
              <div style="color:#A6ACC3">出口人脸设备</div>
              <el-form-item label="设备名称:" label-width="120px">
                <el-input v-model="ruleFrom1.equipmentnameRls" />
              </el-form-item>
              <el-form-item label="设备出厂号:" label-width="120px">
                <el-input v-model="ruleFrom1.factorynumberRls" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" label-width="120px">
                <el-input v-model="ruleFrom1.ladderRls" />
              </el-form-item>
            </ul>
            <!-- 出口蓝牙设备 -->
            <ul v-if="isExportBlShow">
              <div style="color:#A6ACC3">出口蓝牙编号</div>
              <el-form-item label="设备名称:" label-width="120px">
                <el-input v-model="ruleFrom1.equipmentnameLys" />
              </el-form-item>
              <el-form-item label="设备出厂号:" label-width="120px">
                <el-input v-model="ruleFrom1.factorynumberLys" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" label-width="120px">
                <el-input v-model="ruleFrom1.ladderLys" />
              </el-form-item>
            </ul>
            <ul v-if="isExportErShow">
              <div style="color:#A6ACC3">出口二维码设备</div>
              <el-form-item label="设备名称:" label-width="120px">
                <el-input v-model="ruleFrom1.equipmentnameEws" />
              </el-form-item>
              <el-form-item label="设备出厂号:" label-width="120px">
                <el-input v-model="ruleFrom1.factorynumberEws" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" label-width="120px">
                <el-input v-model="ruleFrom1.ladderEws" />
              </el-form-item>
            </ul>
          </div>
        </div>
        <el-row type="flex" justify="center">
          <p class="mistack-toast">{{ mistakeToast }}</p>
        </el-row>

        <!-- 提交 -->

        <el-button class="btn-confirm" type="primary" @click="submitHandler">确认</el-button>
      </el-form>
    </el-dialog>
    <!-- 编辑入口编辑入口编辑入口编辑入口编辑入口编辑入口编辑入口编辑入口编辑入口编辑入口编辑入口编辑入口 -->
    <el-dialog
      :visible.sync="centerDialogVisible1"
      center
      title="修改小区门"
      :append-to-body="true"
      :close-on-click-modal="false"
      class="add-class"
      @close="closeEntryHandler"
    >
      <el-form
        ref="ruleFrom1"
        :model="ruleFrom1"
        status-icon
        label-width="120px"
        class="demo-ruleForm1"
        label-position="left"
      >
        <!-- 第一行大门名称： -->
        <div class="div-row">
          <el-form-item label="大门名称:" prop="gateName" label-width="120px">
            <el-input v-model="ruleFrom1.Gatename" @focus="gateFocusHandler" />
          </el-form-item>
          <div class="gatename-mistacktoast">{{ gateToast }}</div>
        </div>
        <!-- 第二行 入口设备编号-->
        <div class="div-row">
          <el-form-item label="入口设备编号:" prop="pass" label-width="120px">
            <el-input v-model="ruleFrom1.equipment" />
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
          <!-- 入口人脸设备: -->
          <div class="flexBox">
            <ul v-if="isEntryFcShow">
              <div>入口人脸设备:</div>
              <el-form-item label="设备名称:" prop="pass">
                <el-input v-model="ruleFrom1.equipmentnameRl" />
              </el-form-item>
              <el-form-item label="设备出厂号" prop="pass">
                <el-input v-model="ruleFrom1.factorynumberRl" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" prop="pass">
                <el-input v-model="ruleFrom1.ladderRl" />
              </el-form-item>
            </ul>
            <!-- 入口蓝牙设备: -->
            <ul v-if="isEntryBlShow">
              <div>入口蓝牙设备:</div>
              <el-form-item label="设备名称:" prop="pass">
                <el-input v-model="ruleFrom1.equipmentnameLy" />
              </el-form-item>
              <el-form-item label="设备出厂号:" prop="pass">
                <el-input v-model="ruleFrom1.factorynumberLy" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" prop="pass">
                <el-input v-model="ruleFrom1.ladderLy" />
              </el-form-item>
            </ul>
            <!-- 入口二维码设备: -->
            <ul v-if="isEntryErShow">
              <div>入口二维码设备:</div>
              <el-form-item label="设备名称:" prop="pass">
                <el-input v-model="ruleFrom1.equipmentnameEw" />
              </el-form-item>
              <el-form-item label="设备出厂号:" prop="pasmets">
                <el-input v-model="ruleFrom1.factorynumberEw" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" prop="pass">
                <el-input v-model="ruleFrom1.ladderEw" />
              </el-form-item>
            </ul>
          </div>
        </div>
        <el-row type="flex" justify="center">
          <p class="mistack-toast">{{ mistakeToast }}</p>
        </el-row>
        <!-- 提交 -->
        <el-button class="btn-confirm" type="primary" @click="entryEditHandler">确认</el-button>
      </el-form>
    </el-dialog>
    <!-- 编辑出口 编辑出口编辑出口编辑出口编辑出口编辑出口编辑出口编辑出口编辑出口编辑出口编辑出口编辑出口-->
    <el-dialog
      :visible.sync="centerDialogVisible2"
      center
      title="修改小区门"
      :append-to-body="true"
      :close-on-click-modal="false"
      class="add-class"
      @close="closeEntryHandler"
    >
      <el-form
        ref="ruleFrom1"
        :model="ruleFrom1"
        status-icon
        label-width="120px"
        class="demo-ruleForm1"
        label-position="left"
      >
        <!-- 第一行大门名称： -->
        <div class="div-row">
          <el-form-item label="大门名称:" prop="gateName">
            <el-input v-model="ruleFrom1.Gatename" @focus="gateFocusHandler" />
          </el-form-item>
          <div class="gatename-mistacktoast">{{ gateToast }}</div>
        </div>
        <!-- 第五模块出口设备编号： -->
        <div class="div-row" style="margin-top:12px">
          <el-form-item label="出口设备编号:" prop="pass">
            <el-input v-model="ruleFrom1.equipment" />
          </el-form-item>
        </div>
        <!-- 第六模块（出口标题） -->
        <!-- <el-row :gutter="20" type="flex" justify="left">
          <el-col v-if="isExportFcShow" :span="8"></el-col>
          <el-col v-if="isExportBlShow" :span="8"></el-col>
          <el-col v-if="isExportErShow" :span="8"></el-col>
        </el-row>-->
        <!-- 第七模块 -->
        <div class="div-row1">
          <!-- 出口人脸设备 -->
          <div class="flexBox">
            <ul v-if="isExportFcShow">
              <div style="color:#A6ACC3">出口人脸设备</div>
              <el-form-item label="设备名称:" prop="pass">
                <el-input v-model="ruleFrom1.equipmentnameRl" />
              </el-form-item>
              <el-form-item label="设备出厂号:" prop="pass">
                <el-input v-model="ruleFrom1.factorynumberRl" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" prop="pass">
                <el-input v-model="ruleFrom1.ladderRl" />
              </el-form-item>
            </ul>
            <!-- 出口蓝牙设备 -->
            <ul v-if="isExportBlShow">
              <div style="color:#A6ACC3">出口蓝牙编号</div>
              <el-form-item label="设备名称:" prop="pass">
                <el-input v-model="ruleFrom1.equipmentnameLy" />
              </el-form-item>
              <el-form-item label="设备出厂号:" prop="pass">
                <el-input v-model="ruleFrom1.factorynumberLy" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" prop="pass">
                <el-input v-model="ruleFrom1.ladderLy" />
              </el-form-item>
            </ul>
            <ul v-if="isExportErShow">
              <div style="color:#A6ACC3">出口二维码设备</div>
              <el-form-item label="设备名称:" prop="pass">
                <el-input v-model="ruleFrom1.equipmentnameEw" />
              </el-form-item>
              <el-form-item label="设备出厂号:" prop="pass">
                <el-input v-model="ruleFrom1.factorynumberEw" />
              </el-form-item>
              <el-form-item label="门禁控制器编号:" prop="pass">
                <el-input v-model="ruleFrom1.ladderEw" />
              </el-form-item>
            </ul>
          </div>
        </div>
        <el-row type="flex" justify="center">
          <p class="mistack-toast">{{ mistakeToast }}</p>
        </el-row>
        <!-- 提交 -->
        <el-button class="btn-confirm" type="primary" @click="exportEditHandler">确认</el-button>
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
        <el-button type="primary" @click="deleteQuerenHandler">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { postGateSelect, postGateInsert, postGateDelete, postGateSearch, postGateUpdate } from '@/api/entranceGuard'
import { getInfo } from '@/utils/auth'
export default {
  name: 'AccountAudit',
  // data数据
  data() {
    return {
      serachContent1: '',
      isShowAddto: true,
      serachContent: '',
      tableData: [],
      centerDialogVisible: false,
      centerDialogVisible1: false,
      centerDialogVisible2: false,
      centerDialogVisible3: false,
      ruleFrom1: {
        Communityid: null, // 小区id
        uname: '', // 当前操作人名字
        Gatename: '', // 大门名字
        equipment: null, // 入口设备编号入口设备编号入口设备编号
        equipmentnameRl: '', // 人脸设备名称
        factorynumberRl: null, // 人脸设备出厂号
        ladderRl: null, // 人脸门禁控制器编号
        equipmentnameLy: '', // 蓝牙设备名称
        factorynumberLy: null, // 蓝牙设备出厂号
        ladderLy: null, // 蓝牙门禁控制器编号
        equipmentnameEw: '', // 二维码设备名称
        factorynumberEw: null, // 二维码设备出厂号
        ladderEw: null, // 二维码门禁控制器编号
        equipments: null, // 出口设备编号出口设备编号出口设备编号
        equipmentnameRls: '', // 人脸设备名称
        factorynumberRls: null, // 人脸设备出厂号
        ladderRls: null, // 人脸门禁控制器编号
        equipmentnameLys: '', // 蓝牙设备名称
        factorynumberLys: null, // 蓝牙设备出厂号
        ladderLys: null, // 蓝牙门禁控制器编号
        equipmentnameEws: '', // 二维码设备名称
        factorynumberEws: null, // 二维码设备出厂号
        ladderEws: null // 二维码门禁控制器编号
      },
      currentPage: 1,
      pageNums: null, // 总页数
      listNum: null, // 每页多少条
      totalPage: null, // 总条数
      userInfo: {},
      isEntryFcShow: true,
      isEntryBlShow: true,
      isEntryErShow: true,
      isExportFcShow: true,
      isExportBlShow: true,
      isExportErShow: true,
      gateToast: '',
      mistakeToast: '',
      gateId: null,
      device: null,
      updataQuery: {
        gateId: 15,
        uname: 1,
        Gatename: 10,
        equipment: 15,
        equipmentnameRl: 1,
        factorynumberRl: 10,
        ladderRl: 15,
        equipmentnameLy: 1,
        factorynumberLy: 10,
        ladderLy: 15,
        equipmentnameEw: 1,
        factorynumberEw: 10,
        ladderEw: 10
      },
      ruleFrom2: {}
    }
  },
  created() {
    const userInfo = JSON.parse(getInfo())
    this.userInfo = userInfo
    const Communityid = this.userInfo.data.Communityid
    const page = this.currentPage
    postGateSelect({ Communityid, page }).then(resp => {
      console.log(resp, '当页面渲染时的resp')
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
      postGateSelect({ Communityid }).then(resp => {
        console.log(resp, '创建时的resp')
        this.tableData = resp.msg.data
        this.totalPage = resp.msg.total
        this.pageNums = resp.msg.pageNum
        this.currentPage = Number(resp.msg.page)
      })
    },
    isShow1() {
      if (this.device === 1) {
        Message('您暂未开通门禁管理,请联系17716136776')
        return
      } else {
        this.gateToast = ''
        this.mistakeToast = ''
        this.ruleFrom1 = {}
        this.centerDialogVisible = !this.centerDialogVisible
      }
    },
    handleEdit(index, row) {
      console.log(row, '修改')
      this.gateToast = ''
      this.mistakeToast = ''
      // this.ruleFrom1 = {}
      if (this.device === 1) {
        Message('您暂未开通门禁管理,请联系17716136776')
        return
      } else {
        if (row.type === 1) {
          this.centerDialogVisible1 = !this.centerDialogVisible1
          this.ruleFrom1 = row
          this.ruleFrom2 = JSON.stringify(row)
          // this.updataQuery = row
        } else {
          this.centerDialogVisible2 = !this.centerDialogVisible2
          this.ruleFrom1 = row
          this.ruleFrom2 = row
          const { gateId, uname, Gatename, equipment, equipmentnameRl, factorynumberRl, ladderRl, equipmentnameLy, factorynumberLy, ladderLy, equipmentnameEw, factorynumberEw, ladderEw } = row
          this.updataQuery = { gateId, uname, Gatename, equipment, equipmentnameRl, factorynumberRl, ladderRl, equipmentnameLy, factorynumberLy, ladderLy, equipmentnameEw, factorynumberEw, ladderEw }
          // console.log(this.updataQuery)
        }
      }
    },
    handleDelete(index, row) {
      console.log(row, '578')
      if (this.device === 1) {
        Message('您暂未开通门禁管理,请联系17716136776')
        return
      } else {
        this.gateId = row.gateId
        this.centerDialogVisible3 = !this.centerDialogVisible3
      }
    },
    gateFocusHandler() {
      this.gateToast = ''
    },
    submitHandler() {
      this.ruleFrom1.Communityid = this.userInfo.data.Communityid
      this.ruleFrom1.uname = this.userInfo.data.uname
      console.log(this.ruleFrom1, '添加的参数')
      const gateInsertQuery = this.ruleFrom1
      postGateInsert(gateInsertQuery).then(resp => {
        console.log(resp, '添加的resp')
        if (resp.code === 401) {
          this.gateToast = resp.msg
          // setTimeout(() => {
          //   this.gateToast = ''
          // }, 2000)
        } else if (resp.code === 402 || resp.code === 403 || resp.code === 405) {
          this.mistakeToast = resp.msg
          setTimeout(() => {
            this.mistakeToast = ''
          }, 2000)
        } else if (resp.code === 400 || resp.code === 404) {
          Message('录入失败')
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
          // const page = shu
          const Communityid = this.userInfo.data.Communityid
          // page = this.currentPage
          postGateSelect({ Communityid }).then(resp => {
            console.log(resp, '当页面渲染时的resp')
            this.centerDialogVisible = !this.centerDialogVisible
            this.tableData = resp.msg.data
            this.totalPage = resp.msg.total
            this.pageNums = resp.msg.pageNum
            this.currentPage = Number(resp.msg.page)
          })
        }
      })
    },
    // 分页设置
    handleCurrentChange(val) {
      this.currentPage = val
      const page = val
      const Communityid = this.userInfo.data.Communityid
      const name = this.serachContent1
      if (!this.isShowAddto) {
        console.log('点击搜索时候得分页')
        postGateSearch({ Communityid, name, page }).then(resp => {
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
        postGateSelect({ Communityid, page }).then(resp => {
          console.log(resp, '点击分页时的表格数据表格数据')
          this.totalPage = resp.msg.total
          this.pageNums = resp.msg.pageNum
          this.tableData = resp.msg.data
        })
      }
    },
    // 弹框里面的确认删除操作
    deleteQuerenHandler() {
      const gateId = this.gateId
      postGateDelete({ gateId }).then(resp => {
        console.log(resp)
        if (resp.code === 400 || resp.code === 401) {
          Message(resp.msg)
        } else {
          const Communityid = this.userInfo.data.Communityid
          const page = this.currentPage
          postGateSelect({ Communityid, page }).then(resp => {
            console.log(resp.msg.data, '删除后第一次请求的渲染数据')
            this.totalPage = resp.msg.total
            this.pageNums = resp.msg.pageNum
            this.tableData = resp.msg.data
            if (resp.msg.data.length === 0) {
              const page = this.currentPage - 1
              // console.log({ Communityid, page },'')
              postGateSelect({ Communityid, page }).then(resp => {
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
    // 搜索
    serachHandler() {
      if (this.device === 1) {
        Message('您暂未开通门禁管理,请联系17716136776')
        return
      } else {
        this.isShowAddto = false
        const Communityid = this.userInfo.data.Communityid
        const name = this.serachContent
        this.serachContent1 = this.serachContent
        postGateSearch({ Communityid, name }).then(resp => {
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
        this.serachContent = ''
      }
    },
    exportEditHandler() {
      console.log('出口修改')
      this.gateToast = ''
      this.mistakeToast = ''
      const { gateId, uname, Gatename, equipment, equipmentnameRl, factorynumberRl, ladderRl, equipmentnameLy, factorynumberLy, ladderLy, equipmentnameEw, factorynumberEw, ladderEw } = this.ruleFrom1
      this.updataQuery = { gateId, uname, Gatename, equipment, equipmentnameRl, factorynumberRl, ladderRl, equipmentnameLy, factorynumberLy, ladderLy, equipmentnameEw, factorynumberEw, ladderEw }
      console.log(this.updataQuery, '入口修改传入的参数')
      postGateUpdate(this.updataQuery).then(resp => {
        console.log(resp, '入口修改时返回的resp')
        if (resp.code === 401) {
          this.gateToast = resp.msg
        } else if (resp.code === 402 || resp.code === 403 || resp.code === 405) {
          this.mistakeToast = resp.msg
          setTimeout(() => {
            this.mistakeToast = ''
          }, 2000)
        } else if (resp.code === 404) {
          Message(resp.msg)
          this.centerDialogVisible2 = !this.centerDialogVisible2
        } else {
          // 修改成功\
          Message(resp.msg)
          const Communityid = this.userInfo.data.Communityid
          const page = this.currentPage
          postGateSelect({ Communityid, page }).then(resp => {
            console.log(resp.msg.data, '修改成功请求的渲染数据')
            this.totalPage = resp.msg.total
            this.pageNums = resp.msg.pageNum
            this.tableData = resp.msg.data
          })
          this.centerDialogVisible2 = !this.centerDialogVisible2
        }
      })
    },
    entryEditHandler() {
      // console.log('入口修改')
      this.gateToast = ''
      this.mistakeToast = ''
      const { gateId, uname, Gatename, equipment, equipmentnameRl, factorynumberRl, ladderRl, equipmentnameLy, factorynumberLy, ladderLy, equipmentnameEw, factorynumberEw, ladderEw } = this.ruleFrom1
      this.updataQuery = { gateId, uname, Gatename, equipment, equipmentnameRl, factorynumberRl, ladderRl, equipmentnameLy, factorynumberLy, ladderLy, equipmentnameEw, factorynumberEw, ladderEw }
      console.log(this.updataQuery, '入口修改传入的参数')
      postGateUpdate(this.updataQuery).then(resp => {
        console.log(resp, '入口修改时返回的resp')
        if (resp.code === 401) {
          this.gateToast = resp.msg
        } else if (resp.code === 402 || resp.code === 403 || resp.code === 405) {
          this.mistakeToast = resp.msg
          setTimeout(() => {
            this.mistakeToast = ''
          }, 2000)
        } else if (resp.code === 404) {
          Message(resp.msg)
          this.centerDialogVisible1 = !this.centerDialogVisible1
        } else {
          // 修改成功\
          Message(resp.msg)
          const Communityid = this.userInfo.data.Communityid
          const page = this.currentPage
          postGateSelect({ Communityid, page }).then(resp => {
            console.log(resp.msg.data, '修改成功请求的渲染数据')
            this.totalPage = resp.msg.total
            this.pageNums = resp.msg.pageNum
            this.tableData = resp.msg.data
          })
          this.centerDialogVisible1 = !this.centerDialogVisible1
        }
      })
    },
    closeEntryHandler() {
      const Communityid = this.userInfo.data.Communityid
      const page = this.currentPage
      postGateSelect({ Communityid, page }).then(resp => {
        console.log(resp.msg.data, '修改成功请求的渲染数据')
        this.totalPage = resp.msg.total
        this.pageNums = resp.msg.pageNum
        this.tableData = resp.msg.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
//折叠样式
/deep/.demo-table-expand {
  font-size: 0;
  margin: 8px 0 8px 58px;
}
/deep/.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
/deep/.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  height: 40px !important;
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
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(96, 98, 102, 1);
      /deep/.el-button {
        background: rgba(37, 186, 217, 1) !important;
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
        border-radius: 3px;
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
  min-height: 30px;
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
}
/deep/.el-dialog--center .el-dialog__body {
  padding: 0px 35px 0px 54px !important;
}
.demo-ruleForm1 {
  width: 100%;
  .el-row {
    margin-bottom: 0;
    &:last-child {
      margin-bottom: 0;
      .el-col-8 {
        width: 28.8% !important;
      }
    }
  }
  .el-col {
    border-radius: 4px;
    margin-top: 10px;
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
      min-width: 220px;
      height: 21px;
      border: 1px solid rgba(210, 210, 210, 1) !important;
      border-radius: 3px;
    }
  }
  .submit-class {
    button {
      background: rgba(248, 172, 89, 1);
      border-radius: 2px;
      border-color: rgba(248, 172, 89, 1);
      width: 51px;
      height: 25px;
      padding: 0px;
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
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      .el-dialog__title {
        text-align: left;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      /deep/.el-dialog__headerbtn {
        top: 17px !important;
      }
      button {
        position: absolute;
        top: 1.4vh;
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
      top: 145px;
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
    .elbutton {
      color: #999999 !important;
    }
    /deep/ .el-button--primary {
      color: #ffffff;
      background-color: #25bad9 !important;
      border-color: #25bad9 !important;
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
.el-table {
  display: relative;
  overflow: inherit;
}
.entry-table-class {
  overflow-x: hidden !important;
  border-bottom: none !important;
  top: 12px;
  min-width: 940px;
}
/deep/.entry-table-class td {
  padding: 15px 0px !important;
}
.gatename-mistacktoast {
  color: red;
  width: auto;
  position: absolute;
  height: 20px;
  left: 120px;
  top: 28px;
  line-height: 35px;
  display: inline-block;
}
.mistack-toast {
  position: absolute;
  top: 3px;
  text-align: center;
  color: red;
  width: 260px;
  height: 20px;
}
/deep/ .demo-table-expand .el-form-item {
  width: 100% !important;
}

.add-class {
  /deep/.el-dialog {
    position: absolute;
    margin: 0 !important;
    left: 50%;
    top: 50%;
    border-radius: 4px;
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
  height: 47px;
}
.div-row1 {
  display: inline-block;
  margin-top: 14px;

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
  margin-top: 20px;
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
