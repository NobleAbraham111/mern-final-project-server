require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');





mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected')).catch((error) => console.log(error));

const app = express()
const PORT = process.env.PORT || 5005;

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'DELETE', 'PUT'],

        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma',
        ],
        credentials: true,
    })
);


app.use(cookieParser());
app.use(express.json());


app.post('/test', (req, res) => {
    res.json({ message: 'POST request received', data: req.body });
});

app.put('/test', (req, res) => {
    res.json({ message: 'PUT request received', data: req.body });
});

app.delete('/test', (req, res) => {
    res.json({ message: 'DELETE request received' });
});





app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.get('/', (req, res) => {
    res.send('Server is running!');
});


app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
