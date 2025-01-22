import { useState , useEffect } from "react";
import axios from "axios";
import {baseUrl} from "../../api/api";



export default function CreateBanner(){
    const [data,setData] = useState({});

    const submitHandler = (ev)=>{
        ev.preventDefault();
        axios.post(`${baseUrl}`).then(res=>{
            console.log(res)
        }).catch(e=>{
            console.log(e)
        })

    }

    
    
    const changeHandler = ()=>{}
    


    return(
        <div className="w-full">
        <form  className="w-full bg-white p-5 rounded-xl flex flex-col gap-4 bakh-reg">
            <div className="flex flex-col gap-3 ">
                <label htmlFor="" className="text-sm">   
                    آدرس تصویر             
                </label>
                <input  
                 
               
                type="text" 
                className="h-11 outline-none px-2 border border-zinc-400 rounded"/>
                <div>
                    
                </div>
           
            </div>
            <div className="flex flex-col gap-3">
                <label  htmlFor="" className="text-sm">
                    متن جایگزین
                </label>
                <input 
                

               
                type="text" 
                className="h-11 outline-none px-2 border border-zinc-400 rounded"/>
                <div>
                    
                </div>
            
            </div>

            <div className="flex flex-col gap-3">
                <label htmlFor="" className="text-sm">
                    بیوند تصویر
                </label>
                <input 
                

                name="link" 
                type="text" 
                className="h-11 outline-none px-2 border border-zinc-400 rounded"/>
            </div>
            <div>
               
                
            </div>
            <div>
                <select  name="situation"  className="outline-none px-2 bg-white-100 py-3">
                    <option defaultValue value={true}>فعال</option>
                    <option value={false}>غیرفعال</option>
                </select>
            </div>
            <div className="my-12">
                <button type="submit" className="bg-indigo-800 rounded-sm text-white w-24 h-11 transition duration-500 hover:bg-indigo-950 bakh-light">
                    ذخیره
                </button>
            </div>
                
        </form>
    </div>
    )
}