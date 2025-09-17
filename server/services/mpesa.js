const axios = require('axios');

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
  MPESA_PASSKEY,
  MPESA_ENV = 'sandbox',
  MPESA_CALLBACK_URL
} = process.env;

const base = MPESA_ENV === 'production'
  ? 'https://api.safaricom.co.ke'
  : 'https://sandbox.safaricom.co.ke';

async function getAccessToken() {
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
  const { data } = await axios.get(`${base}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` }
  });
  return data.access_token;
}

function getTimestamp() {
  const d = new Date();
  const yyyy = d.getFullYear().toString();
  const MM = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${yyyy}${MM}${dd}${hh}${mm}${ss}`;
}

function stkPassword(shortcode, passkey, timestamp) {
  return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
}

async function initiateStkPush({ amount, phoneNumber, accountReference = 'Donation', description = 'Donation Payment' }) {
  const accessToken = await getAccessToken();
  const timestamp = getTimestamp();
  const password = stkPassword(MPESA_SHORTCODE, MPESA_PASSKEY, timestamp);
  const payload = {
    BusinessShortCode: MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: Number(amount),
    PartyA: phoneNumber,
    PartyB: MPESA_SHORTCODE,
    PhoneNumber: phoneNumber,
    CallBackURL: MPESA_CALLBACK_URL,
    AccountReference: accountReference,
    TransactionDesc: description
  };
  const { data } = await axios.post(`${base}/mpesa/stkpush/v1/processrequest`, payload, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return data;
}

module.exports = {
  initiateStkPush,
};


