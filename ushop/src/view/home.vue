<template>
  <div>
    <h1>欢迎光临 <span>{{get_userinfo_.username}}</span></h1>
    <el-button type='danger' @click = 'quit'>退出</el-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {};
  },
  computed:{
    ...mapGetters(['get_userinfo_'])
  },
  methods:{
    ...mapActions(['CHANGE_USERINFO_action']),
    quit(){
      this.$router.push('/login')
      this.CHANGE_USERINFO_action(null)
    }
  }
};
</script>

<style lang="" scoped>
span{
font-size: 12px;
}
</style>
