import React, { createContext, useContext, useState, useEffect } from "react";

interface Compra {
    producto: string;
    fecha: string;
}

interface Usuario {
    nombre: string;
    email: string;
    avatar?: string;
}

interface PerfilContextType {
    usuario: Usuario | null;
    compras: Compra[];
    historial: string[];
    setUsuario: (u: Usuario | null) => void;
    setCompras: (c: Compra[]) => void;
    addHistorial: (msg: string) => void;
}

const PerfilContext = createContext<PerfilContextType | undefined>(undefined);

export const PerfilProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [compras, setCompras] = useState<Compra[]>([]);
    const [historial, setHistorial] = useState<string[]>([]);

    const addHistorial = (msg: string) => setHistorial(prev => [...prev, msg]);

    // 🔥 Cargar usuario desde localStorage al iniciar
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUsuario(JSON.parse(storedUser));
        }
    }, []);

    return (
        <PerfilContext.Provider
            value={{ usuario, compras, historial, setUsuario, setCompras, addHistorial }}
        >
            {children}
        </PerfilContext.Provider>
    );
};

export const usePerfil = () => {
    const context = useContext(PerfilContext);
    if (!context) throw new Error("usePerfil debe usarse dentro de PerfilProvider");
    return context;
};
