import userTpl from '../views/user.html'
class Users {
    constructor() {
        this._renderUserTpl({})
        this._user()
    }
    //登陆注册的Ajxa调用
    _doSign(url){
        $('#confirm').off('click').on('click', async () => {
            $.ajax({
                url,
                type: 'POST',
                data: $('#user-form').serialize(),
                success(result){
                    alert(result.data.message)
                }
            })
        })

    }
    _renderUserTpl({ isSignin = false }) {
        let template = Handlebars.compile(userTpl)
        let renderUserTpl = template({
            isSignin
        })
        $('.user-menu').html(renderUserTpl)
    }
    _user() {
        let that=this
        this._renderUserTpl({})
        $('#user').on('click', 'span', function (e) {
            if ($(this).attr('id') === 'user-signin') {
                $('.box-title').html('登录')
                that._doSign('/api/users/signin')
            } else {
                $('.box-title').html('注册')
                that._doSign('/api/users/signup')
            }
        })
    }

}
export default Users;
