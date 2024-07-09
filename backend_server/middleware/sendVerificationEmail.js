import nodemailer from 'nodemailer';

export const sendVerificationEmail = (token, email, name) => {
	const html = `
    <html>
        <body>
            <h3>Dear ${name}</h3>
            <p>Thanks for signing up at Tech Lines!</p>
            <p>Use the link below to verify your email</p>
            <a href="http://localhost:3000/email-verify/${token}">Click here!</a>
        </body>
    </html>
    `;
};
