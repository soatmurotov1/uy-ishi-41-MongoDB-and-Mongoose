import * as nodemailer from "nodemailer"
import "dotenv/config"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
})

;(async () => {
  const info = await transporter.sendMail({
    from: `"Abrorbek Soatmurotov" <${process.env.GOOGLE_EMAIL}>`,
    to: "murtazoyevolimjon54@gmail.com",
    subject: `Salom`,
    html: "<b>Hello World</b>",
  })

  console.log("Message sent:", info.messageId)
  console.log({ info })
})()
