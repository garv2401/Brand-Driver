import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"BrandDriver" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
};

export default sendEmail;
