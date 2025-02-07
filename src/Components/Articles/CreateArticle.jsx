import { useEffect , useRef } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import {baseUrl} from "../../api/api";
// import FormErrorMsg from "../module/FormErrorMsg";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";


// {
//     ...register("image",{
//         required:true,
//         minLength:11,
//     })
//  } 



export default function CreateArticle(){
    const {reset , register , handleSubmit , watch , formState:{errors}} = useForm({});
    const notify = toast();


    const [relatedPost , setRelatedPost] = useState([-1]);
    // useEffect(()=>{
    //     axios.get(`${baseUrl}/relatedposts`).then(res=>{
    //         setRelatedPost(res.data.data);
    //     }).catch(e=>{
    //         console.log(e)
    //     })
    // },[])


          
    const tagRef= useRef(null);
    const [tag , setTag]= useState([]);
    const tagSuber = (e)=>{
        if(e.key === "Enter"){
             let  tagList = [...tag];
             const data = tagRef.current.value ; 
             if(data.length > 0 ){
                let tagList = [...tag , data]
                setTag(tagList)
             }
             tagRef.current.value = "";
        }
    }

    const tagDeleter = (selectedIndex)=>{
        setTag(tag.filter((_,index)=> index !== selectedIndex)   )
    }

 const help = (e)=>{

    if(e.key === "Enter"){
        e.preventDefault();
    }
    
        
 }
    const submitHandler = (e)=> { 
     
        
        const formData={
            title:watch("title"), 
            createdAt:new Date().toLocaleDateString('fa-IR' , { hour:"2-digit" , minute :"2-digit"}), 
            updatedAt:new Date().toLocaleDateString('fa-IR' , { hour:"2-digit" , minute :"2-digit"}), 
            slug:watch("slug"), 
            image:watch("image"), 
            shortDesc:watch("shortDesc"), 
            longDesc:watch("longDesc"), 
            tags:tag, 
            relatedPost:[], 
            comments:[], 
            type:"post", 
            pageView:0, 
            published:watch("published"), 
                  
        };
        console.log(formData)
        
        axios.post(`${baseUrl}/create-post`,formData)
        .then(res=>{
            console.log(res);
            if(res.status == 200){
                toast.success("ایتم مورد نظر با موفقیت ذخیره شد");
                reset();
                setTag([]);
            }else{
                console.log(res);
                toast.warning("خطا در ذخیره اطلاعات");

            }
        }).catch(e=>{
            console.log(e)
            toast.warning("خطا در ذخیره اطلاعات");
        })


    }

    // useEffect(()=>{
    //     console.log("start");
    //     console.log(errors)
    // },[errors]);
    return(
        <div className="w-full">
            <form  onKeyDown={help} onSubmit={handleSubmit(submitHandler)} className="w-full bg-white p-5 rounded-xl flex flex-col gap-4 bakh-reg">
                <ToastContainer/>
                <div className="flex flex-col gap-3 ">
                    <label htmlFor="" className="text-sm">
                        عنوان مقاله
                    </label>
                    <input
                        {
                        ...register("title", {
                            required: true,
                            minLength: 11,
                        })
                        }

                        type="text"
                        className="h-11 outline-none px-2 border border-zinc-400 rounded"
                    />
                </div>

                <div className="flex flex-col gap-3 ">
                    <label htmlFor="" className="text-sm">
                        اسلاگ
                    </label>
                    <input
                        {
                        ...register("slug", {
                            required: true,
                            minLength:5,
                        })
                        }

                        type="text"
                        className="h-11 outline-none px-2 border border-zinc-400 rounded"
                    />
                </div>

                <div className="flex flex-col gap-3 ">
                    <label htmlFor="" className="text-sm">
                        تصویر مقاله
                    </label>
                    <input
                        {
                        ...register("image", {
                            required: true,
                            minLength: 11,
                        })
                        }

                        type="text"
                        className="h-11 outline-none px-2 border border-zinc-400 rounded"
                    />
                </div>

                <div className="flex flex-col gap-3 ">
                    <label htmlFor="" className="text-sm">
                      توضیحات کوتاه
                    </label>
                    <input
                        {
                        ...register("shortDesc", {
                            required: true,
                            minLength: 11,
                        })
                        }

                        type="text"
                        className="h-11 outline-none px-2 border border-zinc-400 rounded"
                    />
                </div>
                <div className="flex flex-col gap-3 ">
                    <label htmlFor="" className="text-sm">
                      متن کامل
                    </label>
                    <textarea
                        {
                        ...register("longDesc", {
                            required: true,
                         
                        })
                        }

                        rows={12}
                        className="h-50 outline-none px-2 border border-zinc-400 rounded"
                    />
                </div>
                <div className="flex flex-col gap-3 ">
                        <label htmlFor="">
                            تگ ها
                        </label>
                        <input
                        // {
                        // ...register("tags", {
                        //     required: true,
                            
                        // })
                        // }
                        ref={tagRef}
                        onKeyDown={tagSuber}
                        type="text"
                        className="h-11 outline-none px-2 border border-zinc-400 rounded"
                    />
                      <div className="px-2 gap-3 flex items-center flex-wrap h-auto w-full">
                        {tag?.map((t , index)=>(
                            <div

                                key={index}
                                className=" bg-transparent border border-gray-800 w-16 min-w-max p-2 flex flex-wrap gap-3 items-center justify-between" 
                                >

                                <FaTimes
                                    onClick={() => tagDeleter(index)}
                                    className="text-gray-800 text-xl cursor-pointer" 
                                />
                                {t}
                            </div>
                        ))}
                      </div>  
                </div>
                <div className="flex flex-col gap-3 w-[40%]">
                    <label htmlFor="" className="text-sm">
                      وضعیت
                    </label>
                   <select className="w-28 h-20 outline-none" {...register("published",{})}>
                        <option defaultValue value={false}>
                         بیش نویس
                        </option>
                       
                        <option value={true}>
                            انتشار
                        </option>
                       
                   </select>
                </div>
              
                    <button
                      className="bg-indigo-800 rounded-sm text-white w-24 h-11 transition duration-500 hover:bg-indigo-950 bakh-light" 
                      type="submit"
                    >
                        ذخیره
                    </button>

                
            </form>
        </div>

    )
}