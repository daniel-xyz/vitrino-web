/* eslint-disable */

function send (method, json, url, successHandler, errorHandler) {
  let xhr = typeof XMLHttpRequest != 'undefined'
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP');

  xhr.open(method, url, true);

  if (method === 'post') {
    xhr.setRequestHeader('X-CSRF-Token', csrfToken);
  }

  if (json) {
    xhr.setRequestHeader('Accept', 'application/json');
  }

  xhr.onreadystatechange = function() {
    let status;
    let data;

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

module.exports = {
  getJSON,
  post
};