import {getmenu} from "../../util/axios"
let state = {
    menuList : []
},
    mutations={
        CHANGE_MENULIST (state,payload) {
            state.menuList = payload
        }
},
    getters = {
        GET_MENULIST (state) {
            return state.menuList
        }
},
    actions = {
        QUE_MENULIST ({commit}) {
            getmenu()
            .then(res=>{commit('CHANGE_MENULIST',res.data.list)})
            .catch(e=>{console.log(e);})
        }
}
export default {
    state,
    mutations,
    getters,
    actions,
    namespaced:true
}