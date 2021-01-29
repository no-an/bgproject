<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    center
    width="1000px"
    :before-close="cancel"
    @opened.once="createeditor"
  >
    <el-form :model="goods" ref="goods" :rules="rules">
      <el-form-item
        label="一级分类"
        :label-width="formLabelWidth"
        prop="first_cateid"
      >
        <el-select
          v-model="first_cateindex"
          placeholder="请选择"
          @change="firstchange"
        >
          <el-option
            v-for="(item, index) in GET_cateLIST"
            :key="item.id"
            :label="item.catename"
            :value="index"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="二级分类"
        :label-width="formLabelWidth"
        prop="second_cateid"
      >
        <el-select v-model="goods.second_cateid" placeholder="请选择">
          <el-option
            v-for="(item, index) in second_catearr"
            :key="index"
            :label="item.catename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="商品名称"
        :label-width="formLabelWidth"
        prop="goodsname"
      >
        <el-input v-model="goods.goodsname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
        <el-input v-model.number="goods.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="市场价格"
        :label-width="formLabelWidth"
        prop="market_price"
      >
        <el-input v-model.number="goods.market_price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth">
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
      <el-form-item
        label="商品规格"
        :label-width="formLabelWidth"
        prop="specsid"
      >
        <el-select
          v-model="specsindex"
          placeholder="请选择"
          @change="specschange"
        >
          <el-option
            v-for="(item, index) in GET_allspecs"
            :key="item.id"
            :label="item.specsname"
            :value="index"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="规格属性"
        :label-width="formLabelWidth"
        prop="specsattr"
      >
        <el-select v-model="goods.specsattr" multiple placeholder="请选择">
          <el-option
            v-for="item in specsattrarr"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="是否新品" prop="isnew">
        <el-radio v-model="goods.isnew" :label="1">是</el-radio>
        <el-radio v-model="goods.isnew" :label="2">否</el-radio>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="是否热卖" prop="isnew">
        <el-radio v-model="goods.ishot" :label="1">是</el-radio>
        <el-radio v-model="goods.ishot" :label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch
          v-model="goods.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="2"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="商品描述" :label-width="formLabelWidth">
        <div id="editor"></div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="add()" v-if="title == '添加商品'"
        >确 定</el-button
      >
      <el-button type="primary" @click="edit()" v-else>编辑</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addgoods, getsgoods, editgoods } from "../../util/axios";
import { Message } from "element-ui";
import E from "wangeditor";
export default {
  data() {
    return {
      editor: "",
      title: "添加商品",
      second_catearr: [],
      specsattrarr: [],
      first_cateindex: "",
      specsindex: "",
      goods: {
        first_cateid: 0, //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格 小数
        market_price: "", //市场价格 小数
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: 0, //商品规格编号
        specsattr: [], //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1, //状态1正常2禁用
      },
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        price: [
          {
            type: "number",
            required: true,
            message: "请输入价格",
            trigger: "blur",
          },
        ],
        market_price: [
          {
            type: "number",
            required: true,
            message: "请输入价格",
            trigger: "blur",
          },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "change" },
        ],
        specsattr:[
          { required: true, message: "请选择规格属性", trigger: "change" },
        ],
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
      GET_allspecs: "specs/GET_allspecs",
    }),
  },
  methods: {
    firstchange(e) {
      this.second_catearr = this.GET_cateLIST[e].children;
      this.goods.second_cateid = "";
    },
    specschange(e) {
      this.specsattrarr = this.GET_allspecs[e].attrs;
      this.goods.specsattr = [];
    },
    ...mapActions({
      QUE_cateLIST: "cate/QUE_cateLIST",
      init_goodsLIST: "goods/init_goodsLIST",
      req_total: "goods/req_total",
      req_specsLIST: "specs/req_specsLIST",
    }),
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    reset() {
      this.goods = {
        first_cateid: 0, //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格 小数
        market_price: "", //市场价格 小数
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: 0, //商品规格编号
        specsattr: [], //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1, //状态1正常2禁用
      };
      if (this.editor.txt) {
        this.editor.txt.clear();
      }
      this.specsindex = ''
      this.first_cateindex = ''
      this.fileList = []
      this.$refs["goods"].resetFields();
    },
    add() {
      this.$refs["goods"].validate((valid) => {
        if (valid) {
          this.goods = {
            ...this.goods,
            first_cateid: this.GET_cateLIST[this.first_cateindex].id,
            specsid: this.GET_allspecs[this.specsindex].id,
            specsattr: this.goods.specsattr.toString(),
            description: this.editor.txt.html(),
            img: this.imgurl,
          };
          let file = new FormData();
          for (let item in this.goods) {
            file.append(item, this.goods[item]);
          }
          addgoods(file)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.init_goodsLIST();
                this.req_total();
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
      this.$refs["goods"].validate((valid) => {
        if (valid) {
          this.goods = {
            ...this.goods,
            first_cateid: this.GET_cateLIST[this.first_cateindex].id,
            specsid: this.GET_allspecs[this.specsindex].id,
            specsattr: this.goods.specsattr.toString(),
            description: this.editor.txt.html(),
            img: this.imgurl ? this.imgurl : this.goods.img,
          };
          let file = new FormData();
          for (let item in this.goods) {
            file.append(item, this.goods[item]);
          }
          editgoods(file)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.init_goodsLIST();
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
    goodsinfo() {
      getsgoods({ id: this.goods.id })
        .then((res) => {
          if (res.data.code == 200) {
            this.goods = { ...res.data.list, id: this.goods.id };
            if (this.editor.txt) {
              this.editor.txt.html(this.goods.description);
            }
            this.first_cateindex = this.GET_cateLIST.findIndex(
              (val) => val.id == this.goods.first_cateid
            );
            this.second_catearr = this.GET_cateLIST[
              this.first_cateindex
            ].children;
            this.specsindex = this.GET_allspecs.findIndex(
              (val) => val.id == this.goods.specsid
            );
            this.specsattrarr = this.GET_allspecs[this.specsindex].attrs;
            this.fileList = this.goods.img
              ? [{ url: this.$imgUrl + this.goods.img }]
              : [];
            this.goods.specsattr = this.goods.specsattr.split(',')
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
    handleexceed() {
      Message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    createeditor() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.goods.description);
    },
  },
  mounted() {
    this.QUE_cateLIST();
    this.req_specsLIST();
  },
  watch: {
    dialogFormVisible(value, oldvalue) {
      if (value == true) {
        this.title = !this.goods.id == true ? "添加商品" : "编辑商品";
      }
    },
  },
};
</script>

<style>
</style>