<template>
  <el-container>
    <el-header><h1>xxx大型管理系统</h1></el-header>
    <el-container>
      <el-aside>
        <vnav/>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import vnav from '../components/vnav.vue';

export default {
  components: { vnav },
  data() {
    return {};
  },
};
</script>

<style lang = "stylus" scoped>
@import '../stylus/index.styl';

.el-header {
  height: 80px !important;
  background-color: $headerbg;
}

.el-aside {
  min-height: calc(100vh - 80px);
  width: 220px !important;
  background-color: $asidebg;
}
</style>