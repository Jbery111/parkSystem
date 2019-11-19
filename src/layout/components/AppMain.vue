<template>
  <div class="app-main">
    <!-- //二级菜单 -->
    <div class="zhanwei" />
    <ul v-if="isDash">
      <router-link
        v-for="item in secondRouterLists.children"
        :key="item.path"
        :to="{ name: item.name}"
        class="selectLi"
      >
        <li
          v-if="isDash"
          :class="{listClass:isDivShow}"
          tabindex="2"
          @click="cc(item)"
        >{{ item.meta.title }}</li>
      </router-link>
      <!-- //三级菜单 -->
      <div
        v-if="isThreeMenu"
        class="threeMenu"
        :class="{threeMenu1:isDivShow}"
        @click="isThreeMenu = !isThreeMenu"
      >
        <!-- <span>押金列表</span>
        <span>押金列表</span>-->
        <router-link
          v-for="list in childrenLists"
          v-show="isThreeMenu"
          :key="list.name"
          tag="span"
          :to="{ name: list.name}"
        >{{ list.meta.title }}</router-link>
      </div>
    </ul>
    <router-view :key="key" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// console.log(eventBus, 'ven5555555555555555555555555555555555555555555555t')
export default {
  name: 'AppMain',
  data() {
    return {
      isDash: false,
      isThreeMenu: false,
      threeMenuLists: [],
      isDivShow: false,
      secondRoutes: [],
      childrenLists: []
    }
  },
  computed: {
    ...mapState(['secondRouterLists']),
    ...mapState('permission', ['sidebarMenu']),
    key() {
      return this.$route.path
    }
  },
  watch: {
    '$route'(to, from) {
      this.isThreeMenu = false
      this.isDivShow = false
      // 对路由变化作出响应...
      // console.log(to, '二级二级二级')
      if (to.path === '/dashboard') {
        this.isDash = false
        this.clearRouterAsync()
        // console.log(this.secondRouterLists, '909090909090')
      } else {
        this.isDash = true
      }
      const threeMenuItems = this.secondRouterLists.children
      this.threeMenuLists = threeMenuItems.filter(item => Boolean(item.children) === true)
      const childrenLists1 = []
      this.threeMenuLists.forEach(item => {
        // console.log(item.children[0], '99999999999993333')
        childrenLists1.push(item.children[0])
      })
      this.childrenLists = childrenLists1
      // console.log(this.childrenLists, 'lanzhou')
      const fullPath = to.fullPath
      const str = fullPath.split('/')
      const strData = str[3]
      // console.log(strData, 'tototootototot')
      childrenLists1.forEach(item => {
        // console.log(item, strData, 'wunaiargraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        if (item.name === strData) {
          // console.log(item.meta.isNoThreeShow, 'wodewowowowowoowow')
          if (item.meta.isNoThreeShow) {
            this.isThreeMenu = false
          } else {
            this.isThreeMenu = true
            this.isDivShow = true
          }
        }
      })
    }
  },
  created() {
    this.isThreeMenu = false
    // history.go(0)
  },
  // mounted() {
  //   history.go(0)
  // },
  methods: {
    ...mapMutations(['clearRouterAsync']),
    cc(item) {
      console.log(item, '116')
      this.isThreeMenu = true
    }
    // changeTreeMenu1() {
    //   // DOM 还没有更新
    //   this.$nextTick(function() {
    //     console.log('dianwo ')
    //     // DOM 现在更新了
    //     // `this` 绑定到当前实例
    //     // this.doSomethingElse()
    //     this.changeTreeMenu()
    //   })
    // },

    // changeTreeMenu() {
    //   console.log('ppppp')
    // }
  }
}
</script>

<style lang="scss"  scoped>
.app-main {
  /*50 = navbar  */
  position: relative;
  min-height: 675px;
  // width: 92%;
  margin-right: 152px;
  height: 92%;
  // margin: 0 0.3vw;
  overflow: hidden;
  background-color: #fff;
  .zhanwei {
    width: 100%;
    height: 20px;
    background-color: #f3f3f3;
  }
  ul {
    background-color: #f3f3f3;
    // background-color: green;
    display: flex;
    width: 100%;
    min-height: 28px;
    font-size: 11px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    .selectLi {
      display: inline-block;
      position: relative;
      // &:hover div{
      //   display: block;
      // }
      li {
        // width: 5.4vw;
        // height: 100%;
        // line-height: 3.9vh;
        // margin-top: 2.1vh;
        padding: 6px 13px;
        text-align: center;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(239, 242, 245, 1);
        border-radius: 4px 4px 0 0;
        border-bottom: 1px solid #fff;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        position: relative;
        cursor: pointer;
        &:first-child {
          border-left: none;
        }
        &:hover {
          color: #5fafe4;
          // border: 1px solid #5fafe4;
          border-bottom: none;
        }
        &:focus {
          color: #5fafe4;
          outline: none;
        }
      }
    }
    .router-link-exact-active {
      border: 1px solid #5fafe4;
      border-bottom: 0px !important;
      outline: none;
      border-radius: 4px 4px 0 0;
      li {
        color: #5fafe4;
        border-bottom: none;
      }
    }
    .threeMenu {
      position: absolute;
      width: 114px;
      height: auto;
      top: 6.33vh;
      left: 11vw;
      background-color: #f00;
      padding: 0px 6px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 5px 0px rgba(204, 204, 204, 0.3);
      display: none;
      span {
        display: inline-block;
        width: 100%;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border-bottom: 1px solid #eff2f5;
        cursor: pointer;
        font-size: 0.8vw;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        &:last-child {
          border: none;
        }
        &:hover {
          color: #5fafe4;
        }
      }
    }
    .threeMenu1 {
      display: block;
    }
  }
}

.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
// .el-popup-parent--hidden {
//   .fixed-header {
//     padding-right: 15px;
//   }
// }
.el-popover {
  //  background: #f00 !important;
  padding: 0px 6px;
  top: 80px !important;
  position: absolute !important;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 5px 0px rgba(204, 204, 204, 0.3);
  li {
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-bottom: 1px solid #eff2f5;
    cursor: pointer;
    font-size: 11px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    &:last-child {
      border: none;
    }
    &:hover {
      color: #5fafe4;
    }
  }
}
</style>
// 主要内容
