<template>
  <el-dialog
    :title="title"
    :visible="dialogFormVisible"
    center
    width="500px"
    :before-close="cancel"
  >
    <el-form :model="banner" ref="banner" :rules="rules">
      <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
        <el-input v-model="banner.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
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
          v-model="banner.status"
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
      <el-button type="primary" @click="add()" v-if="title == '添加轮播图'"
        >确 定</el-button
      >
      <el-button type="primary" @click="edit()" v-else>编辑</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addbanner, getsbanner, editbanner } from "../../util/axios";
import { Message } from "element-ui";
export default {
  data() {
    return {
      title: "添加轮播图",
      banner: {
        title: "", //轮播图名称
        img: "", //图片(文件)
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" },
        ]
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
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      QUE_bannerLIST: "banner/QUE_bannerLIST",
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
      this.banner = {
        title: "", //轮播图名称
        img: "", //图片(文件)
        status: 1, //状态1正常2禁用
      };
      this.fileList = [],
      this.$refs["banner"].resetFields();
    },
    add() {
      this.$refs["banner"].validate((valid) => {
        if (valid) {
          this.banner.img = this.imgurl
          addbanner(this.banner)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.QUE_bannerLIST();
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
      this.$refs["banner"].validate((valid) => {
        if (valid) {
          editbanner(this.banner)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.QUE_bannerLIST();
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
    bannerinfo() {
      getsbanner({ id: this.banner.id })
        .then((res) => {
          if (res.data.code == 200) {
            this.banner = { ...res.data.list, id: this.banner.id };
            this.fileList = this.banner.img ? [{url:this.$imgUrl+this.banner.img}] : [] 
          } else {
            Message.error(res.data.msg);
          }
        })
        .catch((e) => {
          console.log(e);
        });
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
  },
  mounted() {},
  watch: {
    dialogFormVisible(value, oldvalue) {
      if (value == true) {
        this.title = !this.banner.id == true ? "添加轮播图" : "编辑轮播图";
      }
    },
  },
};
</script>

<style>
</style>