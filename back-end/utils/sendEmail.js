import nodemailer from 'nodemailer'
import nodemailerConfig from './nodemailerConfig.js'

const sendEmail = async ({ to, subject, html }) => {
    let testAccount = await nodemailer.createTestAccount();
  
    //const transporter = nodemailer.createTransport(nodemailerConfig);
  
    return nodemailerConfig.sendMail({
      from: '"Thinking Corp" <thinkingcorp@gmail.com>', // sender address
      to,
      subject,
      html,
    });
  };

export default sendEmail