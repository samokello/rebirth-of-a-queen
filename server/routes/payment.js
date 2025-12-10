const express = require("express");
const router = express.Router();
const paystack = require("../services/paystack");
const https = require('https')


router.post("/initialize", async (req, res) => {
  const { email, amount } = req.body;

  {
    try {
      const response= await paystack.post("/transaction/initialize",{
        email,
        amount:amount*100,
        callback_url:"http://localhost:3000/donation/success"
      });
      res.json({
        status:true,
        authorization_url:response.data.data.authorization_url,
        reference:response.data.data.reference
      })
    } catch (error) {
      res.status(500).json(error.response?.data || error.message)
      
    }
  }
//   try {
//     const params = JSON.stringify({
//   "email": email,
//   "amount": amount
// })

// const options = {
//   hostname: 'api.paystack.co',
//   port: 443,
//   path: '/transaction/initialize',
//   method: 'POST',
//   headers: {
//     Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//     'Content-Type': 'application/json'
//   }
// }

// const req = https.request(options, res => {
//   let data = ''

//   res.on('data', (chunk) => {
//     data += chunk
//   });

//   res.on('end', () => {
//     console.log(JSON.parse(data))
//   })
// }).on('error', error => {
//   console.error(error)
// })

// req.write(params)
// req.end()
//     // const response = await paystack.post("/transaction/initialize", {
//     //   email,
//     //   amount: amount * 100, // convert to kobo
//     //   callback_url: "http://localhost:3000/donation/success"
//     // });

//     // res.json({
//     //   status: true,
//     //   authorization_url: response.data.data.authorization_url,
//     //   reference: response.data.data.reference
//     // });


//   } catch (err) {
//     res.status(500).json({
//       error: err.response?.data || err.message
//     });
//   }
});

router.get("/verify/:reference", async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await paystack.get(`/transaction/verify/${reference}`);

    const data = response.data.data;

    if (data.status === "success") {
      // TODO: Save donation record to your DB
    }

    res.json(data);

  } catch (err) {
    res.status(400).json({
      error: err.response?.data || err.message
    });
  }
});


module.exports = router;
