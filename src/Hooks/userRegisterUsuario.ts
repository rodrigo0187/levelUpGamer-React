import { useState } from "react";
// evitar repetir la url
 const API_URL = "http://locahost:3006/api";

 export function useRegisterUsuario(){
    const [loading ,setloading] = useState(false);
    const [error, seterror] = useState<string|null>(null);

    const register = async(nombre:string,email:string,telefono:string,psw:string)=>{
        setloading(true);
        seterror(null);
        try{
            const res = await fetch('${API_URL}/register',{
                method: "POST",
                headers:{"content-type":"aplication/json"},
                body : JSON.stringify({nombre,email,telefono,psw})
            });
            if(!res.ok){
                const msg = await res.json();
                throw new Error(msg.message || 'Error al registrar');
            }
            return await res.json;
        }catch(err:any){
            seterror(err.message);
            return null;
        }finally{
            setloading(false);
        }
    }
 }