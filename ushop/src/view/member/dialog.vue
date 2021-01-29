<template>
  <el-dialog
    title="编辑会员"
    :visible="dialogFormVisible"
    center
    width="500px"
    :before-close="cancel"
  >
    <el-form :model="member" ref="member" :rules="rules">
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="member.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="用户名称"
        :label-width="formLabelWidth"
        prop="nickname"
      >
        <el-input v-model="member.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="member.password" autocomplete="off"></el-input>
        <p>留空则不修改</p>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch
          v-model="member.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="2"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="edit()">编辑</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { getsmember, editmember } from "../../util/axios";
import { Message } from "element-ui";
export default {
  data() {
    return {
      member: {
        nickname: "", //昵称
        phone: "", //手机号
        password: "", //密码
        status: 1, //状态1正常2禁用
      },
      rules: {
        nickname: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入电话号", trigger: "blur"  },
          { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message:'请输入正确格式电话号', trigger:'blur'}
          ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["dialogFormVisible"],
  methods: {
    ...mapActions({
      QUE_memberLIST: "member/QUE_memberLIST",
    }),
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    reset() {
      this.member = {
        nickname: "", //昵称
        phone: "", //手机号
        password: "", //密码
        status: 1, //状态1正常2禁用
      };
      this.$refs["member"].resetFields();
    },
    edit() {
      this.$refs["member"].validate((valid) => {
        if (valid) {
          editmember(this.member)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.QUE_memberLIST();
              } else {
                Message.error(res.data.msg);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          Message.error("匹配错误");
          return false;
        }
      });
      this.cancel();
    },
    memberinfo() {
      getsmember({ uid: this.member.uid })
        .then((res) => {
          if (res.data.code == 200) {
            this.member = { ...res.data.list, uid: this.member.uid };
          } else {
            Message.error(res.data.msg);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
</style>