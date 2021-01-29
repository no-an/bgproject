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
    <adddialog
      :dialogFormVisible="dialogFormVisible"
      @cancel="cancelHandel"
      ref = 'dialog'
    />
    <menu-form @edit = "editmenu"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getsmenu } from "../../util/axios"
import adddialog from "./adddialog";
import MenuForm from './menuForm.vue';
export default {
  components: { adddialog ,MenuForm},
  data() {
    return {
      dialogFormVisible: false,
    };
  },
  methods: {
    ...mapActions({
      QUE_MENULIST: "menu/QUE_MENULIST",
    }),
    editmenu(e){
      getsmenu({id:e})
      .then(res=>{
        if(res.data.code == 200){
          this.$refs.dialog.menu = {...res.data.list,...{id:e}};
          this.dialogFormVisible = true;
        }else{
          this.$message.error(res.data.msg)
        }
      })
      .catch(e=>{console.log(e)})
    },
    cancelHandel(e){
      this.dialogFormVisible = e;
    }
  },
  mounted() {
    this.QUE_MENULIST()
  }
};
</script>

<style lang="" scoped>
</style>
