<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    center
    width="500px"
    :before-close="cancel"
  >
    <el-form :model="roleform" ref="roleform" :rules="rules">
      <el-form-item
        label="角色名称"
        :label-width="formLabelWidth"
        prop="rolename"
      >
        <el-input v-model="roleform.rolename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" :label-width="formLabelWidth">
        <el-tree
          check-strictly
          ref="tree"
          :data="GET_MENULIST"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps"
        >
        </el-tree
      ></el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch
          v-model="roleform.status"
          active-color="#13ce66"
          inactive-color="#eaeaea"
          :active-value="1"
          :inactive-value="2"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="add()" v-if="title == '添加角色'"
        >确 定</el-button
      >
      <el-button type="primary" @click="edit()" v-else>编辑</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Message } from "element-ui";
import { addrole, editrole, getsrole } from "../../util/axios";
export default {
  data() {
    return {
      title: "添加菜单",
      roleform: {
        rolename: "", //角色名称
        menus: "", //角色权限//菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]'
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "80px",
      rules: {
        rolename: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    ...mapActions({
      QUE_MENULIST: "menu/QUE_MENULIST",
      QUE_roleLIST: "role/QUE_roleLIST",
    }),

    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    reset() {
      this.roleform = {
        rolename: "", //角色名称
        menus: "", //角色权限//菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]'
        status: 1, //状态1正常2禁用
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    add() {
      this.$refs["roleform"].validate((valid) => {
        if (valid) {
          this.roleform.menus = this.$refs.tree.getCheckedKeys().toString();
          addrole(this.roleform)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.QUE_roleLIST();
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
    edit() {
      this.$refs["roleform"].validate((valid) => {
        if (valid) {
          this.roleform.menus = this.$refs.tree.getCheckedKeys().toString();
          editrole(this.roleform)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.QUE_roleLIST();
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
    roleinfo() {
      getsrole({ id: this.roleform.id })
        .then((res) => {
          if (res.data.code == 200) {
            this.roleform = { ...res.data.list, id: this.roleform.id };
            this.$refs.tree.setCheckedKeys(this.roleform.menus.split(","));
          } else {
            Message.error(res.data.msg);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  props: ["dialogFormVisible"],
  computed: {
    ...mapGetters({
      GET_MENULIST: "menu/GET_MENULIST",
    }),
  },
  watch: {
    dialogFormVisible(value, oldvalue) {
      if (value == true) {
        this.title = this.roleform.id ? "编辑角色" : "添加角色";
      }
    },
  },
  mounted() {
    this.QUE_MENULIST();
  },
};
</script>

<style>
</style>