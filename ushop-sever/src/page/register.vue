<template>
  <div class="login">
    <van-nav-bar title="注册" left-arrow @click-left="$router.back()" />
    <div class="cotainer">
      <div class="loginbar">
        <van-image :src="require('../assets/img/pic/logo/orange.png')" />
        <van-form @submit="onSubmit">
          <van-field
            v-model="registerinfo.phone"
            name="手机号"
            label="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            v-model="registerinfo.nickname"
            name="昵称"
            label="昵称"
            :rules="[{ required: true, message: '请填写昵称' }]"
          />
          <van-field
            v-model="registerinfo.password"
            type="password"
            name="密码"
            label="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px">
            <van-button  block type="primary" native-type="submit"
              >提交</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { api_register } from '../util/axios'
export default {
  data(){
    return{
      registerinfo:{
        phone:'',
        nickname:'',
        password:''
      }
    }
  },
  methods:{
    onSubmit(){
      api_register(this.registerinfo)
      .then(res=>{
        if(res.code==200){
          Toast.success(res.msg);
          this.$router.push('login')
        }else{
          Toast.fail(res.msg);
        }
      }
      )
    }
  }
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
        margin-top: 2.04rem;
        padding-bottom: .44rem;
      }
      .van-field__label{
        color:#333;
        font-size: 12px;
      }
      p{
        text-align: left;
        padding-top: .1rem;
        padding-left: 10px;
        a{
          color: #ff6040;
        }
      }
    }
  }
}
</style>