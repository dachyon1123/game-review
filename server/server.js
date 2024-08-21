const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/gameRoutes')
require('dotenv').config();

const app = express();
const port = 3002;

app.use(cors());



app.use(express.json());

app.use('/api', authRoutes);

app.listen(port, () => {
	console.log(`Successfully connected to port ${port}`);
});
