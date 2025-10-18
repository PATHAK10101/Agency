const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const Contact = require("./models/Contact");
const appendToSheet = require("./utils/googleSheet");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 📩 POST /contact — Handle contact form
app.post("/contact", async (req, res) => {
  const { name, email, message, phone, service, recaptchaToken } = req.body;

  try {

    const recaptchaSecret = process.env.RECAPTCHA_SECRET;
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`
    );

    if (!recaptchaResponse.data.success) {
      return res.status(400).json({ success: false, message: "reCAPTCHA failed" });
    }

    // ✅ Prepare all async tasks
    const saveToDB = new Contact({ name, email, message, phone, service }).save();

    const saveToSheet = appendToSheet({ name, email, phone, service, message });

    const notifyTeam = transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission',
      replyTo: email,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    const autoReply = transporter.sendMail({
      from: `"PIARA Agency" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for contacting us!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <img src="cid:logo" alt="PIARA Logo" width="120" style="margin-bottom: 20px;" />
          <h2>Hi ${name},</h2>
          <p>Thanks for contacting <strong>PIARA Agency</strong>! 🎯</p>
          <p>We’ve received your message and a team member will get back to you within 24 hours.</p>
          <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #2196f3;">
            <strong>Your message:</strong><br>
            "${message}"
          </blockquote>
          <p>If this is urgent, feel free to call us at <strong>+971 50 616 9723</strong>.</p>
          <p>In the meantime, check out our work on:</p>
          <ul>
            <li><a href="https://instagram.com">Instagram</a></li>
            <li><a href="https://linkedin.com">LinkedIn</a></li>
            <li><a href="https://yourwebsite.com">Our Website</a></li>
          </ul>
          <p style="color: #888;">– The PIARA Agency Team 🚀</p>
        </div>
      `,
      attachments: [{
        filename: 'logo.png',
        path: './asset/logo.png',
        cid: 'logo' // same as in the <img src="cid:logo">
      }]
    });

    // ✅ Run all operations in parallel
    await Promise.all([saveToDB, saveToSheet, notifyTeam, autoReply]);

    // ✅ Respond after all are done
    res.status(200).json({ success: true, message: "Contact saved, emailed, and added to sheet" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
});

// 🔗 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 🔄 Basic GET route
app.get("/", (req, res) => {
  res.send("API running");
});

// 🔥 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
