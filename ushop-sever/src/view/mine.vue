<template>
  <div class="mine">
    <template v-if="userinfo.username">
      <van-nav-bar title="小U商城" left-arrow @click-left="$router.back()" />
      <header class="userinfo-wrap">
        <div class="userinfo">
          <div class="userinfo-left">
            <img :src="userinfo.head" />
            <div class="img-right">
              <p class="username">{{ userinfo.username }}</p>
              <span class="tocomplate"
                ><span class="smallfont">完善资料让小U更懂你</span>
              </span>
            </div>
          </div>
          <div class="userinfo-right">
            <span class="smallfont">每日签到</span>
          </div>
        </div>
        <ul class="userdata">
          <li>
            <p>{{ userdata.star }}</p>
            <p><span class="smallfont">我的收藏</span></p>
          </li>
          <li>
            <p>{{ userdata.history }}</p>
            <p><span class="smallfont">浏览记录</span></p>
          </li>
          <li>
            <p><i class="icon">￥</i>{{ userdata.redmoney }}</p>
            <p><span class="smallfont">我的红包</span></p>
          </li>
          <li>
            <p>{{ userdata.preferential }}</p>
            <p><span class="smallfont">优惠券</span></p>
          </li>
        </ul>
        <section class="order">
          <h3>我的订单</h3>
          <a href="javascript:;"
            >全部订单 <i class="icon-iconfontjiantou3 iconfont"></i
          ></a>
          <ul class="orderoption">
            <li v-for="item in order" :key="item.icon">
              <img :src="item.icon" alt="" />
              <p>
                <span class="smallfont">{{ item.text }}</span>
              </p>
            </li>
          </ul>
        </section>
      </header>
      <ul class="function">
        <li>
          <img src="../assets/img/icon/user/function/address.png" />地址管理
          <i class="icon-iconfontjiantou3 iconfont"></i>
        </li>
        <li>
          <img src="../assets/img/icon/user/function/wallet.png" />我的钱包
          <i class="sum"
            >剩余{{ functionn.sum }}U币<i
              class="icon-iconfontjiantou3 iconfont"
            ></i
          ></i>
        </li>
        <li>
          <img src="../assets/img/icon/user/function/QR_code.png" />我的二维码
          <i class="icon-iconfontjiantou3 iconfont"></i>
        </li>
        <li>
          <img src="../assets/img/icon/user/function/partner.png" />我的小伙伴
          <i class="icon-iconfontjiantou3 iconfont"></i>
        </li>
        <li>
          <img src="../assets/img/icon/user/function/free.png" />0元使用
          <i class="icon-iconfontjiantou3 iconfont"></i>
        </li>
      </ul>
    </template>
    <van-empty description="还未登录" v-else>
      <van-button round type="primary" class="bottom-button" @click='$router.push("/login")'>登录</van-button>
    </van-empty>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {
        head: require("../assets/img/icon/user/head/head.jpg"),
        username: '',
      },
      userdata: {
        star: 12,
        history: 12,
        redmoney: 0,
        preferential: 12,
      },
      order: [
        {
          icon: require("../assets/img/icon/user/order/payment.png"),
          text: "待付款",
        },
        {
          icon: require("../assets/img/icon/user/order/delivery.png"),
          text: "待收货",
        },
        {
          icon: require("../assets/img/icon/user/order/evaluation.png"),
          text: "评价",
        },
        {
          icon: require("../assets/img/icon/user/order/service.png"),
          text: "售后/退款",
        },
      ],
      functionn: {
        sum: 200,
      },
    };
  },
  mounted() {
    this.userinfo.username=window.sessionStorage.getItem? JSON.parse(window.sessionStorage.getItem('memberinfo')).nickname :''
  },
};
</script>

<style lang='less', scoped>
.bottom-button {
    width: 160px;
    height: 40px;
  }
@import url("//at.alicdn.com/t/font_2317808_xsgku0ouqy.css");
.smallfont {
  transform-origin: left;
  transform: scale(0.8333);
  display: inline-block;
}
.mine {
  background-color: #eaeaea;
  height: 100vh;
  width: 3.75rem;
  margin-left: auto;
  margin-right: auto;
  .userinfo-wrap {
    height: 2.1rem;
    background-image: linear-gradient(#ff6040, #ff8a80);
    .userinfo {
      padding-left: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .userinfo-left {
        img {
          width: 0.64rem;
          height: 0.64rem;
          border-radius: 50%;
        }
        .img-right {
          float: right;
          margin-left: 0.1rem;
          .username {
            margin-top: 0.1rem;
            font-size: 0.18rem;
            color: #fff;
          }
          span.smallfont {
            position: absolute;
          }
          span.tocomplate {
            width: 1.11rem;
            padding-left: 0.03rem;
            height: 0.16rem;
            line-height: 0.16rem;
            display: inline-block;
            border: 0.5px solid #fff;
            color: #fff;
            border-radius: 1px;
            font-size: 0.1rem;
            margin-top: 0.1rem;
          }
        }
      }
      .userinfo-right {
        background-image: url("../assets/img/icon/red_envelopes.png");
        background-repeat: no-repeat;
        width: 0.53rem;
        height: 0.2rem;
        line-height: 0.2rem;
        padding-left: 0.26rem;
        color: #ff6243;
        background-color: #ffd4cc;
        background-position: 5px;
        font-size: 10px;
        border-radius: 0.1rem 0 0 0.1rem;
      }
    }
    .userdata {
      color: #fff;
      display: flex;
      padding: 0 0.435rem;
      justify-content: space-between;
      text-align: center;
      li {
        padding: 0.15rem 0;
        p {
          font-size: 0.14rem;
        }
        .icon {
          font-size: 0.12rem;
          transform: scale(0.7);
          display: inline-block;
        }
      }
      .smallfont {
        font-size: 0.12rem;
        margin-top: 0.05rem;
        transform-origin: center;
      }
    }
    .order {
      padding: 0.1rem;
      width: 3.35rem;
      height: 0.83rem;
      position: absolute;
      background-color: #fff;
      margin: 0 0.1rem;
      border-radius: 0.04rem;
      h3 {
        font-size: 0.16rem;
        float: left;
        font-weight: bold;
      }
      a {
        margin-top: 0.06rem;
        float: right;
        color: #ff6040;
        i {
          font-size: 0.12rem;
        }
      }
      .orderoption {
        margin-top: 0.31rem;
        display: flex;
        justify-content: space-between;
        text-align: center;
        li {
          flex: 1;
          .smallfont {
            margin-top: 0.05rem;
            transform-origin: center;
          }
        }
      }
    }
  }
  .function {
    display: flex;
    flex-direction: column;
    margin-top: 0.36rem;
    height: 2rem;
    background-color: #fff;
    justify-content: space-evenly;
    padding: 0 0.1rem;
    line-height: 0.16rem;
    img {
      margin-right: 0.05rem;
    }
    .iconfont {
      float: right;
      font-size: 6px;
      color: #666;
    }
    .sum {
      color: #666;
      float: right;
    }
  }
}
</style>