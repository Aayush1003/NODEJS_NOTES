# 03 - SMTP & Email in Node.js

## What is SMTP?
**SMTP (Simple Mail Transfer Protocol)** is a communication protocol for electronic mail transmission. As an Internet standard, SMTP was first defined in 1982. 
- Mail servers and other message transfer agents use SMTP to send and receive mail messages.
- User-level email clients typically use SMTP only for **sending** messages to a mail server for relaying. (For retrieving emails, protocols like IMAP or POP3 are used).

## Nodemailer
In the Node.js ecosystem, `nodemailer` is the absolute standard for sending emails. It is easy to use and supports various transports (SMTP, Sendgrid, AWS SES).

### Installation
```bash
npm install nodemailer
```

### Basic Example (Using Gmail)

> **Important:** To use Gmail, you usually need to create an "App Password" in your Google Account security settings, as standard passwords will be blocked for automated logins.

```javascript
const nodemailer = require('nodemailer');

async function sendMail() {
    // 1. Create a Transporter (The object that actually sends the mail)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_app_password' // NOT your real password, use an App Password
        }
    });

    // 2. Define the email options
    let mailOptions = {
        from: '"My Node App" <your_email@gmail.com>', // sender address
        to: 'recipient1@example.com, recipient2@example.com', // list of receivers
        subject: 'Hello from Node.js ✔', // Subject line
        text: 'This is a test email sent from Node.js!', // plain text body
        html: '<b>This is a test email sent from Node.js!</b>' // html body
    };

    // 3. Send the email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

sendMail();
```

## Best Practices for Sending Emails in Production
1. **Never use personal Gmail in production:** Use transactional email services like SendGrid, Mailgun, Amazon SES, or Postmark. They provide better deliverability, analytics, and avoid rate-limiting.
2. **Environment Variables:** Never hardcode SMTP credentials in your code. Always use `.env` files.
3. **Queueing:** Sending emails takes time. Don't block your main Node.js thread waiting for an email to send. Use background job queues like `Bull` or `Agenda` to process emails asynchronously.
