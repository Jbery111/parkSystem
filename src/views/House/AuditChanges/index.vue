<template>
  <div id="audit-changes">
    审核修改1
    <Table :data="judgeList" @bridge="getMesFromChild" 
      @fun1="handleDetailClick" @fun2="handleJudgeClick" />
    <Pages v-if="pageInfo.page" :pageInfo="pageInfo" @handleSizeChange="handleSizeChange" 
      @handleCurrentChange="handleCurrentChange" @nextClickHandler="nextClickHandler"/>
  </div>
</template>

<script>
import axios from 'axios'
import Table from './Table'
import Pages from '../Pages'
export default {
  name: 'AuditChanges',
  data () {
    return {
      userInfo: { // 用户信息

      }, 
      judgeList: [], //审核列表
      pageInfo: { // 分页信息
        listRows: 10
      }
    }
  },
  components: {
    Table,
    Pages
  },
  created() {
    this.getUserInfo()
    console.log(this.userInfo)
    this.getJudgeList()
  },
  methods: {
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
      //console.log(val)
    },
    nextClickHandler(val) {
      //console.log(val, '354')
    },

    handleDetailClick(v) { // 点击详情
      console.log(v)
    },
    handleJudgeClick(v) { // 点击审核
      console.log(v)
    },
    getMesFromChild(v) { //获取子组件传递过来的值
      console.log(v,'22222222222')
    },
    //从本地获取登录用户信息
    getUserInfo() {
      const local = JSON.parse(localStorage.getItem('userInfo'))
      this.userInfo.token = local.token
      this.userInfo.Communityid = local.data.Communityid
      this.userInfo.uname = local.data.Communityid
    },
    //获取审核列表
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
        if(res.data.code === 200) {
            this.judgeList = res.data.msg.data
            this.pageInfo.page = Number(res.data.msg.page)
            this.pageInfo.pageNum = res.data.msg.pageNum
            this.pageInfo.total = res.data.msg.total
            

        }
        console.log(this.judgeList, this.pageInfo,'审核列表')
      })
    }
  }
  
}
</script>
