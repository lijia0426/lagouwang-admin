const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const CopyWebpackPlugin=require('copy-webpack-plugin')
module.exports={
    mode:'development',
    entry:'./src/app.js',
    output:{
        filename:'app.js',
        path:path.resolve(__dirname,'./dev')
    },
    //配置webserver,不需要引入webpack-server，但是需要安装webpack-server启动
    devServer:{
        host:'10.9.65.155',
        contentBase:path.join(__dirname,'./dev'),
        compress:true,
        port:8080,
        proxy:{
            '/api':'http://10.9.65.155:3000'
        }
    },
    //配置loader
    module:{
        rules:[
            {
                test : /\.(png|jpg|git)$/,
                use : [
                    {
                        loader:'url-loader',
                        options : {
                            limit:1
                        },
                    },
                ],
            },
            {
                test : /\.html$/,
                use : [
                    {
                        loader:'string-loader',
                    },
                ],
            },
            {
                test : /\.(scss|css)$/,
                use : ['style-loader','css-loader','sass-loader'],
            },
            {
                test : /\.hbs$/,
                use : [
                    {
                        loader:'handlebars-loader',
                    },
                ],
            },
        ],
    },
    //配置插件
    plugins:[
        //把html页面copy到dev，并把js，css引入
        new HtmlWebpackPlugin({
            filename:'index.html',//目标文件名
            template:'./index.html'//源文件路径
        }),
        new CopyWebpackPlugin([
            {from:'./src/public',to:'./public'}
        ])
    ],
    
}