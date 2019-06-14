<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9">
      <sidebar-item v-for="route in routerList" :key="'2'+route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  data() {
    return {
      
    }
  },
  components: { SidebarItem },

  computed: {
    routerList(){
      return this.$store.state.sidebar.routerList;
    },
    isCollapse(){
      return !this.$store.state.sidebar.opened;
    }
  },
  created(){
    
  }
}
</script>
<style>
.el-menu-item.is-active {
    color: #bfcbd9;
}
</style>

