let sendgrid = require('sendgrid')("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");

function sendToken(receiver, token) {
  let authenticationURL = 'http://localhost:3000/verify_email?token=' + token;

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
          subject: 'Bitte bestätige deine E-Mail'
        }
      ],
      from: {
        email: 'welcome@vitrino.de'
      },
      content: [
        {
          type: 'text/html',
          value: '<a target=_blank href=\"' + authenticationURL + '\">E-Mail bestätigen</a>'
        }
      ]
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