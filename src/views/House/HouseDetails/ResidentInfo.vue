<template>
  <div id="enterprise-info" class="infor-warp">
    <span class="load-class" @click="clickDownLoad">下载住户模板</span>
    <div slot="header" class="clearfix">
      <div v-if="!isShowExcel" class="box-header-right">
        <span class="add-btn" @click="exitBefore">返回上一级</span>
        <span class="add-btn add-btn2" @click="addUser">添加住户</span>
        <!-- <span class="add-btn">导入住户</span> -->

        <el-upload v-if="!isShowExcel" action="#" multiple :before-upload="beforeUpload" :limit="1">
          <el-button size="small" type="primary" class="add-btn">导入住户</el-button>
        </el-upload>
      </div>
      <div v-if="!isShowExcel" class="box-header-left">历史住户</div>
      <!-- 点击到入住户 -->
      <div v-if="isShowExcel" v-show="!isError" class="box-header-right" style="width:200px;">
        <span class="add-btn" @click="exitHandler">返回上一级</span>
        <span class="add-btn add-btn2" @click="querenUpload">确认导入</span>
      </div>
    </div>
    <div v-if="isError" class="clearfix" style="height:50px">
      <span
        v-if="isError"
        v-show="isShowExcel"
        style="background:#F8AC59;position:absolute;left:20px;top:10px;cursor:pointer;"
        class="add-btn"
        @click="querenHandler"
      >确认</span>
      <span
        v-if="isError"
        style="position:absolute;left:100px;top:10px;color:#f44;height:60px;"
      >提示: 您有数据未导入成功,请记录并修改后再次重新导入</span>
    </div>
    <!-- <div class="noInfo" v-if="!isShowCard">
      目前还没有相关数据!!
    </div>-->
    <el-card class="list-card" shadow="never">
      <!-- 住户信息列表 -->
      <el-table
        v-if="!isShowExcel"
        empty-text="暂无数据"
        :data="tableData"
        row-class-name="myRow"
        cell-class-name="myCell"
        style="width: 100%; height:100%;"
      >
        <el-table-column prop="housenumber" label="房屋编号" min-width="120" />
        <el-table-column prop="username" label="住户姓名" min-width="120" />
        <el-table-column prop="phone" label="联系电话" min-width="200" />
        <el-table-column prop="type" label="住户身份" min-width="100">
          <template slot-scope="scope">
            <p v-html="scope.row.type === 1 ? '户主':scope.row.type === 2?'家属':'租户'" />
          </template>
        </el-table-column>
        <el-table-column prop="conet" label="备注" min-width="250" class="note" />
        <el-table-column v-if="!isShowExcel" label="操作" min-width="400" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="!isShowExcel"
              type="text"
              size="small"
              class="operateBtn btn-modify"
              @click="handleModifyClick(scope.row)"
            >修改</el-button>
            <el-button
              v-if="!isShowExcel"
              size="small"
              class="operateBtn btn-licence"
              @click="handleDetailClick(scope.row)"
            >查看详情</el-button>
            <el-button
              v-if="!isShowExcel"
              type="text"
              size="small"
              class="operateBtn btn-modify"
              @click="handleFaceClick(scope.row)"
            >人脸录入</el-button>
            <el-button
              v-if="!isShowExcel"
              type="text"
              size="small"
              class="operateBtn btn-record"
              @click="handleExchangeClick(scope.row)"
            >变更</el-button>
            <el-button
              v-if="!isShowExcel"
              type="text"
              size="small"
              class="operateBtn btn-record"
              @click="handleRecordClick(scope.row)"
            >操作记录</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 展示Excel -->
      <div v-if="isShowExcel">
        <el-table
          empty-text="正在解析..."
          :data="excelData"
          row-class-name="myRow"
          cell-class-name="myCell"
          style="overflow-x:hidden;"
          class="excel-class"
        >
          <el-table-column :prop="prop[0]" label="姓名" min-width="100" />
          <el-table-column :prop="prop[1]" label="电话" min-width="100" />
          <el-table-column :prop="prop[2]" label="房屋编号" min-width="100" />
          <el-table-column :prop="prop[3]" label="房屋身份" min-width="100" />
          <el-table-column :prop="prop[4]" label="工作单位（选填)" min-width="100" />
          <el-table-column :prop="prop[5]" label="身份证号（选填)" min-width="100" />
          <el-table-column :prop="prop[6]" label="是否是党员（选填)" min-width="100" />
          <el-table-column v-if="prop.length===8" :prop="prop[7]" label="原因" min-width="100" />
        </el-table>
      </div>
    </el-card>
    <!-- 分页 -->
    <div v-if="!isShowExcel" class="block">
      <p class="record-data">共{{ pageNums }}页 共{{ totalPage }}条</p>
      <el-pagination
        background
        :page-size="listNum"
        layout="prev, pager, next, jumper"
        :total="totalPage"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      />

      <!-- 添加住户弹框 -->
      <el-dialog
        title="添加住户"
        custom-class="myAddForm"
        class="position:fixed;top:10px;"
        :append-to-body="true"
        :visible.sync="dialogFormVisible"
      >
        <el-form ref="form" :model="addData" label-width="100px">
          <el-form-item label="房屋编号:">
            <el-input v-model="addData.housenumber" disabled />
          </el-form-item>
          <span class="tips" />
          <el-form-item label="住户姓名:">
            <el-input v-model="addData.name" />
          </el-form-item>
          <span ref="userToast" class="tips">请填写住户姓名</span>
          <!-- 不会变动的联系方式 -->
          <!-- <el-form-item label="联系方式:">
          <el-input />
          </el-form-item>-->
          <!-- <span class="tips">请输入公司名称</span> -->
          <!-- 联系方式box -->
          <section v-for="(value, index) in contactData" :key="index">
            <!-- 联系方式加 -->
            <section v-if="index === 0">
              <el-form-item label="联系方式:" class="connect-class">
                <el-input v-model="contactData[index]" />
                <i class="el-icon-plus" @click="addlastitems(index)" />
              </el-form-item>
              <span :ref="`contactData${index}`" class="tips">请输入正确的手机号码</span>
            </section>
            <!-- 联系方式减(添加的子项目) -->
            <section v-if="index > 0">
              <el-form-item label="联系方式:" class="connect-class">
                <el-input v-model="contactData[index]" />
                <i class="el-icon-close" @click="rmlastitems(index)" />
              </el-form-item>
              <span :ref="`contactData${index}`" class="tips">请输入正确的手机号码</span>
            </section>
          </section>
          <!-- 身份证号 -->
          <el-form-item label="身份证号:">
            <el-input v-model="addData.identity" placeholder="选填" />
          </el-form-item>
          <span ref="phoneNum" class="tips">请输入联系电话</span>
          <el-form-item label="工作单位:">
            <el-input v-model="addData.Workunit" placeholder="选填" />
          </el-form-item>
          <span ref="phoneNum" class="tips">请输入联系电话</span>
          <el-form-item label="选择类别:">
            <el-radio-group v-model="radio" @change="radioHandler">
              <el-radio :label="1">房主</el-radio>
              <el-radio :label="2">家属</el-radio>
              <el-radio :label="3">租户</el-radio>
            </el-radio-group>
          </el-form-item>
          <span ref="typeToast" class="tips">请选择住户身份</span>
          <el-form-item label="是否是党员:">
            <el-radio-group v-model="radio1" @change="radioHandler1">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <span ref="dangToast" class="tips">请选择住户党员身份</span>
          <!-- 备注 -->
          <el-form-item label="备注:" style="height:125px !important;margin-top:20px;">
            <el-input v-model="addData.conet" style="resize:none;" type="textarea" />
          </el-form-item>

          <div class="addNow" @click="submitHandler">确认添加</div>
        </el-form>
      </el-dialog>
      <!-- 修改住户弹框 -->
      <el-dialog
        title="修改住户"
        custom-class="myAddForm"
        class="position:fixed;top:10px;"
        :append-to-body="true"
        :visible.sync="dialogFormVisible2"
      >
        <el-form ref="form" :model="addData" label-width="100px">
          <el-form-item label="房屋编号:">
            <el-input v-model="modifyData.housenumber" disabled />
          </el-form-item>
          <span class="tips" />
          <el-form-item label="住户姓名:">
            <el-input v-model="modifyData.name" />
          </el-form-item>
          <span ref="userToast" class="tips">请填写住户姓名</span>
          <!-- 不会变动的联系方式 -->
          <!-- <el-form-item label="联系方式:">
          <el-input />
          </el-form-item>-->
          <!-- <span class="tips">请输入公司名称</span> -->
          <!-- 联系方式box -->
          <section v-for="(value, index) in contactData" :key="index">
            <!-- 联系方式加 -->
            <section v-if="index === 0">
              <el-form-item label="联系方式:" class="connect-class">
                <el-input v-model="contactData[index]" />
                <i class="el-icon-plus" @click="addlastitems(index)" />
              </el-form-item>
              <span :ref="`contactData${index}`" class="tips">请输入正确的手机号码</span>
            </section>
            <!-- 联系方式减(添加的子项目) -->
            <section v-if="index > 0">
              <el-form-item label="联系方式:" class="connect-class">
                <el-input v-model="contactData[index]" />
                <i class="el-icon-close" @click="rmlastitems(index)" />
              </el-form-item>
              <span :ref="`contactData${index}`" class="tips">请输入正确的手机号码</span>
            </section>
          </section>
          <!-- 身份证号 -->
          <el-form-item label="身份证号:">
            <el-input v-model="modifyData.identity" placeholder="选填" />
          </el-form-item>
          <span ref="phoneNum" class="tips">请输入联系电话</span>
          <el-form-item label="工作单位:">
            <el-input v-model="modifyData.Workunit" placeholder="选填" />
          </el-form-item>
          <span ref="phoneNum" class="tips">请输入联系电话</span>
          <el-form-item label="选择类别:">
            <el-radio-group v-model="radio" @change="radioHandler">
              <el-radio :label="1">房主</el-radio>
              <el-radio :label="2">家属</el-radio>
              <el-radio :label="3">租户</el-radio>
            </el-radio-group>
          </el-form-item>
          <span ref="typeToast" class="tips">请选择住户身份</span>
          <el-form-item label="是否是党员:">
            <el-radio-group v-model="radio1" @change="radioHandler1">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <span ref="dangToast" class="tips">请选择住户党员身份</span>
          <!-- 备注 -->
          <el-form-item label="备注:" style="height:125px !important;margin-top:20px;">
            <el-input v-model="modifyData.conet" style="resize:none;" type="textarea" />
          </el-form-item>

          <div class="addNow" @click="modifyHandler">确认添加</div>
        </el-form>
      </el-dialog>
      <!-- 人脸录入 -->
      <el-dialog
        title="人脸录入"
        custom-class="myAddForm"
        :append-to-body="true"
        class="face-class"
        :visible.sync="fcDialogFormVisible"
      >
        <!-- 上传身份证正面 -->
        <div class="upimg-class upimg-top">
          <span>上传身份证（正面）:</span>
          <div class="up-img">
            <el-upload
              ref="upload"
              :limit="1"
              action="#"
              :on-remove="handleRemove"
              :on-preview="handlePictureCardPreview"
              :on-change="handleChange"
              list-type="picture-card"
              :auto-upload="false"
            >
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in" />
                  </span>
                  <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete" />
                  </span>
                </span>
              </div>
            </el-upload>
            <!-- 图片预览box上半部分 -->

            <el-dialog
              style="width:100%;background:#999;padding-top:90px;height:100px;"
              :visible.sync="ImgDiaLog.add"
              title="pic1"
              :modal="mod"
              :append-to-body="true"
              :fullscreen="true"
            >
              <img width="100%;height:100%;" :src="ImgDiaLog.addSrc" alt />
            </el-dialog>
          </div>
        </div>
        <!-- 上传人脸照 -->
        <div class="upimg-class upimg-bottom">
          <span>上传人脸照:</span>
          <div class="up-img" style="left:80px;">
            <el-upload
              ref="upload1"
              :limit="1"
              action="#"
              :on-remove="handleRemove1"
              :on-preview="handlePictureCardPreview"
              :on-change="handleChange1"
              list-type="picture-card"
              :auto-upload="false"
            >
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in" />
                  </span>
                  <span class="el-upload-list__item-delete" @click="handleDownload(file)">
                    <i class="el-icon-download" />
                  </span>
                  <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete" />
                  </span>
                </span>
              </div>
            </el-upload>
            <!-- 图片预览box下半部分 -->

            <el-dialog
              style="width:100%;background:#999;padding-top:90px;"
              :visible.sync="ImgDiaLog.add"
              title="pic1"
              :modal="mod"
              :append-to-body="true"
              :fullscreen="true"
            >
              <img width="100%;height:100%;" :src="ImgDiaLog.addSrc" alt />
            </el-dialog>
          </div>
        </div>
        <div class="addNow" style="top:80%;" @click="uploadFaceHandler">确认上传</div>
      </el-dialog>

      <!-- 查看人脸 -->
      <el-dialog
        title="查看人脸"
        custom-class="myAddForm"
        :append-to-body="true"
        class="face-class"
        :visible.sync="fcDialogFormVisible1"
      >
        <!-- 查看人脸上传身份证正面 -->
        <div class="upimg-class upimg-top">
          <span>身份证（正面）:</span>
          <div class="up-img">
            <el-upload
              :limit="1"
              action="#"
              :on-remove="handleRemove"
              :on-preview="handlePictureCardPreview"
              :on-change="handleChange"
              list-type="picture-card"
              :auto-upload="false"
            >
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in" />
                  </span>
                  <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete" />
                  </span>
                </span>
              </div>
            </el-upload>
            <!-- 图片预览box上半部分 -->

            <el-dialog
              style="width:100%;background:#999;padding-top:90px;height:100px;"
              :visible.sync="ImgDiaLog.add"
              title="pic1"
              :modal="mod"
              :append-to-body="true"
              :fullscreen="true"
            >
              <img width="100%;height:100%;" :src="ImgDiaLog.addSrc" alt />
            </el-dialog>
          </div>
        </div>
        <!-- 查看人脸上传人脸照 -->
        <div class="upimg-class upimg-bottom">
          <span>人脸照:</span>
          <div class="up-img" style="left:80px;">
            <el-upload
              :limit="1"
              action="#"
              :on-remove="handleRemove1"
              :on-preview="handlePictureCardPreview"
              :on-change="handleChange1"
              list-type="picture-card"
              :auto-upload="false"
            >
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in" />
                  </span>
                  <span class="el-upload-list__item-delete" @click="handleDownload(file)">
                    <i class="el-icon-download" />
                  </span>
                  <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete" />
                  </span>
                </span>
              </div>
            </el-upload>
            <!-- 图片预览box下半部分 -->

            <el-dialog
              style="width:100%;background:#999;padding-top:90px;"
              :visible.sync="ImgDiaLog.add"
              title="pic1"
              :modal="mod"
              :append-to-body="true"
              :fullscreen="true"
            >
              <img width="100%;height:100%;" :src="ImgDiaLog.addSrc" alt />
            </el-dialog>
          </div>
        </div>
        <div class="addNow" style="top:80%;">确认上传</div>
      </el-dialog>
    </div>
    <!-- 确认导入弹框 -->
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
      <div>确认导入以下住户?</div>
      <span slot="footer" class="dialog-footer">
        <el-button class="quxiao1" @click="centerDialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="deleteQuerenHandler">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 查看详情弹框 -->
    <el-dialog
      title="查看详情"
      custom-class="myAddForm"
      :append-to-body="true"
      :visible.sync="dialogFormVisibleDetail"
      class="detaill-class"
    >
      <el-form ref="form" :model="tableData" label-width="100px">
        <el-form-item label="工作单位:">
          <el-input v-model="tableData.Workunit" disabled />
        </el-form-item>
        <span class="tips" />
        <el-form-item label="身份证号:">
          <el-input v-model="tableData.identity" disabled />
        </el-form-item>
        <el-form-item label="是否是党员:">
          <el-radio-group v-model="radio2">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <span ref="dangToast" class="tips">请选择住户党员身份</span>
        <span class="tips" />
        <div class="addNow" @click="submitHandler">确认</div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui'
