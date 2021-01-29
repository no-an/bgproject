<template>
  <div>
    <van-nav-bar title="小U商城" left-arrow @click-left="$router.back()" />
    <div class="nav">
      <div class="option">
        <i class="iconfont icon-location"></i>
        <a><img src="../assets/img/pic/logo/white.png" alt="" /></a>
        <div class="searchbar">
          <i class="iconfont icon-sousuo"></i
          ><input type="text" placeholder="按内容搜索" />
        </div>
        <i class="iconfont icon-store"></i>
      </div>
      <nav>
        <ul>
          <li v-for="item in navlist" :key="item.id">
            <a :href="item.url" :class="1 == item.id ? 'active' : ''">{{
              item.name
            }}</a>
          </li>
        </ul>
        <div class="classing"><i class="iconfont icon-fenlei"></i> 分类</div>
      </nav>
    </div>
    <van-swipe :autoplay="1500">
      <van-swipe-item v-for="(image, index) in banner_images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="5" :border="false">
      <van-grid-item v-for="item in kingkong" :key="item.key">
        <van-image :src="item.img" />
        <p>{{ item.title }}</p>
      </van-grid-item>
    </van-grid>
    <plate />
    <van-tabs v-model="active">
      <van-tab title="热卖">
        <van-card
          @click="$router.push('/detail/' + item.id)"
          v-for="item in goodslist[0] ? goodslist[0].content : []"
          :key="item.id"
          :price="item.price | fixedfloat"
          tag="热卖"
          :title="item.goodsname"
          :thumb="
            item.img
              ? $imgUrl + item.img
              : 'https://img.yzcdn.cn/vant/ipad.jpeg'
          "
          :origin-price="item.market_price | fixedfloat"
        />
      </van-tab>
      <van-tab title="新品">
        <van-card
          @click="$router.push('/detail/' + item.id)"
          v-for="item in goodslist[1] ? goodslist[1].content : []"
          :key="item.id"
          :price="item.price | fixedfloat"
          tag="热卖"
          :title="item.goodsname"
          :thumb="
            item.img
              ? $imgUrl + item.img
              : 'https://img.yzcdn.cn/vant/ipad.jpeg'
          "
          :origin-price="item.market_price | fixedfloat"
        />
      </van-tab>
      <van-tab title="所有商品"
        ><van-card
          @click="$router.push('/detail/' + item.id)"
          v-for="item in goodslist[2] ? goodslist[2].content : []"
          :key="item.id"
          :price="item.price | fixedfloat"
          :title="item.goodsname"
          :thumb="
            item.img
              ? $imgUrl + item.img
              : 'https://img.yzcdn.cn/vant/ipad.jpeg'
          "
          :origin-price="item.market_price | fixedfloat"
      /></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import plate from "../components/plate.vue";
import { req_banner, req_goodslist } from "../util/axios";
import { Toast } from "vant";
export default {
  components: { plate },
  data() {
    return {
      active: 0,
      navlist: [
        {
          id: 1,
          name: "推荐",
          url: "#",
        },
        {
          id: 2,
          name: "女装",
          url: "#",
        },
        {
          id: 3,
          name: "鞋包",
          url: "#",
        },
        {
          id: 4,
          name: "居家",
          url: "#",
        },
        {
          id: 5,
          name: "母婴",
          url: "#",
        },
        {
          id: 6,
          name: "美妆",
          url: "#",
        },
      ],
      banner_images: [],
      kingkong: [
        {
          id: 1,
          img: require("../assets/img/icon/index/kingkong/seckill.png"),
          title: "限时秒杀",
        },
        {
          id: 2,
          img: require("../assets/img/icon/index/kingkong/top.png"),
          title: "畅销商品",
        },
        {
          id: 3,
          img: require("../assets/img/icon/index/kingkong/brand.png"),
          title: "品质大牌",
        },
        {
          id: 4,
          img: require("../assets/img/icon/index/kingkong/selfsupport.png"),
          title: "小U自营",
        },
        {
          id: 5,
          img: require("../assets/img/icon/index/kingkong/integral.png"),
          title: "积分商城",
        },
      ],
      goodslist: [],
    };
  },
  mounted() {
    req_banner().then((req) => {
      if (req.code == 200) {
        this.banner_images = req.list
          .filter((val) => val.status === 1)
          .map((val) => this.$imgUrl + val.img);
      } else {
        Toast(req.msg);
      }
    });
    req_goodslist().then((req) => {
      if (req.code == 200) {
        this.goodslist = req.list;
      } else {
        Toast(req.msg);
      }
    });
  },
  methods: {},
};
</script>

<style scoped>
@import url("//at.alicdn.com/t/font_2317808_pca69xgi9oe.css");
.van-card {
  width: 50%;
  display: inline-block;
}
.van-grid-item p {
  font-size: 10px;
  color: #333;
  margin-top: 0.05rem;
}
.nav {
  margin-top: -1px;
  height: 0.8rem;
  background-image: linear-gradient(#ff6040, #ff8a80);
  position: relative;
  z-index: 1;
}
.nav .option {
  line-height: 0.32rem;
  height: 0.32rem;
  display: flex;
  justify-content: space-evenly;
}
.nav .option .icon-location {
  font-size: 22px;
  color: #fff;
}
.nav .option .icon-store {
  color: #fff;
  font-size: 0.2rem;
}
.nav .option .searchbar {
  width: 2rem;
  height: 0.32rem;
  background-color: #fff;
  border: 1px solid #e6e6e6;
}
.nav .option .searchbar i {
  font-size: 0.25rem;
  color: #999;
  vertical-align: 0.22rem;
}
.nav .option .searchbar input {
  width: 1.5rem;
  margin-left: 0.02rem;
  vertical-align: 0.26rem;
  border: none;
  font-size: 0.14rem;
}
.nav .option img {
  width: 0.91rem;
  height: 0.24rem;
  vertical-align: 0.19rem;
}
.nav nav {
  display: flex;
  margin-top: 0.16rem;
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
.nav nav ul a.active::after {
  content: "";
  position: absolute;
  background-color: #fff;
  border-radius: 1px;
  height: 0.02rem;
  width: 80%;
  left: 0.03rem;
  bottom: -0.05rem;
}
.nav nav .classing {
  padding-left: 0.1rem;
  width: 0.55rem;
  font-size: 0.16rem;
  color: #fff;
  box-shadow: -5px 5px 10px -5px #e63d2e;
}
.van-swipe img {
  margin: auto;
  display: block;
  margin-top: 0.08rem;
}
</style>