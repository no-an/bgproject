<template>
  <div>
    <el-table
      :data="GET_goodsLIST || []"
      border
      style="width: 100%"
      row-key="id"
    >
      <el-table-column fixed prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column prop="img" label="图片" width='180px'>
        <template slot-scope="item">
            <img :src="$imgUrl+item.row.img" class="enough" >
        </template>
      </el-table-column>
      <el-table-column  label="是否新品">
        <template slot-scope="item">
            <el-tag type='success' v-if="item.row.isnew == 1">是</el-tag>
            <el-tag type='error' v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column  label="是否热卖">
        <template slot-scope="item">
            <el-tag type='success' v-if="item.row.ishot == 1">是</el-tag>
            <el-tag type='error' v-else>否</el-tag>
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
import { delgoods } from "../../util/axios";
export default {
  data() {
    return {
      total: 0,
    };
  },
  methods: {
    ...mapActions({
      init_goodsLIST: "goods/init_goodsLIST",
      req_total: "goods/req_total",
      changpage_reqlist: "goods/changpage_reqlist",
    }),
    del(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        center: true,
      })
        .then(() => {
          delgoods({ id: id })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success("删除成功");
                this.init_goodsLIST();
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
      get_size: "goods/get_size",
      GET_goodsLIST: "goods/GET_goodsLIST",
      get_total: "goods/get_total",
    }),
  },
  created() {
    this.init_goodsLIST();
    this.req_total();
  },
};
</script>

<style>
.enough{
  width: 150px;
  height: 150px;
}
</style>