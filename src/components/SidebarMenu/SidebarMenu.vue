<template>
    <div class="slidebar" @click.stop.prevent>
        <div class="header">
            <div class="user">
                <img class="avatar"  :src="image403('http://pic1.zhimg.com/da8e974dc_m.jpg')" alt="">
                <span class="name" >请登录</span>
            </div>
            <div class="content">
                <div class="item" v-for="(item,index) in twoItem" :key="index">
                    <img :src="item.img" alt="">
                    <span>{{item.title}}</span>
                </div>
            </div>
        </div>
        <div class="home-page" :class="pageShow === 'main' ? 'active' : ''" @click="$emit('select-home')">
            <img :src="shou.img" alt="">
            <span>{{shou.item}}</span>
        </div>
    </div>
</template>

<script>
import star from '@/assets/img/star.png'
import dowloand from '@/assets/img/download.png'
import home from '@/assets/img/homePage.png'
import image403 from '@/utils/image403'
export default {
    props: ['pageShow'],
    data() {
        return {
            twoItem:[{
                title: "我的收藏",
                img: star
            },{
                title: '离线下载',
                img: dowloand 
            }],
            shou: {
                item: "首页",
                img: home
            }
        }
    },
    methods: {
        image403
    }
}
</script>

<style scoped>
.slidebar{
    background: #fff;
    width: 8.45333333rem;
    height: 100%;
    font-size: 0.45333333rem;
    overflow: scroll;
}
.header{
    height: 228px;
    background: #00a2ed;
    color: #fff;
}
.user{
    height: 110px;
    padding-left: 30px;
    display: flex;
    align-items: center;
}
.home-page .avatar {
        height: 70px;
        width: 70px;
        border-radius: 50%;
        margin-right: 26px;
      }
.content{
    height: 110px;
    padding-left: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.item{
    overflow: hidden;
}
.item img{
    width: 32px;
    height: 32px;
    margin-right: 40px;
}
.item span{
    font-weight: bold;
}
.item:last-child{
    margin-right: 80px;
}
.home-page{
    height: 103px;
    padding-left: 45px;
    display: flex;
    align-items: center;
}
.active{
    background: #f0f0f0;
}
.home-page img{
    width: 32px;
    height: 32px;
    margin-right: 33px;
}
.sidebar .home-page span{
    color: #00a2ed;
}
</style>
