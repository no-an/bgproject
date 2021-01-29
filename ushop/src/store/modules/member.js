import {getmember} from "../../util/axios"
let state = {
    memberList : []
},
    mutations={
        CHANGE_memberLIST (state,payload) {
            state.memberList = payload
        }
},
    getters = {
        GET_memberLIST (state) {
            return state.memberList
        }
},
    actions = {
        QUE_memberLIST ({commit}) {
            getmember()
            .then(res=>{
                commit('CHANGE_memberLIST',res.data.list)
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