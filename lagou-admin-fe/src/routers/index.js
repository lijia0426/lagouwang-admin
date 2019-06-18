import SEMRouter from 'sme-router'
import * as indexController from '../controllers/index'
import * as positionController from '../controllers/position'
import activeMiddleware from './active'

const router=new SEMRouter('router-view')
router.route('/',indexController.render)
router.route('/position',positionController.render)
router.route('*',(req,res,next)=>{
    res.redirect('/') //实际上协助跳转到/路由上
})
router.use(activeMiddleware)
