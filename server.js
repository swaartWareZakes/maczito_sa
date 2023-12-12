const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/sendEmail", (req, res) => {
  // Your email sending logic using nodemailer
  // This is just a simple example, replace it with your actual email sending logic

  // Create a transporter using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ACC,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "zakes201725@gmail.com",
    to: "maczitobookings@gmail.com",
    subject: "Inquiry from Maczito Website Contact Form",
    html: `
    <html>
      <body style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #3498db;">Hello Maczito Team!</h1>
        <p style="margin-bottom: 15px;">This is a message from a fan or potential client who used the Maczito website contact form.</p>
        <h4><strong>Name:</strong> ${req.body.name}</h4></br>
        <h4><strong>Email:</strong> ${req.body.email}</h4></br>
        <h4><strong>Phone:</strong> ${req.body.phone}</h4></br>
        <p>Message:</p>
        <p>${req.body.message}</p>
        <p>Best regards,</p>
        <p>Your Website</p>
      </body>
    </html>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.json({ status: "error" });
    }
    console.log("Email sent:", info.response);
    res.json({ status: "success" });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
