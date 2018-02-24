module.exports = {
    env: {
        API_ENDPOINT: process.env.API_ENDPOINT || 'https://vitrino-api-staging.herokuapp.com/graphql',
    },
    head: {
        title: 'Vitrino',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Local shopping experience app',
            },
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico',
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Lato:400,700',
            },
            {
                rel: 'stylesheet',
                href: 'https://api.mapbox.com/mapbox-gl-js/v0.41.0/mapbox-gl.css',
            },
            {
                rel: 'stylesheet',
                type: 'text/css',
                href: 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.1.1/mapbox-gl-geocoder.css',
            },
        ],
         script: [
            {
                src: 'https://api.mapbox.com/mapbox-gl-js/v0.41.0/mapbox-gl.js',
            },
             {
                src: 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.1.1/mapbox-gl-geocoder.min.js',
            },
         ],
    },
    loading: false,
    transition: {
        name: 'page',
        mode: '',
    },
    css: [
        '~/assets/less/vitrino.less',
    ],
    plugins: ['~/plugins/firebase'],
    build: {
        analyze: false,
        vendor: [
            'vue-no-ssr',
        ],

        extend (config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                        enforce: 'pre',
                        test: /\.(js|vue)$/,
                        loader: 'eslint-loader',
                        exclude: /(node_modules)/,
                    });
            }
        },
    },
};
