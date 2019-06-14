<template>
  <div class="tags-view-container">
    <i class="tag-ico el-icon-caret-left" @click="tagScroll('left')"></i>
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :key="tag.path"
        tag="span"
        class="tags-view-item">
        {{ tag.title }}
        <span class="el-icon-close" v-if="tag.fullPath!=='/userIndex'" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <i class="tag-ico el-icon-caret-right" @click="tagScroll('right')"></i>

    <el-dropdown @command="handleCommand">      
      <span class="el-dropdown-link">
        关闭窗口<i class="el-icon-arrow-down el-icon--right"></i>
      </span>      
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="closeSelectedTag">关闭</el-dropdown-item>
        <el-dropdown-item command="closeOthersTags">关闭其他</el-dropdown-item>
        <el-dropdown-item command="closeAllTags">关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="el-dropdown" @click="logout"><i class="iconfont icon-quit"></i>退出</div>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane'
import Cookies from 'js-cookie'
export default {
  components: { ScrollPane },
  data() {
    return {
      selectedTag: {}
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route() {
      this.addViewTags()
      this.moveToCurrentTag()      
    }
  },
  mounted() {
    this.addViewTags();  
  },
  methods: {
    handleCommand(key) {
      if(key==='closeSelectedTag') return this.closeSelectedTag(this.selectedTag);
      if(key==='closeOthersTags') return this.closeOthersTags();
      if(key==='closeAllTags') return this.closeAllTags();
    },
    tagScroll(key){
      this.$refs.scrollPane.tagScroll(key)
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    addViewTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('addView', this.$route)
      }

      this.visitedViews.forEach(item => {
        if(this.isActive(item)) this.selectedTag = item;
      });
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)

            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('updateVisitedView', this.$route)
            }

            break
          }
        }
      })
    },
    closeSelectedTag(view) {
      if(this.visitedViews.length==1 && this.visitedViews[0].fullPath==='/userIndex') return
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          const latestView = visitedViews.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            this.$router.push('/userIndex')
          }
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews')
      this.$router.push('/userIndex')
    },
    logout() {
      this.$store.dispatch('LogOut');
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  border-top: 1px solid #d8dce5;
  display:flex;
  .tag-ico {
    padding:0 10px;
    line-height:34px;
    cursor: pointer;   
  }
  .el-dropdown{
    padding:0 10px;
    line-height:34px;
    cursor: pointer; 
    border-left:1px solid #d8dce5;
    .iconfont{
      margin-right:5px;
      font-size:12px;
    }
  }
  .is-horizontal{
    display:none;
  }
  .tags-view-wrapper {
    flex:1;
    border-left:1px solid #d8dce5;
    border-right:1px solid #d8dce5;
    .tags-view-item {
      border:1px solid #d8dce5;
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-top:4px;
      margin-right:5px;
      &:first-of-type{
        margin-left:10px;
      }
      &:last-of-type{
        margin-right:10px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
