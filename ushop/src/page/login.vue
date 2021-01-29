<template>
  <div class="login">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Message } from "element-ui";
import { userlogin } from "../util/axios"
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(['CHANGE_USERINFO_action']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userlogin(this.form)
          .then(res=>{
            if(res.data.code == 200){
              window.sessionStorage.setItem('userinfo', JSON.stringify(res.data.list)),
              this.CHANGE_USERINFO_action(res.data.list)
              Message.success(res.data.msg)
              this.$router.push('/index')
            }else{
              Message.error(res.data.msg)
            }
          })
          .catch(e=>{console.log(e);})
          // this.$router.push('/index')
        } else {
          this.$message.error(res.data.msg);
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-form {
  padding-top: 60px;
  width: 300px;
  height: 200px;
  padding-right: 30px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
}

.login {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}
</style>