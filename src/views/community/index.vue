<template>
  <!-- eslint-disable -->
  <div class="community-container">
    <div class="wy-login-nav">
      <span class="logo">宅-物业管理系统</span>
      <ul style="cursor:pointer;">
        <li>关于我们</li>
        <div style="height:12px;border:1px solid white;margin-top:4px" />
        <li>客服服务</li>
        <div style="height:12px;border:1px solid white;margin-top:4px" />
        <li>反馈建议</li>
        <div style="height:12px;border:1px solid white;margin-top:4px" />
        <li>隐私政策</li>
      </ul>
    </div>
    <div class="main">
      <p class="button" v-if="isCommunity">
        <el-button type="primary" @click="toDashboard()">确认</el-button>
      </p>
      <h3 class="main-title" style="cursor:default;">请选择停车场</h3>
      <div class="main-letter-container">
        <!-- <span>&lt;</span> -->
        <span @click="selectQb" :class="{qb:isActiveData2}" class="qb1">全部</span>
        <ul class="main-letter-container_list" v-for="letter in letters" :key="letter.id">
          <li
            @click="selectCommunityByLetter(letter.name)"
            :class="{active:isActiveData1 === letter.name}"
          >{{ letter.name }}</li>
        </ul>
        <!-- <span>&gt;</span> -->
      </div>

      <div class="item-container">
        <el-row :gutter="12">
          <el-col :span="6" v-for="(item, index) in dataLists" :key="index">
            <div @click="activedd(item, index)">
              <el-card shadow="false" :class="actived===index ? 'bt1':'bt2'">
                <div>{{ item.propertyName }}</div>
                <p :class="item.Tips.includes('请续费') ? 'tips' : ''">
                  {{ item.Tips }}
                  <span
                    style="color:#FF6600;"
                    v-if="item.Tips.indexOf('还有') !== -1"
                    @click.self="payMoney()"
                  >点击充值</span>
                </p>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
      <span class="fenye-click left-click" @click="leftBtn()">
        <svg-icon icon-class="leftjiantou" />
      </span>
      <span class="fenye-click right-click" @click="rightBtn()">
        <svg-icon icon-class="rightjiantou" />
      </span>
    </div>
    <div class="wy-login-bottom">
      <div class="wy-bottom" style="margin-left:-12px;">
        <p class="zi">成都同享社圈智慧科技有限公司版权所有</p>
        <div
          style="height:12px;border:1px solid white;margin-top:4px;width:2px;margin-left:277px;display: inline-block;"
        ></div>
        <a
          href="http://www.miibeian.gov.cn/"
          target="_blank"
          style="margin-left:10px; white-space:nowrap;"
        >蜀ICP备19024682号</a>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// import { mapGetters, mapState } from "vuex";
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import { postHighest, postHighes, postget, getLetter } from '../../api/user'
import { Message } from 'element-ui'
import { getToken, setInfo, getReplaceData, setToken, setRoutes } from '@/utils/auth'
import { userInfo } from 'os';
export default {
  name: "Community",
  data () {
    return {
      letters: [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' },
        { id: 4, name: 'D' },
        { id: 5, name: 'E' },
        { id: 6, name: 'F' },
        { id: 7, name: 'G' },
        { id: 8, name: 'H' },
        { id: 9, name: 'I' },
        { id: 10, name: 'J' },
        { id: 11, name: 'K' },
        { id: 12, name: 'L' },
        { id: 13, name: 'M' },
        { id: 14, name: 'N' },
        { id: 15, name: 'O' },
        { id: 16, name: 'P' },
        { id: 17, name: 'Q' },
        { id: 18, name: 'R' },
        { id: 19, name: 'S' },
        { id: 20, name: 'T' },
        { id: 21, name: 'U' },
        { id: 22, name: 'V' },
        { id: 23, name: 'W' },
        { id: 24, name: 'X' },
        { id: 25, name: 'Y' },
        { id: 26, name: 'Z' },
      ],
      param: {
        uid: '',
        Communityid: ''
      },
      isActive: true,
      username: '',
      password: '',
      Jurisdiction: null,
      dataLists: [],
      pages: 2,
      page: 1,
      total: 12,
      name: '',
      actived: 0,
      itemid: null,
      dueToTime: '',//到期时间
      isActiveData1: 'A',
      isActiveData2: true,
      isCommunity: true
    }
  },
  computed: {
    // ...mapGetters(["name"]),
    ...mapState(["userInfo", 'dueToTheTime']),
    // this.uid = this.userInfo.data.uid
  },
  methods: {
    ...mapActions(['choiceCommunity', 'letterCommunity']),
    ...mapMutations(['isWyCover', 'replaceUserInfoData', 'setDueToTheTime', 'replaceUserInfoList']),
    //选择小区点击确认
    toDashboard () {
      this.param.uid = this.userInfo.data.uid
      this.param.Communityid = this.itemid
      this.choiceCommunity(this.param).then(resp => {
        localStorage.setItem('DuetoThetime', resp.time)
        localStorage.setItem('isRefresh', true)
        localStorage.setItem('dashCreate', 1)
        if (resp.code === 200) {
          // 未被替换掉的userINFO
          this.$store.commit('permission/CLEAR_PERMISSION')
          this.replaceUserInfoData(resp.data)
          this.replaceUserInfoList(resp.list)
          setInfo(this.userInfo)
          // console.log('------替换的userInfo的data----resp------------')
          if (resp.amg === 2) {
            if (this.Jurisdiction === 1) {
              localStorage.setItem('isRefresh', true)
              this.$router.push('/dashboard')//跳转到首页
            } else if (this.Jurisdiction === 2) {
              localStorage.setItem('isRefresh', true)
              this.isWyCover()
              this.$router.push('/dashboard?Ju=1')//跳转到首页加蒙层，提示小区多久到期
              localStorage.setItem('isRefresh', true)
            } else if (this.Jurisdiction === 4) {
              this.isWyCover()
              localStorage.setItem('isRefresh', true)
              this.$router.push({ path: 'dashboard', query: { Ju: '1' } })//跳转到首页加蒙层，提示小区多久到期
            }
          } else if (resp.amg === 1) {
            localStorage.setItem('isRefresh', true)
            this.$router.replace({ path: 'dashboard' })//直接跳直接
          }
        } else if (resp.code === 302) {
          //  this.replaceUserInfoData(resp.data)
          this.replaceUserInfoList(resp.list)
          //list的变化
          setRoutes(resp.list)
          console.log(resp.data)
          this.replaceUserInfoData(resp.data)
          setInfo(this.userInfo)
          if (this.Jurisdiction === 1) {
            this.$router.push('/dashboard')//跳转到首页
          } else if (this.Jurisdiction === 2) {
            this.$router.push('/pay')//跳转到选择年页面
          } else if (this.Jurisdiction === 4) {
            this.$router.push({ path: 'dashboard', query: { Ju: '2' } })//首页提示小区系统已欠费，请缴费，页面加蒙城30秒倒计时后返回选择小区页面
          }
        }
      })
    },
    // 按照小区首字母搜索小区
    selectCommunityByLetter (name) {
      this.isCommunity = true
      this.isActiveData1 = name
      this.isActiveData2 = false
      // this.isActive = false
      this.name = name
      const data1 = JSON.parse(localStorage.getItem('replcaeData'))
      const Communityid = data1.Communityid
      const propertyId = data1.propertyId
      if (Communityid) {
        const data = { Communityid, name }
        this.letterCommunity(data).then(resp => {
          this.page = resp.msg.page
          this.pages = resp.msg.pageNum
          this.total = resp.msg.total
          this.itemid = this.dataLists[0].id
          this.dataLists = resp.msg.data
          const items = JSON.stringify(this.dataLists[0])
          localStorage.setItem('items', items)
          console.log(this.dataLists.length, '这里是、、')
          if (!this.dataLists.length) {
            this.isCommunity = false
          }
        })
      } else {
        const data = { propertyId, name }
        this.letterCommunity(data).then(resp => {
          console.log(this.dataLists.length, '这里是、、')
          this.dataLists = resp.msg.data
          if (!this.dataLists.length) {
            this.isCommunity = false
          }
          this.page = resp.msg.page
          this.pages = resp.msg.pageNum
          this.total = resp.msg.total
          this.itemid = this.dataLists[0].id
          const items = JSON.stringify(this.dataLists[0])
          localStorage.setItem('items', items)
        })
      }
    },
    // 点击全部
    selectQb () {
      this.isCommunity = true
      this.isActiveData1 = "全部"
      this.isActiveData2 = true
      this.name = ''
      const data1 = JSON.parse(localStorage.getItem('replcaeData'))
      const Communityid = data1.Communityid
      const propertyId = data1.propertyId
      // console.log(Communityid, propertyId)
      if (Communityid) {
        const data = { Communityid, name }
        postHighes(data).then(resp => {
          this.dataLists = resp.msg.data
          this.page = resp.msg.page
          this.pages = resp.msg.pageNum
          this.total = resp.msg.total
        })
      } else {
        const data = { propertyId, name }
        postHighes(data).then(resp => {
          this.dataLists = resp.msg.data
          this.page = resp.msg.page
          this.pages = resp.msg.pageNum
          this.total = resp.msg.total
        })
      }
    },
    findComunity () {
      const data1 = JSON.parse(localStorage.getItem('replcaeData'))
      const Communityid = data1.Communityid
      const propertyId = data1.propertyId
      const token1 = data1.token
      // console.log(Communityid, 'hjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
      if (Communityid) {
        const data = { Communityid }
        postHighes(data).then(resp => {
          // console.log(resp.msg.data, '+++++++++++++进入选择小区获取的所有小区数据（lists）+++++++++++++++')
          this.dataLists = resp.msg.data
          const items = JSON.stringify(this.dataLists[0])
          localStorage.setItem('items', items)
          // console.log('+++++++++++++进入选择小区获取的所有小区数据（lists）+++++++++++++++')
          this.itemid = this.dataLists[0].id
          this.page = resp.msg.page
          this.pages = resp.msg.pageNum
          this.total = resp.msg.total
        })
      } else {
        const data2 = JSON.parse(localStorage.getItem('userInfo'))
        const token1 = data2.token
        const data = { propertyId }
        setToken(token1)
        postHighes(data).then(resp => {
          this.dataLists = resp.msg.data
          // console.log(this.dataLists,)
          const items = JSON.stringify(this.dataLists[0])
          localStorage.setItem('items', items)
          this.itemid = this.dataLists[0].id
          this.page = resp.msg.page
          this.pages = resp.msg.pageNum
          this.total = resp.msg.total
        })
      }
    },
    // 分页
    rightBtn () {
      const data1 = JSON.parse(localStorage.getItem('replcaeData'))
      const Communityid = data1.Communityid
      const propertyId = data1.propertyId
      if (this.name === '') {
        if (Communityid) {
          if (this.pages !== -1 && this.page < this.pages) {

            this.page = this.page + 1
            const page = this.page
            const propertyId = ''
            const data2 = { page, Communityid, propertyId }
            postget(data2).then(resp => {
              console.log(resp, '121212右边1212')
              this.dataLists = resp.msg.data
              this.itemid = this.dataLists[0].id
              const items = JSON.stringify(this.dataLists[0])
              localStorage.setItem('items', items)
            })
          }

        } else {
          if (this.pages !== -1 && this.page < this.pages) {

            this.page = this.page + 1
            const page = this.page
            const Communityid = ''
            const data2 = { page, propertyId, Communityid }
            postget(data2).then(resp => {
              console.log(resp, '121212右边')
              this.dataLists = resp.msg.data
              this.itemid = this.dataLists[0].id
              const items = JSON.stringify(this.dataLists[0])
              localStorage.setItem('items', items)
            })
          }
        }
      } else {
        if (Communityid) {
          if (this.pages !== -1 && this.page < this.pages) {

            this.page = this.page + 1
            const page = this.page
            const propertyId = ''
            const name = this.name
            const data2 = { page, Communityid, propertyId, name }
            getLetter(data2).then(resp => {
              console.log(resp)
              this.dataLists = resp.msg.data
            })


          }
        } else {
          if (this.pages !== -1 && this.page < this.pages) {

            this.page = this.page + 1
            const page = this.page
            const name = this.name
            const data2 = { page, Communityid, propertyId, name }
            getLetter(data2).then(resp => {
              console.log(resp)
              this.dataLists = resp.msg.data
            })


          }
        }

      }
    },
    leftBtn () {
      const data1 = JSON.parse(localStorage.getItem('replcaeData'))
      const Communityid = data1.Communityid
      const propertyId = data1.propertyId
      if (this.name === '') {
        if (Communityid) {
          if (this.pages !== -1) {
            if (this.page > 1)

              this.page = this.page - 1
            const page = this.page
            const propertyId = ''
            const data2 = { page, Communityid, propertyId }
            postget(data2).then(resp => {
              console.log(resp)
              this.dataLists = resp.msg.data
              this.itemid = this.dataLists[0].id
              const items = JSON.stringify(this.dataLists[0])
              localStorage.setItem('items', items)
            })

          }
        } else {
          if (this.pages !== -1) {
            if (this.page > 1) {
              this.page = this.page - 1
              const page = this.page
              const Communityid = ''
              const data2 = { page, propertyId, Communityid }
              postget(data2).then(resp => {
                console.log(resp)
                this.dataLists = resp.msg.data
              })
            }
          }
        }
      } else {
        if (Communityid) {
          if (this.pages !== -1) {
            if (this.page > 1) {
              this.page = this.page - 1
              const page = this.page
              const propertyId = ''
              const name = this.name
              const data2 = { page, Communityid, propertyId, name }
              getLetter(data2).then(resp => {
                console.log(resp)
                this.dataLists = resp.msg.data
                this.itemid = this.dataLists[0].id
                const items = JSON.stringify(this.dataLists[0])
                localStorage.setItem('items', items)
              })
            }
          }
        } else {
          if (this.pages !== -1) {
            if (this.page > 1) {

              this.page = this.page - 1
              const page = this.page
              const name = this.name
              const data2 = { page, Communityid, propertyId, name }
              getLetter(data2).then(resp => {
                console.log(resp)
                this.dataLists = resp.msg.data
              })
            }
          }
        }

      }

    },
    //样式变换
    activedd (item, index) {
      console.log('选择小区，改变样式')
      const items = JSON.stringify(item)
      localStorage.setItem('items', items)
      this.actived = index
      this.itemid = item.id
      // console.log(this.itemid)
    },
    //点击充值
    payMoney () {
      console.log('点击充值')
      console.log(this.Jurisdiction)
      if (this.Jurisdiction === 2) {
        this.$router.push('/pay')
      } else if (this.Jurisdiction === 4) {
        Message('请联系老板充值')
      } else {
        this.$router.push('/community')
      }
    }
  },

  mounted () {
    if (localStorage.userInfo) {
      this.Jurisdiction = this.userInfo.Jurisdiction
    }
  },
  created () {
    // console.log(this.$router)
    this.findComunity()
    // console.log(this.dataLists)
    this.selectQb()
    // console.log(this.itemid)
    // this.itemid = JSON.parse(localStorage.getItem('items'))
    this.param.Communityid = this.itemid
  }
}
</script>

