import { getseck } from "../../util/axios"
let state = {
    seckList : []
},
    mutations={
        CHANGE_seckLIST (state,payload) {
            state.seckList = payload
        }
},
    getters = {
        GET_seckLIST (state) {
            return state.seckList
        }
},
    actions = {
        QUE_seckLIST ({commit}) {
            getseck()
            .then(res=>{
                commit('CHANGE_seckLIST',res.data.list)
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