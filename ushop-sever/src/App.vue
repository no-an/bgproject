<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang='less' >
@import "../node_modules/vant/lib/index.less";
@tabbar-height: 0.49rem;
@tabbar-item-font-size: 10px;
@tabbar-item-text-color: #999;
@tabbar-item-icon-size: 0.2rem;
@nav-bar-height: 0.45rem;
@nav-bar-background-color: #ff6040;
@nav-bar-arrow-size: 0.17rem;
@nav-bar-icon-color: #fff;
@nav-bar-title-text-color: #fff;
@nav-bar-title-font-size	: .17rem;
@card-thumb-size	: .80rem;
@search-background-color	:#ff6040;
@sidebar-width	:1.18rem;
@sidebar-text-color	:#999;
@sidebar-selected-text-color	: #ff6040;
@sidebar-background-color	:#fff;
@sidebar-selected-border-width: 0;
</style>
