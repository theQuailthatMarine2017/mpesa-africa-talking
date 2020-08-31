const express = require('express');
const app = express();

//Africa Talking Credentials Config
const credentials = {
    apiKey: '556fba68282ddda090b4cffe59035058494af371e7438df3042e472422d026c5',
    username: 'sandbox',
};

const africastalking = require('africastalking')(credentials);
const sms = africastalking.SMS;

//Mpesa Credentials Config
const Mpesa = require("mpesa-api").Mpesa;

const m_credentials = {
	client_key: '65EMGJ7DsZCNQFsImsVKI0QL8HthLwPJ',
    client_secret: 'gjfqtoY1iB6asqF8',
    initiator_password: 'q-flix',
    security_credential: 'lesX2burpHsbE000pTV213WKNOsKDNmXd5trvNuySwwNxA/GpMek/0L7J9ayTmVlrS4WkFOpoU/eEx6+Fyv4IyjZ024WBUooWCP5el+AucrsEs7Rm0VjvZPIxppyA75kgglBevPmkUTy1Vmk5WrH3uoTiLRl1poRK0pgLkfzaPJ1t22wf2/KFuCgrPlsGXjPbIRSt7VyekvwDQi4flT4RhOdbvtwKs3GMz6vv2YQovpY+vt9RmIExoX2GoJCzE9k6TC2tqj+xuedi7OCmyPiL5/VQPnVnSkEW9k95bZHOdd5XcPo9CZ4TVfJwM2ZMeJjkSXcQgepDpVUWPhUV5Xr1g==',
    certificatepath: null
}

const environment = "sandbox";

const mpesa = new Mpesa(m_credentials, environment);

//Server Configs

const port = 9210;
app.use(express.json());
app.listen(port);

// app.use(function(req, res, next) {

//   var mpesa_token = Buffer.from(this.m_credentials.client_key+":"+this.m_credentials.client_secret ).toString('base64')
//   console.log(mpesa_token)

//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Authorization","Basic " + mpesa_token)
//   res.header("Content-Type","application/json")

//   next();


// });

app.get('test', async(req,res) => {

	console.log('lslslslsls')
})
app.post('/text', async (req,res) => {
	
	console.log(req.body)

	const options = {
	    to: [req.body.mobile],
	    message: req.body.message
	}

	// Send message and capture the response or error
	sms.send(options)
	    .then( response => {
	        console.log(response);
	    })
	    .catch( error => {
	        console.log(error);
	    });

});


app.post('/pay', async(req,res) => {

	console.log(req.body)

	mpesa.lipaNaMpesaOnline({
	    BusinessShortCode: "174379",
	    Amount: "1"/* 1000 is an example amount */,
	    PartyA: req.body.mobile,
	    PartyB: "174379",
	    PhoneNumber: req.body.mobile,
	    CallBackURL: "https://ce9579ac24b6.ngrok.io/hook-mpesa",
	    passKey:'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
	    AccountReference: "Q-FLIX MOVIE STREAMING SERVICE",
	    Timestamp:"1598881162",
	    password: "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTE1OTg4ODExNjI=",
	    TransactionType: "CustomerPayBillOnline" /* OPTIONAL */,
	    TransactionDesc: "Monthly Subscription" /* OPTIONAL */,
	  })
	  .then((response) => {
	    //Do something with the response
	    //eg
	    console.log(response);
	  })
	  .catch((error) => {
	    //Do something with the error;
	    //eg
	    console.error(error);
	  });

});

app.post('/hook-mpesa', async(req,res) =>{

	console.log("hook" + req.body)
});

app.post('/timeout-mpesa', async(req,res) =>{

	console.log(req.body)
});
console.log('Server is listening on port ' + port);