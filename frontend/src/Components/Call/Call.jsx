import React, { useState } from "react";
import {
  Phone,
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import "./Call.css";

const LogoImg =
  "https://interactive.meraaquii.com/uploads/proj_img/proj_logo_1758099871_1.png";

// API URL - change this based on your backend server
const API_URL = "http://localhost:5000/api/send-inquiry";

function Call() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", phone: "", email: "", message: "" });

        // Reset after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        setError(data.message || "Failed to send inquiry");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to send inquiry. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="call-page">
      {/* Background */}
      <div className="call-bg" />

      {/* Logo */}
      {/* <div className="call-logo-box">
        <img src={LogoImg} alt="Logo" className="call-logo" />
      </div> */}

      {/* Form Card */}
      <div className="call-form-card">
        <div className="call-form-header">
          <Phone size={28} className="call-icon" />
          <h1 className="call-title">Inquiry Form</h1>
          <p className="call-subtitle">Get in touch with us</p>
        </div>

        {isSubmitted ? (
          <div className="call-success">
            <CheckCircle size={48} className="call-success-icon" />
            <h2>Thank You!</h2>
            <p>We'll get back to you soon.</p>
          </div>
        ) : (
          <form className="call-form" onSubmit={handleSubmit}>
            {error && <div className="call-error">{error}</div>}

            <div className="call-input-group">
              <label htmlFor="name">
                <User size={16} />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                disabled={isLoading}
              />
            </div>

            <div className="call-input-group">
              <label htmlFor="phone">
                <Phone size={16} />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                disabled={isLoading}
              />
            </div>

            <div className="call-input-group">
              <label htmlFor="email">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <div className="call-input-group">
              <label htmlFor="message">
                <MessageSquare size={16} />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows={4}
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className="call-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="call-spinner" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Inquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Contact Info */}
      {/* <div className="call-contact-info">
        <div className="call-contact-item">
          <Phone size={18} />
          <span>+91 1234567890</span>
        </div>
        <div className="call-contact-item">
          <Mail size={18} />
          <span>info@meraaquii.com</span>
        </div>
      </div> */}
    </div>
  );
}

export default Call;
