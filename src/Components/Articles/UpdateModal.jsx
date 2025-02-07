import { useState, useEffect , useRef } from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../api/api";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import { useUiContext } from "../../Context/UiContextProvider";








export default function UpdateModal({ selectedItemId , setReload }){
    const notify = toast();
    const { articleUpdateModal, setArticleUpdateModal } = useUiContext();
    const [defaultValue, setDefaultValue] = useState({});
    const tagRef = useRef(null);
    const [tag, setTag] = useState([]);
    const tagSuber = (e) => {
        if (e.key === "Enter") {
            let tagList = [...tag];
            const data = tagRef.current.value;
            if (data.length > 0) {
                let tagList = [...tag, data]
                setTag(tagList)
            }
            tagRef.current.value = "";
        }

    }



    useEffect(()=>{
        axios.get(`${baseUrl}/get-single-post/${selectedItemId}`)
        .then(res=>{
            setDefaultValue(res.data.data);
            console.log(res.data);
            setTag(res.data.data.tags);
        }).catch(e=>{
            console.log(e)
        })
    },[selectedItemId])
   
   

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        values: {
            title:defaultValue.title, 
            image:defaultValue.image ,
            shortDesc:defaultValue.shortDesc ,
            longDesc:defaultValue.longDesc ,
            slug:defaultValue.sluge,
            tag:"",
            published:defaultValue.published , 
        },

    });

  
        const tagDeleter = (selectedIndex) => {
            setTag(tag.filter((_, index) => index !== selectedIndex))
        }
        const help = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
            }
        }






        const submitHandler = (e) => {
            // e.preventDefault();
            const formData = {
               title:watch("title") ,
               slug:watch("slug"),
               shortDesc:watch("shortDesc"),
               longDesc:watch("longDesc"),
               image:"",
               tags:tag,
               published:watch("published"),
            };

            axios.patch(`${baseUrl}/update-post/${selectedItemId}`, formData)
                .then(res => {
                    console.log(res);
                    if (res?.status === 200) {
                        setReload(true);
                        toast.success("به روز رسانی با موفقیت انجام شد")
                    } else if (res?.status === 400) {
                        toast.warning("مشکل در به روز رسانی اطلاعات")

                        setReload(false);
                    } else {
                        toast.error("خطا")
                        setReload(false);
                    }

                }).catch(err => console.log(err))
        }
        const displayHandler = () => {
            setArticleUpdateModal(false);
            console.log(articleUpdateModal);
        }

        return (
            <div className={`bg-[rgba(0,0,0,.81)] h-full  z-[120] fixed top-0 left-0 right-0 bottom-0 flex iems-center justify-center ${articleUpdateModal ?"opacity-100 visible":" opacity-0 invisible"} `}>
                <ToastContainer />
                 <div className={`bg-white overflow-scroll w-[90%]  rounded-2xl p-3 h-auto`}>
                    <div onClick={() =>displayHandler()} className="w-full flex justify-end px-6 py-2">
                        <div className="cursor-pointer">
                            <FaTimes className="text-gray-600 text-2xl" />
                        </div>
                    </div>
                    <form onKeyDown={help} onSubmit={handleSubmit(submitHandler)} className="w-full  p-5 rounded-xl flex flex-col gap-4 bakh-reg">
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
                                defaultValue={defaultValue?.title}
                                type="text"
                                className="h-11 outline-none px-2 border border-zinc-400 rounded-full"

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
                                    minLength: 11,
                                })
                                }
                                defaultValue={defaultValue?.slug}
                                type="text"
                                className="h-11 outline-none px-2 border border-zinc-400 rounded-full"

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
                                defaultValue={defaultValue?.shortDesc}
                                type="text"
                                className="h-11 outline-none px-2 border border-zinc-400 rounded-full"

                            />

                        </div>

                        <div className="flex flex-col gap-3 ">
                            <label htmlFor="" className="text-sm">
                                متن اصلی
                            </label>
                            <textarea
                                {
                                ...register("longDesc", {
                                    required: true,
                                    minLength: 11,
                                })
                                }
                                defaultValue={defaultValue?.longDesc}

                                className="min-h-72 outline-none px-2 border border-zinc-400 rounded p-2"

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
                                defaultValue={defaultValue?.image}
                                type="text"
                                className="h-11 outline-none px-2 border border-zinc-400 rounded-full"

                            />

                        </div>

                         
                         <div className="flex flex-col gap-3 ">
                            <label htmlFor="">
                                تگ ها 
                            </label>
                            <input
                                ref={tagRef}
                                onKeyDown={tagSuber}
                                type="text"
                                className="h-11 outline-none px-2 border border-zinc-400 rounded"

                            />

                            <div className="px-2 gap-3 flex items-center flex-wrap h-auto w-full">
                                {tag?.map((t, index) => (
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
                        <option  value={false}>
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
            </div>

        );
    
    }


