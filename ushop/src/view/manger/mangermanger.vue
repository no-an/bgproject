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
    <addmangerdialog :dialogFormVisible = "dialogFormVisible" @cancel="dialogFormVisible=$event" ref="dialog"/>
    <mangerlist @edit = 'edit' />
  </div>
</template>

<script>
import addmangerdialog from './addmangerdialog.vue';
import Mangerlist from './mangerlist.vue';
export default {
  components: { addmangerdialog, Mangerlist },
  data() {
    return {
      dialogFormVisible: false
    };
  },
  methods: {
    edit(e){
      this.$refs["dialog"].manger.uid = e
      this.dialogFormVisible = true;
      this.$refs["dialog"].mangerinfo();
    }
  },
};
</script>

<style lang="" scoped>
</style>
