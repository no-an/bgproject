<template>
  <div>
    <el-table
      :data="GET_specsLIST || []"
      border
      style="width: 100%"
      row-key="id"
    >
      <el-table-column fixed prop="id" label="规格编号"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称"> </el-table-column>
      <el-table-column  label="规格属性">
        <template slot-scope="item">
          <div>
            <el-tag v-for="(attr,index) in item.row.attrs" :key='index'  type='info'>{{attr}}</el-tag>
          </div>
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
    <el-pagination
      background
      layout="prev, pager, next"
      :total="get_total"
      :page-size="get_size"
      @current-change="changepage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { delspecs } from "../../util/axios";
export default {
  data() {
    return {
      total: 0,
    };
  },
  methods: {
    ...mapActions({
      init_specsLIST: "specs/init_specsLIST",
      req_total: "specs/req_total",
      changpage_reqlist: "specs/changpage_reqlist",
    }),
    del(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        center: true,
      })
        .then(() => {
          delspecs({  id })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success("删除成功");
                this.init_specsLIST();
                this.req_total();
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
    changepage(e) {
      this.changpage_reqlist(e);
    },
  },
  computed: {
    ...mapGetters({
      get_size: "specs/get_size",
      GET_specsLIST: "specs/GET_specsLIST",
      get_total: "specs/get_total",
    }),
  },
  created() {
    this.init_specsLIST(),
    this.req_total()
  },
};
</script>

<style>
</style>