import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './util/db.js';
import tabledataController from './api/Location/tabledataController.js';
import branchController from './api/branch/branchController.js'

dotenv.config(); 
const port = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(cors({
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json()); 


app.get('/', (req, res) => {
    res.send('Hi from backend');
});

app.use('/api/data', tabledataController);
app.use('/api/data/branch', branchController);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