import { postHouseholdSelect, postHouseholdInsert, postHouseExcel, postExcelImport, postFace } from '@/api/residerInfo'
import { getInfo } from '@/utils/auth'
export default {
  name: 'ResidentInfo',
  props: ['houseid', 'housenumber'],
  // data数据
  data () {
    return {
      isError: false,
      isShowExcel: false,
      excelData: [],
      dr_nameId: '', // 点击确认导入传给后台
      // prop:
      mod: false, // 不需要遮罩层
      fileLists: [], // 添加身份证
      fileLists1: [], // 添加人脸
      ImgDiaLog: { // 图片弹窗显示与否
        origin: false,
        originSrc: '',
        add: false,
        addSrc: '',
        modify: false,
        modifySrc: ''
      },
      totalPage: null, // 总条数
      listNum: 10,
      currentPage: 1, // 当前页数
      pageNums: null, // 总页数
      radio: null,
      radio1: null,
      radio2: null,
      contactData: [''],
      rightConct: [],
      dialogFormVisible: false, // 添加住户dialog
      dialogFormVisible2: false,
      fcDialogFormVisible: false,
      fcDialogFormVisible1: false,
      centerDialogVisible3: false,
      dialogFormVisibleDetail: false,
      // 查询企业信息
      tableData: [
        // {
        //   id: 4, // 住户主键id
        //   username: '李梦莹', // 住户名字
        //   phone: '18981275447, 15183994119', // 住户电话
        //   Houseid: 1, // 房屋主键id
        //   Communityid: 15, // 小区id
        //   type: 1, // 1为户主2为家属3为租客
        //   time: '2019-04-15 10:55:58', // 添加修改时间
        //   state: 1, // 1为未对比2为已对比(app用户对比用)
        //   userid: null, // app用户id
        //   Workunit: null, // 工作单位
        //   identity: null, // 身份证号
        //   zt: 1, // 1为正常2为注销
        //   conet: null, // 备注
        //   dang: 2, // 1是党员2不是党员
        //   uname: null, // 操作人
        //   ip: null, // ip地址
        //   img: null, // 人脸图片
        //   picture: '', // 身份证图片
        //   housenumber: '1111' // 房屋编号
        // }
      ],

      addData: {
        housenumber: '', // 房屋编号
        name: '', // 住户姓名
        phone: '', // 住户电话
        identity: '', // 住户身份证号
        Workunit: '', // 住户工作单位
        type: '',
        dang: '',
        conet: ''
      },
      modifyData: {
        housenumber: '', // 房屋编号
        name: '', // 住户姓名
        phone: '', // 住户电话
        identity: '', // 住户身份证号
        Workunit: '', // 住户工作单位
        type: '',
        dang: '',
        conet: ''
      },
      userInfoData: {},
      phoneToast: [''],
      userId: null// 住户id
    }
  },
  // watch: {
  //   // 如果 `question` 发生改变，这个函数就会运行token
  //   question: function (newQuestion, oldQuestion) {
  //     this.answer = 'Waiting for you to stop typing...'
  //     this.debouncedGetAnswer()
  //   }
  // },
  created () {
    console.log(this.houseid, this.housenumber, 'housei222d')
    console.log('2224422')
    // 拉取用户信息
    const userInfo = JSON.parse(getInfo())
    // console.log(userInfo, '用户信息的信息')
    this.userInfoData = userInfo.data
    const { Communityid } = this.userInfoData
    const Houseid = this.houseid
    // postHouseholdSelect({ Communityid, Houseid }).then(resp => {
    //   console.log(resp, '191')
    //   this.tableData = resp.msg.data
    //   this.listNum = resp.msg.listRows
    //   this.totalPage = resp.msg.total
    //   this.pageNums = resp.msg.pageNum
    //   // this.tableData = resp.msg.data
    //   this.currentPage = Number(resp.msg.page)
    // })
    this.getHouseuserLists(1, Houseid, Communityid)
  },
  methods: {
    // 请求渲染数据列表
    getHouseuserLists (page = 1, Houseid, Communityid) {
      postHouseholdSelect({ page, Houseid, Communityid }).then(resp => {
        this.tableData = resp.msg.data
        this.listNum = resp.msg.listRows
        this.totalPage = resp.msg.total
        this.pageNums = resp.msg.pageNum
        // this.tableData = resp.msg.data
        this.currentPage = Number(resp.msg.page)
      })
    },
    // 事件EXCEL下载住户模板
    clickDownLoad () {
      const { token } = this.userInfoData
      const url = 'http://test.txsqtech.com/index/Household/downloadFile'
      axios.get(url, {
        headers: {
          token
        },
        responseType: 'blob' // 二进制流
      }).then(function (res) {
        if (!res) return
        const blob = new Blob([res.data], { type: 'application/vnd.ms-excel;charset=utf-8' })
        const url = window.URL.createObjectURL(blob)
        const aLink = document.createElement('a')
        aLink.style.display = 'none'
        aLink.href = url
        aLink.setAttribute('download', '住户模板.xlsx')
        document.body.appendChild(aLink)
        aLink.click()
        document.body.removeChild(aLink)
        window.URL.revokeObjectURL(url)
      }).catch(function (error) {
        console.log(error)
      })
    },
    // 导入住户
    beforeUpload (file) {
      const { Communityid } = this.userInfoData
      var fd = new window.FormData()
      fd.append('excel', file)
      fd.append('Communityid', Communityid)
      console.log('导入住户,点击打开文件', fd)

      postHouseExcel(fd).then(resp => {
        console.log(resp, '本地excel')
        if (resp.code === 200) {
          this.excelData = resp.msg.data
          this.dr_nameId = resp.msg.dr_nameId
          this.prop = ['1', '2', '3', '4', '5', '6', '7']
          this.isShowExcel = true
        } else if (resp.code === 401) {
          Message(resp.msg)
        } else {
          Message(resp.msg)
        }
      })
    },
    // 导入住户返回上一级
    exitHandler () {
      this.isShowExcel = false
    },
    // 确认导入
    querenUpload () {
      // postExcelImport
      // this.isError = true
      this.centerDialogVisible3 = true
      console.log('确认导入')
    },
    deleteQuerenHandler () {
      console.log('确认哈哈')
      const { uname, Communityid } = this.userInfoData
      const dr_nameId = this.dr_nameId
      postExcelImport({ uname, Communityid, dr_nameId }).then(resp => {
        console.log(resp, '确认导入resp')
        if (resp.code === 200) {
          if (resp.data.length > 0) {
            this.isError = true
            this.prop = ['username', 'phone', 'House', 'type', 'Workunit', 'identity', 'dang', 'Reason']
            this.excelData = resp.data
          }
          if (resp.data.length === 0) {
            Message('数据导入成功')
            this.isShowExcel = false
            const Houseid = this.Houseid
            const Communityid = this.userInfoData.Communityid
            this.getHouseuserLists(1, Houseid, Communityid)
          }
          this.centerDialogVisible3 = false
        }
      })
    },
    // 确认重新导入
    querenHandler () {
      this.isError = false
      this.isShowExcel = false
    },
    // 图片事件
    handleRemove (file, fileList) {
      console.log(fileList, 636)
      this.fileLists = fileList
    },
    handleRemove1 (file, fileList) {
      this.fileLists1 = fileList
    },
    handlePictureCardPreview (file) {
      this.ImgDiaLog.addSrc = file.url
      this.ImgDiaLog.add = true // 添加预览
      console.log(123)
    },
    // 本地选中的图片变化
    handleChange (file, fileList) {
      console.log(file, fileList, '图片事件')
      if (fileList.length < 2) { // 允许最多上传三张图片
        this.fileLists = fileList
      }
      // if (fileList.length === 2) {
      //   Message('上传的图片已达上线')
      // }
    },
    handleChange1 (file, fileList) {
      console.log(file, fileList, '图片事件')
      if (fileList.length < 2) { // 允许最多上传三张图片
        this.fileLists1 = fileList
      }
      // if (fileList.length === 2) {
      //   Message('上传的图片已达上线')
      // }
    },
    // 确认上传
    uploadFaceHandler () {
      // console.log(this.fileLists[0].raw, this.fileLists1[0], 'file')
      const { Communityid, uname } = this.userInfoData
      const id = this.userId
      const formData = new FormData()
      formData.append('id', id)
      formData.append('Communityid', Communityid)
      formData.append('uname', uname)
      formData.append('img', this.fileLists1[0].raw)
      formData.append('picture', this.fileLists[0].raw)
      this.fileLists = []
      postFace(formData).then(resp => {
        console.log(resp, '人脸上传返回的resp')
      })
    },
    // 分页设置
    handleCurrentChange (val) {
      this.currentPage = val
      const page = val
      const { Communityid } = this.userInfoData
      const Houseid = this.houseid
      postHouseholdSelect({ Communityid, Houseid, page }).then(resp => {
        console.log(resp, '191')
        this.tableData = resp.msg.data
      })
    },
    // 添加房屋里的添加联系方式
    addlastitems (index) {
      this.contactData.push('')
    },
    // 添加房屋里的删除联系方式
    rmlastitems (index) {
      this.contactData.splice(index, 1)
      this.phoneToast.splice(index, 1)
    },
    // 返回上一级
    exitBefore () {
      this.$emit('isShowHouse')
    },
    // 点击添加住户
    addUser () {
      // this.addData = {}
      this.addData.name = ''
      this.addData.housenumber = this.housenumber
      this.addData.identity = ''
      this.addData.Workunit = ''
      this.addData.type = ''
      this.addData.dang = ''
      this.addData.conet = ''
      this.radio1 = null
      this.radio = null
      this.rightConct = []
      this.contactData = ['']
      this.dialogFormVisible = !this.dialogFormVisible
    },
    // 点击选择类别：
    radioHandler () {
      console.log(this.radio, 'this.radio')
    },
    // 点击选择类别：
    radioHandler1 () {
      console.log(this.radio1, 'this.radio')
    },
    // 点击修改
    handleModifyClick (row) {
      console.log(row, '点击修改')
      this.dialogFormVisible2 = true
      this.modifyData.name = row.username
      this.modifyData.phone = row.phone
      this.modifyData.identity = row.identity
      this.modifyData.Workunit = row.Workunit
      this.modifyData.conet = row.conet
      this.modifyData.type = row.type
      this.modifyData.dang = row.dang
      // 手机号码的渲染
      this.contactData = row.phone.split(',')
      this.modifyData.housenumber = this.housenumber
      this.radio = row.type
      this.radio1 = row.dang
    },
    // 修改修改
    modifyHandler () {
      console.log(this.modifyData, this.contactData, '修改')
    },
    // 点击查看详情
    handleDetailClick (row) {
      console.log(row)
      this.dialogFormVisibleDetail = true
      this.radio2 = row.dang
    },
    // 点击人脸录入
    handleFaceClick (row) {
      console.log(row, '729')
      this.file = ''
      this.userId = row.id
      this.fcDialogFormVisible = true
      this.fileLists1 = []
      this.fileLists = []
      this.$refs.upload.clearFiles()
      this.$refs.upload1.clearFiles()
    },
    // 点击变更
    handleExchangeClick (row) {
      alert('变更')
      console.log(row)
    },
    // 点击操作记录
    handleRecordClick (row) {
      alert('操作记录')
      console.log(row)
    },
    // 数组去重
    distinct (arr) {
      return Array.from(new Set(arr))
    },
    // 点击添加房屋遮罩层的确认添加
    submitHandler () {
      if (this.addData.name === '') {
        this.$refs.userToast.style.color = 'red'
        setTimeout(() => {
          this.$refs.userToast.style.color = ''
        }, 2000)
      } else {
        if (this.contactData.length) {
          // 循环验证
          this.contactData.forEach((item, index) => {
            if (index) {
              // 如果为添加的项目，则为空时不提示，有内容且填错才提示
              if (item === '') {
                this.$refs[`contactData${index}`][0].style.color = ''
              } else {
                if ((/^1[3456789]\d{9}$/.test(item))) {
                  this.$refs[`contactData${index}`][0].style.color = ''
                  this.rightConct.push(item)
                } else {
                  this.rightConct = []
                  this.$refs[`contactData${index}`][0].style.color = 'red'
                  console.log(this.$refs[`contactData${index}`][0])
                  setTimeout(() => {
                    this.$refs[`contactData${index}`][0].style.color = ''
                  }, 2000)
                }
              }
            } else {
              // 如果为第一项
              if ((/^1[3456789]\d{9}$/.test(item))) {
                this.$refs[`contactData${index}`][0].style.color = ''
                this.rightConct.push(item)
              } else {
                this.$refs[`contactData${index}`][0].style.color = 'red'
                // console.log(this.$refs[`contactData${index}`][0])
                this.rightConct = []
                setTimeout(() => {
                  this.$refs[`contactData${index}`][0].style.color = ''
                }, 2000)
              }
            }
          })
        }
      }
      const cc = this.distinct(this.rightConct)
      const phone = cc.join(',')
      const type = this.radio
      const dang = this.radio1
      const { Communityid, uname } = this.userInfoData
      const Houseid = this.houseid
      const { name, identity, Workunit, conet } = this.addData
      console.log(phone, '55')
      postHouseholdInsert({ Communityid, Houseid, uname, name, identity, Workunit, conet, dang, type, phone }).then(resp => {
        console.log(resp, 'tianjia')
        if (resp.code === 200) {
          Message(resp.msg)
          this.dialogFormVisible = false
          const nume = Number(this.totalPage) / Number(10)
          var shu = ''
          if (Math.round(nume) === nume) {
            // num是整数
            shu = Number(nume) + Number(1)
          } else {
            shu = Math.ceil(nume)
          }
          const page = shu
          postHouseholdSelect({ Communityid, Houseid, page }).then(resp => {
            // console.log(resp, '191')
            this.tableData = resp.msg.data
            this.listNum = resp.msg.listRows
            this.totalPage = resp.msg.total
            this.pageNums = resp.msg.pageNum
            // this.tableData = resp.msg.data
            this.currentPage = Number(resp.msg.page)
          })
        } else if (resp.code === 403) {
          this.$refs.typeToast.style.color = 'red'
          setTimeout(() => {
            this.$refs.typeToast.style.color = ''
          }, 2000)
        } else if (resp.code === 404) {
          this.$refs.dangToast.style.color = 'red'
          setTimeout(() => {
            this.$refs.dangToast.style.color = ''
          }, 2000)
        } else if (resp.code === 405 || resp.code === 406) {
          Message(resp.msg)
        }
      })
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
/deep/.el-card__body {
  padding-top: 0 !important;
}
/deep/.infor-warp {
  height: 500px;
  background-color: green;
}

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
  position: absolute;
  top: -16px;
  left: 130px;
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
      cursor: default;
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
  height: 528px;
  overflow-x: hidden;
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
            cursor: default;
            height: 98% !important;
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
.clearfix {
  width: 100%;
  // height: 50px;
  padding: 0 30px 0 12px;
  .box-header-right {
    float: left;
    height: 60px;
    display: flex;
    justify-content: space-around;
    width: 300px;
    .add-btn {
      cursor: pointer;
      background-color: #25bad9;
      color: #fff;
      height: 26px;
      margin-top: 20px;
      padding: 0 12px;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .add-btn2 {
      background-color: #1fbba6ff;
    }
  }
  .box-header-left {
    float: right;
    cursor: pointer;
    background-color: #25bad9;
    color: #fff;
    height: 26px;
    margin-top: 20px;
    padding: 0 12px;
    border-radius: 4px;
    box-sizing: border-box;
  }
}
.connect-class {
  position: relative;
  // background-color: #f00;
  .el-icon-plus {
    position: absolute;
    cursor: pointer;
    top: 7px;
    right: -25px;
    // background-color: green;
  }
  .el-icon-close {
    position: absolute;
    cursor: pointer;
    top: 7px;
    right: -25px;
  }
}
// 分页样式
//分页器的样式
//分页器的样式
.block {
  .record-data {
    cursor: default;
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
  // bottom: 100px;
  top: 75vh;
  // left: -2vw;
  right: 2vw;
  height: 40px;
  width: 100%;
  // padding-left: 90px;
  .el-pagination {
    // background-color: green;
    position: absolute;
    bottom: 0;
    right: 3.3vw;
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
        font-family: Microsoft YaHei;
        font-weight: 400;
        height: 2.8vh;
        min-width: 2.5vw;
        color: rgba(102, 102, 102, 1);
        outline: none;
        /deep/.el-input__inner {
          font-size: 10px;
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
          // margin-left: 12px;
          outline: none;
        }
        &::before {
          content: "前往";
          color: rgba(102, 102, 102, 1);
          font-size: 0.8vw;
          margin-left: 0.35vw;
          margin-right: 0.95vw;
          margin-top: 0.1vh !important;
          text-align: center;
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
.face-class {
  // background-color: #f00;
  /deep/.el-dialog {
    top: 30% !important;
    height: 255px !important;
    width: 356px !important;
    .el-dialog__body {
      padding: 20px;
      box-sizing: border-box;
    }
  }
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
.upimg-class {
  display: flex;
  position: relative;
  height: 80px;
}
.load-class {
  cursor: pointer;
  color: #25bad9;
  position: absolute;
  font-size: 12px;
  right: 20px;
  top: -25px;
}
.excel-class {
  /deep/.el-table__body-wrapper {
    height: 100% !important;
    overflow-x: hidden;
  }
}
//确认导入弹框
.chen {
  /deep/.el-dialog {
    background-color: #fff !important;
    width: 350px;
    min-height: 210px;
    border-radius: 4px;
    height: 200px !important;
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
      width: 100%;
      padding: 47px 0 50px 0 !important;
      position: relative;
      height: 200px;
      overflow-x: inherit;
      div {
        width: 100%;
        height: 110px;
        font-size: 16px;
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
.detaill-class {
  /deep/.el-dialog {
    height: 255px;
    margin-top: 25% !important;
  }
}
</style>
