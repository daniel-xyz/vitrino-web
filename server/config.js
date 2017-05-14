let config = {
  env: process.env.NODE_ENV || 'development',
  host: 'http://vitrino.herokuapp.com',
  port: process.env.PORT || 3000,

  // --- Staging authentication ---
  stagingCredentials: {
    login: process.env.STAGING_LOGIN,
    password: process.env.STAGING_PW
  },

  // --- Database ---
  database: {
    uri: process.env.DATABASE_URL || 'postgres://xslyzqothcvnsa:4032048382591d935a165b3f053acb4c5f70e37cc4f715dee9f3c9df25724c0d@ec2-54-75-232-56.eu-west-1.compute.amazonaws.com:5432/ddm8rtt5jmaf7j?ssl=true'
  },

  // --- Passport authentication framework
  passport: {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  },

  // --- Nunjucks templating engine ---
  nunjucks: {
    options: {
      autoescape: true,
      trimBlocks: true,
      noCache: true,
      watch: true,
      express: null, // Must point to the express app object after the app has been initialized,
      tags: {
        blockStart: '<%',
        blockEnd: '%>',
        variableStart: '<$',
        variableEnd: '$>',
        commentStart: '<#',
        commentEnd: '#>'
      }
    },
    viewPaths: [
      'server/components',
      'server/components/main/views',
      'server/components/users/views',
      'server/components/admin/views'
    ]
  },

  // --- Cookie parser ---
  cookies: {
    secret: process.env.SECRET_COOKIE_KEY || 'uz"(_:;Q3tib<2"(/&_.82k§§g8jgs.,ss224/!"!'
  },

  // --- Sessions library ---
  sessions: {
    secret: process.env.SECRET_SESSION_KEY || 'G"ZTq&))/%F_H(cbBH"Gj2ti?i4"_.("$")&!#<SYzF§S',
    resave: true,
    saveUninitialized: true,
    cookie: {
      path: '/',
      httpOnly: false,
      secure: false, // TODO: Must be set to true as soon as we haved switched to https
      maxAge: null
    }
  },

  // --- Redis storage ---
  redis: {
    sessions: {
      host: 'pub-redis-11657.eu-central-1-1.1.ec2.redislabs.com',
      port: 11657,
      pass: process.env.REDIS_SESSIONS_PW
    }
  },

  // --- Helmet protection library ---
  helmet: {
    xssFilter: true,
    hidePoweredBy: true,
    ieNoOpen: true,
    noSniff: true,
    noCache: false,
    dnsPrefetchControl: {
      allow: true
    },
    frameguard: {
      action: 'deny'
    },

    contentSecurityPolicy: {
      // Specify directives as normal
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          'https://*.tiles.mapbox.com',
          'https://api.mapbox.com',
          'https://unpkg.com/vue@2.1.4/dist/vue.min.js',
          'https://code.jquery.com/jquery-3.1.1.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/',
          'https://js-agent.newrelic.com/',
          'https://rum-static.pingdom.net/',
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://*.tiles.mapbox.com',
          'https://api.mapbox.com',
          'https://fonts.googleapis.com'
        ],
        childSrc: ["'self'", 'blob:'],
        imgSrc: [
          "'self'",
          'data:',
          'blob:',
          'https://*.mapbox.com',
          'https://res.cloudinary.com/dj82hrksp',
          'https://*.yelpcdn.com',
          'http://rum-collector.pingdom.net/',
        ],
        connectSrc: [
          "'self'",
          'http://localhost:3123/',
          'ws://localhost:3123/',
          'https://*.tiles.mapbox.com',
          'https://api.mapbox.com',
        ],
        fontSrc: [
          'https://fonts.gstatic.com',
        ],
        objectSrc: ["'none'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
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
      browserSniff: true
    }
  },

  // Sendgrid E-Mail service provider
  sendgrid: {
    apikey: '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',
    mails: {
      welcome: {
        sender: {
          email: 'info@vitrino.de',
          name: 'Vitrino'
        },
        templateId: 'd2c7b6f5-42c5-411b-a911-114f76ec9f64'
      },
      passwordForgotten: {
        sender: {
          email: 'info@vitrino.de',
          name: 'Vitrino'
        },
        templateId: 'be66a06b-9dc6-4c19-b1b1-457b99c45dd4'
      }
    }
  },

  // Yelp
  yelp: {
    authToken: '0l7aSmVwtbLfh3YUNl05OOLnSs2Qknt9RFXgIOfE-MhYie50kCzWyMkLasy-iWO2Had4MIBmUxjTjDC9sFITthnq-nWwswMZx9W848gzIoD85WnTLjwNsN0dIMbcWHYx',
    markerMapping: {
      fashion: 'marker-clothes',
      cosmetics: 'marker-cosmetics',
      giftshops: 'marker-gifts',
      hobbyshops: 'marker-hobby',
      homeandgarden: 'marker-home',
      jewelry: 'marker-jewellery',
      artsandcrafts: 'marker-art',
      childcloth: 'marker-kids'
    }
  }
};

module.exports = config;
