import { useState , useEffect } from "react";

import {API_URL} from "../Hooks/api";

export function useActualizarProducto(){
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<string |null>(null);

    const actualizarProducto = async(id:Number,producto :any ,token:string)=>{
        setLoading(true);
        setError(null);
        try{
        const res = await fetch(`${API_URL}/productos/${id}` , {
                method : "PUT",
                headers: {"content-type": 'application/json',Authorization : 'Bearer ${token}'
            },
            body: JSON.stringify(producto)
        });
        if(!res.ok) throw new Error("Error al actualizar producto");

        return await res.json();
    }catch(err:any){
        setError(err.message);
        return null;
    }finally{
        setLoading(false);
    }
    };
    return {actualizarProducto,loading,error};
}