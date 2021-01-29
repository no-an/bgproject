<template>
  <el-table :data="GET_roleLIST" border style="width: 100%">
    <el-table-column fixed prop="id" label="角色编号" width="150"> </el-table-column>
    <el-table-column prop="rolename" label="角色名称" width="150"> </el-table-column>
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
    <el-table-column fixed="right" label="操作" >
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
import { delrole } from "../../util/axios";
export default {
  computed: {
    ...mapGetters({ GET_roleLIST: "role/GET_roleLIST" }),
  },
  methods: {
    ...mapActions({ QUE_roleLIST: "role/QUE_roleLIST" }),
    del(id) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        center: true,
      })
        .then(() => {
          delrole({ id })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success("删除成功");
                this.QUE_roleLIST()
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
  mounted() {
    this.QUE_roleLIST()
  },
};
</script>

<style>
</style>