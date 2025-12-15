// controllers/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { db } from "../../db/db";
import type { RowDataPacket } from "mysql2/promise";
import type { IUsuario } from "../../interfaces/IUsuario";

// Interfaz interna para mapear la base de datos
interface DbUsuario extends RowDataPacket {
  id: number;
  nombre: string;
  email: string;
  telefono?: string | null;
  password: string;
  role: string;
  avatar?: string;
  created_at?: Date;
  updated_at?: Date;
}
<<<<<<< HEAD
=======
// register
export const register = async (req:Request, res:Response) => {
  const { nombre, email, telefono, psw } = req.body;
>>>>>>> 4a4a67a3595cbf8e3b4196907e39ecbf257f8c98

export const register = async (req: Request, res: Response) => {
  // Frontend sends 'password', not 'psw'
  const { nombre, email, telefono, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: "Nombre, email y contraseña son obligatorios" });
  }

  try {
<<<<<<< HEAD
    const [existe] = await db.query<DbUsuario[]>(
      "SELECT * FROM usuarios WHERE email = ?",
=======
    const [existe] = await db.query<Usuario[]>(
      "SELECT * FROM usuario WHERE email = ?",
>>>>>>> 4a4a67a3595cbf8e3b4196907e39ecbf257f8c98
      [email]
    );

    if (existe.length > 0) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hash = await bcrypt.hash(password, 10);

    await db.query(
<<<<<<< HEAD
      "INSERT INTO usuarios (nombre, email, telefono, password, role) VALUES (?, ?, ?, ?, ?)",
=======
      "INSERT INTO usuario (nombre, email, telefono, psw, role) VALUES (?, ?, ?, ?, ?)",
>>>>>>> 4a4a67a3595cbf8e3b4196907e39ecbf257f8c98
      [nombre, email, telefono ?? null, hash, "user"]
    );

    res.status(201).json({ message: "Usuario registrado exitosamente" });

  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

// =====================
// LOGIN
// =====================
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
<<<<<<< HEAD
    const [rows] = await db.query<DbUsuario[]>(
      "SELECT * FROM usuarios WHERE email = ?",
=======
    const [rows] = await db.query<Usuario[]>(
      "SELECT * FROM usuario WHERE email = ?",
>>>>>>> 4a4a67a3595cbf8e3b4196907e39ecbf257f8c98
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = rows[0];

    // Compare provided 'password' with stored 'password'
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    if (!user.activo) {
      return res.status(403).json({
        message: "Cuenta desactivada",
        reason: "Tu cuenta ha sido desactivada. Por favor contacta a soporte para solicitar la reactivación.",
        supportEmail: "soporte@levelupgamer.com"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
      // controlar la expiracion de las contrasenas
    );

    const usuarioResponse: IUsuario = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      role: user.role,
      telefono: user.telefono,
      avatar: user.avatar
      // Don't send password/psw back
    };

    res.json({
      token,
      usuario: usuarioResponse
    });

  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ message: "Error en login" });
  }
};