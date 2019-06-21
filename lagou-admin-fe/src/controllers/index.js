import menuTpl from '../views/menu.html'
import homeTpl from '../views/home.hbs'
import Users from './users'
import userPanel from './user-Panel'

export const render = (req, res, next) => {

  $('.sidebar-menu').html(menuTpl)
  new Users()
  new userPanel()
  //返回路由的home页
  res.render(homeTpl({title:'拉勾网前端环境'}))
}