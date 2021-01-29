import vuex from 'vuex'
import Vue from "vue"
import menu from "./modules/menu"
import role from "./modules/role"
import manger from "./modules/manger"
import cate from "./modules/cate"
import specs from './modules/specs'
import goods from './modules/goods'
import member from './modules/member'
import banner from './modules/banner'
import seck from './modules/seck'
Vue.use(vuex)
export default new vuex.Store({
    getters:{
        get_userinfo_(state){
            return state.userinfo
        }
    },
    state:{
        userinfo: window.sessionStorage?JSON.parse(window.sessionStorage.getItem('userinfo')):  {}
    },
    mutations:{
        CHANGE_USERINFO(state,payload){
            state.userinfo = payload
        }
    },
    actions:{
        CHANGE_USERINFO_action({commit},payload){
            if(payload == null){
                window.sessionStorage.removeItem('userinfo')
                commit('CHANGE_USERINFO',null)
            }else{
                commit('CHANGE_USERINFO',payload)
            }

        }
    },
    modules:{menu,role,manger,cate,specs, goods,member,banner,seck}
})