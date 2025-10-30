import * as nodemailer from "nodemailer";
import "dotenv/config";

//Email transport sozlamalari
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

//6 xonali OTP yaratish funksiyasi
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

//1 daqiqa amal qiladigan OTP yuborish
(async () => {
  const otp = generateOTP();
  const expiresAt = Date.now() + 60 * 1000; 

  const info = await transporter.sendMail({
    from: `"Abrorbek Soatmurotov" <${process.env.GOOGLE_EMAIL}>`,
    to: "soatmurotovabrorbek23@gmail.com",
    subject: "Tasdiqlash kodi (1 daqiqa amal qiladi)",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>🔐 Sizning bir martalik parolingiz:</h2>
        <h1 style="color: #2b6cb0;">${otp}</h1>
        <p>Bu kod 1 daqiqa davomida amal qiladi.</p>
      </div>
    `,
  });

  console.log("OTP yuborildi:", info.messageId);
  console.log("OTP:", otp);
  console.log("Amal qilish muddati:", new Date(expiresAt).toLocaleTimeString());

  setTimeout(() => {
    console.log("OTP muddati tugadi:", otp);
  }, 60 * 1000);
})();
