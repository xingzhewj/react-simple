module.exports = {  
    plugins: [
        require('cssnano')({
            preset: 'default',
        }),
        require('autoprefixer')(
            {
                browsers: [
                    "> 1%",
                    "last 2 versions",
                    "last 7 versions",
                    "not ie <= 8"
                ]
            }
        ) 
    ]  
}