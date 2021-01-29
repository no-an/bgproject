<template>
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item >{{$route.name}}</el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style scopd>
.el-breadcrumb{
  margin-bottom: 20px;
}
</style>