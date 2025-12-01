import { API_URL } from "./api";
import { useState } from "react";

export function useMisCompras(){

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<string | null>(null);
    const [compras,setCompras] = useState<any[]>([]);

    const fetchMisCompras = async() => {
        setLoading(true);
        setError(null);
        try{
            const token = localStorage.getItem("token");
            const res = await fetch('${API_URL}/mis-compras',{
                headers : {
                    "Authorization":'Bearer ${token}'
                }
            });
            if(!res.ok){
                throw new Error('Error al obtener mis compras');
            }
            const data = await res.json();
            setCompras(data);
            return data;
        }catch(err:any){
            setError(err.message);
            return null;
        }finally{
            setLoading(false);
        }
    };
    return {compras,fetchMisCompras,loading,error};
}