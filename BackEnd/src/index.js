import express from 'express';
import db from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './routes/horarioRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;

db.getConnection((err, connection) => {});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;