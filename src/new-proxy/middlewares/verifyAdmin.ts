
import type { NextFunction, Request, Response } from "express";

export default function verifyAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user?.role! == "admin") {
        return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
}