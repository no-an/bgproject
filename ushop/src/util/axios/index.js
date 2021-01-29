import http from "./axios"
/*菜单接口 */
export function getmenu (){
    return http.get('/menulist?istree=true')
}

export function addmenu (data){
    return http.post('/menuadd',data)
}

export function delmenu (data){
    return http.post('/menudelete',data)
}

export function editmenu (data){
    return http.post('/menuedit',data)
}

export function getsmenu (data){
    return http.get('/menuinfo',{params:data})
}
/*角色接口 */
export function getrole (){
    return http.get('/rolelist')
}

export function addrole (data){
    return http.post('/roleadd',data)
}

export function delrole (data){
    return http.post('/roledelete',data)
}

export function editrole (data){
    return http.post('/roleedit',data)
}

export function getsrole (data){
    return http.get('/roleinfo',{params:data})
}

/* 管理员接口 */
export function addmanger (data){
    return http.post('/useradd',data)
}

export function delmanger (data){
    return http.post('/userdelete',data)
}

export function editmanger (data){
    return http.post('/useredit',data)
}

export function getsmanger (data){
    return http.get('/userinfo',{params:data})
}

export function getmangercount () {
    return http.get('/usercount')
}

export function getpageuserlist (data) {
    return http.get('/userlist',{params:data})
}

/* 登录接口 */
export function userlogin (data) {
    return http.post('/userlogin',data)
}
/* 商品分类接口 */

export function addcate (data) {
    console.log(data);
    return http.post('/cateadd',data)
}

export function getcate () {
    return http.get('/catelist?istree=true')
}

export function getscate (data) {
    return http.get('cateinfo',{params:data})
}

export function editcate (data){
    return http.post('/cateedit',data)
}

export function delcate (data){
    return http.post('/catedelete',data)
}
/* 商品规格 */
export function addspecs (data) {
    return http.post('/specsadd',data)
}

export function getspecs (data) {
    return http.get('/specslist',{params:data})
}

export function getsspecs (data) {
    console.log(data);
    return http.get('specsinfo',{params:data})
}

export function editspecs (data){
    return http.post('/specsedit',data)
}

export function delspecs (data){
    return http.post('/specsdelete',data)
}

export function getspecscount () {
    return http.get('/specscount')
}

/* 商品管理 */

export function addgoods (data) {
    console.log(data);
    return http.post('/goodsadd',data)
}

export function getgoods (data) {
    return http.get('/goodslist',{params:data})
}

export function getsgoods (data) {
    return http.get('goodsinfo',{params:data})
}

export function editgoods (data){
    return http.post('/goodsedit',data)
}

export function delgoods (data){
    return http.post('/goodsdelete',data)
}

export function getgoodscount () {
    return http.get('/goodscount')
}

/* 会员 */

export function getmember () {
    return http.get('/memberlist')
}

export function getsmember (data) {
    return http.get('memberinfo',{params:data})
}

export function editmember (data){
    return http.post('/memberedit',data)
}
/* 轮播图 */

export function addbanner (data) {
    return http.post('/banneradd',toFromdata(data))
}

export function getbanner (data) {
    return http.get('/bannerlist',{params:data})
}

export function getsbanner (data) {
    return http.get('bannerinfo',{params:data})
}

export function editbanner (data){
    return http.post('/banneredit',toFromdata(data))
}

export function delbanner (data){
    return http.post('/bannerdelete',data)
}

/* 限时秒杀 */
export function addseck (data) {
    return http.post('/seckadd',data)
}

export function getseck (data) {
    return http.get('/secklist',{params:data})
}

export function getsseck (data) {
    return http.get('seckinfo',{params:data})
}

export function editseck (data){
    console.log(data);
    return http.post('/seckedit',data)
}

export function delseck (data){
    return http.post('/seckdelete',data)
}

function toFromdata(obj){
    let file = new FormData();
    for(let i in obj){
        file.append(i,obj[i])
    }
    return file
}