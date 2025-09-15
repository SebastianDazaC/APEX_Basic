import express from 'express';
import db from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './routes/horarioRoutes.js';

dotenv.config();

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000'
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps, curl, Postman)
            if (!origin) return callback(null, true);
            
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            
            // Reject other origins
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;

db.getConnection((err, connection) => { });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;