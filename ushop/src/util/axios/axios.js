import axios from "axios"
import router from "../../router"
let http = axios.create({
    baseURL:"/api"
})

http.interceptors.request.use(req=>{
    req.headers.authorization =window.sessionStorage.getItem('userinfo')? JSON.parse( window.sessionStorage.getItem('userinfo')).token : ""
    return req
})

http.interceptors.response.use(res=>{
    if(res.data.code == 403){
        router.push('/login')
    }else{
        return res
    }
})
export default http