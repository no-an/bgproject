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
    <addclassdialog :dialogFormVisible="dialogFormVisible" @cancel = "dialogFormVisible = false" ref = 'dialog'/>
    <classlist @edit = 'edit' />
  </div>
</template>

<script>
import Addclassdialog from './addclassdialog.vue';
import classlist from './classlist.vue';

export default {
  components: { classlist, Addclassdialog },
  data() {
    return {
      dialogFormVisible: false
    };
  },
  methods: {
    edit(e){
      this.$refs["dialog"].classify.id = e
      this.dialogFormVisible = true;
      this.$refs["dialog"].classifyinfo();
    }
  },
};
</script>

<style lang="" scoped>
</style>
