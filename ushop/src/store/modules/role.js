import {getrole} from "../../util/axios"
let state = {
    roleList : []
},
    mutations={
        CHANGE_roleLIST (state,payload) {
            state.roleList = payload
        }
},
    getters = {
        GET_roleLIST (state) {
            return state.roleList
        }
},
    actions = {
        QUE_roleLIST ({commit}) {
            getrole()
            .then(res=>{
                commit('CHANGE_roleLIST',res.data.list)
            })
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