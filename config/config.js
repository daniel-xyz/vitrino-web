let config = {
  env: process.env.NODE_ENV || 'development',
  host: 'http://vitrino.herokuapp.com',

  // --- Database ---
  database: {
    uri: process.env.DATABASE_URL || 'postgres://asxemzsxuktjom:UjG1gCmN54eBoqyfSFzyIo5QoO@ec2-54-75-232-56.eu-west-1.compute.amazonaws.com:5432/ddm8rtt5jmaf7j?ssl=true'

  },

  // --- Nunjucks templating engine ---
  nunjucks: {
    options: {
      autoescape: true,
      trimBlocks: true,
      noCache: true,
      watch: true,
      express: null // Must point to the express app object after the app has been initialized
    },
    viewPaths: [
      'server/partials',
      'server/components/home/views',
      'server/components/user/views'
    ]
  },

  // --- Sessions library ---
  sessions: {
    secret: process.env.SECRET_SESSION_KEY || 'G"ZTq^Z|T/i!cbBH"Gj2tizi2"_.("$")&?#<S<zF§S',
    resave: true,
    saveUninitialized: true,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false, // TODO: Must be set to true as soon as we haved switched to https
      maxAge: null
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
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        childSrc: ["'self'"],
        imgSrc: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        sandbox: ['allow-forms', 'allow-scripts'],
        objectSrc: []
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
  }
};

module.exports = config;