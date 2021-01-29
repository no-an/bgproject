import {getbanner} from "../../util/axios"
let state = {
    bannerList : []
},
    mutations={
        CHANGE_bannerLIST (state,payload) {
            state.bannerList = payload
        }
},
    getters = {
        GET_bannerLIST (state) {
            return state.bannerList
        }
},
    actions = {
        QUE_bannerLIST ({commit}) {
            getbanner()
            .then(res=>{
                commit('CHANGE_bannerLIST',res.data.list)
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