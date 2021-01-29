import http from "./axios"

export function req_banner() {
    return http.get('/api/getbanner')
}

export function req_goodslist() {
    return http.get('/api/getindexgoods')
}

export function req_catetree() {
    return http.get('/api/getcatetree')
}

export function req_getgoods(fid) {
    return http.get('/api/getgoods', { params: { fid } })
}

export function req_getgood(id) {
    return http.get('/api/getgoodsinfo', { params: { id } })
}

export function api_register(data) {
    return http.post('/api/register', data)
}

export function api_login(data) {
    return http.post('/api/login', data)
}

export function get_cartlist(uid) {
    return http.get('/api/cartlist',{params:{uid}})
}

export function add_cartlist(data) {
    return http.post('/api/cartadd', data)
}

export function del_cartlist(id) {
    return http.post('/api/cartdelete', {id})
}

export function edit_cartlist(data) {
    return http.post('/api/cartedit', data)
}