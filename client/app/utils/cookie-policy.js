/* eslint-disable */

function enableCookieMessage () {
  window.addEventListener("load", function () {
    window.cookieconsent.initialise({
      "palette": {
        "popup": {
          "background": "#10cdff",
          "text": "#ffffff"
        },
        "button": {
          "background": "#a0e080",
          "text": "#ffffff"
        }
      },
      "theme": "classic",
      "type": "opt-out",
      "content": {
        "message": "Diese Webseite nutzt sogenannte Cookies, um dir ein angenehmes Nutzererlebnis zu ermöglichen.",
        "dismiss": "Ich mag Cookies",
        "deny": "Ich lehne ab",
        "link": "Weitere Informationen"
      },
      onInitialise: function (status) {
        var type = this.options.type;
        var didConsent = this.hasConsented();
        if (type === 'opt-in' && didConsent) {
          // enable cookies
        }
        if (type === 'opt-out' && !didConsent) {
          clearCookies();
        }
      },

      onStatusChange: function(status, chosenBefore) {
        var type = this.options.type;
        var didConsent = this.hasConsented();
        if (type === 'opt-in' && didConsent) {
          // enable cookies
        }
        if (type === 'opt-out' && !didConsent) {
          clearCookies();
        }
      },

      onRevokeChoice: function() {
        var type = this.options.type;
        if (type === 'opt-in') {
          clearCookies();
        }
        if (type === 'opt-out') {
          // enable cookies
        }
      },
    })
  });
}

function clearCookies () {
  document.cookie.split(";").forEach((c) => {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
}

module.exports = {
  enableCookieMessage
}
