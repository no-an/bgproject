<template>
  <div class="container">
    <van-nav-bar title="购物车" left-arrow @click-left="$router.back()" />
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
    <van-swipe-cell v-for="item in cartlist" :key="item.id">
      <div style="display: flex">
        <van-checkbox v-model="item.checked"></van-checkbox>
        <van-card
          :price="item.price"
          :title="item.goodsname"
          :thumb="
            item.img
              ? $imgUrl + item.img
              : 'https://img.yzcdn.cn/vant/ipad.jpeg'
          "
        >
          <template #footer>
            <van-stepper
              v-model="item.num"
              integer
              @plus="change(item.id, 0)"
              @minus="change(item.id, 1)"
              disable-input
            />
          </template>
        </van-card>
      </div>
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          @click="del(item.id)"
        />
      </template>
    </van-swipe-cell>
    <van-submit-bar :price="sumprice" button-text="提交订单">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { get_cartlist, del_cartlist, edit_cartlist } from "../util/axios";
import { Toast } from "vant";
export default {
  computed: {
    sumprice() {
      let sum = 0;
      this.cartlist.forEach((val) => {
        sum += val.checked ? val.num * val.price : 0;
      });
      return sum*100;
    },
    checked: {
      get() {
        return this.cartlist.every((item) => item.checked);
      },
      set(val) {
        this.cartlist.forEach((element) => {
          element.checked = val;
        });
      },
    },
  },
  data() {
    return {
      navlist: [
        {
          id: 1,
          name: "全部",
          url: "#",
        },
        {
          id: 2,
          name: "降价",
          url: "#",
        },
        {
          id: 3,
          name: "常卖",
          url: "#",
        },
        {
          id: 4,
          name: "分类",
          url: "#",
        },
      ],
      uid: "",
      cartlist: [],
    };
  },
  mounted() {
    this.uid = JSON.parse(window.sessionStorage.getItem("memberinfo")).uid;
    this.req_cartlist();
  },
  beforeRouteEnter(to, from, next) {
    if (!window.sessionStorage.getItem("memberinfo")) {
      next("/login");
    } else {
      next();
    }
  },
  methods: {
    del(id) {
      del_cartlist(id).then((res) => {
        Toast.success(res.msg);
        this.req_cartlist();
      });
    },
    req_cartlist() {
      get_cartlist(this.uid).then((res) => {
        if (res.code == 200) {
          console.log(res);
          this.cartlist = res.list.map((val) => {
            return { ...val, checked: false };
          });
        }
      });
    },
    change(id, type) {
      edit_cartlist({
        id,
        type,
      });
    },
  },
};
</script>

<style lang='less' scoped>
.van-submit-bar {
  position: relative;
}
.van-checkbox {
  padding-left: 0.1rem;
  background-color: #fafafa;
}
.van-card {
  flex-grow: 1;
  padding-left: 0.1rem;
}
.delete-button {
  height: 100%;
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