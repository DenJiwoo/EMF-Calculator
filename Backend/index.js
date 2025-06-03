const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/calculate-emf', (req, res) => {
    const {charge, velocity, magneticField } = req.body;
    if (
        typeof charge !== 'number' ||
        typeof velocity !== 'number' ||
        typeof magneticField !== 'number'
    ) {
        return res.status(400).json({ error: 'Invalid input'});
    }
    const emfForce = charge * velocity * magneticField;
    res.json({ emfForce});
});

app.listen(PORT, () => {
    console.log('Backend listening on http://localhost:${PORT');
});