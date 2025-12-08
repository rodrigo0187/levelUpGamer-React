// src/middlewares/verifyToken.ts
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email?: string;
  // agrega cualquier otro dato que guardes en el token
}

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

const verifyToken = (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded; // Guarda los datos del usuario en req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};


export const verifyAdmin = (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user?.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Acceso denegado. Se requiere rol de administrador." });
    }
  });
};

export default verifyToken;
