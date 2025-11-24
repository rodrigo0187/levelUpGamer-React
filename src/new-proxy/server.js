const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const postsRoutes = require("./routes/posts.routes");
const rssRoutes = require("./routes/rss.routes");
const compraRoutes = require("./routes/compra.routes");

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
