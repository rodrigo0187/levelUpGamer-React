//get
import { API_URL } from "./api";
import { useState } from "react";
import  type {RSSitem}  from "./useRss";



export function useGetRss(){
    const [loading,setloading] = useState(false);
    const [error,setError] = useState<string | null>(null);
    const [data,setData] = useState<RSSitem[]>([]);

    const fetchRSS = async()=>{
        setloading(true);
        try{
            const res = await fetch(`${API_URL}/rss`);
            const json = await res.json();
            setData(json);
        }catch(err:any){
            setError(err.message);
        }finally{
            setloading(false);
        }
    };
    return {data,loading,error,fetchRSS};
}
