const express=require('express');
const bodyparser=require('body-parser')
const app=express();
const constant=require('./config/constant')

const functions =require('./utils/function')
const sgMail=require('@sendgrid/mail')
const errors=[];
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended:false}))

app.post('/',(req,res)=>{
    console.log('sendgrid server')
    console.log(req.body)
    functions.sendEmail(req.body,(err)=>{
        if(err){
            errors.push({
                type: 'sending verification mail',
                msg: 'ERROR: An error has been occurred while sending email. Please ensure email address is proper and try again.'
           });
           res.send({
                status: 400,
                message: 'ERROR: An error has been occurred while sending email. Please ensure email address is proper and try again.',
                data: errors
            });
        }else{
            res.json({
                status: 200,
                message:"Email successfully send"
            });
        }
    })
   
})

app.post('/attachment',(req,res)=>{
    // console.log('sendgrid server1111111')
    // console.log(req.body)
    functions.sendEmailAttachment(req.body,(err)=>{
        if(err){
            errors.push({
                type: 'sending verification mail',
                msg: 'ERROR: An error has been occurred while sending email. Please ensure email address is proper and try again.'
           });
           res.send({
                status: 400,
                message: 'ERROR: An error has been occurred while sending email. Please ensure email address is proper and try again.',
                data: errors
            });
        }else{
            res.json({
                status: 200,
                message:"Email successfully send"
            });
        }
    })
   
})


app.post('/testEmail', async function (req, res) {
    // console.log('!!!',req.body.toEmail)
	sgMail.setApiKey(constant.SENDGRID_API_KEY);
	const msg = {
	  to: req.body.toEmail,
	  from:req.body.email,
	  subject: 'TEST EMAIL FROM UNOCUE',
	  text: 'and easy to do anywhere, even with Node.js',
	  html: 'Hello',
	};
	const val=await sgMail.send(msg);
    console.log('val',val)
	 res.send('Email Sent');
});

app.post('/sendOtp', function (req, res){
    console.log('inside sendotp----')
    console.log(req.body)
	var errors = [];
	console.log("&&&& mobile &&&"+req.body.mobile);
	console.log("&&&& mobile_country_code &&&"+req.body.mobile_country_code);
	console.log("&&&& otp &&&"+req.body.otp);
    
		var emailOptions = {
			to: req.body.email,
			toName: req.body.userName,
			subject: 'Verification Email',
			template: req.body.template,
			text: req.body.otp+' is your one time password for verifying your mobile number for Unocue.'
		};
		functions.sendOtp(emailOptions, function(err) {
			if(err) {
				errors.push({
					type: 'sending verification mail',
					msg: 'ERROR: An error has been occurred while sending email. Please ensure email address is proper and try again.'
			   });
			   res.send({
					status: 400,
					message: 'ERROR: An error has been occurred while sending email. Please ensure email address is proper and try again.',
					data: errors
				});
			}else { 
				console.log('@@@3'); 
			   var contact_number= req.body.mobile;
			   var msg = req.body.otp+constant.template;
			   console.log('msg = ', msg); 
			   var message = urlencode(msg);
			   console.log('message = ', message); 
			   var data = 'username=' + constant.username + '&hash=' + constant.hashForSMS + '&sender=' + constant.sender + '&numbers=' + contact_number + '&message=' + message;
			   console.log("data : " + data);
			   var options = {
				   host: constant.hostForSMS, path:'/send?' + data
			   };
			   console.log('options = ', options); 
			   callback = function (response) {
				   var str = '';//another chunk of data has been recieved, so append it to `str`
				   response.on('data', function (chunk) {
					   str += chunk;
					   console.log("data: == "+ str);
				   });//the whole response has been recieved, so we just print it out here
				   response.on('end', function () {
						  console.log("end : == " + str);
				   });
			   }
			   console.log("ALL DATA");
			   https.request(options,callback).end();
				res.json({
					status: 200,
					message:"OTP successfully send"
				});
			}
		});	
});


app.listen(constant.PORT,()=>{
    console.log(`server listening on port ${constant.PORT}` )
})