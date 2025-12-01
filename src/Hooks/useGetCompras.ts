import { API_URL } from "./api";
import { useState } from "react";
// get
export function useGetCompra(){
    const [loading , setLoading] = useState(false);
    const [error,setError] = useState<string | null>(null);
    const [compras,setCompras] = useState<any>(null);

    const getCompra = async(id:Number) =>{
        setLoading(true);
        setError(null);

        try{
            const token = localStorage.getItem("token");

            const res = await fetch('${API_URL}/compra/${id}',
                {
                    headers:{
                        "Authorization":'Bearer ${token}'
                    }
                });

            if(!res.ok)
                throw new Error("Compra no encontrada");
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
        return {compras,getCompra,loading,error};
    }