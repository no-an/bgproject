<template>
  <el-table :data="GET_MENULIST" border style="width: 100%"     row-key="id"
>
    <el-table-column fixed prop="id" label="菜单编号"> </el-table-column>
    <el-table-column prop="title" label="菜单名称"> </el-table-column>
    <el-table-column prop="pid" label="上级菜单"> </el-table-column>
    <el-table-column prop="icon" label="菜单图标">
      <template slot-scope="scope">
        <i :class="scope.row.icon"></i>
      </template>
    </el-table-column>
    <el-table-column prop="url" label="菜单地址">
      <template slot-scope="scope">
        <router-link :to="scope.row.url">{{ scope.row.url }}</router-link>
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { delmenu } from "../../util/axios";
export default {
  computed: {
    ...mapGetters({ GET_MENULIST: "menu/GET_MENULIST" }),
  },
  methods: {
    ...mapActions({ QUE_MENULIST: "menu/QUE_MENULIST" }),
    del(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        center: true,
      })
        .then(() => {
          delmenu({ id })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success("删除成功");
                this.QUE_MENULIST()
              } else {
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
  data() {
    return {};
  },
};
</script>

<style>
</style>