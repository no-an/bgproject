<template>
  <div class="plate">
    <section class="seckill">
      <a href="javascript:;">查看更多&gt;</a>
      <h3>{{ seckill.title }}</h3>
      <p class="info">{{ seckill.info }}</p>
      <p class="time">
        <time>{{ seckill.h | _0n }}</time
        ><strong class="colon"><i></i><i></i></strong
        ><time>{{ seckill.m | _0n }}</time
        ><strong class="colon"><i></i><i></i></strong
        ><time>{{ seckill.s | _0n }}</time>
      </p>
    </section>
    <div class="right">
      <section class="news">
        <h3>{{ news.title }}</h3>
        <p class="info">{{ news.info }}</p>
        <p class="option">
          <span>{{ news.option }}</span> <i>&gt;</i>
        </p>
      </section>
      <section class="daygood">
        <h3>{{ daygood.title }}</h3>
        <p class="info">{{ daygood.info }}</p>
        <p class="option">
          <span>{{ daygood.option }}</span> <i>&gt;</i>
        </p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seckill: {
        title: "限时秒杀",
        info: "每天0点整，好货秒不停",
        h: 0,
        m: 0,
        s: 0,
        timer: 0,
      },
      news: {
        title: "品牌上新",
        info: "9点整 抢大牌",
        option: "疯抢红包",
      },
      daygood: {
        title: "日用好物",
        info: "愿君多采撷",
        option: "塞满奖劵",
      },
    };
  },
  created() {
    let now = new Date();
    [this.seckill.h, this.seckill.m, this.seckill.s] = [
      23 - now.getHours(),
      59 - now.getMinutes(),
      59 - now.getSeconds(),
    ];
    this.seckill.timer = window.setInterval(() => {
      if (!this.seckill.s--) {
        this.seckill.s = 59;
        if (!this.seckill.m--) {
          this.seckill.m = 59;
          if (!this.seckill.h--) {
            [this.seckill.h, this.seckill.m, this.seckill.s] = [23, 59, 59];
          }
        }
      }
    }, 1000);
  },
  destroyed() {
    window.clearInterval(this.seckill.timer);
  },
  filters: {
    _0n(num, n) {
      num = num + "";
      return n > 0 ? num.padStart(n, "0") : num.padStart(2, "0");
    },
  },
};
</script>

<style lang='less' scoped>
.plate {
  padding: 0 10px;
  margin-bottom: 0.1rem;
  display: flex;
  justify-content: space-between;
  letter-spacing: 0.2em;
}
.plate h3 {
  margin-bottom: 0.1rem;
  font-weight: bold;
  font-size: 0.16rem;
}
.plate .info {
  font-size: 0.12rem;
  transform: scale(0.83);
  transform-origin: left;
  margin-bottom: 0.05rem;
}
.plate section {
  padding-left: 0.1rem;
  padding-top: 0.1rem;
}
.plate .seckill {
  width: 1.65rem;
  height: 1.65rem;
  background-image: url('../assets/img/pic/plate/index/kingkong/big.png');
}
.plate .seckill a {
  float: right;
  transform: scale(0.8333);
  line-height: 0.16rem;
}
.plate .seckill h3 {
  color: #85a642;
}
.plate .seckill .info {
  color: #b1cc7a;
}
.plate .seckill .time {
  font-size: 12px;
}
.plate .seckill .time .colon {
  margin-left: -0.16rem;
  padding-left: 0.04rem;
  padding-right: 0.05rem;
}
.plate .seckill .time .colon i {
  width: 1px;
  height: 1px;
  border-radius: 50%;
  display: inline-block;
  background-color: #85a642;
}
.plate .seckill .time .colon i:last-child {
  background-color: #b1cc7a;
}
.plate .seckill .time time {
  font-weight: bold;
  line-height: 0.18rem;
  text-align: center;
  color: #fff;
  width: 0.32rem;
  display: inline-block;
  height: 0.18rem;
  transform: scaleX(0.5);
  transform-origin: left;
  background-image: linear-gradient(#85a642, #b1cc7a);
}
.plate .right {
  width: 1.75rem;
  height: 1.75rem;
}
.plate .right .option {
  width: 0.6rem;
  height: 0.2rem;
  letter-spacing: -0.1em;
  color: #fff;
  line-height: 0.2rem;
  padding-left: 0.05rem;
  border-radius: 0 0.1rem 0.1rem 0;
}
.plate .right .option i {
  font-size: 0.16rem;
}
.plate .right section {
  width: 1.65rem;
  height: 0.75rem;
}
.plate .right .news {
  margin-bottom: 0.05rem;
  background-image: url("../assets/img/pic/plate/index/kingkong/small.png");
}
.plate .right .news h3 {
  color: #ff6040;
}
.plate .right .news .info {
  color: #ff9580;
}
.plate .right .news .option {
  background-image: linear-gradient(#ff6040, #ff9f80);
}
.plate .right .daygood {
  background-image: url("../assets/img/pic/plate/index/kingkong/small/02.png");
}
.plate .right .daygood h3 {
  color: #af40ff;
}
.plate .right .daygood .info {
  color: #ca80ff;
}
.plate .right .daygood .option {
  background-image: linear-gradient(#af40ff, #ca80ff);
}
</style>