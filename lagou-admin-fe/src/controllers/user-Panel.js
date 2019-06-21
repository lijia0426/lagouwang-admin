import userPanelTpl from '../views/user-panel.html'
import oAuth from '../utils/oAuth'
class userPanel{
    constructor(){
        this._init()
    }
    async _init(){
        let res=await oAuth();
        if(res){
            // this._renderUserTpl({...res.data})
            // res=JSON.parse(res)
            if(!res.data.isSignin){
                    
            }else{
                let template = Handlebars.compile(userPanelTpl)
            let renderUserTpl = template({
                isSignin:res.data.isSignin,
                username:res.data.username
            }) 
        $('.user-panel').html(renderUserTpl)
            }
        }else{
            let template = Handlebars.compile(userPanelTpl)
                let renderUserTpl = template({
                    isSignin:false,
                }) 
            $('.user-panel').html(renderUserTpl)
            // this._renderUserTpl({})
        }
    }
}
export default userPanel;