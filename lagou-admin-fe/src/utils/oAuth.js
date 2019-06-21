export default ()=>{
    return $.ajax({
        url:'/api/users/issignin',
        headers:{
            'X-Access-Token':localStorage.getItem('token')||''
        },
        success:(res)=>{
            return res
        },
        error:(err)=>{
            return err
            
        }
    })
}