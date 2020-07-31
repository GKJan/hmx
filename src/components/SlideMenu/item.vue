<!--

-->
<template>
  <div>
    <template v-for="(item, index) in list">
      <el-submenu v-if="item.children && item.children.length" :index="item.id" :key="index"  >
        <template slot="title">
          <i v-if="item.icon" class="iconfont" :class="item.icon"></i>
          <span slot="title">{{ item.name}}</span>
        </template>
        <menu-item :list="item.children"></menu-item>
      </el-submenu>
      <el-menu-item v-else :key="index" :index="item.path">
        <i v-if="item.icon" class="iconfont" :class="item.icon"></i>
        <span>{{item.name}}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: 'MenuItem',
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
.iconfont {
  margin-right: 10px;
  color: #fff;
}
</style>
