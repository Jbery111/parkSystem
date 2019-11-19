<template>
  <div>
    <!--   -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span v-if="ishowAdd" id="newadd" @click="isShow1">新增权限</span>
        <el-table :data="tableData" style="width: 100%" empty-text="没有数据">
          <el-table-column prop="poname" label="职位" min-width="220" />

          <el-table-column prop="po_notes" label="职位描述" min-width="400" class="des-class">
            <template slot-scope="scope">{{ scope.row.po_notes }}</template>
          </el-table-column>
          <el-table-column label="操作" min-width="185">
            <template slot-scope="scope">
              <el-button
                v-if="isShowEdit"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >修改</el-button>
              <el-button
                v-if="isShowDelte"
                class="el-btn2"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 创建职位遮罩层 -->
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="26.02%"
      center
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <span slot="title">{{ title1 }}职位</span>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <div class="form-item" style="height: 60px;">
          <el-form-item label="职位:" class="zhiwei">
            <input
              v-model="formLabelAlign.name"
              type="text"
              style="width:100%; border:1px solid rgba(210,210,210,1);height:3.38vh;
border-radius:4px;"
              @focus="cc"
              @keyup.enter="getCheckedKeys"
            />
          </el-form-item>
          <p
            v-if="isShowMis"
            class="mistack-message"
            style="color:red;
            color: red;
            position: relative;
            top: -36.5vh;
            left: 2.2vw;
            margin-left: 3.8vw;
            margin-top: 36vh;
            box-sizing: border-box;
            font-size: 0.8vw;
            transform: scale(0.9);
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 0, 0, 1);
            "
          >{{ mistakeToast }}</p>
        </div>
        <div class="form-item" style="height: 60px;">
          <el-form-item label="职位描述:">
            <input
              ref="nameInput"
              v-model="formLabelAlign.region"
              type="text"
              style="width:100%; border:1px solid rgba(210,210,210,1);height:3.38vh;
border-radius:4px;"
              @focus="cc"
              @keyup.enter="getCheckedKeys"
            />
          </el-form-item>
          <!-- <p class="mistack-message">提示错误信息2</p> -->
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getCheckedKeys">下一步</el-button>
      </span>
    </el-dialog>
    <!--XXXX 权限设置遮罩层 -->
    <el-dialog
      :visible.sync="centerDialogVisible1"
      width="24.43%"
      :append-to-body="true"
      :close-on-click-modal="false"
      class="tree-content1"
    >
      <span slot="title" class="dialog-footer">{{ formLabelAlign.name }}权限设置</span>
      <el-tree
        ref="tree"
        empty-text="加载中"
        :auto-expand-parent="false"
        :data="treeData"
        class="tree-content"
        show-checkbox
        get-current-node
        node-key="id"
        :default-checked-keys="[68]"
        :props="defaultProps"
        disabled="true"
        :highlight-current="false"
        @keyup.enter="successAddTo"
      />
      <span slot="footer" class="dialog-footer">
        <div class="toast">
          <p v-if="isShowMisTake">请选择权限!</p>
        </div>
        <el-button type="primary" @click="successAddTo">完成</el-button>
      </span>
    </el-dialog>
    <!-- 删除遮罩层 -->
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
      <div>是否删除该职位?</div>
      <span slot="footer" class="dialog-footer">
        <el-button class="quxiao1" @click="centerDialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="delteHandler">确 认</el-button>
      </span>
    </el-dialog>
    <!--修改时XXXX 权限设置遮罩层 -->
    <el-dialog
      :visible.sync="centerDialogVisible2"
      width="24.43%"
      center
      :append-to-body="true"
      :close-on-click-modal="false"
      class="tree-content1"
    >
      <span slot="title" class="dialog-footer">{{ formLabelAlign.name }}权限设置</span>
      <el-tree
        ref="tree1"
        empty-text="加载中"
        :auto-expand-parent="false"
        :data="treeData"
        class="tree-content"
        show-checkbox
        get-current-node
        node-key="id"
        :default-checked-keys="defaultCheckedKeys"
        :props="defaultProps"
        disabled="true"
        :highlight-current="false"
        @keyup.enter="successAddTo"
      />
      <span slot="footer" class="dialog-footer">
        <div class="toast">
          <p v-if="isShowMisTake">请选择权限!</p>
        </div>
        <el-button type="primary" @click="successAddTo">完成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postAddto, postQuerysa, postQuerys, postUpdate, postDelete, postButton, postToexamine } from '@/api/Jurisdiction'
