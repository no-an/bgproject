import {getgoods, getgoodscount} from "../../util/axios"
let state = {
    goodsList : [],
    size:2,
    page:1,
    total:0,
    alllist:[]
},
    mutations={
        CHANGE_goodsLIST (state,payload) {
            state.goodsList = payload
        },
        chang_page (state,payload){
            state.page = payload
        },
        change_total (state,payload) {
            state.total = payload
        },
        changpage_alllist(state,payload){
            state.alllist = payload
        }
},
    getters = {
        GET_goodsLIST (state) {
            return state.goodsList
        },
        get_size (state) {
            return state.size
        },
        get_page (state) {
            return state.page
        },
        get_total (state) {
            return state.total
        },
        get_alllist(state){
            return state.alllist
        }
},
    actions = {
        init_goodsLIST (context) {
            getgoods({size:context.state.size,page:context.state.page})
            .then(res=>{
                if((!res.data.list || res.data.list.length == 0) && context.state.page != 1){
                    context.dispatch('changpage_reqlist',context.state.page-1)
                }else{
                    context.commit('CHANGE_goodsLIST',res.data.list)
                }
        })
            .catch(e=>{console.log(e);})
        },
        changpage_reqlist (context,payload) {
            // console.log(2);
            context.commit('chang_page',payload)
            context.dispatch('init_goodsLIST')
        },
        req_total ({commit}) {
            getgoodscount()
            .then(res=>{
              commit('change_total', res.data.list[0]['total'])
              })
            .catch(e=>{console.log(e);})
        },
        req_allgoodlist({commit}){
            getgoods()
            .then(res=>{commit('changpage_alllist',res.data.list)})
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