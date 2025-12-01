import {useState} from "react";

import  {API_URL} from "../Hooks/api";

export function updatePerfilUsuario(){
    const [loading , setloading] = useState(false);

    const updatePerfil = async(update:any)=>{
        setloading(true);
        const token = localStorage.getItem("token");

        const res = await fetch('${API_URL}/perfil',{
            method :"PUT",
            headers: {
                "content-type":"application/json",
                Authorization: 'Bearer ${token}'
            },
            body : JSON.stringify(update)
        });
        const data = await res.json();
        setloading(false);
        return data;
    };
    return {updatePerfil,loading};
}