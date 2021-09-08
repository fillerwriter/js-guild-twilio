'use strict';

const queryString = require('querystring');

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v2.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.textResponder = async (event) => {
  let eventBodyBuffer = Buffer.from(event.body, "base64");
  let eventData = queryString.parse(eventBodyBuffer.toString('utf-8'));

  const fromNumber = eventData.From;
  const textMessage = eventData.Body;

  let message = 'Hello, Vox JS Guild';

  if (textMessage.trim().toUpperCase() === 'TIME') {
    let now = new Date();
    message = `The time is now ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
    body: `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>${message}</Message>
</Response>`,
  };
}
