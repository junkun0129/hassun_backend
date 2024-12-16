const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.post("/send-email", async (req, res) => {
  const { mailtext, from } = req.body;
  console.log(from, "from");
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail", // Gmailを使用する場合
    auth: {
      user: "junkun0129@gmail.com",
      pass: "ahpz icqs yklt zixl",
    },
  });

  try {
    const data = await transporter.sendMail({
      from,
      to: "junkun0129@gmail.com",
      subject: "Hassun問い合わせ",
      text: mailtext,
    });
    console.log(data, "data");
    return res.status(200).send("Email sent successfully");
  } catch (error) {
    console.log(error, "error");
    return res.status(500).send("Failed to send email");
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
