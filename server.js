require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.post('/api/send-to-whatsapp', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Semua field harus diisi' });
    }

    const waMessage = `Pesan Baru dari Masjid Al Ikhlas:\nNama: ${name}\nEmail: ${email}\nPesan: ${message}`;

    try {
        await client.messages.create({
            body: waMessage,
            from: 'whatsapp:+14155238886', // Nomor Twilio WhatsApp
            to: 'whatsapp:+6287825111645'   // Nomor WhatsApp Anda
        });
        res.status(200).json({ message: 'Pesan berhasil dikirim ke WhatsApp' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Gagal mengirim pesan' });
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});