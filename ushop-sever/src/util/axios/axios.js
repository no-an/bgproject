import axios from 'axios'

const http = axios.create({
    baseUrl: '/api'
}
);



http.interceptors.request.use(req => {
    req.headers.authorization = window.sessionStorage.getItem('userinfo') ? JSON.parse(window.sessionStorage.getItem('userinfo')).token : ""
    return req
})

http.interceptors.response.use(res => {
    return res.data
})

export default http