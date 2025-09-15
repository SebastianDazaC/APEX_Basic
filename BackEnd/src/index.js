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

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

// ---------- Cierre limpio del pool ----------
async function closePoolAndExit(signal) {
  console.log(`🛑 Señal ${signal} recibida. Cerrando servidor...`);
  try {
    await db.end();
    console.log('✅ Pool de conexiones cerrado correctamente');
  } catch (err) {
    console.error('⚠️ Error al cerrar el pool:', err);
  } finally {
    process.exit(0);
  }
}

process.on('SIGINT', () => closePoolAndExit('SIGINT'));
process.on('SIGTERM', () => closePoolAndExit('SIGTERM'));

export default app;
