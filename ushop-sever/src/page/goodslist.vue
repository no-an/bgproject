<template>
  <div>
    <van-nav-bar title="小U商城" left-arrow @click-left="$router.back()" />
    <van-search placeholder="按内容搜索" />
    <div class="nav">
      <nav>
        <ul>
          <li v-for="item in navlist" :key="item.id">
            <a :href="item.url" :class="1 == item.id ? 'active' : ''">
              <van-icon name="sort" v-if="item.id == 3" />{{ item.name }}</a
            >
          </li>
        </ul>
        <div class="classing"><van-icon name="filter-o" /> 筛选</div>
      </nav>
    </div>
    <van-card
      @click="$router.push('/detail/' + item.id)"
      v-for="item in goodslist"
      :key="item.id"
      :price="item.price | fixedfloat"
      :title="item.goodsname"
      :thumb="
        item.img ? $imgUrl + item.img : 'https://img.yzcdn.cn/vant/ipad.jpeg'
      "
      :origin-price="item.market_price | fixedfloat"
    />
  </div>
</template>

<script>
import { req_getgoods } from "../util/axios";
export default {
  data() {
    return {
      navlist: [
        {
          id: 1,
          name: "综合推荐",
          url: "#",
        },
        {
          id: 2,
          name: "销量",
          url: "#",
        },
        {
          id: 3,
          name: "价格",
          url: "#",
        },
        {
          id: 4,
          name: "好评度",
          url: "#",
        },
        {
          id: 5,
          name: "店铺",
          url: "#",
        },
      ],
      goodslist: [],
    };
  },
  mounted() {
    req_getgoods(this.$route.params.id).then((res) => {
      if (res.code == 200) {
        this.goodslist = res.list;
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
.nav {
  margin-top: -1px;
  background-image: linear-gradient(#ff6040, #ff8a80);
  position: relative;
  z-index: 1;
}
.nav nav {
  display: flex;
  height: 0.32rem;
  line-height: 0.32rem;
}
.nav nav ul {
  justify-content: space-evenly;
  flex: 1;
  display: flex;
  font-size: 0.16rem;
}
.nav nav ul a {
  position: relative;
  color: #fff;
}
.nav nav ul a.active {
  font-weight: bold;
}
.nav .van-icon {
  float: left;
  top: 7px;
}
/* .nav nav ul a.active::after {
  content: "";
  position: absolute;
  background-color: #fff;
  border-radius: 1px;
  height: 0.02rem;
  width: 80%;
  left: 0.03rem;
  bottom: -0.05rem;
} */
.nav nav .classing {
  padding-left: 0.1rem;
  width: 0.55rem;
  font-size: 0.16rem;
  color: #fff;
  box-shadow: -5px 5px 10px -5px #e63d2e;
}
</style>