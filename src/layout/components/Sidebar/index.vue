<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="true"
        mode="horizontal"
        :router="true"
        @select="handleSelect"
      >
        <sidebar-item
          v-for="route in sidebarMenu"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :index="route.name"
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
  data() {
    return {
      activeIndex: ''
    }
  },
  methods: {
    ...mapMutations(['setRouterAsync']),
    routerHandler(item) {
      console.log(item, '我的item')
      eventBus.$emit('firstRouter', item)
    },
    handleSelect(index) {
      // alert('pp')
      this.activeIndex = index
    }
  },
  watch: {
    '$route'(to, from) {
      // console.log(to, 'to')
      this.handleSelect(this.activeIndex)
      // alert('pp')
      const fullPath = to.fullPath
      const str = fullPath.split('/')
      const strData = str[1]
      const routerOptions = this.sidebarMenu
      const lists = routerOptions.filter(item => item.name === strData)
      if (strData === 'dashboard') {
        // console.log(strData)
        console.log(lists[0], 'tototootototototot')
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
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },

  created() {
    if (localStorage.getItem('isRefresh') === 'true') {
      location.reload()
      localStorage.setItem('isRefresh', false)
    }

    // if (localStorage.getItem('isRefresh') === 'true') {
    //   localStorage.setItem('isRefresh', false)
    //   alert(99)
    // }

    // this.forceHandler()
    this.$router.push('/dashboard')
    // console.log(this.sidebarMenu, 'sidebarmenu')
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
