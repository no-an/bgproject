<template>
  <div>
    <elbread />
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
      this.$refs["dialog"].member.uid = e
      this.dialogFormVisible = true;
      this.$refs["dialog"].memberinfo();
    }
  },
};
</script>

<style lang="" scoped>
</style>
