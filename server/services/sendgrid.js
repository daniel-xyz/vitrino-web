let sendgrid = require('sendgrid')("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");
let config = require('../../config/config.js');

function sendToken(receiver, token) {
  let verificationURL;

  if (config.env === 'production') {
    verificationURL = config.host + '/verify_email?token=' + token;
  } else {
    verificationURL = 'http://localhost:3000/verify_email?token=' + token;
  }

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
        email: 'welcome@vitrino.de'
      },
      content: [
        {
          type: 'text/html',
          value: '<p></p>'
        }
      ],
      'template_id': 'd2c7b6f5-42c5-411b-a911-114f76ec9f64'
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
  sendToken
};