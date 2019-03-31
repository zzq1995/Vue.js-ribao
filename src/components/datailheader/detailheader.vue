<template>
    <div class="header">
        <div class="left" @click="back">
            <img src="../../assets//img//back.png" alt="" class="bank" >
        </div>
        <div class="right">
            <img src="../../assets/img/share.png" alt="" class="item" @click="$emit('show-share')">
            <img class="item" src="../../assets/img/star.png" alt="" @click="collet">
            <div class="item">
                <img src="../../assets/img/comment.png" alt="" @click="collet2">
                <span class="num">{{num}}</span>
            </div>
            <div class="item">
                <img src="../../assets/img/thumb_up.png" alt="" @click="thumbs" v-if="fdhu">
                <img src="../../assets//img/thumb_up_2.png" alt="" v-else @click="thumbs">
                <span class="num">{{count}}</span>
            </div>
        </div>
        
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    window.Toast= Toast;
export default {
    data() {
        return {
            fdhu:true,
            num: "40",
            count: '500'
        }
    },
    methods: {
        back() {
            this.$router.back(-1)
        },
        collet() {
            Toast({
                message: '假的！',
                duration: 300
            })
        },
        collet2() {
            Toast({
                message: '也是假的！',
                duration: 300
            })
        },
        thumbs() {
            this.fdhu = !this.fdhu
            if(this.fdhu == false){
                this.count++;
                Toast({
                    message: '点赞成功！',
                    duration: 300
                })
            }else{
                this.count--
                Toast({
                    message: '取消成功！',
                    duration: 300
                })
            }
        }
        
    }
}
</script>
<style scoped>
.header{
    height: 112px;
    background: #00a2ed;
    color: #fff;
    padding: 0px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.header img{
    width: 50px;
    vertical-align: middle;
}
.right{
    display: flex;
    align-items: center;
}
.item{
    margin-right: 50px;
}
.num{
    font-size: 30px;
}
</style>