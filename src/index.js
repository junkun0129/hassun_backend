const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.post("/send-email", async (req, res) => {
  const { mailtext, from } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail", // Gmailを使用する場合
    auth: {
      user: process.env.EMAIL, // 送信元のメールアドレス
      pass: process.env.APP_PASSWORD,
    },
  });

  try {
    const data = await transporter.sendMail({
      from: process.env.EMAIL,
      to: from,
      subject: "Hassun問い合わせ",
      text: mailtext,
    });

    return res.status(200).send("Email sent successfully");
  } catch (error) {
    return res.status(500).send("Failed to send email");
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
