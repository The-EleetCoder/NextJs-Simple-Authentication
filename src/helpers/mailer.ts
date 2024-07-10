import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendemail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId, 10);
    const verifyLink = `${process.env.DOMAIN}/verifyEmail?Token=${hashedToken}`;
    const resetPasswordLink = `${process.env.DOMAIN}/resetPassword?Token=${hashedToken}`;

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSORD,
      },
    });

    const mailOptions: any = {
      from: "jaijain1803@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html:
        emailType === "VERIFY"
          ? `<p>Click <a href=${verifyLink}>here</a> Verify your email or copy and paste the link below in your browser. <br>${verifyLink}</p>`
          : `<p>Click <a href=${resetPasswordLink}>here</a> Verify your email or copy and paste the link below in your browser. <br>${resetPasswordLink}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
