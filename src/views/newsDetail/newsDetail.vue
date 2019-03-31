<template>
    <div class="news-detail">
        <Detailheader class="detail-header" @show-share="toggleShareModal"></Detailheader>
        <link rel="stylesheet" :href="(content.css)">
        <div class="container">
            <div class="top">
                <img :src="image403(content.image)" alt="">
                <div class="mask"></div>
                <span class="title">{{content.title}}</span>
                <span class="image-source">{{content.image_source}}</span>
            </div>
            <div class="my-body" v-html="image403(content.body)"></div>
        </div>







        <!-- 点击头部分享按钮显示的分享方式 -->
        <transition name="fade" >
            <div class="share-mask"  v-show="shareModalIsShow" @click="toggleShareModal">
                <sharemodal class="share-modal" v-show="shareModalIsShow"></sharemodal>
            </div>
        </transition>
    </div>
</template>
<script>
import Detailheader from '../../components/datailheader/detailheader'
import Sharemodal from '../../components/sharemodal/sharemodal'
import axios from 'axios'
import image403 from '../../utils/image403'
export default {
    data() {
        return {
            content:{},
            shareModalIsShow:false,   //分享界面是否显示
            isFirstEnter:false,    //是否是第一次进来
            
        }
    },
    components:{
        Detailheader,
        Sharemodal
    },
    beforeRouteEnter(to, from, next) {
      // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
      // 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
      // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
      // 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
      if(from.name=='homepage'){
          to.meta.isBack=false;
          //判断是从哪个路由过来的，
          //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
      }
  
      next();
    },
    created() {              //在创建vue对象时，当html渲染之前就触发；
        this.isFirstEnter = true   
    },
    activated() {      //在vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发；可用于初始化页面数据等
        if( !this.$route.meta.isBack && this.isFirstEnter){   //如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
            this.getNews();
        }
        // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
        this.$route.meta.isBack=false
    },
    methods: {
        toggleShareModal() {
            this.shareModalIsShow=!this.shareModalIsShow
        },
        image403,
        //获取新闻详情
        getNews() {
            return axios.get(`/api/4/news/${this.$route.params.id}`).then( res => {
                this.content = res.data
                console.log(res.data)
            })
        }

    },

}
</script>

<style scoped>
    .detail-header{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 5;
    }
    .share-mask{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 5;
    }
    .share-modal{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to  {
        opacity: 0;
    }
    .container{
        padding-top: 112px;
        position: relative;
    }
    .top{
        width: 100%;
        height: 420px;
        overflow: hidden;
        color: #fff;
        position: absolute;
    }
    .top img{
        width: 100%;
        height: auto;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }
    .mask{
        width: 100%;
        height: 420px;
        position: absolute;
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
    }
    .title{
        position: absolute;
        left: 0;
        bottom: 50px;
        padding: 0 20px;
        line-height: 60px;
        font-size: 40px;
    }
    .image-source {
        position: absolute;
        right: 40px;
        bottom: 15px;
        font-size: 24px;
        opacity: 0.7;
      }
</style>