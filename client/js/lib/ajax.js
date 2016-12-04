/* eslint-disable */

var VitrinoLib = VitrinoLib || {};

VitrinoLib.Ajax = (function () {

  function send (method, json, url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest != 'undefined'
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.open(method, url, true);

    if (method === 'post') {
      xhr.setRequestHeader('X-CSRF-Token', csrfToken);
    }

    xhr.onreadystatechange = function() {
      var status;
      var data;

      // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
      if (xhr.readyState == 4) { // `DONE`
        status = xhr.status;

        if (status == 200) {
          data = json ? JSON.parse(xhr.responseText) : xhr.responseText;
          successHandler && successHandler(data);
        } else {
          errorHandler && errorHandler(status);
        }
      }
    };

    xhr.send();
  }

  function getJSON (url, successHandler, errorHandler) {
    send('get', true, url, successHandler, errorHandler)
  }

  function post (url, successHandler, errorHandler) {
    send('post', true, url, successHandler, errorHandler)
  }

  return {
    getJSON: getJSON,
    post: post
  };

})();