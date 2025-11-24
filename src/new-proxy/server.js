// server.js
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import postsRoutes from "./routes/posts.routes.js";
import rssRoutes from "./routes/rss.routes.js";
import compraRoutes from "./routes/compra.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", authRoutes);
app.use("/api", postsRoutes);
app.use("/api", rssRoutes);
app.use("/api", compraRoutes);

app.listen(3001, () => {
  console.log("Servidor backend corriendo en http://localhost:3001");
});
