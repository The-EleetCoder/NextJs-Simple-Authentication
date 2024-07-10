import nodemailer from "nodemailer";

export const sendemail = async ({ email, emailType, userId }: any) => {
  try {
    // TODO: cofigure mail for usage
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions: any = {
      from: "jaijain1803@gmail.com",
      to: { email },
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: "<b>Hello world?</b>",
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
