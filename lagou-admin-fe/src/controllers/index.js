import menuTpl from '../views/menu.html'
import homeTpl from '../views/home.hbs'
import userTpl from '../views/user.html'
function _renderUserTpl({isSignin=false}){
  let template=Handlebars.compile(userTpl,)
    let renderUserTpl=template({
      isSignin
    })
  $('.user-menu').html(renderUserTpl)
}
function _user(res){
  _renderUserTpl({})
  $('#user').on('click','span',function(e){
    if($(this).attr('id')==='user-signin'){
      $('.box-title').html('登录')
    }else{
      $('.box-title').html('注册')
    }
  })
}
//用户注册
function _signup(){
  $('#confirm').on('click',()=>{
    $.ajax({
      url:'/api/users/signup',
      type:'POST',
      data:$('#user-form').serialize()
    })
  })
}
export const render = (req, res, next) => {
  $('.sidebar-menu').html(menuTpl)
  _renderUserTpl({})
  _user(res)
  _signup()
  //返回路由的home页
  res.render(homeTpl({title:'拉勾网前端环境'}))
}