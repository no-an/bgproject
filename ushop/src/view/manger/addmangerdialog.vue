<template>
  <el-dialog
    :title="title"
    :visible="dialogFormVisible"
    center
    width="500px"
    :before-close="cancel"
  >
    <el-form :model="manger" ref="manger" :rules="rules">
      <el-form-item
        label="所属角色"
        :label-width="formLabelWidth"
        prop="roleid"
      >
        <el-select v-model="manger.roleid" placeholder="请选择">
          <el-option
            v-for="item in GET_roleLIST"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="用户名称"
        :label-width="formLabelWidth"
        prop="username"
      >
        <el-input v-model="manger.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input
          v-model="manger.password"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch
          v-model="manger.status"
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
      <el-button type="primary" @click="add()" v-if="title == '添加管理员'"
        >确 定</el-button
      >
      <el-button type="primary" @click="edit()" v-else>编辑</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addmanger, getsmanger, editmanger } from "../../util/axios";
import { Message } from "element-ui";
export default {
  data() {
    return {
      title: "添加管理员",
      manger: {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 16, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        roleid: [{ required: true, message: "请选择所属角色" }],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["dialogFormVisible"],
  computed: {
    ...mapGetters({
      GET_roleLIST: "role/GET_roleLIST",
    }),
  },
  methods: {
    ...mapActions({
      QUE_roleLIST: "role/QUE_roleLIST",
      init_mangerLIST: "manger/init_mangerLIST",
      req_total: "manger/req_total",
    }),
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    reset() {
      this.manger = {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      };
      this.$refs["manger"].resetFields();
    },
    add() {
      this.$refs["manger"].validate((valid) => {
        if (valid) {
          addmanger(this.manger)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.init_mangerLIST();
                this.req_total();
              } else {
                Message.error(res.data.msg);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          this.$Message.error("匹配错误");
          return false;
        }
      });
      this.cancel();
    },
    edit() {
      this.$refs["manger"].validate((valid) => {
        if (valid) {
          editmanger(this.manger)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.init_mangerLIST();
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
    mangerinfo() {
      getsmanger({ uid: this.manger.uid })
        .then((res) => {
          if (res.data.code == 200) {
            this.manger = { ...res.data.list, uid: this.manger.uid };
            this.manger = ''
          } else {
            Message.error(res.data.msg);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.QUE_roleLIST();
  },
  watch: {
    dialogFormVisible(value, oldvalue) {
      if (value == true) {
        this.title = !this.manger.uid == true ? "添加管理员" : "编辑管理员";
      }
    },
  },
};
</script>

<style>
</style>