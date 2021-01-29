import { getspecs, getspecscount } from "../../util/axios"
let state = {
    allspecs: [],
    specsList: [],
    size: 2,
    page: 1,
    total: 0,
},
    mutations = {
        CHANGE_specsLIST(state, payload) {
            state.specsList = payload
        },
        chang_page(state, payload) {
            state.page = payload
        },
        change_total(state, payload) {
            state.total = payload
        },
        change_allspecs(state, payload) {
            state.allspecs = payload
        }
    },
    getters = {
        GET_specsLIST(state) {
            return state.specsList
        },
        get_size(state) {
            return state.size
        },
        get_page(state) {
            return state.page
        },
        get_total(state) {
            return state.total
        },
        GET_allspecs(state) {
            return state.allspecs
        }
    },
    actions = {
        init_specsLIST(context) {
            getspecs({ size: context.state.size, page: context.state.page })
                .then(res => {
                    if ((!res.data.list || res.data.list.length == 0) && context.state.page != 1) {
                        // console.log(1);
                        context.dispatch('changpage_reqlist', context.state.page - 1)
                    } else {
                        context.commit('CHANGE_specsLIST', res.data.list)
                    }
                })
                .catch(e => { console.log(e); })
        },
        changpage_reqlist(context, payload) {
            context.commit('chang_page', payload)
            context.dispatch('init_specsLIST')
        },
        req_specsLIST({ commit }) {
            getspecs()
                .then(res => {
                    if (res.data.code == 200) {
                        commit('change_allspecs', res.data.list)
                    }
                }
                )
        },
        req_total({ commit }) {
            getspecscount()
                .then(res => {
                    commit('change_total', res.data.list[0]['total'])
                })
                .catch(e => { console.log(e); })
        }
    }
export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}