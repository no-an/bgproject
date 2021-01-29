<template>
  <div>
    <div class="container">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item v-for="item in nav" :key="item.title" :to="item.path">
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        {
          title: "商城",
          active: require("../assets/img/icon/nav/home/selected.png"),
          inactive: require("../assets/img/icon/nav/home/unselected.png"),
          path: "/home",
        },
        {
          title: "分类",
          active: require("../assets/img/icon/nav/classify/selected.png"),
          inactive: require("../assets/img/icon/nav/classify/unselected.png"),
          path: "/sort",
        },
        {
          title: "购物车",
          active: require("../assets/img/icon/nav/shoppingcart/selected.png"),
          inactive: require("../assets/img/icon/nav/shoppingcart/unselected.png"),
          path: "/cart",
        },
        {
          title: "我",
          active: require("../assets/img/icon/nav/user/selected.png"),
          inactive: require("../assets/img/icon/nav/user/unselected.png"),
          path: "/mine",
        },
      ],
      active: "",
    };
  },
  mounted() {
    this.active = this.nav.findIndex((val) => val.path === this.$route.path);
  },
};
</script>

<style scoped>
.container{
  padding-bottom: .45rem;
}
</style>