<template>
  <el-dialog
    :title="title"
    :visible="dialogFormVisible"
    center
    width="500px"
    :before-close="cancel"
  >
    <el-form :model="classify" ref="classify" :rules="rules">
      <el-form-item label="所属分类" :label-width="formLabelWidth" prop="pid">
        <el-select v-model="classify.pid" placeholder="请选择">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option
            v-for="item in GET_cateLIST"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="分类名称"
        :label-width="formLabelWidth"
        prop="catename"
      >
        <el-input v-model="classify.catename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        v-if="classify.pid"
        label="图片"
        :label-width="formLabelWidth"
        prop="img"
      >
        <el-upload
          :limit="1"
          action="#"
          :auto-upload="false"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="handelchange"
          :on-exceed="handleexceed"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch
          v-model="classify.status"
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
      <el-button type="primary" @click="add" v-if="title == '添加分类'"
        >确 定</el-button
      >
      <el-button type="primary" @click="edit()" v-else>编辑</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Message } from "element-ui";
import { addcate, getscate, editcate } from "../../util/axios";
export default {
  data() {
    return {
      title: "添加分类",
      classify: {
        pid: 0, //上级分类编号
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      },
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择所属父类", trigger: "change" }],
      },
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false,
      imgurl: "",
      fileList: [],
    };
  },
  props: ["dialogFormVisible"],
  computed: {
    ...mapGetters({
      GET_cateLIST: "cate/GET_cateLIST",
    }),
  },
  methods: {
    ...mapActions({
      QUE_cateLIST: "cate/QUE_cateLIST",
    }),
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    handleexceed() {
      Message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    reset() {
      this.classify = {
        pid: 0, //上级分类编号
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      };
      this.fileList = [];
      this.$refs["classify"].resetFields();
    },
    handelchange(file) {
      this.imgurl = file.raw;
      // console.log(this.filelist);
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    add() {
      console.log(1);
      this.$refs["classify"].validate((valid) => {
        if (valid) {
          let file = new FormData();
          this.classify.img = this.imgurl;
          for (let item in this.classify) {
            file.append(item, this.classify[item]);
            // console.log(item, this.classify[item]);
          }
          addcate(file)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.QUE_cateLIST();
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
      this.$refs["classify"].validate((valid) => {
        if (valid) {
          let file = new FormData();
          this.classify.img = this.imgurl ? this.imgurl : this.classify.img;
          for (let item in this.classify) {
            file.append(item, this.classify[item]);
          }
          editcate(file)
            .then((res) => {
              if (res.data.code == 200) {
                this.QUE_cateLIST();
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
    classifyinfo() {
      getscate({ id: this.classify.id })
        .then((res) => {
          if (res.data.code == 200) {
            this.classify = { ...res.data.list, id: this.classify.id };
            this.fileList = this.classify.img
              ? [{ url: this.$imgUrl + this.classify.img }]
              : [];
            console.log(this.fileList);
          } else {
            Message.error(res.data.msg);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {},
  watch: {
    dialogFormVisible(value, oldvalue) {
      if (value == true) {
        this.title = !this.classify.id == true ? "添加分类" : "编辑分类";
      }
    },
  },
};
</script>

<style>
</style>