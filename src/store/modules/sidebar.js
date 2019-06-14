import Cookies from 'js-cookie'
import manageNav from '@/router/modules/manageNav'

const sidebar = {
  state: {
    routerList:manageNav, //侧边栏列表
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
    device: 'desktop'
  },
  mutations: {
    SET_SIDEBAR: (state, list) => {
      state.routerList = list;
    },
    TOGGLE_SIDEBAR: state => {
      state.opened = !state.opened;
      state.withoutAnimation = false;
      if (state.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.opened = false;
      state.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default sidebar
