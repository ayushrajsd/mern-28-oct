const nodemailer = require("nodemailer");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const { SENDGRID_API_KEY } = process.env;

/**
 *
 * creds - {name:Aditya, otp:123456}
 * #{name} - Aditya
 * #{otp} - 123456
 */
function replaceContent(content, creds) {
  const allkeysArr = Object.keys(creds);
  allkeysArr.forEach(function (key) {
    content = content.replace(`#{${key}}`, creds[key]);
  });
  return content;
}

async function EmailHelper(templateName, receiverEmail, creds) {
  try {
    const templatePath = path.join(__dirname, "email_templates", templateName);
    let content = await fs.promises.readFile(templatePath, "utf-8");
    const emailDetails = {
      to: receiverEmail,
      from: "mrinal.bhattacharya@scaler.com",
      subject: "Mail from ScalerShows",
      text: `Hi ${creds.name} this is your reset otp ${creds.otp}`,
      html: replaceContent(content, creds),
    };
    const transportDetails = {
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: SENDGRID_API_KEY,
      },
    };
    const transporter = nodemailer.createTransport(transportDetails);
    await transporter.sendMail(emailDetails);
    console.log("email sent successfully");
  } catch (err) {
    console.error("error is sending email", err);
  }
}

module.exports = EmailHelper;
