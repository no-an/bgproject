<template>
  <div class="login">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />
    <div class="cotainer">
      <div class="loginbar">
        <van-image :src="require('../assets/img/pic/logo/orange.png')" />
        <van-form @submit="onSubmit">
          <van-field
            v-model="logininfo.phone"
            name="手机号"
            label="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            v-model="logininfo.password"
            type="password"
            name="密码"
            label="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <p>还没有账户 <router-link to="/register">点击注册</router-link></p>
          <div style="margin: 16px">
            <van-button block type="primary" native-type="submit"
              >提交</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { api_login } from "../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      logininfo: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      api_login(this.logininfo).then((res) => {
        if (res.code == 200) {
          window.sessionStorage.setItem("memberinfo", JSON.stringify(res.list));
          Toast.success(res.msg);
          this.$router.push('./home');
        } else {
          Toast.console.error(res.msg);
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #eaeaea;
  .cotainer {
    flex-grow: 1;
    padding: 10px;
    .loginbar {
      height: 100%;
      background-color: #fff;
      text-align: center;
      .van-image {
        margin-top: 2.44rem;
        padding-bottom: 0.44rem;
      }
      .van-field__label {
        color: #333;
        font-size: 12px;
      }
      p {
        text-align: left;
        padding-top: 0.1rem;
        padding-left: 10px;
        a {
          color: #ff6040;
        }
      }
    }
  }
}
</style>