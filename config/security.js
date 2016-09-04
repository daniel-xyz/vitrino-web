let helmetOptions = {
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
};

let sessionOptions = {
  secret: 'G"ZTq^Z|T/i!cbBH"Gj2tizi2"_.("$")&?#<S<zF§S',
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false, // TODO: Must be set to true as soon as we haved switched to https
    maxAge: null
  }
};

module.exports = {
  helmetOptions,
  sessionOptions
};