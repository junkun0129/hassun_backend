const nodemailer = require("nodemailer");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
  const { mailtext, from } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  try {
    const data = await transporter.sendMail({
      from,
      to: process.env.EMAIL,
      replyTo: from, // 返信先アドレスを設定
      subject: "Hassun問い合わせ",
      text: mailtext,
      html: `<p>${mailtext}</p>`, // HTML形式のメール
      headers: {
        "X-Priority": "1", // 高い優先度を設定
        "X-MSMail-Priority": "High",
        Importance: "High",
      },
    });

    return res.status(200).send("Email sent successfully");
  } catch (error) {
    return res.status(500).send("Failed to send email");
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
