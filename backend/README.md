# Backend API - Inquiry Form Email Service

This backend service handles form submissions from the inquiry form and sends them directly via email. No data is stored in any database.

## Features

- Receive inquiry form submissions from frontend
- Send form data directly to configured email address
- No database storage - data is only sent via email
- HTML formatted email with professional layout
- CORS enabled for frontend communication

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Nodemailer** - Email sending library
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Installation

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your email credentials:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-specific-password
RECIPIENT_EMAIL=recipient@example.com
PORT=5000
```

## Gmail App Password Setup

If using Gmail, you need to generate an App Password:

1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification (must be enabled)
3. Go to Security → App passwords
4. Select "Mail" and your device
5. Copy the generated 16-character password
6. Paste it in the `EMAIL_PASS` field in your `.env` file

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

Server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```
Response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Send Inquiry
```
POST /api/send-inquiry
```

Request Body:
```json
{
  "name": "John Doe",
  "phone": "+91 1234567890",
  "email": "john@example.com",
  "message": "I'm interested in your property..."
}
```

Success Response:
```json
{
  "success": true,
  "message": "Inquiry sent successfully"
}
```

Error Response:
```json
{
  "success": false,
  "message": "All fields are required"
}
```

## Email Configuration Options

### Using Gmail (Default)
```javascript
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

### Using Custom SMTP
```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.yourdomain.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

### Using SendGrid
```javascript
const transporter = nodemailer.createTransporter({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

## Frontend Integration

The frontend is configured to call the backend API. Make sure:

1. Backend server is running on `http://localhost:5000`
2. Update `API_URL` in `frontend/src/Components/Call/Call.jsx` if your backend URL is different:

```javascript
const API_URL = "http://localhost:5000/api/send-inquiry";
```

## Troubleshooting

### CORS Error
If you get CORS errors, make sure the backend is running and the frontend URL is allowed in `server.js`:

```javascript
app.use(cors({
  origin: 'http://localhost:5173' // Your frontend URL
}));
```

### Email Not Sending
- Check if `EMAIL_USER` and `EMAIL_PASS` are correct
- For Gmail, make sure you're using an App Password, not your regular password
- Check if "Less secure app access" is enabled (if not using App Password)
- Check spam folders in recipient email

### Port Already in Use
Change the port in `.env`:
```env
PORT=5001
```

## Security Notes

- Never commit `.env` file to version control
- Use App Passwords instead of regular passwords
- Consider adding rate limiting for production
- Add input sanitization for additional security

## License

Proprietary - Meraaquii/Nambiar District 25
