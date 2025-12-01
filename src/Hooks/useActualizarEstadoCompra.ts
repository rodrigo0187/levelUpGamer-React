import { useState } from "react";
import { API_URL } from "./api";


export function useActualizarEstadoCompra(){
    //  preparacion del hook y estados
    const[loading,setLoading]= useState(false);
    const[error,setError] = useState<string | null>(null);

    const actualizarEstado = async(id:Number , estado:string)=>{
        setLoading(true);
        setError(null);

        try{
            const res = await fetch('${API_URL}/compra/${id}/estado',{
                method:"PUT",
                headers :{
                    "content-type":"application/json"
                },
                body:JSON.stringify({estado})
        });
        if(!res.ok)throw new Error("Error al actualizar estado");
        return await res.json();
        }catch(err:any){
            setError(err.message);
            return null;
        }finally{
            setLoading(false);
        }
    };
    return {actualizarEstado,loading,error};
}