import { useState } from "react";

import  {API_URL} from "../Hooks/api";

 export function useRegisterUsuario(){
    //loading estado que indica si la peticion esta en curso
    // error texto del error si falla la peticion
    // estado local del hook
    const [loading ,setloading] = useState(false);
    const [error, seterror] = useState<string|null>(null);
// register funcion que llama al endpoint
// esto de aca es una funcion publica que expondra el hook para registrar
    const register = async(nombre:string,email:string,telefono:string,psw:string)=>{
        setloading(true); // indica que empezo la peticion
        seterror(null); // limpiar errores previos
        // hacemos la peticion post al endpoint / register
        try{
            const res = await fetch(`${API_URL}/register`,{
                method: "POST",
                headers:{"content-type":"aplication/json"},// le decimos que mandamos un json
                body : JSON.stringify({nombre,email,telefono,psw}) // cuerpo de la peticion
            });
            // si la respuesta http no es 2xx , se considera error
            if(!res.ok){
                const msg = await res.json(); // se intenta leer body con el mensaje 
                throw new Error(msg.message || 'Error al registrar');
            }
            // si es ok, se devuelve el json
            return await res.json;
        }catch(err:any){
            // se captura el error y se actualiza el estado error
            seterror(err.message);
            return null;// el hook devuelve null si hubo fallo
        }finally{
            // siempre que termine la peticion ok o error desactivar el loading 
            setloading(false);
        }
    }
    // exponer la api publica del hook, funcion register mas estados.
    return {register,loading,error};
 }