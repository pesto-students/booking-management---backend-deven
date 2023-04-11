const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");

const sendBookingEmail = ({
  to,
  subject = "Booking confimration email",
  data,
}) => {
  // Read the email template file
  const source = fs.readFileSync("./view/mail/bookingEmail.hbs", "utf8");
  const template = handlebars.compile(source);

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: true,
    auth: {
      user: "116d2656bfd80d",
      pass: "c45cf96424c7d6",
    },
  });

  // Define the email options
  const mailOptions = {
    from: "devensitapara@gmail.com",
    to: to,
    subject: subject,
    html: template({
      title: subject,

      name: data.name,
      email: data.email,
      dateCheckIn: data.dateCheckIn,
      dateCheckOut: data.dateCheckOut,
      adults: data.adults,
      children: data.children,
      room: data.room,
      specialRequest: data.specialRequest,
    }),
  };

  // Send the email and return a promise
  return transporter.sendMail(mailOptions);
};

module.exports = { sendBookingEmail };
