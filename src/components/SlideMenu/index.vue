<!--
    侧栏菜单
-->
<template>
  <div class="main-menu">
    <el-menu :unique-opened="true" :router="true" :default-active="$route.path">
      <item v-bind="$attrs"></item>
    </el-menu>
  </div>
</template>
<script>
import Item from './item'
export default {
  name: 'SlideMenu',
  props: {
  },
  components: {
    Item
  }
}
</script>
<style scoped lang="scss">
</style>
