const config = require('../config.js');
const sendgrid = require('sendgrid')(config.sendgrid.apikey);

const host = (config.env === 'production' || config.env === 'staging') ? config.host : 'http://localhost:' + config.port;

function sendToken (receiver, token) {
    const verificationURL = host + '/verify_email/' + token;

    const request = sendgrid.emptyRequest(
        {
            method: 'POST',
            path: '/v3/mail/send',
            body: {
                personalizations: [
                    {
                        to: [
                            {
                                email: receiver,
                            },
                        ],
                        substitutions: {
                            '-verificationURL-': verificationURL,
                        },
                    },
                ],
                from: {
                    email: config.sendgrid.mails.welcome.sender.email,
                    name: config.sendgrid.mails.welcome.sender.name,
                },
                content: [
                    {
                        type: 'text/html',
                        value: '<p></p>',
                    },
                ],
                template_id: config.sendgrid.mails.welcome.templateId,
            },
        },
    );

    sendgrid.API(request)
        .then((response) => {
            console.log(response.statusCode); // eslint-disable-line
            console.log(response.body); // eslint-disable-line
            console.log(response.headers); // eslint-disable-line
        })
        .catch(error => console.log(error.response));
}

function sendResetPasswordLink (receiver, token) {
    const resetURL = host + '/reset/' + token;

    const request = sendgrid.emptyRequest(
        {
            method: 'POST',
            path: '/v3/mail/send',
            body: {
                personalizations: [
                    {
                        to: [
                            {
                                email: receiver,
                            },
                        ],
                        substitutions: {
                            '-resetURL-': resetURL,
                        },
                    },
                ],
                from: {
                    email: config.sendgrid.mails.passwordForgotten.sender.email,
                    name: config.sendgrid.mails.passwordForgotten.sender.name,
                },
                content: [
                    {
                        type: 'text/html',
                        value: '<p></p>',
                    },
                ],
                template_id: config.sendgrid.mails.passwordForgotten.templateId,
            },
        },
    );

    sendgrid.API(request)
        .then((response) => {
            console.log(response.statusCode); // eslint-disable-line
            console.log(response.body); // eslint-disable-line
            console.log(response.headers); // eslint-disable-line
        })
        .catch(error => console.log(error.response));
}

module.exports = {
    sendToken,
    sendResetPasswordLink,
};
