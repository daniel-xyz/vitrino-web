let config = require('../../config/config.js');
let sendgrid = require('sendgrid')(config.sendgrid.apikey);

function sendToken(receiver, token) {
  let host = (config.env === 'production') ? config.host : 'http://localhost:' + config.port;
  let verificationURL = host + '/verify_email/' + token;

  let request = sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: receiver
            }
          ],
          'substitutions': {
            '-verificationURL-': verificationURL
          }
        }
      ],
      from: {
        email: config.sendgrid.mails.welcome.sender.email,
        name: config.sendgrid.mails.welcome.sender.name
      },
      content: [
        {
          type: 'text/html',
          value: '<p></p>'
        }
      ],
      'template_id': config.sendgrid.mails.welcome.templateId
    }
  });

  sendgrid.API(request)
    .then(response => {
      console.log(response.statusCode); // eslint-disable-line
      console.log(response.body); // eslint-disable-line
      console.log(response.headers); // eslint-disable-line
    })
    .catch(error => {
      console.log(error.response);  // eslint-disable-line
    });
}

function sendResetPasswordLink(receiver, token) {
  let host = (config.env === 'production') ? config.host : 'http://localhost:' + config.port;
  let resetURL = host + '/reset/' + token;

  let request = sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: receiver
            }
          ],
          'substitutions': {
            '-resetURL-': resetURL
          }
        }
      ],
      from: {
        email: config.sendgrid.mails.passwordForgotten.sender.email,
        name: config.sendgrid.mails.passwordForgotten.sender.name
      },
      content: [
        {
          type: 'text/html',
          value: '<p></p>'
        }
      ],
      'template_id': config.sendgrid.mails.passwordForgotten.templateId
    }
  });

  sendgrid.API(request)
    .then(response => {
      console.log(response.statusCode); // eslint-disable-line
      console.log(response.body); // eslint-disable-line
      console.log(response.headers); // eslint-disable-line
    })
    .catch(error => {
      console.log(error.response);  // eslint-disable-line
    });
}

module.exports = {
  sendToken: sendToken,
  sendResetPasswordLink: sendResetPasswordLink
};