import userTpl from '../views/user.html'
import oAuth from '../utils/oAuth'
class Users {
    constructor() {
        this._renderUserTpl({})
        this._user()
        // this._issign()
        this._init()

    }
    async _init() {
        let res = await oAuth();
        if (res) {
            // this._renderUserTpl({...res.data})
            // res = JSON.parse(res)
            if (!res.data.isSignin) {

            } else {
                let template = Handlebars.compile(userTpl)
                let renderUserTpl = template({
                    isSignin: res.data.isSignin,
                    username: res.data.username
                })
                $('.user-menu').html(renderUserTpl)
            }
        } else {
            let template = Handlebars.compile(userTpl)
            let renderUserTpl = template({
                isSignin: false,
            })
            $('.user-menu').html(renderUserTpl)
            // this._renderUserTpl({})
        }
    }
    //登陆注册的Ajxa调用
    _doSign(url, typ) {
        $('#confirm').off('click').on('click', async () => {
            $.ajax({
                url,
                type: 'POST',
                data: $('#user-form').serialize(),
                success: (result, statuscode, jqXHR) => {
                    if (typ === 'signin' && result.ret === true) {
                        this._signinSucc(result, jqXHR)
                        location.reload()
                    } else {
                        alert(result.data.message)
                    }

                }
            })
        })

    }
    _signinSucc(res, jqXHR) {
        if (res.ret) {
            this._renderUserTpl({
                isSignin: true,
                username: res.data.username
            })
            localStorage.setItem('token', jqXHR.getResponseHeader('X-Access-Token'))
        }
    }
    // _issign(){
    //     $.ajax({
    //         url:'/api/users/issignin',
    //         headers:{
    //             'X-Access-Token':localStorage.getItem('token')||''
    //         },
    //         success:(res)=>{
    //             if(!res.data.isSignin){

    //             }else{
    //                 let template = Handlebars.compile(userTpl)
    //             let renderUserTpl = template({
    //                 isSignin:res.data.isSignin,
    //                 username:res.data.username
    //             }) 
    //         $('.user-menu').html(renderUserTpl)
    //             }

    //         },
    //         error:(err)=>{
    //             let template = Handlebars.compile(userTpl)
    //             let renderUserTpl = template({
    //                 isSignin:false,
    //             }) 
    //         $('.user-menu').html(renderUserTpl)

    //         }
    //     })
    // }
    _renderUserTpl({ isSignin = false, username = '' }) {
        //认证
        let template = Handlebars.compile(userTpl)
        let renderUserTpl = template({
            isSignin,
            username
        })
        $('.user-menu').html(renderUserTpl)

    }
    _user() {
        let that = this
        this._renderUserTpl({})
        $('.user-menu').on('click', '#signout', () => {
            location.reload();
            localStorage.removeItem('token')

        })
        $('#user').on('click', 'span', function (e) {
            if ($(this).attr('id') === 'user-signin') {
                $('.box-title').html('登录')
                that._doSign('/api/users/signin', 'signin')
            } else {
                $('.box-title').html('注册')
                that._doSign('/api/users/signup', 'signup')
            }
        })
    }

}
export default Users;
