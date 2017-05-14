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
        "link": "Weitere Informationen in unseren Datenschutzbestimmungen",
        "href": "/data",
        "elements": {
          header: '<span class="cc-header">{{header}}</span>&nbsp;',
          message: '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',
          messagelink: '<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a></span>',
          dismiss: '<a aria-label="dismiss cookie message" tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>',
          allow: '<a aria-label="Cookies erlauben" tabindex="0" class="cc-btn cc-allow">{{allow}}</a>',
          deny: '<a aria-label="Cookies ablehnen" tabindex="0" class="cc-btn cc-deny">{{deny}}</a>',
          link: '<a aria-label="Datenschutzbestimmungen" tabindex="0" class="cc-link" href="{{href}}" target="_self">{{link}}</a>',
          close: '<span aria-label="dismiss cookie message" tabindex="0" class="cc-close">{{close}}</span>',
        }
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
