const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs").promises;

const sendBookingEmail = async ({
  to,
  subject = "Booking confirmation email",
  data,
}) => {
  try {
    // Read the email template file
    const source = await fs.readFile("./view/mail/bookingEmail.hbs", "utf8");
    const template = handlebars.compile(source);

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: "5638808c49380a",
        pass: "ab447d87200f17",
      },
    });

    // Define the email options
    const mailOptions = {
      from: "shriramsoft@gmail.com",
      cc: "serviceprovider@gmail.com",
      to: to,
      subject: subject,
      html: template({
        title: subject,
        data: data,
      }),
    };

    // Send the email and return a promise
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.log(error);
    throw new Error("Error sending email.");
  }
};

module.exports = { sendBookingEmail };
