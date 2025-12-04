// server.js
import dotenv from "dotenv";
dotenv.config();
console.log("CURRENT DIR:", process.cwd());
console.log("DB_NAME:", process.env.DB_NAME);
import express from "express";
import cors from "cors";
const PORT = process.env.PORT || 3006;

import authRoutes from "./new-proxy/routes/auth.routes";
import rssRoutes from "./new-proxy/routes/rss.routes";
import compraRoutes from "./new-proxy/routes/compra.routes";
import CompraDetalle  from "./new-proxy/routes/compra.detalle.routes";
import userRoutes from './new-proxy/routes/user.routes';
import productosRoutes from "./new-proxy/routes/producto.route";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/compra-detalle', CompraDetalle);
app.use('/api/perfil', userRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/rss', rssRoutes);
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});