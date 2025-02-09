import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env
const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Allows network access
const CLIENT_DIST = path.resolve(__dirname, 'dist'); // Vite build folder
// ✅ Enable CORS for external API calls
app.use(cors());
// ✅ Fix Content Security Policy (CSP) for Paddle checkout
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self' https://buy.paddle.com;");
    res.setHeader("X-Frame-Options", "ALLOW-FROM https://buy.paddle.com");
    next();
});
// ✅ Serve static files from the Vite build folder (for production)
app.use(express.static(CLIENT_DIST));
// ✅ Route all frontend requests to index.html (for React Router)
app.get('*', (req, res) => {
    res.sendFile(path.join(CLIENT_DIST, 'index.html'));
});
// ✅ Paddle Webhook Handler (for handling subscription events)
app.post('/webhook/paddle', express.json(), (req, res) => {
    console.log('🔹 Received Paddle webhook:', req.body);
    res.status(200).send("Webhook received");
});
// ✅ Start Express Server (accessible via Network)
app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running at:`);
    console.log(`   ➜ Local:   http://localhost:${PORT}`);
    console.log(`   ➜ Network: http://${process.env.LOCAL_IP || '192.168.0.113'}:${PORT}/`);
});
