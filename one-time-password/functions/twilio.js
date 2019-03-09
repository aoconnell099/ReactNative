const twilio = require('twilio');

const accountSid = 'AC3bf9b11618077be13c1000956118ef1f';
const authToken = '87c94bcd45a4ff880355cf60f9357120';

module.exports = new twilio.Twilio(accountSid, authToken);
