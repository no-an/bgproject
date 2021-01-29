<template>
  <div>
    <el-table
      :data="GET_cateLIST || []"
      border
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      >
      <el-table-column fixed prop="id" label="分类编号"> </el-table-column>
      <el-table-column prop="catename" label="分类名称"> </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="item">
          <div v-if="item.row.pid">
             <img
              :src="
                item.row.img
                  ? $imgUrl + item.row.img
                  : 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3662049499,1755301544&fm=26&gp=0.jpg'
              "
            />
          </div>
          <div v-else></div>
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
import { delcate } from "../../util/axios";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      QUE_cateLIST: "cate/QUE_cateLIST",
    }),
    del(id) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        center: true,
      })
        .then(() => {
          delcate({ id })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success("删除成功");
                this.QUE_cateLIST();
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
    },
  },
  computed: {
    ...mapGetters({
      GET_cateLIST: "cate/GET_cateLIST",
    }),
  },
  created() {
    this.QUE_cateLIST();
  },
};
</script>

<style>
img {
  width: 150px;
  height: 150px;
}
</style>