<template>
          <el-menu
          background-color="transparent"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="$route.path"
          unique-opened
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span>首页</span>
          </el-menu-item>
          <el-submenu v-for='item in right_menu' :key='item.id' :index="item.id.toString()" >
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item v-for="list in item.children" :index="list.url" :key="list.url">
              <span>{{list.title}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {

    };
  },
  computed:{
    right_menu(){
      return JSON.parse( window.sessionStorage.getItem('userinfo') ).menus
    }
  },
  methods: {

  },
  mounted() {
  }
};
</script>

<style lang="" scoped>
</style>
