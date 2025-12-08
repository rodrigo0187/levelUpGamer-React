// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import authRoutes from "./routes/auth.routes";
import postsRoutes from "./routes/posts.routes";
import rssRoutes from "./routes/rss.routes";
import compraRoutes from "./routes/compra.routes";
import userRoutes from './routes/user.routes';
import productosRoutes from "./routes/producto.route";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3006;
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api", rssRoutes);
app.use("/api", compraRoutes);
app.use("/api", userRoutes);
app.use("/api", productosRoutes);


app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en ${PORT}`);
});