<template>
  <div>
    <van-nav-bar title="分类" />
    <van-search placeholder="按内容搜索" />
    <div class="cotainer">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          :title="item.catename"
          v-for="item in cate"
          :key="item.id"
        />
      </van-sidebar>
      <van-grid :column-num="3" :border="false">
        <van-grid-item
          v-for="item in cate[activeKey] ? cate[activeKey].children : []"
          :key="item.id"
          :to="'/goodslist/' + item.id"
        >
          <van-image
            :src="
              item.img
                ? $imgUrl + item.img
                : 'https://img.yzcdn.cn/vant/ipad.jpeg'
            "
          />
          <p>{{ item.catename }}</p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { req_catetree } from "../util/axios";
export default {
  data() {
    return {
      activeKey: 0,
      cate: [],
    };
  },
  mounted() {
    req_catetree().then((res) => {
      if (res.code == 200) {
        console.log(res);
        this.cate = res.list;
      }
    });
  },
};
</script>

<style>
.van-search {
  position: relative;
  z-index: 1;
  margin-top: -1px;
}

.van-sidebar {
  flex-shrink: 0;
  text-align: center;
}

.cotainer {
  display: flex;
}

.van-grid-item p {
  color: #999;
}
</style>