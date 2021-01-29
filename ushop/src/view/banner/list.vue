<template>
  <div>
    <el-table
      :data="GET_bannerLIST || []"
      border
      style="width: 100%"
      row-key="id"
    >
      <el-table-column fixed prop="id" label="编号"> </el-table-column>
      <el-table-column prop="title" label="轮播图名称"> </el-table-column>
      <el-table-column  label="图片" width="375px">
        <template slot-scope="item">
             <img class='banner' :src="$imgUrl+item.row.img" >
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status - 1 ? 'danger' : 'success'"
            size="small"
            v-text="scope.row.status - 1 ? '禁用' : '启用'"
            plain
            disabled
          ></el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$emit('edit', scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="del(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { delbanner } from "../../util/axios";
export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapActions({
      QUE_bannerLIST: "banner/QUE_bannerLIST",
    }),
    del(id) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        center: true,
      })
        .then(() => {
          delbanner({ id: id })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success("删除成功");
                this.QUE_bannerLIST();
              } else {
                console.log(res);
                this.$message.error(res.data.msg);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    }
  },
  computed: {
    ...mapGetters({
      GET_bannerLIST: "banner/GET_bannerLIST",
    }),
  },
  created() {
    this.QUE_bannerLIST();
  },
};
</script>

<style>
.banner{
  width: 335px;
  height: 185px;
}
</style>