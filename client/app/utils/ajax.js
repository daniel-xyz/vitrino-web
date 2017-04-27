/* eslint-disable */

function send (method, json, url, headers, callback) {
  let xhr = typeof XMLHttpRequest !== 'undefined'
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP');

  xhr.open(method, url, true);

  if (method === 'post') {
    xhr.setRequestHeader('X-CSRF-Token', csrfToken);
  }

  if (json) {
    xhr.setRequestHeader('Accept', 'application/json');
  }

  if (headers) {
    setHeaders(xhr, headers);
  }

  xhr.onreadystatechange = function() {
    let status;
    let data;

    // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
    if (xhr.readyState === 4) { // `DONE`
      status = xhr.status;

      if (status === 200) {
        data = json ? JSON.parse(xhr.responseText) : xhr.responseText;
        callback(null, data);
      } else {
        callback(status, null);
      }
    }
  };

  xhr.send();
}

function setHeaders(xhr, headers) {
  Object.keys(headers).forEach(function(key) {
    xhr.setRequestHeader(key, headers[key]);
  });
}

function getJSON (url, headers, callback) {
  send('get', true, url, headers, callback)
}

function post (url, callback) {
  send('post', true, url, callback)
}

export {
  getJSON,
  post
};
