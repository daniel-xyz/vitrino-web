const config = {
    env: process.env.NODE_ENV || 'development',
    host: 'http://vitrino.herokuapp.com',
    port: process.env.PORT || 3000,

    // --- Staging authentication ---
    stagingCredentials: {
        login: process.env.STAGING_LOGIN || null,
        password: process.env.STAGING_PW || null,
    },

    // --- Helmet protection library ---
    helmet: {
        xssFilter: true,
        hidePoweredBy: true,
        ieNoOpen: true,
        noSniff: true,
        noCache: false,
        dnsPrefetchControl: {
            allow: true,
        },
        frameguard: {
            action: 'deny',
        },

        contentSecurityPolicy: {
            // Specify directives as normal
            directives: {
                defaultSrc: ['\'self\''],
                scriptSrc: [
                    '\'self\'',
                    '\'unsafe-inline\'',
                    '\'unsafe-eval\'',
                    'https://*.tiles.mapbox.com',
                    'https://api.mapbox.com',
                    'https://unpkg.com/vue@2.1.4/dist/vue.min.js',
                    'https://code.jquery.com/jquery-3.1.1.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/',
                    'https://js-agent.newrelic.com/',
                    'https://rum-static.pingdom.net/',
                ],
                styleSrc: [
                    '\'self\'',
                    '\'unsafe-inline\'',
                    'https://*.tiles.mapbox.com',
                    'https://api.mapbox.com',
                    'https://fonts.googleapis.com',
                ],
                childSrc: ['\'self\'', 'blob:'],
                imgSrc: [
                    '\'self\'',
                    'data:',
                    'blob:',
                    'https://*.mapbox.com',
                    'https://res.cloudinary.com/dj82hrksp',
                    'https://*.yelpcdn.com',
                    'http://rum-collector.pingdom.net/',
                ],
                connectSrc: [
                    '\'self\'',
                    'http://localhost:3123/',
                    'ws://localhost:3123/',
                    'https://*.tiles.mapbox.com',
                    'https://api.mapbox.com',
                ],
                fontSrc: [
                    '\'self\'',
                    'data:',
                    'https://fonts.gstatic.com',
                ],
                objectSrc: ['\'none\''],
                formAction: ['\'self\''],
                frameAncestors: ['\'none\''],
                sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin', 'allow-popups'],
                // TODO: Specify 'reportUri' to report CSP violations in a log file
            },

            // Set to true if you only want browsers to report errors, not block them
            reportOnly: false,

            // Set to true if you want to blindly set all headers: Content-Security-Policy,
            // X-WebKit-CSP, and X-Content-Security-Policy.
            setAllHeaders: false,

            // Set to true if you want to disable CSP on Android where it can be buggy.
            disableAndroid: true,

            // Set to false if you want to completely disable any user-agent sniffing.
            // This may make the headers less compatible but it will be much faster.
            // This defaults to `true`.
            browserSniff: true,
        },
    },
};

module.exports = config;
