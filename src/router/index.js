import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Homepage from '../views/homepage/index'
import newsDetail from '../views/newsDetail/newsDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {     // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
    if (savedPosition) {            // savePosition：会记录滚动条的坐标，点击前进/后退的时候记录值{x:?,y:?}
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
     path: '/',
     name: 'homepage',
     component: Homepage,
     meta: {
        keepAlive: true, // 需要被缓存
        isBack: false
     }
    },
    {
      path: '/newsDetail/:id',
      name: "newsDetail",
      component:newsDetail,
      meta: {
        keepAlive: true,  //需要被缓存
        isBack: false
      }
    }
  ]
})