<style lang="scss" scoped>
.active {
  color: rgba(37, 186, 217, 1) !important;
  // background-color: #f00;
}
.community-container {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    -45deg,
    rgba(95, 126, 255, 1) 0%,
    rgba(88, 199, 255, 1) 100%
  );
  position: relative;
  .wy-login-nav {
    cursor: default;
    color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-between;
    padding: 20px 29px 0 40px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    span {
      font-size: 18px;
      white-space: nowrap !important;
    }
    ul {
      display: flex;
      padding-top: 3px;
      li {
        padding: 0 16px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        white-space: nowrap !important;
      }
    }
  }
  .main {
    position: relative;
    width: 1000px;
    height: 550px;
    padding: 20px 30px 30px;
    background: white;
    border-radius: 10px;
    position: absolute;
    left: 0;
    right: 0;
    top: 8px;
    bottom: 0;
    margin: auto;
    // margin-top: 11px;
    &-title {
      height: 26px;
      text-align: center;
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    &-letter-container {
      display: flex;
      width: 100%;
      margin-top: 20px;
      margin-left: 5px;
      box-sizing: border-box;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      // padding-top: 6px;
      cursor: pointer;
      .qb {
        color: rgba(37, 186, 217, 1);
        font-size: 13px !important;
        font-family: Microsoft YaHei;
        font-weight: 400;
        padding: 3px 15px 0px 5px;
        cursor: pointer;
        width: auto;
        display: inline-block;
      }
      .qb1 {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        padding: 3px 15px 0px 5px;
        cursor: pointer;
        width: auto;
        display: inline-block;
      }
      &_list {
        display: flex;
        flex: 1;
        // padding-left: 10px;
        justify-content: space-between;
        li {
          font-size: 13px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          padding-top: 3px;
          cursor: pointer;
          &:hover {
            color: rgba(37, 186, 217, 1);
          }
        }
      }
    }
    .item-container {
      padding: 4px 6px 0 43px;
      .el-col {
        margin-top: 19px;
        .bt1 {
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(248, 172, 89, 1);
          // box-shadow: 0px 6px 5px 0px rgba(248, 172, 89, 0.4) !important;
          box-shadow: 0px 6px 5px 0px rgba(248, 172, 89, 0.15) !important;
          border-radius: 4px;
        }
        .bt2 {
          border: 1px solid rgba(243, 243, 243, 1);
          box-shadow: 0px 4px 4px 0px rgba(204, 204, 204, 0.15);
          // box-shadow:0px 4px 5px 0px rgba(248,172,89,0.4);
          background: rgba(255, 255, 255, 1);
        }
        .el-card {
          // padding: 21px 0 21px 0;
          width: 250px;
          height: 112px;
          vertical-align: middle;
          box-shadow: 0px 6px 5px 0px rgba(204, 204, 204, 0.15);
          border-radius: 4px;
          // padding: 0px 0 3.2vh 1.5vw;
          box-sizing: border-box;
          display: table-cell;
          cursor: pointer;
          div {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: border;
            color: rgba(51, 51, 51, 1);
            text-align: center;
            margin-bottom: 10px;
          }
          p {
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            text-align: center;
          }
          .tips {
            color: red;
          }
          //         &:hover {
          //             background:rgba(255,255,255,1);
          // border:1px solid rgba(243,243,243,1);
          // box-shadow:0px 4px 5px 0px rgba(204,204,204,0.5);
          // border-radius:4px;
          //               }
        }
      }
    }
    .button {
      // background-color: #f00;
      position: absolute;
      right: 0;
      // top: 26px;
      bottom: 15px;
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: center;
      .el-button {
        width: 72px;
        height: 30px;
        border: none;
        background: rgba(248, 172, 89, 1);
        border-radius: 4px;
        text-align: center;
        font-size: 14px;
        line-height: 0;
        position: relative;
      }
    }
    .fenye-click {
      display: inline-block;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      // background-color: #c4c4c4;
      font-size: 40px;
      text-align: center;
      color: #fff;
      border-radius: 50%;
      cursor: pointer;
    }
    .left-click {
      position: absolute;
      top: 50%;
      left: 20px;
    }
    .right-click {
      position: absolute;
      top: 50%;
      right: 20px;
    }
  }
}
.wy-login-bottom {
  position: absolute;
  bottom: 12px;
  color: #fff;
  font-size: 14px;
  width: 100%;
  white-space: nowrap !important;
  width: 100%;
  display: flex;
  justify-content: center;
  .zi {
    position: absolute;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    font-family: MicrosoftYaHei;
    font-weight: 400;
    cursor: default;
    white-space: nowrap;
    width: 280px;
  }
}
.el-col-6 {
  width: 24%;
}
/deep/.el-card__body {
  padding: 10px !important;
}
</style>
