<template>
  <div>
    <!--   -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span v-if="ishowAdd" id="newadd" @click="isShow1">新增权限</span>
        <el-table :data="tableData" style="width: 100%" empty-text="没有数据">
          <el-table-column prop="poname" label="职位" min-width="220" />
          <!-- <el-table-column prop="po_notes" label="职位描述" min-width="400" @mouseleave="mouseHandler" /> -->
          <el-table-column prop="po_notes" label="职位描述" min-width="400" class="des-class">
            <!-- <template slot-scope="scope">
              <div class="total-class">
                <div class="cehn-class">{{ scope.row.po_notes }}</div>
                <p class="div-class" style="z-inex:23456789;">{{ scope.row.po_notes }}</p>
              </div>
            </template>-->
            <template slot-scope="scope">
              <!-- <el-popover
                id="popover-id"
                :append-to-body="false"
                popper-class="popover-class"
                placement="top"
                width="200"
                trigger="hover"
              >
                <div>{{ scope.row.po_notes }}</div>
                <p slot="reference" style="color:#606266;width:100%;">{{ scope.row.po_notes }}</p>
              </el-popover>-->
              {{ scope.row.po_notes }}
            </template>
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
            >
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
            >
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
        :default-checked-keys="[47]"
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
  data() {
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
    '$route'(to, from) {
      console.log(to, '账号分配的watch')
    }
  },
  created() {
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
        // console.log(list.auth_name)
        // 判断该角色在该页面对应的权限按钮的显示
        // console.log(this.isShowDelte, this.isShowEdit, this.ishowAdd, '555555')
        // switch (list.auth_name) {
        //   case '删除':
        //     // ishowAdd: true,
        //     //   isShowDelte: true,
        //     //     isShowEdit: true
        //     // this.isShowEdit = false
        //     // this.ishowAdd = false
        //     this.isShowDelte = true
        //     break
        //   case '修改':
        //     // this.ishowAdd = false
        //     // this.isShowDelte = false
        //     this.isShowEdit = true
        //     break
        //   case '新增权限':
        //     // this.isShowDelte = false
        //     this.ishowAdd = true
        //     // this.isShowEdit = false
        //     break
        //   default:
        //     this.isShowEdit = false
        //     this.ishowAdd = false
        //     this.isShowDelte = false
        //     break
        // }
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
    mouseHandler() {
      console.log('mouseHandler')
    },
    cc() {
      this.isShowMis = false
    },
    handleEdit(index, row) {
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
    delteHandler() {
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
    handleDelete(index, row) {
      this.centerDialogVisible3 = true
      this.delePoid = row.poid
    },
    // 分页设置
    handleCurrentChange(val) {
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
    nextClickHandler(val) {
      // console.log(val, '354')
    },
    // 遮罩层一的显示(点击新增权限)
    isShow1() {
      this.centerDialogVisible = !this.centerDialogVisible
      // this.$refs.nameInput.focus()
      this.formLabelAlign.name = ''
      this.formLabelAlign.region = ''
      this.mistakeToast = ''
      this.title1 = '创建'
    },
    // （点击下一步）
    getCheckedKeys() {
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
                this.defaultCheckedKeys = []
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
                console.log({ Communityid, uid }, allTrees, '创建职位时的treedata')
                this.treeData = allTrees
              })
              this.centerDialogVisible = false
              this.centerDialogVisible1 = !this.centerDialogVisible1
            }
          }
        }
      })
    },
    // 点击完成
    successAddTo() {
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
// <style lang='scss' scoped>
// //卡片的样式
// .text {
//   font-size: 14px;
// }

// .item {
//   margin-bottom: 18px;
// }

// .clearfix:before,
// .clearfix:after {
//   display: table;
//   content: "";
// }
// .clearfix:after {
//   clear: both;
// }
// .clearfix {
//   span {
//     display: inline-block;
//     width: 50px;
//     height: 50px;
//     // line-height: 50px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: #f00;
//     color: #fff;
//     width: 57px;
//     height: 23px;
//     background: rgba(37, 186, 217, 1);
//     border-radius: 4px;
//     font-size: 10px;
//     font-family: Microsoft YaHei;
//     font-weight: 400;
//     color: rgba(255, 255, 255, 1);
//     cursor: pointer;
//   }
// }
// .box-card {
//   width: 100%;
//   box-shadow: none;
//   border: none;
//   /deep/.el-card__header {
//     border: none;
//     border-bottom: none;
//     padding: 21px !important;
//     .el-table--striped .el-table__body tr.el-table__row--striped td {
//       background-color: #eff2f5;
//     }
//     .el-table td {
//       padding: 8px 12px 8px 0px;
//     }
//     .el-table th {
//       // padding: 14px 55px !important;
//       font-size: 10px;
//       font-family: Microsoft YaHei;
//       font-weight: 400;
//       color: rgba(144, 147, 153, 1);
//     }
//     .el-table .cell {
//       // background-color: #f00;
//       padding: 0px 0px 0px 65px;
//       margin: 0px;
//       font-size: 10px;
//       font-family: Microsoft YaHei;
//       font-weight: 400;
//       color: rgba(96, 98, 102, 1);
//       .el-button--mini {
//         width: 40px;
//         height: 23px;
//         background: rgba(37, 186, 217, 1);
//         border-radius: 3px;
//         font-size: 10px;
//         font-family: Microsoft YaHei;
//         font-weight: 400;
//         color: rgba(255, 255, 255, 1);
//         border: none;
//         padding: 0px;
//         line-height: 23px;
//         span {
//           display: inline-block;
//           width: 100%;
//           height: 100%;
//         }
//       }
//       .el-btn2 {
//         background-color: #bfbfbf;
//       }
//     }
//   }
// }
// //表格行样式
// .tableRowStyle {
//   color: #f00 !important;
//   background: #f00 !important;
// }
// .page {
//   position: absolute;
//   bottom: 70px;
//   right: 4px;
//   font-size: 10px;
//   font-family: Microsoft YaHei;
//   font-weight: 400;
//   color: rgba(102, 102, 102, 1);
// }
// //分页器的样式
// .block {
//   // position: absolute;
//   // bottom: 60px;
//   // right: 100px;
//   // background-color: #f00;
//   // height: 20px;
//   .el-pagination {
//     // background-color: green;
//     position: absolute;
//     bottom: 60px;
//     right: 50px;
//     /deep/.el-pagination__jump {
//       // background-color: #f00;
//       position: relative;
//       margin-left: 0px;
//       color: #fff;
//       font-size: 0px;
//       //input和ul是否居中
//       margin-top: 0px;
//       // &::before {
//       //   content: "前往";
//       //   color: #000;
//       // }
//       .el-input {
//         // border: 1px solid;
//         font-size: 10px;
//         font-family: Microsoft YaHei;
//         font-weight: 400;
//         color: rgba(102, 102, 102, 1);
//         /deep/.el-input__inner {
//           font-size: 10px;
//           font-family: Microsoft YaHei;
//           font-weight: 400;
//           color: rgba(102, 102, 102, 1);
//           display: inline-block;
//           // background-color: #f00 !important;
//           // border: 1px solid !important;
//           width: 44px;
//           height: 21px;
//           border: 1px solid rgba(239, 242, 245, 1) !important;
//           border-radius: 2px;
//           margin-left: 12px;
//         }
//         &::before {
//           content: "前往";
//           color: rgba(102, 102, 102, 1);
//         }
//         &:after {
//           content: "页";
//         }
//       }
//     }
//     /deep/.el-pager li {
//       // background-color: #f00 !important;
//       width: 21px;
//       height: 21px;
//       // background: rgba(95, 175, 228, 1);
//       border-radius: 2px;
//       font-size: 10px;
//       font-family: Microsoft YaHei;
//       font-weight: 400;
//       color: rgba(102, 102, 102, 1);
//       line-height: 21px;
//     }
//   }
//   .el-pagination.is-background .el-pager li:not(.disabled).active {
//     background: rgba(95, 175, 228, 1);
//     color: rgba(255, 255, 255, 1);
//   }
// }
// /deep/.el-dialog {
//   background-color: #fff;
//   margin-top: 35vh !important;
//   .el-dialog__header {
//     padding: 17px 0px 9px 0px;
//     margin: 0px 14px;
//     text-align: left;
//     border-bottom: 1px solid #eff2f5;
//     font-size: 12px;
//     font-family: Microsoft YaHei;
//     font-weight: 400;
//     color: rgba(51, 51, 51, 1);
//     .el-dialog__title {
//       text-align: left;
//       border-bottom: 1px solid #eff2f5;
//       font-size: 12px;
//       font-family: Microsoft YaHei;
//       font-weight: 400;
//       color: rgba(51, 51, 51, 1);
//     }
//   }
//   /deep/.el-dialog__body {
//     overflow: hidden;
//     padding: 14px 29px 21px 52px !important;
//     .form-item {
//       height: 40px;
//       .zhiwei {
//         margin-bottom: 0px;
//         height: 4.5vh !important;
//         .el-form-item__label {
//           width: 64px !important;
//           height: 11px;
//           display: inline-block;
//           font-size: 11px;
//           font-family: Microsoft YaHei;
//           font-weight: 400;
//           color: rgba(102, 102, 102, 1);
//           // letter-spacing: 8px;
//         }
//         .el-form-item__content {
//           margin-left: 64px !important;
//           input {
//             width: 100%;
//             // width: 189px;
//             height: 23px;
//             border: 1px solid rgba(210, 210, 210, 1);
//             border-radius: 3px;
//           }
//         }
//       }
//       .el-form-item {
//         margin-bottom: 0px;
//         height: 4.5vh !important;
//         &__label {
//           width: 64px !important;
//           height: 11px;
//           display: inline-block;
//           font-size: 11px;
//           font-family: Microsoft YaHei;
//           font-weight: 400;
//           color: rgba(102, 102, 102, 1);
//           // letter-spacing: 2px;
//         }
//         &__content {
//           margin-left: 64px !important;
//           input {
//             width: 100%;
//             border: 1px solid rgba(210, 210, 210, 1);
//             // color: red;
//           }
//         }
//       }
//       .mistack-message {
//         color: red;
//         margin-left: 52px;
//         margin-top: 2px;
//         box-sizing: border-box;
//         font-size: 9px;
//         transform: scale(0.9);
//         font-family: Microsoft YaHei;
//         font-weight: 400;
//         color: rgba(255, 0, 0, 1);
//       }
//     }
//   }
//   .el-dialog__footer {
//     padding-top: 0px;
//     button {
//       width: 62px;
//       height: 25px;
//       line-height: 0px;
//       outline: none;
//       border: none;
//       // text-align: left;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       margin: 0 auto;
//       background: rgba(248, 172, 89, 1);
//       border-radius: 3px;
//       font-size: 11px;
//       font-family: Microsoft YaHei;
//       font-weight: 400;
//       color: rgba(255, 254, 254, 1);
//     }
//   }
// }
// .tree-content1 {
//   /deep/.el-dialog__body {
//     color: red;
//     padding: 0px !important;
//     padding-left: 12px !important;
//   }
//   .el-dialog__header {
//     .el-dialog__title {
//       border-bottom: none;
//     }
//   }
//   /deep/.el-dialog__footer {
//     margin-top: 23px;
//     .toast {
//       // width: 50px;
//       height: 20px;
//       font-size: 9px;
//       font-family: Microsoft YaHei;
//       font-weight: 400;
//       color: rgba(255, 0, 0, 1);
//     }
//   }
// }
// .chen {
//   /deep/.el-dialog {
//     background-color: #fff !important;
//     width: 18.2vw;
//     height: 20vh;
//     // background-color: #fff;
//     // z-index: 888888888888888888888888888;
//     .el-dialog__header {
//       button {
//         z-index: 19999;
//       }
//     }
//     .el-dialog--center {
//       text-align: left;
//     }
//     .el-dialog__body {
//       background-color: #fff;
//       height: 110px !important;
//       width: 100%;
//       padding: 14px 29px 21px 29px !important;
//       position: relative;
//       // p {
//       //   width: 100%;
//       //   border-bottom: 1px solid #eff2f5;
//       //   position: absolute;
//       //   top: 1.8vh;
//       //   right: 0px;
//       //   // padding-left: 14px !important;
//       //   padding-bottom: 0.92vh;
//       //   color: #333333;
//       //   font-size: 0.95vw;
//       //   // float: left;
//       //   text-align: left;
//       // }
//       div {
//         width: 100%;
//         height: 110px;
//         line-height: 40px;
//         font-size: 0.85vw;
//         text-align: center;
//       }
//     }
//     .el-dialog__footer {
//       position: absolute;
//       top: 18vh;
//       width: 100%;
//       display: flex;
//       justify-content: center;
//       font-size: 11px;
//       font-family: Microsoft YaHei;
//       font-weight: 400;
//       color: rgba(153, 153, 153, 1);
//       span {
//         width: 100%;
//         display: flex;
//         justify-content: space-around;
//         button {
//           width: 4vw;
//           height: 3.5vh;
//           line-height: 5px;
//           font-size: 0.8vw;
//           border-radius: 3px !important;
//           font-size: 11px;
//           font-family: Microsoft YaHei;
//           font-weight: 400;
//           color: rgba(255, 254, 254, 1);
//         }
//       }
//       .quxiao1 {
//         color: rgba(153, 153, 153, 1);
//         background-color: #fff;
//         border: 1px solid rgba(204, 204, 204, 1);
//         border-radius: 2px;
//       }
//     }
//     .el button {
//       color: #999999 !important;
//     }
//     .el-button--primary {
//       color: #ffffff;
//       background-color: #25bad9;
//     }
//   }
// }
//
</style>
<style lang='scss' scoped>
//卡片的样式
.text {
  font-size: 1.02vw;
}

.item {
  margin-bottom: 2.3vh;
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
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #f00;
    color: #fff;
    width: 4.17vw;
    height: 3.4vh;
    line-height: 3.4vh;
    // background: rgba(37, 186, 217, 1);
    border-radius: 0.2vw;
    font-size: 0.75vw;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
}
.box-card {
  min-height: 510px;
  position: relative;
  width: 100%;
  box-shadow: none;
  border: none;
  /deep/.el-card__header {
    border: none;
    border-bottom: none;
    padding: 3.2vh 1.1vw !important;
    .el-table--striped .el-table__body tr.el-table__row--striped td {
      background-color: #eff2f5 !important;
    }
    .el-table {
      // margin-top: 1.6vh !important;
    }
    .el-table td {
      padding: 0.58vw 2.08vh 0.58vw 0;
      // background-color: #f00;
      z-index: 222;
    }
    .el-table th {
      // padding: 14px 55px !important;
      font-size: 0.75vw;
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
      // background-color: #f00;
      height: 3.7vh !important;
      line-height: 3.7vh;
      padding: 0 0 0 65px;
      margin: 0;
      font-size: 0.75vw;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(96, 98, 102, 1);
      span {
        width: 100%;
        p {
          text-overflow: ellipsis !important;
          overflow: hidden !important;
          white-space: nowrap;
        }
      }
      .el-button--mini {
        width: 2.82vw;
        height: 3.4vh;
        background: rgba(37, 186, 217, 1);
        border-radius: 3px;
        font-size: 0.75vw;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        border: none;
        padding: 0px;
        line-height: 3.4vh;
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
.page {
  position: absolute;
  bottom: 9.1vh;
  right: 0.3vw;
  font-size: 0.75vw;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
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
  top: 85vh;
  // left: -2vw;
  right: 2vw;
  height: 40px;
  width: 100%;
  .el-pagination {
    position: absolute;
    bottom: 0;
    right: 3.3vw;
    height: 2.8vh !important;
    margin-right: -1.9vw !important;
    /deep/button {
      min-width: 1.6vw !important;
      height: 2.8vh;
    }
    /deep/.el-pagination__jump {
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
        font-family: Microsoft YaHei;
        font-weight: 400;
        height: 2.8vh;
        min-width: 2.5vw;
        color: rgba(102, 102, 102, 1);
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
        }
        &::before {
          content: "前往";
          color: #fff;
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
/deep/ .el-dialog {
  background-color: #fff;
  margin-top: 35vh !important;
  border-radius: 0.2vw;
  // margin: 20% 38% !important;

  // height: 220px;
  // overflow-x: hidden;
  .el-dialog__wrapper {
    overflow: auto;
  }
  .el-dialog__header {
    padding: 1.2vh 0px 0.8vh 1.02vw;
    // padding: 2.2vh 0px 1.2vh 0px;
    // margin: 0px 1.02vw;
    text-align: left;
    border-bottom: 1px solid #eff2f5;
    font-size: 0.87vw;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    .el-dialog__title {
      text-align: left;
      border-bottom: 1px solid #eff2f5;
      font-size: 0.95vw;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    // /deep/.el-dialog__headerbtn {
    //   top: 3vh !important;
    // }
    button {
      position: absolute;
      top: 1.4vh;
    }
  }
  /deep/.el-dialog__body {
    overflow: hidden;
    padding: 2vh 29px 0.8vh 29px !important;
    padding: 0px;
    .form-item {
      height: 60px;
      .zhiwei {
        margin-bottom: 0px;
        height: 4.5vh !important;
        .el-form-item__label {
          // width: 90px !important;
          height: 1.43vh;
          display: inline-block;
          font-size: 0.85vw;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          text-align: right !important;
          // margin-left: 0.3vw;

          // letter-spacing: 8px;
        }
        .el-form-item__content {
          // margin-left:90px!important;
          input {
            width: 83% !important;
            // width: 189px;
            height: 3vh;
            border: 1px solid rgba(210, 210, 210, 1);
            border-radius: 3px;
            outline: none;
            color: #333333;
            font-size: 0.8vw;
            padding-left: 8px;
          }
        }
      }
      .el-form-item {
        margin-bottom: 0px;
        height: 4.5vh !important;
        margin-top: 0.78vh;
        margin-left: 2.3vw;
        &__label {
          width: 4.68vw !important;
          height: 1.43vh;
          display: inline-block;
          font-size: 0.85vw;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          // letter-spacing: 2px;
        }
        &__content {
          margin-left: 4.68vw !important;
          input {
            position: relative;
            height: 3vh;
            width: 83% !important;
            border: 1px solid rgba(210, 210, 210, 1);
            border-radius: 3px;
            // color: red;
            outline: none;
            color: #333333;
            font-size: 0.8vw;
            padding-left: 8px;
          }
        }
      }
      .mistack-message {
        color: red;
        position: absolute;
        top: 120px;
        // left: 2px;
        margin-left: 3.9vw;
        margin-top: 0.2vh;
        box-sizing: border-box;
        font-size: 0.8vw;
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
      width: 14.4%;
      height: 3.3vh;
      line-height: 0px;
      outline: none;
      border: none;
      // text-align: left;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      background: rgba(248, 172, 89, 1);
      border-radius: 3px;
      font-size: 0.8vw;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 254, 254, 1);
      margin-bottom: 0.4vh;
    }
  }
}
.tree-content1 {
  /deep/.el-dialog {
    margin: 20% 38% !important;
  }
  /deep/.el-dialog__body {
    color: red;
    margin-top: 1.43vh;
    padding: 0px !important;
    padding-left: 0.88vw !important;
  }
  .el-dialog__header {
    .el-dialog__title {
      border-bottom: none;
    }
  }

  /deep/.el-dialog__footer {
    margin-top: 3vh;
    .toast {
      // width: 50px;
      height: 2.6vh;
      font-size: 0.75vw;
      transform: scale(0.95);
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 0, 0, 1);
    }
  }
}
.chen {
  /deep/.el-dialog {
    background-color: #fff !important;
    width: 18.2vw;
    height: 22vh;
    // background-color: #fff;
    // z-index: 888888888888888888888888888;
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
      padding: 1vh 0 21px 50px !important;
      position: relative;
      div {
        width: 80%;
        height: 110px;
        line-height: 9.2vh;
        font-size: 0.85vw;
        text-align: center;
      }
    }
    .el-dialog__footer {
      position: absolute;
      top: 15.7vh;
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 0.75vw;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      span {
        width: 100%;
        display: flex;
        justify-content: space-around;
        button {
          width: 4vw;
          height: 3.5vh;
          line-height: -0.64vh;
          font-size: 0.8vw;
          border-radius: 3px !important;
          font-size: 0.8vw;
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
  width: 8px;
  height: 8px;
  background-color: #f00;
  border-radius: 5px;
  position: absolute;
  top: 2.9vh;
  left: 15.3vw;
}
/deep/.el-tree-node {
  // color: red !important;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(108, 108, 108, 1);
  .el-tree-node__label {
    font-size: 0.75vw !important;
  }
  .el-tree-node__content {
    height: 3.3vh !important;
    // line-height: 3.7vh;
  }
  .el-checkbox__inner {
    // background-color: green;
    width: 1.02vw;
    height: 2.2vh;
  }
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #409eff;
    border-color: #409eff;
    color: #fff !important;
    // background-color: #f00;
    cursor: default !important;
    &::after {
      // background-color: #fff;
      color: #fff !important;
      cursor: default !important;
    }
  }
}
/deep/.el-checkbox__inner::after {
  // background-color: #f00;
  height: 1.3vh;
  left: 0.36vw;
  top: 0.1vh;
  width: 0.2vw;
}
/deep/.el-pagination.is-background .btn-next:disabled {
  // background-color: #f00;
  cursor: default;
}
/deep/.el-pagination.is-background .btn-prev:disabled {
  cursor: default;
}
// /deep/.el-checkbox__input .is-disabled .is-checked {
//   background-color: #f00 !important;
// }
.total-class {
  position: relative;
  .cehn-class {
    // background-color: #f00 !important;
  }
  .div-class {
    // display: none;
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
// #popover-id {
//   background-color: #f00;
// }
#newadd {
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 4.17vw;
  height: 3.4vh;
  line-height: 3.4vh;
  background: rgba(37, 186, 217, 1);
  border-radius: 0.2vw;
  font-size: 0.75vw;
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
  margin-left: 0.25vw;
  cursor: pointer;
}
</style>
