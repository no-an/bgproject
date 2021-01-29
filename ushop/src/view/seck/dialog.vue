<template>
  <el-dialog
    :title="title"
    :visible="dialogFormVisible"
    center
    width="500px"
    :before-close="cancel"
  >
    <el-form :model="seck" ref="seck" :rules="rules">
      <el-form-item label="活动名称" :label-width="formLabelWidth" prop="title">
        <el-input v-model="seck.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动期限" :label-width="formLabelWidth">
        <el-date-picker
          v-model="timetick"
          type="datetimerange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="一级分类"
        :label-width="formLabelWidth"
        prop="first_cateid"
      >
        <el-select
          v-model="seck.first_cateid"
          placeholder="请选择"
          @change="firstchange"
        >
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
        label="二级分类"
        :label-width="formLabelWidth"
        prop="second_cateid"
      >
        <el-select
          v-model="seck.second_cateid"
          placeholder="请选择"
          @change="secondchange"
        >
          <el-option
            v-for="(item, index) in second_catearr"
            :key="index"
            :label="item.catename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品" :label-width="formLabelWidth" prop="goodsid">
        <el-select v-model="seck.goodsid" placeholder="请选择">
          <el-option
            v-for="(item, index) in goodsarr"
            :key="index"
            :label="item.goodsname"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch
          v-model="seck.status"
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
      <el-button type="primary" @click="add()" v-if="title == '添加限时秒杀'"
        >确 定</el-button
      >
      <el-button type="primary" @click="edit()" v-else>编辑</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addseck, getsseck, editseck, getgoods } from "../../util/axios";
import { Message } from "element-ui";
export default {
  data() {
    return {
      timetick: "",
      title: "添加限时秒杀",
      seck: {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      },
      second_catearr: [],
      goodsarr: [],
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
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
      QUE_seckLIST: "seck/QUE_seckLIST",
    }),
    firstchange(e) {
      this.second_catearr = this.GET_cateLIST[
        this.GET_cateLIST.findIndex((val) => val.id === e)
      ].children;
      this.seck.second_cateid = "";
      this.seck.goodsid = "";
    },
    secondchange(e) {
      getgoods({fid: this.seck.first_cateid,sid: this.seck.second_cateid})
      .then(res=>{
        if(res.data.code == 200){
          this.goodsarr = res.data.list
        }else{
          console.log(res);
        }
        })
      this.seck.goodsid = "";
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    reset() {
      console.log(this.seck);
      this.seck = {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      };
      this.$refs["seck"].resetFields();
      this.timetick = "";
    },
    add() {
      this.$refs["seck"].validate((valid) => {
        this.seck.begintime = this.timetick[0];
        this.seck.endtime = this.timetick[1];
        if (valid) {
          addseck(this.seck)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.QUE_seckLIST();
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
      this.$refs["seck"].validate((valid) => {
        if (valid) {
          this.seck.begintime = this.timetick[0];
          this.seck.endtime = this.timetick[1];
          editseck(this.seck)
            .then((res) => {
              if (res.data.code == 200) {
                Message.success(res.data.msg);
                this.QUE_seckLIST();
                this.cancel();
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
    },
    seckinfo() {
      getsseck({ id: this.seck.id })
        .then((res) => {
          if (res.data.code == 200) {
            this.seck = { ...res.data.list, id: this.seck.id };
            this.timetick = [this.seck.begintime, this.seck.endtime];
            this.second_catearr = this.GET_cateLIST[
              this.GET_cateLIST.findIndex(
                (val) => val.id === this.seck.first_cateid
              )
            ].children;
            this.goodsarr = this.get_alllist.filter(
              (val) => val.second_cateid == this.seck.second_cateid
            );
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
    this.QUE_cateLIST();
  },
  watch: {
    dialogFormVisible(value, oldvalue) {
      if (value == true) {
        this.title = !this.seck.id == true ? "添加限时秒杀" : "编辑限时秒杀";
      }
    },
  },
};
</script>

<style>
</style>