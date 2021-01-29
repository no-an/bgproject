<template>
  <div>
    <el-table
      :data="GET_memberLIST || []"
      border
      style="width: 100%"
      row-key="id"
    >
      <el-table-column fixed prop="id" label="用户编号"> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status - 1 ? 'danger' : 'success'"
            size="small"
            v-text="scope.row.status - 1 ? '禁用' : '启用'"
            plain
            disabled
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$emit('edit', scope.row.uid)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapActions({
      QUE_memberLIST: "member/QUE_memberLIST",
    }),
  },
  computed: {
    ...mapGetters({
      GET_memberLIST: "member/GET_memberLIST",
    }),
  },
  created() {
    this.QUE_memberLIST()
  },
};
</script>

<style>
</style>