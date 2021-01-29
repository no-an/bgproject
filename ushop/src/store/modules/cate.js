import { getcate } from "../../util/axios"
let state = {
    cateList : []
},
    mutations={
        CHANGE_cateLIST (state,payload) {
            state.cateList = payload
        }
},
    getters = {
        GET_cateLIST (state) {
            return state.cateList
        }
},
    actions = {
        QUE_cateLIST ({commit}) {
            getcate()
            .then(res=>{
                commit('CHANGE_cateLIST',res.data.list)
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