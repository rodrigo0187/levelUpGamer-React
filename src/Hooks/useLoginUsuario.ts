import { json } from "body-parser";
import { useState } from "react";

const API_URL = "http://localhost:3006/api";

export function useLoginusuario(){
    const [loading, setloading] = useState(false);
    const [error,seterror] = useState<string | null>(null);

    const login= async(email:string,psw:string)=>{
        setloading(true);
        seterror(null);
        try{
            const res = await fetch('${API_URL}/login',{
                method :"POST",
                headers : {"content-type":"aplication/json"},
                body : JSON.stringify({email , psw})
            });
            const data = await res.json();

            if(!res.ok){
                throw new Error (data.message||"Error al inciar sesion");
            }

            // guardan el token
            localStorage.setItem("token",data.token);
            return data;
        }catch(err:any){
            seterror(err.message);
            return null;
        }finally{
            setloading(false);
        }
    };
    return {login,loading,error};

}