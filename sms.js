require('dotenv').config();

const authToken = process.env.TWILIO_TOKEN;
const accountSid = process.env.TWILIO_SID;
const client = require('twilio')(accountSid, authToken);

const targetNumber = process.env.TGT_NUMBER;
const twilioNumber = process.env.TWILIO_NUMBER;

const sendText = (body) => {
  client.messages
    .create({
      body,
      from: twilioNumber,
      to: targetNumber
    })
    .then(message => console.log(message.sid));
};

module.exports = { sendText };
