<template>
  <div :class="classObj" class="app-wrapper" v-if="init">
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <tags-view/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import AppMain from './components/AppMain'
import TagsView from './components/TagsView'
const { body } = document
const WIDTH = 1024
const RATIO = 3
export default {
  name: 'Layout',
  data() {
    return {
      init: false
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    classObj() {
      return {
        hideSidebar: !this.$store.state.sidebar.opened,
        openSidebar: this.$store.state.sidebar.opened,
        withoutAnimation: this.$store.state.sidebar.withoutAnimation,
        mobile: this.$store.state.sidebar.device === 'mobile'
      }
    }
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      this.$store.dispatch('toggleDevice', 'mobile')
      this.$store.dispatch('closeSideBar', { withoutAnimation: true })
    }
    //获取用户信息
    this.$store.dispatch('GetUserInfo', this.$store.state.user.loginName).then(res => {
      this.init = true;
    }).catch(err => console.log(err))
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    },
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        this.$store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          this.$store.dispatch('closeSideBar', { withoutAnimation: true })
        }
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  watch: {
    $route(route) {
      if (this.$store.state.sidebar === 'mobile' && this.$store.state.sidebar.opened) {
        this.$store.dispatch('closeSideBar', { withoutAnimation: false })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  } 
</style>
