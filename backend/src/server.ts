// server.js
import dotenv from "dotenv";
dotenv.config();
console.log("CURRENT DIR:", process.cwd());
console.log("DB_NAME:", process.env.DB_NAME);
import express from "express";
import cors from "cors";
const PORT = process.env.PORT || 3006;

import authRoutes from "./routes/auth.routes.js";
import rssRoutes from "./routes/rss.routes.js";
import compraRoutes from "./routes/compra.routes.js";
import CompraDetalle from "./routes/compra.detalle.routes.js";
import userRoutes from './routes/user.routes.js';
import productosRoutes from "./routes/producto.route.js";
import postsRoutes from "./routes/posts.routes.js";
import adminUsersRoutes from "./routes/admin.users.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger.js';

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/compra-detalle', CompraDetalle);
app.use('/api/perfil', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/rss', rssRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/admin/users", adminUsersRoutes);


app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});