import Joi from '@hapi/joi'
import { getInfo } from '@/utils/auth'
// import { createTreeLists } from '@/utils/createTreeLists'
import { Message } from 'element-ui'
// let errorData = ''
const schema = Joi.object().keys({
  nameVali: Joi.string().min(1).max(30).required().error(() => '职位不正确')
})
export default {
  components: {},
  data () {
    return {
      centerDialogVisible2: false,
      hongShow: false,
      tableData: [], // 后端返回的总的表格数据
      tableList: [], // 点击分页时渲染表格的数据
      titleData: 'XXXX',
      centerDialogVisible: false,
      centerDialogVisible1: false,
      centerDialogVisible3: false, // 删除
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // querys接口需要的部分参数
      querysDatas: {
        Communityid: '',
        Propertyid: '',
        sition: '',
        auth_id: '',
        name: '',
        describe: ''
        // meth_id: null
      },
      value: true,
      mistakeToast: '',
      userInfo: {},
      isShowMis: false,
      isShowMisTake: false,
      title1: '创建',
      defaultCheckedKeys: null,
      defaultCheckedKeysData: [],
      updataQuerys: {},
      poid: '', // 调用修改接口时的参数poid
      buttonId: null, // 获取权限按钮时需要传的参数auth_id
      ishowAdd: false,
      isShowDelte: false,
      isShowEdit: false,
      delePoid: null,
      totalPage: null,
      listNum: null,
      currentPage: 1, // 当前页数
      pageNums: null,
      buttonLists: []
    }
  },
  computed: {
  },
  watch: {
    '$route' (to, from) {
      console.log(to, '账号分配的watch')
    }
  },
  created () {
    // 获取权限按钮时需要传递的参数
    // console.log(this.$route.meta.auth_id, '账号分配')
    this.buttonId = this.$route.meta.auth_id
    const auth_id = this.buttonId
    // 拉取用户信息
    const userInfo = JSON.parse(getInfo())
    // console.log(userInfo, '用户信息的信息')
    const Jurisdiction = userInfo.Jurisdiction
    this.userInfoData = userInfo.data
    const { Communityid, sition, propertyId, uid } = this.userInfoData
    // const { Communityid, sition } = this.userInfoData.data
    // console.log({ Communityid, sition }, '5555555')
    postToexamine({ Communityid, sition }).then(resp => {
      // console.log(resp.msg.data, '65214')
      if (resp.msg.data.length) {
        this.hongShow = true
      }
    })
    // postButton接口需要的参数
    // console.log({ Communityid, uid, auth_id, Jurisdiction }, '179')
    postButton({ Communityid, uid, auth_id, Jurisdiction }).then(resp => {
      console.log(resp, 'postbottom的数据')
      if (resp.code === 200) {
        this.buttonLists = resp.data
        var btnList = this.buttonLists
      }
      // console.log(this.buttonLists, '182182')
      btnList.forEach(list => {
        console.log(list.auth_name, '3333')
        if (list.auth_name === '删除') {
          this.isShowDelte = true
        }
        if (list.auth_name === '修改') {
          this.isShowEdit = true
        }
        if (list.auth_name === '新增权限') {
          this.ishowAdd = true
        }
        console.log(this.isShowDelte, this.isShowEdit, this.ishowAdd, 'kakakak343')
      })
    })

    console.log(this.isShowDelte, this.isShowEdit, this.ishowAdd, 'kakakak347')
    this.querysDatas.Communityid = Communityid
    this.querysDatas.sition = sition
    this.querysDatas.Propertyid = propertyId
    console.log({ Communityid, sition }, '请求表格中的数据')
    // 请求表格中的数据
    postAddto({ Communityid, sition }).then(resp => {
      // console.log(resp.msg, '表格数据表格数据')
      this.listNum = resp.msg.listRows
      this.totalPage = resp.msg.total
      this.pageNums = resp.msg.pageNum
      this.tableData = resp.msg.data
      // console.log(this.tableData, '第一个模块创建')
      // // 分页
      // const tableList = []
      // const table = this.tableData.slice(0, 9)
      // tableList.push(...table)
      // console.log(tableList, '257')
      // this.tableList = tableList
    })
  },
  methods: {
    // 设置表格行样式
    // tableRowStyle ({ row, rowIndex }) {
    //   // return 'background-color:#f00;color: green;'
    //   return 'margin: 65px !important;background-color:#f00;'
    // }
    mouseHandler () {
      console.log('mouseHandler')
    },
    cc () {
      this.isShowMis = false
    },
    handleEdit (index, row) {
      // console.log(row, 'row111111111111111111111111111111111111111')
      this.title1 = '修改'
      this.mistakeToast = ''
      // console.log(index, row)
      this.formLabelAlign.name = row.poname
      this.formLabelAlign.region = row.po_notes
      this.centerDialogVisible = !this.centerDialogVisible
      // 当为修改时，点击下一步，默认选中的树选项
      // this.defaultCheckedKeys = row.auth_id.split(',')
      // this.defaultCheckedKeys = this.defaultCheckedKeysData

      // console.log(this.defaultCheckedKeys, '当为修改时，点击下一步，默认渲染的树选项')
      // 设置修改时调用接口的参数
      const { poid, auth_id, Communityid } = row
      this.poid = poid
      this.updataQuerys.poid = poid
      this.updataQuerys.auth_id = auth_id
      this.updataQuerys.Communityid = Communityid
      // console.log(this.updataQuerys, '191')
    },
    delteHandler () {
      // this.handleDelete()
      const poid = this.delePoid
      postDelete({ poid }).then(resp => {
        const { Communityid, sition } = this.userInfoData
        if (resp.code === 200) {
          const page = this.currentPage
          postAddto({ Communityid, sition, page }).then(resp => {
            // this.tableData = resp.msg.data
            this.listNum = resp.msg.listRows
            this.totalPage = resp.msg.total
            this.pageNums = resp.msg.pageNum
            this.currentPage = Number(resp.msg.page)
            if (resp.msg.data.length === 0) {
              const page = this.currentPage - 1
              // console.log(page, 'pagepaehehbhj')
              postAddto({ Communityid, sition, page }).then(resp => {
                this.pageNums = resp.msg.pageNum
                this.tableData = resp.msg.data
              })
            } else {
              this.tableData = resp.msg.data
            }
          })
          this.centerDialogVisible3 = false
          // setTimeout(() => {
          // }, 2000)
        } else {
          Message(resp.msg)
        }
      })
    },
    handleDelete (index, row) {
      this.centerDialogVisible3 = true
      this.delePoid = row.poid
    },
    // 分页设置
    handleCurrentChange (val) {
      this.currentPage = val
      const page = val
      const { Communityid, sition } = this.userInfoData
      postAddto({ Communityid, sition, page }).then(resp => {
        // console.log(resp.msg, '表格数据表格数据')
        this.listNum = resp.msg.listRows
        this.totalPage = resp.msg.total
        this.pageNums = resp.msg.pageNum
        this.tableData = resp.msg.data
      })
    },
    nextClickHandler (val) {
      // console.log(val, '354')
    },
    // 遮罩层一的显示(点击新增权限)
    isShow1 () {
      this.centerDialogVisible = !this.centerDialogVisible
      // this.$refs.nameInput.focus()
      this.formLabelAlign.name = ''
      this.formLabelAlign.region = ''
      this.mistakeToast = ''
      this.title1 = '创建'
    },
    // （点击下一步）
    getCheckedKeys () {
      if (this.formLabelAlign.name) {
        this.isShowMis = false
      }
      // 验证
      this.centerDialogVisible1 = false
      const nameVali = this.formLabelAlign.name
      // const describeVali = this.formLabelAlign.region
      const userInfo = JSON.parse(getInfo())
      const { Communityid, uid } = userInfo.data
      // console.log({ nameVali, describeVali }, this.formLabelAlign, '193')
      Joi.validate({ nameVali }, schema, (err, value) => {
        if (err) {
          this.isShowMis = true
          this.mistakeToast = '请输入职位'
        } else {
          const isExits = this.tableData.some(item => item.poname === this.formLabelAlign.name)
          // console.log(isExits, '判断职位是否已经存在')
          if (this.title1 === '修改') {
            // this.isShowMis = false
            this.isShowMisTake = false
            this.centerDialogVisible = false
            this.centerDialogVisible2 = !this.centerDialogVisible2
            const poid = this.poid
            postQuerysa({ Communityid, uid, poid }).then(resp => {
              // this.defaultCheckedKeys = this.defaultCheckedKeysData
              // console.log({ Communityid, uid, poid }, resp, '395uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
              const menu1 = resp.test.menu_id
              this.defaultCheckedKeys = menu1.split(',')
              const allTrees = resp.msg
              allTrees.forEach(item => {
                if (item.label === '首页') {
                  item.children.forEach(item => {
                    if (item.label === '仅查看首页') {
                      item.disabled = true
                    }
                  })
                  item.disabled = false
                } else {
                  item.disabled = false
                }
              })
              // console.log({ Communityid, uid }, allTrees, '创建职位时的treedata')
              this.treeData = allTrees
            })
          } else {
            this.isShowMisTake = false
            this.defaultCheckedKeys = null
            // 如果为创建职位，判断职位是否已经存在
            if (isExits) {
              this.isShowMis = true
              this.mistakeToast = '该职位已存在'
              this.centerDialogVisible = true
              this.centerDialogVisible1 = false
            } else {
              this.defaultCheckedKeys = null
              postQuerysa({ Communityid, uid }).then(resp => {
                // console.log({ Communityid, uid },'{ Communityid, uid }')
                this.defaultCheckedKeys = []
                const allTrees = resp.msg
                // console.log(allTrees, 'postQuerysa11')
                allTrees.forEach(item => {
                  if (item.label === '首页') {
                    item.children.forEach(item => {
                      if (item.label === '仅查看首页') {
                        item.disabled = true
                      }
                    })
                    item.disabled = false
                  } else {
                    item.disabled = false
                  }
                })
                this.treeData = allTrees
                console.log(this.treeData, '1212首页')
              })
              this.centerDialogVisible = false
              this.centerDialogVisible1 = !this.centerDialogVisible1
            }
          }
        }
      })
    },
    // 点击完成
    successAddTo () {
      console.log('点击完成1')
      // // console.log(rids)
      // var rids = this.$refs.tree1.getHalfCheckedKeys().concat(this.$refs.tree1.getCheckedKeys())
      // // console.log(rids, '点击完成的rids')
      // rids = rids.join(',')
      // this.querysDatas.auth_id = rids
      const { name, region } = this.formLabelAlign
      // if (!rids) {
      //   console.log('chenhung')
      //   this.isShowMisTake = true
      // } else {
      // 判断修改还是创建
      console.log('chen1')
      if (this.title1 === '修改') {
        this.isShowMisTake = false
        var mds = this.$refs.tree1.getHalfCheckedKeys().concat(this.$refs.tree1.getCheckedKeys())
        // const mds = this.$nextTick(() => this.$refs.tree1)
        this.defaultCheckedKeysData = this.$refs.tree1.getCheckedKeys()
        // console.log(this.$refs.tree1.getCheckedKeys(), '当为修改时选择的框ID组成的数组')
        mds = mds.join(',')
        console.log(mds, 'mds')
        this.querysDatas.auth_id = mds
        this.querysDatas.menu_id = this.$refs.tree1.getCheckedKeys()
        this.updataQuerys.name = name
        this.updataQuerys.describe = region
        // 调用updata时的接口参数
        // console.log(this.updataQuerys, '283')
        this.updataQuerys.auth_id = mds
        const menu = this.$refs.tree1.getCheckedKeys()
        this.updataQuerys.menu_id = menu.join(',')
        const { Communityid, sition } = this.userInfoData
        console.log(this.updataQuerys, 'this.updataQuerys')
        postUpdate(this.updataQuerys).then(resp => {
          console.log(resp, '286')
          // TODO: 修改的提示语
          const page = this.currentPage
          if (resp.code === 200) {
            Message(resp.msg)
            postAddto({ Communityid, sition, page }).then(resp => {
              // console.log(resp.msg.data, '点击修改4448445')
              this.tableData = resp.msg.data
              this.listNum = resp.msg.listRows
              this.pageNums = resp.msg.pageNum
              this.totalPage = resp.msg.total
              this.currentPage = Number(resp.msg.page)
            })
          } else {
            Message(resp.msg)
          }
          this.centerDialogVisible2 = false
        })
      } else {
        // 如果为创建
        // 获取选中节点的keys
        console.log('点击完成2')
        var wids = this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys())
        // console.log(wids, '当为创建时选择的框ID组成的数组')
        this.defaultCheckedKeysData = this.$refs.tree.getCheckedKeys()
        // console.log(this.defaultCheckedKeysData, '创建时点击完成的默认树选项1111')
        wids = wids.join(',')
        this.querysDatas.auth_id = wids
        // 获取querys的参数
        this.querysDatas.name = name
        this.querysDatas.describe = region
        const menu2 = this.$refs.tree.getCheckedKeys()
        this.querysDatas.menu_id = menu2.join(',')
        // console.log(this.querysDatas,this.formLabelAlign, 'querys的参数')
        postQuerys(this.querysDatas).then(resp => {
          // console.log(this.querysDatas, '506')
          const { Communityid, sition } = this.userInfoData
          // console.log(resp, '493')
          if (resp.code === 200) {
            Message(resp.msg)
            this.centerDialogVisible1 = false
            const nume = Number(this.totalPage) / Number(10)
            var shu = ''
            if (Math.round(nume) === nume) {
              // num是整数
              shu = Number(nume) + Number(1)
            } else {
              shu = Math.ceil(nume)
            }
            const page = shu
            postAddto({ Communityid, sition, page }).then(resp => {
              this.tableData = resp.msg.data
              this.listNum = resp.msg.listRows
              this.totalPage = resp.msg.total
              this.pageNums = resp.msg.pageNum
              // this.tableData = resp.msg.data
              this.currentPage = Number(resp.msg.page)
            })
            this.currentPage = shu
            this.handleCurrentChange(shu)
          } else {
            // 如果没有添加成功
            console.log(resp.msg, '532')
            Message(resp.msg)
            setTimeout(() => {
              this.centerDialogVisible1 = false
            }, 2000)
          }
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
//卡片的样式
/deep/.createJobDialog .el-dialog .el-dialog--center {
  background-color: #f44 !important;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  min-height: 775px;
  position: relative;
  width: 100%;
  box-shadow: none;
  border: none;
  /deep/.el-card__header {
    border: none;
    border-bottom: none;
    padding: 20px !important;
    .el-table--striped .el-table__body tr.el-table__row--striped td {
      background-color: #eff2f5 !important;
    }
    .el-table thead {
      color: #909399 !important;
    }
    .el-table td {
      padding: 15px 0 !important;
      z-index: 222;
    }
    .el-table th {
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(144, 147, 153, 1);
    }
    .el-table .cell {
      text-overflow: ellipsis !important;
      overflow: hidden !important;
      white-space: nowrap;
      cursor: default;
      width: 400px;
      height: 30px !important;
      line-height: 30px;
      font-size: 14px;
      padding: 0 0 0 65px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      span {
        width: 100%;
        p {
          text-overflow: ellipsis !important;
          overflow: hidden !important;
          white-space: nowrap;
        }
      }
      .el-button--mini {
        width: 52px;
        height: 30px;
        background: rgba(37, 186, 217, 1);
        border-radius: 4px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        border: none;
        padding: 0px;
        line-height: 30px;
        span {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
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
/deep/ .el-dialog {
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
    padding: 20px 50px 6px 48px !important;
    .form-item {
      height: 60px;
      .zhiwei {
        margin-bottom: 0px;
        .el-form-item__label {
          display: inline-block;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          padding: 0 !important;
          white-space: nowrap;
          color: rgba(102, 102, 102, 1);
          text-align: right !important;
        }
        .el-form-item__content {
          input {
            width: 87% !important;
            border: 1px solid rgba(210, 210, 210, 1);
            border-radius: 3px;
            outline: none;
            color: #333333;
            padding-left: 8px;
          }
        }
      }
      .el-form-item {
        margin-bottom: 0px;
        margin-top: 1px;
        text-align: center;
        &__label {
          height: 30px;
          display: inline-block;
          font-size: 14px;
          padding: 0 !important;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
        &__content {
          input {
            position: relative;
            height: 30px;
            width: 87% !important;
            border: 1px solid rgba(210, 210, 210, 1);
            border-radius: 3px;
            outline: none;
            color: #333333;
            padding-left: 8px;
          }
        }
      }

      .mistack-message {
        position: relative;
        top: -12px;
        text-align: left;
        margin-left: 5px;
        box-sizing: border-box;
        font-size: 14px;
        transform: scale(0.9);
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 0, 0, 1);
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

.chen {
  /deep/.el-dialog {
    background-color: #fff !important;
    width: 18.23%;
    height: 210px;
    /deep/.el-dialog__header {
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
.hongdian {
  width: 6px;
  height: 6px;
  background-color: #f00;
  border-radius: 5px;
  position: absolute;
  top: 26px;
  left: 240px;
}
/deep/.el-tree-node {
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(108, 108, 108, 1);
  .el-tree-node__label {
    font-size: 14px !important;
  }
  .el-tree-node__content {
    height: 30px !important;
  }
  .el-checkbox__inner {
    width: 20px;
    height: 20px;
  }
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #409eff;
    border-color: #409eff;
    color: #fff !important;
    cursor: default !important;
    &::after {
      color: #fff !important;
      cursor: default !important;
    }
  }
}
/deep/.el-checkbox__inner::after {
  height: 10px;
  left: 6px;
  top: 2px;
  width: 4px;
}
/deep/.el-pagination.is-background .btn-next:disabled {
  cursor: default;
}
/deep/.el-pagination.is-background .btn-prev:disabled {
  cursor: default;
}

.total-class {
  position: relative;

  .div-class {
    width: 100px;
    height: 100px;
    position: absolute;
    background: green !important;
    top: -10px;
    z-index: 25633333334444444444655555555555555555555566666666666612789;
  }
}
/deep/.el-popover {
  top: 0px !important;
  left: 10px !important;
  z-index: 56789356345554555;
}

#newadd {
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
/deep/.el-pagination__editor {
  background-color: #5fafe4 !important;
  height: 20px;
  width: 30px;
  color: white;
  cursor: pointer;
}
</style>
