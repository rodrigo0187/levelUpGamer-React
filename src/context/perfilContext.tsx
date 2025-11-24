import React, { createContext, useContext, useState } from "react";

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
    usuario: Usuario;
    compras: Compra[];
    historial: string[];
    setCompras: (c: Compra[]) => void;
    addHistorial: (msg: string) => void;
}

const PerfilContext = createContext<PerfilContextType | undefined>(undefined);

export const PerfilProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<Usuario>({ nombre: "Usuario", email: "usuario@correo.com" });
    const [compras, setCompras] = useState<Compra[]>([]);
    const [historial, setHistorial] = useState<string[]>([]);

    const addHistorial = (msg: string) => setHistorial(prev => [...prev, msg]);

    return (
        <PerfilContext.Provider value={{ usuario, compras, historial, setCompras, addHistorial }}>
            {children}
        </PerfilContext.Provider>
    );
};

export const usePerfil = () => {
    const context = useContext(PerfilContext);
    if (!context) throw new Error("usePerfil debe usarse dentro de PerfilProvider");
    return context;
};
