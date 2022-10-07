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

app.listen(constant.PORT,()=>{
    console.log(`server listening on port ${constant.PORT}` )
})