import userTpl from '../views/user.html'
class Users {
    constructor() {
        this._renderUserTpl({})
        this._user()
        this._issign()

    }
    //登陆注册的Ajxa调用
    _doSign(url, typ) {
        $('#confirm').off('click').on('click', async () => {
            $.ajax({
                url,
                type: 'POST',
                data: $('#user-form').serialize(),
                success:(result)=> {
                    if (typ === 'signin' && result.ret===true) {
                        this._signinSucc(result)
                    } else {
                        alert(result.data.message)
                    }

                }
            })
        })

    }
    _signinSucc(res){
        if(res.ret){
            this._renderUserTpl({
                isSignin:true,
                username:res.data.username
            })
        }
    }
    _issign(){
        $.ajax({
            url:'/api/users/isSignin',
            success:(res)=>{
                if(!res.data.isSignin){
                    
                }else{
                    let template = Handlebars.compile(userTpl)
                let renderUserTpl = template({
                    isSignin:res.data.isSignin,
                    username:res.data.username
                }) 
            $('.user-menu').html(renderUserTpl)
                }
                
            }
        })
    }
    _renderUserTpl({ isSignin = false,username='' }) {
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
            $.ajax({
                url: '/api/users/signout',
                success: (result) => {
                    location.reload()
                }
            })
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
