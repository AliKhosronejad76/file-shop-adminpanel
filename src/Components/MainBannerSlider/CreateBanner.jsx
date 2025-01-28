import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { useState , useEffect } from "react";
import axios from "axios";
import {baseUrl} from "../../api/api";



export default function CreateBanner(){
    const {reset , register , handleSubmit , watch , formState:{errors}} = useForm({});
    const notify = toast();

    const submitHandler = (ev)=>{
        
        const formData={
            image:watch('image'),
            imageAlt:watch('imageAlt'),
            link:watch('link'),
            situation:watch('situation'),
        };

        axios.post(`${baseUrl}/create-main-slider-item`,formData).then(res=>{
            console.log(res);
            if(res.status==200){
                toast.success("ایتم مورد نظر با موفقیت ذخیره شد");
                reset();
            }else{
                toast.warning("خطا در ذخیره اطلاعات");

            }
        }).catch(e=>{
            console.log(e)
            toast.warning("خطا در ذخیره اطلاعات");
        })

    }

    
    

    


    return(
        <div className="w-full">
        <form onSubmit={handleSubmit(submitHandler)} className="w-full bg-white p-5 rounded-xl flex flex-col gap-4 bakh-reg">
            <ToastContainer/>
            <div className="flex flex-col gap-3 ">
                <label htmlFor="" className="text-sm">   
                    آدرس تصویر             
                </label>
                <input  
                 {
                    ...register("image",{
                        required:true,
                        minLength:11,
                    })
                 } 
               
                type="text" 
                className="h-11 outline-none px-2 border border-zinc-400 rounded"/>
                 <div>
                    {errors.image && errors.image.type === "required" && 
                        <span className="text-red-500">این فیلد الزامی می باشد</span>
                    }
                    {errors.image && errors.image.type === "minLength" && 
                        <span className="text-red-500">آدرس عکس کوتاه می باشد</span>
                    }
                </div>
           
            </div>
            <div className="flex flex-col gap-3">
                <label  htmlFor="" className="text-sm">
                    متن جایگزین
                </label>
                <input 
                    {
                    ...register("imageAlt",{required:true})
                    }
      
                type="text" 
                className="h-11 outline-none px-2 border border-zinc-400 rounded"/>
                 <div>
                    {              
                    errors.imageAlt && errors.imageAlt.type === "required" && 
                    <span  className="text-red-500">این فیلد الزامی می باشد</span>               
                    }
                </div>
            
            </div>

            <div className="flex flex-col gap-3">
                <label htmlFor="" className="text-sm">
                    بیوند تصویر
                </label>
                <input 
                 {
                    ...register("link",{
                        required:true,
                        minLength:11,
                    })
                }
                name="link" 
                type="text" 
                className="h-11 outline-none px-2 border border-zinc-400 rounded"/>
            </div>
            <div>
                { 
                errors.link && errors.link.type === "required" && 
                <span className="text-red-500">این فیلد الزامی می باشد</span>
                }
                { 
                errors.link && errors.link.type === "minLength" && 
                <span className="text-red-500">مقدار ورودی کوتاه می باشد</span>
                }
                
            </div>
            <div>
                <select  {...register("situation")} name="situation"  className="outline-none px-2 bg-white-100 py-3">
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