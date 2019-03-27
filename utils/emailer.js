const nodemailer = require('nodemailer');
const Joi = require('joi');

const emailer = async (data,messageData) => {
    const smtpConfig = "smtps://vsvaibhav2016@gmail.com:9958104209vishu@smtp.gmail.com"
    const transporter = nodemailer.createTransport(smtpConfig);

    const mailOptions = {
        from : data.senderEmail,
        to : data.recieverEmail,
        subject : messageData.subject,
        text : null || messageData.text,
        html : null || messageData.html,
        attachments : null || messageData.attachments,
        headers : null || messageData.priority
    };

    const schema = Joi.object().keys({
        from: Joi.string().email().regex(/[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,3})$/).required().description("Enter valid email id").error(new Error('Please enter a valid sender email id.')),
        to : Joi.alternatives([Joi.array().items(Joi.string().email().regex(/[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,3})$/).description("Please enter a valid email address")).min(1).required().description("Array of Email"),Joi.string().email().regex(/[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,3})$/).required().description("Please enter a valid email address")])
    }).with('from' , 'to');

    const result = Joi.validate({ from: mailOptions.from , to: mailOptions.to }, schema);

    if(result.error !== null) {
        throw new Error('Email id is not correct');
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('info', info);
        if(info.rejected.length> 0){
            emailArray = []
            info.rejected.forEach(element => {
                emailArray.push(element) 
            });
            console.log('Emailer 404');
            /* throw new Error({
                errorCode : "404",
                email : emailArray,
                errorMessage : "Above email ids not recieved email."
            }); */
        }
        console.log({
            errorCode: "0",
            errorMessage: "Successfully sent Email",
        })
    }catch (err) {
        console.log('Emailer err', err);
        /* throw new Error({
            errorCode : err.responseCode,
            errorMessage : err.response
        }); */
    }
    
}

exports.emailer = emailer;
