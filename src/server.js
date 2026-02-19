import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import userRoutes from './routes/usersRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(logger);
app.use(express.json());
app.use(cors()); // Дозволяє запити з будь-яких джерел

// Використовуємо значення з .env або дефолтний порт 3000
const PORT = process.env.PORT ?? 3000;
app.use(authRoutes);
app.use(userRoutes);

// 404 — якщо маршрут не знайдено
app.use(notFoundHandler);

// Error — якщо під час запиту виникла помилка
app.use(errorHandler);

// підключення до MongoDB
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
