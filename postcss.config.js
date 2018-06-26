module.exports = ({file, options, env}) => {
    console.log('pocss-config:', env);
    const devPlugins = [
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
    ];

    const prodPlugins = [
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
    ];
    return {
        plugins: env === 'development' ? devPlugins : prodPlugins
    };
};
