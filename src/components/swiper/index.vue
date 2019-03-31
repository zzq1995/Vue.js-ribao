<template>
    <swiper class="swiper" :options="swiperOption" v-if="topStories.length > 0">
        <swiper-slide class="slide" v-for="(story,index) in topStories" :key="index">
            <img class="img" :src="image403(story.image)" alt="" >
            <div class="mask" @click="jin"></div>   <!--隐藏滤镜 -->
            <span class="title">{{story.title}}</span>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>  
    </swiper>
</template>

<script>
    /*组件方式引用*/
    import 'swiper/dist/css/swiper.css'//这里注意具体看使用的版本是否需要引入样式，以及具体位置。
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import image403 from '@/utils/image403'
    import { mapState } from 'vuex'
    export default {
        components: {
            swiper,
            swiperSlide
        },
        data(){
            let vm = this
            return{
                swiperOption: {//swiper3
                    loop:true,
                    autoplay: {
                        disableOnInteraction: false
                    },
                    pagination:{
                        el: '.swiper-pagination'
                    },
                    on: {
                        click:function() {          //swiper api 点击swiper执行
                            // clickedIndex下标从1开始
                            // alert(this.clickedIndex)
                            vm.$router.push({ name: 'newsDetail', params: { id: vm.topStories[this.clickedIndex - 1].id } })
                        }
                    }
                }
            }
        },
        computed: {
            ...mapState(['topStories'])
            
        },
        methods: {
            image403,
            toNewsDetail (id) {
            console.log(1)
            this.$router.push({ path: `newsDetail/${id}` })
            },
            jin(id) {
                // console.log(id)
            }
        }
    }

</script>

<style scoped>
.swiper{
    width: 100%;
    height: 470px;
    padding: 0px;
}
.slide{
    width: 100%;
    height: 100%;
    padding: 0px;
}
.img{
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 0px;
}
.mask{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
    padding: 0px;
}
.title{
    font-size: 46px;
    line-height: 54px;
    position: absolute;
    left: 0;
    bottom: 55px;
    padding: 0 34px;
    color: #fffffc;
    padding: 0px;
}

</style>
<style>
.swiper-pagination-bullet{
    background: #88878d !important;
    opacity: 1;
}
.swiper-pagination-bullet-active{
    background: #fffffd !important;
    opacity: 1;
}
</style>

