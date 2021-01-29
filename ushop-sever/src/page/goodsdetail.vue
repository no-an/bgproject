<template>
  <div class="container">
    <van-nav-bar
      :title="goodsinfo.goodsname"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="nav">
      <nav>
        <ul>
          <li v-for="item in navlist" :key="item.id">
            <a :href="item.url" :class="1 == item.id ? 'active' : ''">
              {{ item.name }}</a
            >
          </li>
        </ul>
      </nav>
    </div>
    <van-image
      width="3.75rem"
      height="3.75rem"
      :src="
        goodsinfo.img
          ? $imgUrl + goodsinfo.img
          : 'https://img.yzcdn.cn/vant/ipad.jpeg'
      "
    />
    <div class="ainfo">
      <p class="price">
        <span><i>￥</i>{{ goodsinfo.price }}</span
        ><del>￥{{ goodsinfo.market_price }}</del
        ><i style="float: right"><van-icon name="star-o" />收藏</i>
      </p>
      <h3 class="title">{{ goodsinfo.goodsname }}</h3>
    </div>
    <div class="para">
      <span class="goodsname">购买数量</span>
      <van-stepper v-model="num" />
    </div>
    <p class="goodsname">商品属性</p>
    <div class="para">
      <span class="goodsname"> {{ goodsinfo.specsname }} </span>
      <div>
        <van-tag
          v-for="attr in goodsinfo.specsattr?goodsinfo.specsattr.split(','):[]"
          :key="attr"
          type="success"
          >{{ attr }}</van-tag
        >
      </div>
    </div>
    <p class="goodsname">商品详情</p>
    <div class="des" v-html="goodsinfo.description || '暂无简述'"></div>
    <van-goods-action>
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="$router.push('/cart')"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addcart"
      />
      <van-goods-action-button type="danger" text="立即购买" @click="nowbuy" />
    </van-goods-action>
  </div>
</template>

<script>
import { req_getgood, add_cartlist } from "../util/axios";
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      num: 0,
      navlist: [
        {
          id: 1,
          name: "商品",
          url: "#",
        },
        {
          id: 2,
          name: "评价",
          url: "#",
        },
        {
          id: 3,
          name: "详情",
          url: "#",
        },
        {
          id: 4,
          name: "推荐",
          url: "#",
        },
      ],
      goodsinfo: {},
    };
  },
  methods: {
    addcart() {
      if (window.sessionStorage.getItem("memberinfo")) {
        add_cartlist({
          uid: JSON.parse(sessionStorage.getItem("memberinfo")).uid,
          num: this.num,
          goodsid: this.goodsinfo.id,
        })
        .then(res=>{
          if(res.code == 200){
            Toast.success(res.msg)
          }else{
            Toast.fail(res.msg)
          }
        })
      } else {
        this.$router.push("/login");
      }
    },
    nowbuy() {
      Dialog.alert({message:'暂无订单页'}).then(()=>{})
    },
  },
  mounted() {
    req_getgood(this.$route.params.id).then((res) => {
      if (res.code == 200) {
        this.goodsinfo = res.list[0];
      }
    });
  },
};
</script>

<style lang='less' scoped>
.container {
  padding-bottom: 0.55rem;
}
.para {
  padding: 0.05rem 0.1rem 0;
  display: flex;
  justify-content: space-between;
  span {
    font-size: 16px;
    &.van-tag {
      font-size: 12px;
    }
  }
}
p.goodsname {
  font-weight: bold;
  font-size: 18px;
  margin-top: 0.08rem;
  padding-bottom: 0.05rem;
}
.ainfo {
  padding: 0 10px;
  .price {
    font-size: 14px;
    span {
      color: #ff6040;
      font-size: 30px;
      i {
        font-size: 14px;
      }
    }
    del {
      color: #999;
    }
    i {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      transform-origin: top;
      transform: scale(0.833);
    }
  }
  h3 {
    font-size: 16px;
    padding-top: 10px;
  }
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
</style>