<template>
  <div class="home-page">
    <Header class="header" v-on:tap-menu="toggleSidebar">
      <span slot="title">{{title}}</span>
      <template v-if="pageShow === 'main'">
        <img slot="bell" src="../../assets/img/bell.png" alt="">
        <img slot="right-icon" class="more" src="../../assets/img/more.png" alt="" >
      </template>
      <template v-if="pageShow === 'theme'" >
        <img  slot="right-icon" src="../../assets/img/subtract.png" alt="" >
        <img  class="plus" src="../../assets/img/circle_plus.png" alt="">
      </template>
    </Header>
    <!-- 滚动页面 -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
          
          <!-- 首页 -->
          <div class="main-page" v-show="pageShow === 'main'">
            <swiper></swiper>
            <div class="today-hot">
              <div class="title">
                <span>今日要闻</span>
              </div>
              <news-item class="item" v-for="(story, index) in todayHotStories" :key="index" :story="story" @click-to="toNewsDetail(story.id)"></news-item>
            </div>
            <div class="news-before" v-for="(item, outIndex) in beforeStories" :key="outIndex">
              <div class="title">
              <!-- <span>{{dateFormat(item.date)}}</span> -->
              </div>
              <news-item class="item" v-for="(story, innerIndx) in item.stories" :key="innerIndx" :story="story" @click-to="toNewsDetail(story.id)"></news-item>
            </div>
          </div>




        </div>

    </div>
    <!-- 侧边栏 -->
    <transition name="fade">
        <div class="msk" v-show="sidebarIsShow">
          <transition name="slide">
            <sidebar-menu class="sidebar-menu" v-show="sidebarIsShow" :page-show="pageShow" @select-home="toHomePage">
            </sidebar-menu>
          </transition>
        </div>
    </transition>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  import moment from 'moment'
  import BScroll from 'better-scroll'
  import image403 from '@/utils/image403'
  import Swiper from '../../components/swiper/index'
  import NewsItem from '../../components/NewsItem/NewsItem'
  import SidebarMenu from '../../components/SidebarMenu/SidebarMenu'
  export default {
      data() {
          return {
            sidebarIsShow: false, // 控制侧边栏是否显示,
            title: '首页',
            pageShow:'main', // 显示的内容，'main'表示首页(包含swiper、今日热闻、过往新闻)，'theme'表示主题日报页
            isFirstEnter:false ,  //是不是第一次进来
            // mainPage表示首页，包含swiper、今日热闻、过往新闻
            pageShow: 'main', // 显示的内容，'main'表示首页(包含swiper、今日热闻、过往新闻)，'theme'表示主题日报页
            activeTheme: {}, // 被选中的主题日报
          }
      },
      components: {
          Header: () => import('@/components/Header'),
          Swiper,
          NewsItem,
          SidebarMenu
      },
      created() {
          this.isFirstEnter = true  // 只有第一次进入或者刷新页面后才会执行此钩子函数，使用keep-alive(2+次)进入不会执行此钩子函数
      },
      computed: {
        ...mapState(['todayHotStories', 'beforeStories'])
      },
      activated () {
        if (!this.$route.meta.isBack || this.isFirstEnter) {
          // 如果isBack是false，表明不是从NewsDetail返回的，需要重新获取数据
          // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需要重新获取数据
          this.loadData()
        }
        // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
          this.$route.meta.isBack = false
      },
      methods: {
        ...mapActions(['getNewsLatest', 'getBefore']),
      image403,
        toggleSidebar () {
          this.sidebarIsShow = !this.sidebarIsShow
        },
      loadData () {
        if (!this.scroll) {
          this.getNewsLatest().then(res => {
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.wrapper, {
                click: true    //去除默认行为
              })
              //上拉加载
              this.scroll.on('scrollEnd',(pos) =>{   //滚动结束执行一次
                  if(this.scroll.y <= (this.scroll.maxScrollY + 50) ) {
                    // 如果是首页的话继续加载首页的内容，如果是其他主题日报，需要加载其他的主题日报的内容
                    if(this.pageShow === 'main'){
                      this.getBefore().then( res => {
                        this.$nextTick( () => [
                          this.scroll.refresh()   ///使用refresh 方法 来更新scroll  解决无法滚动的问题
                        ])
                      })
                    }
                  }
              })
              
              
            })
          })
        }
      },
      // 点击侧边栏首页
      toHomePage() {
        this.sidebarIsShow =false
      }
      
    }

 
  }

</script>

<style scoped>
  .home-page {
    height: 100%;
    background: #f3f3f3;
    overflow: scroll;
  }

  .home-page .header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 5;
  }

  .more,
  .plus,
  .subtract {
    margin: 0 30px 0 50px;
  }
  .wrapper{
    height: 100%;
    width: 100%;
    padding: 0px;
    margin: 0px;
  }
  .content {
    padding-top: 112px;
  }
  .title{
    height: 108px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    font-size: 28px;
    font-weight: normal;
    color: #4d4d4d;
  }
  .item{
    margin: 0px auto 20px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter, .fade-leave-to {
    background: rgba(0, 0, 0, 0);
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s;
  }
  .slide-enter, .slide-leave-to {
    transform: translateX(-100%);
  }
  .msk{
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
  .sidebar-menu{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
  }
</style>
