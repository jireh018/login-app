import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kathleen.bashirian@ethereal.email',
        pass: 'rk5tYgxnrb6byU2VyG'
    }
});

export default transporter