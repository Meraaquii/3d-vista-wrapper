const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

// Fix for nodemailer v7+ CommonJS compatibility
const mailer = nodemailer.default || nodemailer;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create transporter for sending emails
const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASS || "your-app-password",
  },
});

// Verify transporter connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter error:", error.message);
  } else {
    console.log("Email transporter is ready to send messages");
  }
});

// API endpoint to send inquiry form data via email
app.post("/api/send-inquiry", async (req, res) => {
  const { name, phone, email, message } = req.body;

  // Validate required fields
  if (!name || !phone || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER || "your-email@gmail.com",
    to: process.env.RECIPIENT_EMAIL || "recipient@example.com",
    subject: `New Inquiry from ${name} - Meraaquii`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #e73e3f; margin-bottom: 20px;">New Inquiry Received</h2>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #333;">Contact Information</h3>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; width: 30%;"><strong>Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Phone:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0;"><strong>Email:</strong></td>
              <td style="padding: 10px 0;">${email}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #333;">Message</h3>
          <p style="line-height: 1.6; color: #555; margin: 0;">${message.replace(/\n/g, "<br>")}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999;">
          <p>This email was sent from the Meraaquii VR Content application inquiry form.</p>
          <p>Sent on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);

    console.log("Inquiry email sent successfully:", { name, email, phone });

    res.status(200).json({
      success: true,
      message: "Inquiry sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send inquiry. Please try again later.",
      error: error.message,
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/send-inquiry`);
});
