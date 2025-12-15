import verifyToken from "./verifyToken";
import type { NextFunction, Request, Response } from "express";

export default function verifyAdmin(req: Request, res: Response, next: NextFunction) {
    verifyToken(req, res, () => {
        if (req.user?.role === "admin") return next();
        return res.status(403).json({ message: "Acceso denegado" });
    });
}
