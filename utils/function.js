const sgMail=require('@sendgrid/mail')
var path = require('path');
var fs=require('fs')
var root_path = path.dirname(require.main.filename);
var constant = require(root_path+'/config/constant');
module.exports={
sendEmail:(data,callback)=>{
    sgMail.setApiKey(constant.SENDGRID_API_KEY);
       console.log('123456789',data)
		var template = process.cwd() + '/views/' + data.template + '.jade';
		console.log("++++++++++11++++++++++++++++++");
		require('fs').readFile(template, 'utf8', function (err, file){
			console.log("++++++++++22++++++++++++++++++");
			if(err) return callback (err);

			var fn = require('jade').compile(file);
			var html = fn(data);


            
        	const msg = {
                to: data.email,
                toname:data.name,
                from: 'info@etranscript.in',
                fromname:'test uncocue',
                subject: 'Sending with SendGrid is Fun',
                text: 'Unocue email verification test',
                html: html,
              };
              sgMail.send(msg,(err,json)=>{
                  console.log("++++++++++33++++++++++++++++++"+err)
                  if (err) {
                      console.log("++++++++++44++++++++++++++++++");
                      callback(err,'');
                  }else {
                      console.log("++++++++++55++++++++++++++++++");
                      callback('',json);
                  }
              });
        
       })	
},
// sendEmailAttachment:(data,callback)=>{


//     sgMail.setApiKey(constant.SENDGRID_API_KEY);
    
//     var template = process.cwd() + '/views/' + data.template + '.jade';
//     console.log("++++++++++11++++++++++++++++++");
//     require('fs').readFile(template, 'utf8', function (err, file){
//         console.log("++++++++++22++++++++++++++++++");
//         if(err) return callback (err);

//         var fn = require('jade').compile(file);
//         var html = fn(data);
//            //let attachments=fs.readFileSync(`${__dirname}/abc.pdf`).toString('base64')
//            let attachments=fs.readFileSync(data.url).toString('base64')
//         	const msg = {
//                 to: data.email,
//                 toname:data.name,
//                 from: 'info@etranscript.in',
//                 fromname:'test uncocue',
//                 subject: 'Sending with SendGrid is Fun',
//                 text: 'and easy to do anywhere, even with Node.js',
//                 html:html,
//                 attachments:[{
//                     content:attachments,
//                     filename:'abc.pdf',
//                     type:'application/pdf',
//                     disposition:'attachment',
//                 }]
//               };
//               sgMail.send(msg,(err,json)=>{
//                   console.log("++++++++++33++++++++++++++++++"+err)
//                   if (err) {
//                       console.log("++++++++++44++++++++++++++++++");
//                       callback(err,'');
//                   }else {
//                       console.log("++++++++++55++++++++++++++++++");
//                       callback('',json);
//                   }
//               });
        
//         })
// }
}

