<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    center
    width="500px"
    :before-close="cancel"
  >
    <el-form :model="menu" ref="menu" :rules="rules">
      <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="title">
        <el-input v-model="menu.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" :label-width="formLabelWidth" prop="pid">
        <el-select v-model="menu.pid" placeholder="请选择上级菜单">
          <el-option label="根目录" :value="0"></el-option>
          <el-option
            v-for="item in options"
            :key="item.title"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型" :label-width="formLabelWidth">
        <el-radio v-model="menu.type" :label="1">目录</el-radio>
        <el-radio v-model="menu.type" :label="2">菜单</el-radio>
      </el-form-item>
      <el-form-item
        label="菜单地址"
        :label-width="formLabelWidth"
        v-show="menu.type == 2"
      >
        <el-select v-model="menu.url">
          <el-option
            v-for="item in childrenRoute"
            :key="item.path"
            :label="item.name"
            :value="item.path"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单图标" :label-width="formLabelWidth">
        <el-select v-model="menu.icon">
          <el-option
            style="display: block"
            v-for="item in icons"
            :key="item"
            :label="item"
            :value="item"
            :class="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch
          v-model="menu.status"
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
      <el-button type="primary" @click="add()" v-if="title == '添加菜单'"
        >确 定</el-button
      >
      <el-button type="primary" @click="edit()" v-else>编辑</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { Message } from "element-ui";
import { childrenRoute } from "../../router";
import { addmenu, editmenu } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      title: "添加菜单",
      menu: {
        pid: 0, //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "80px",
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
      },
      icons: [
        "el-icon-menu",
        "el-icon-s-grid",
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
      ],
      childrenRoute,
    };
  },
  methods: {
    ...mapActions({ QUE_MENULIST: "menu/QUE_MENULIST" }),
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    reset() {
      this.menu = {
        pid: 0, //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      };
    },
    add() {
      this.$refs["menu"].validate((valid) => {
        if (valid) {
          addmenu(this.menu)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.QUE_MENULIST();
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
      this.$refs["menu"].validate((valid) => {
        if (valid) {
          editmenu(this.menu)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.QUE_MENULIST();
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
  },
  props: ["dialogFormVisible"],
  computed: {
    ...mapGetters({ GET_MENULIST: "menu/GET_MENULIST" }),
    options() {
      return (
        this.GET_MENULIST &&
        this.GET_MENULIST.filter((item) => {
          return item.type == 1;
        })
      );
    },
  },
  watch: {
    dialogFormVisible(value, oldvalue) {
      if (value == true) {
        this.title = this.menu.id ? "编辑菜单" : "添加菜单";
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