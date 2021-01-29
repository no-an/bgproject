import {getpageuserlist, getmangercount} from "../../util/axios"
let state = {
    mangerList : [],
    size:2,
    page:1,
    total:0,
},
    mutations={
        CHANGE_mangerLIST (state,payload) {
            state.mangerList = payload
        },
        chang_page (state,payload){
            state.page = payload
        },
        change_total (state,payload) {
            state.total = payload
        }
},
    getters = {
        GET_mangerLIST (state) {
            return state.mangerList
        },
        get_size (state) {
            return state.size
        },
        get_page (state) {
            return state.page
        },
        get_total (state) {
            return state.total
        }
},
    actions = {
        init_mangerLIST (context) {
            getpageuserlist({size:context.state.size,page:context.state.page})
            .then(res=>{
                if(!res.data.list && context.state.page != 1){
                    console.log(1);
                    context.dispatch('changpage_reqlist',context.state.page-1)
                }else{
                    context.commit('CHANGE_mangerLIST',res.data.list)
                }
        })
            .catch(e=>{console.log(e);})
        },
        changpage_reqlist (context,payload) {
            context.commit('chang_page',payload)
            context.dispatch('init_mangerLIST')
        },
        req_total ({commit}) {
            getmangercount()
            .then(res=>{
              commit('change_total', res.data.list[0]['total'])
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