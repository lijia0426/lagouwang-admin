import menuTpl from '../views/menu.html'
import homeTpl from '../views/home.hbs'
import Users from './users'

export const render = (req, res, next) => {
  $('.sidebar-menu').html(menuTpl)
  new Users()
  //返回路由的home页
  res.render(homeTpl({title:'拉勾网前端环境'}))
}