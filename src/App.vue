<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>   <!-- 这里是会被缓存的视图组件 -->
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件 -->
    </router-view>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
    height: 100%;
    font-size: 24px;
    line-height: 24px;
}
</style>
