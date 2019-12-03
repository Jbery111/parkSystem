<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="true"
        mode="vertical"
        :router="true"
      >
        <sidebar-item
          v-for="route in sidebarMenu"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :index="route.name"
          @click="routerHandler(route)"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { eventBus } from '@/main'
export default {
  components: { SidebarItem, Logo },
  methods: {
    ...mapMutations(['setRouterAsync']),
    routerHandler (item) {
      console.log(item, '我的item')
      eventBus.$emit('firstRouter', item)
    }
  },
  watch: {
    '$route' (to, from) {
      // console.log(to, 'tototootototototot')
      const fullPath = to.fullPath
      const str = fullPath.split('/')
      const strData = str[1]
      const routerOptions = this.sidebarMenu
      const lists = routerOptions.filter(item => item.name === strData)
      if (strData === 'dashboard') {
        // console.log(strData)
      } else {
        this.setRouterAsync(lists[0])
      }
    }
  },
  computed: {
    ...mapState('permission', ['sidebarMenu']),
    ...mapGetters([
      'sidebar'
    ]),
    routes () {
      return this.$router.options.routes
    },
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      let newPath = path.split("/")
      const newPath1 = '/' + newPath[1]
      // console.log(newPath1,'newdddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
      return newPath1
    },
    showLogo () {
      return this.$store.state.settings.sidebarLogo
    },
    variables () {
      return variables
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  },

  created () {
    // console.log(this.sidebarMenu, 'this.sidebarMenu')
    const fullPath = this.$route.fullPath
    const str = fullPath.split('/')
    const strData = str[1]
    const routerOptions = this.sidebarMenu
    const lists = routerOptions.filter(item => item.name === strData)
    if (strData === 'dashboard') {
      // console.log(strData)
    } else {
      this.setRouterAsync(lists[0])
    }
    // console.log(this.$route,'this.$routeSIDERBAR')
    if (localStorage.getItem('isRefresh') === 'true') {
      location.reload()
      localStorage.setItem('isRefresh', false)
    }

    // this.$router.push('/dashboard')
  }

  // beforeRouteEnter (to, from, next) {
  //   alert(44)
  //   localStorage.setItem('flag', 1)
  //   next(vm => {
  //     console.log(vm, 'vmvmvmvmvmvmv')
  //   })
  // }
}
</script>
