<template>
  <el-dialog
    :title="title"
    :visible="dialogFormVisible"
    center
    width="500px"
    :before-close="cancel"
  >
    <el-form :model="specs" ref="specs" :rules="rules">
      <el-form-item
        label="规格名称"
        :label-width="formLabelWidth"
        prop="specsname"
      >
        <el-input v-model="specs.specsname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in attrsarr"
        :key="index"
        label="规格属性"
        :label-width="formLabelWidth"
      >
        <el-input
          class="shortinput"
          v-model="attrsarr[index]"
          autocomplete="off"
        ></el-input>
        <el-button type="primary" v-if="!index" @click="addattr"
          >新增规格属性</el-button
        >
        <el-button v-else @click="attrsarr.splice(index, 1)">删除</el-button>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch
          v-model="specs.status"
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
      <el-button type="primary" @click="add()" v-if="title == '添加规格'"
        >确 定</el-button
      >
      <el-button type="primary" @click="edit()" v-else>编辑</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { addspecs, getsspecs, editspecs } from "../../util/axios";
import { Message } from "element-ui";
export default {
  data() {
    return {
      title: "添加规格",
      specs: {
        specsname: "", //商品规格名称
        attrs: "", //商品规格属性值
        status: 1, //状态1正常2禁用
      },
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
      attrsarr: [""],
      formLabelWidth: "80px",
    };
  },
  props: ["dialogFormVisible"],
  computed: {},
  methods: {
    ...mapActions({
      init_specsLIST: "specs/init_specsLIST",
      req_total: "specs/req_total",
    }),
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    reset() {
      this.specs = {
        specsname: "", //商品规格名称
        attrs: "", //商品规格属性值
        status: 1, //状态1正常2禁用
      }
      this.attrsarr = ['']
        this.$refs["specs"].resetFields();
    },
    add() {
      this.$refs["specs"].validate((valid) => {
        if (valid) {
          this.specs.attrs = this.attrsarr.toString();
          addspecs(this.specs)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.init_specsLIST();
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
      this.$refs["specs"].validate((valid) => {
        if (valid) {
          this.specs.attrs = this.attrsarr.toString();
          editspecs(this.specs)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.init_specsLIST();
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
    specsinfo() {
      getsspecs({ id: this.specs.id })
        .then((res) => {
          if (res.data.code == 200) {
            this.specs = { ...res.data.list[0] };
            this.attrsarr = this.specs.attrs;
          } else {
            Message.error(res.data.msg);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addattr() {
      if (this.attrsarr.length < 7) {
        this.attrsarr.push("");
      } else {
        Message.warning("规格条数上限为7条");
      }
    },
  },
  mounted() {},
  watch: {
    dialogFormVisible(value, oldvalue) {
      if (value == true) {
        this.title = !this.specs.id == true ? "添加规格" : "编辑规格";
      }
    },
  },
};
</script>

<style>
.shortinput {
  width: 64%;
}
</style>