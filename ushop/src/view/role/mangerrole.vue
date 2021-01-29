<template>
  <div>
    <elbread />
    <el-button
      type="primary"
      plain
      size="small"
      @click="dialogFormVisible = true"
      >添加</el-button
    >
    <role-form @edit="edit" ></role-form>
    <roleadddialog :dialogFormVisible="dialogFormVisible" ref="dialog" @cancel = 'dialogFormVisible = $event'></roleadddialog>
  </div>
</template>

<script>
import elBread from "../../common/el-bread.vue";
import Roleadddialog from "./roleadddialog.vue";
import RoleForm from "./roleForm.vue";
export default {
  components: { elBread, Roleadddialog, RoleForm },
  data() {
    return {
      dialogFormVisible:false
    };
  },
  methods: {
    edit(e){
      this.$refs["dialog"].roleform.id = e
      this.dialogFormVisible = true;
      this.$refs["dialog"].roleinfo();
    }
  },
};
</script>

<style lang="" scoped>
</style>
