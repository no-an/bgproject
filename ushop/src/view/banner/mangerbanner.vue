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
    <adddialog :dialogFormVisible = "dialogFormVisible" @cancel="dialogFormVisible=$event" ref="dialog"/>
    <list @edit = 'edit' />
  </div>
</template>

<script>
import adddialog from './dialog';
import list from './list';
export default {
  components: { adddialog, list },
  data() {
    return {
      dialogFormVisible: false
    };
  },
  methods: {
    edit(e){
      this.$refs["dialog"].banner.id = e
      this.dialogFormVisible = true;
      this.$refs["dialog"].bannerinfo();
    }
  },
};
</script>

<style lang="" scoped>
</style>
