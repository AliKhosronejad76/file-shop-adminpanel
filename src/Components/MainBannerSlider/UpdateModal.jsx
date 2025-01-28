import { useState , useEffect } from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../api/api";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast , ToastContainer } from "react-toastify";
import { useUiContext } from "../../Context/UiContextProvider";



export default function UpdateModal({ setReload , selectedItemId }){
    const notify = toast();
    const {mainsliderUpdateModal , setMainSliderUpdateModal} = useUiContext();
    const [defaultValue , setDefaultValue]= useState({});

    useEffect(()=>{
        axios.get(`${baseUrl}/single-main-slider-item/${selectedItemId}`)
        .then(res=>{
            setDefaultValue(res.data.data);
        }).catch(e=>{
            console.log(e)
        })
    },[mainsliderUpdateModal]);

    const {register , handleSubmit , watch ,formState:{errors}} = useForm({
        values:{
            image:defaultValue?.image,
            imageAlt:defaultValue?.imageAlt,
            link:defaultValue?.link,
            situation:defaultValue?.situation,
        },
 
    });

    const submitHandler = (e)=>{
        // e.preventDefault();
        const formData = {
            goalId:selectedItemId,
            image:watch('image'),
            imageAlt:watch('imageAlt'),
            situation:watch('situation'),
            link:watch('link'),
        };
        console.log(register);
        axios.patch(`${baseUrl}/update-main-slider-item`,formData)
        .then(res=>{
            console.log(res);
            if(res?.status === 200){    
                setReload(true);
                toast.success("به روز رسانی با موفقیت انجام شد")
            }else if(res?.status === 400){
                toast.warning("مشکل در به روز رسانی اطلاعات")
                
                setReload(false);
            }else{
                toast.error("خطا")
                setReload(false);               
            }
            
        }).catch(err=>console.log(err))
    } 

    const displayHandler = ()=>{
        setMainSliderUpdateModal(false);
    }

    return(
        <div className={`fixed z-[110] w-full h-full flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.81)] ${mainsliderUpdateModal ? "opacity-100 visible":"opacity-0 invisible"}`}>
            <ToastContainer/>
            <div className={`bg-white absolute w-[80%] h-[90%]  rounded-2xl p-3 `}>
            
                <div onClick={()=>displayHandler()} className="w-full flex justify-end px-6 py-2">
                    <div className="cursor-pointer">
                        <FaTimes className="text-gray-600 text-2xl"/>
                    </div>
                </div>

                
                <form onSubmit={handleSubmit(submitHandler)} className="w-full  p-5 rounded-xl flex flex-col gap-4 bakh-reg">
                    <div className="flex flex-col gap-3 ">
                        <label htmlFor="" className="text-sm">
                            آدرس تصویر
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
                            className="h-11 outline-none px-2 border border-zinc-400 rounded-full" />
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
                        <label htmlFor="" className="text-sm">
                            متن جایگزین
                        </label>
                        <input
                            {
                            ...register("imageAlt", { required: true })
                            }

                            defaultValue={defaultValue?.imageAlt}
                           
                            type="text"
                            className="h-11 outline-none px-2 border border-zinc-400 rounded-full" />
                        <div>
                            {

                                errors.imageAlt && errors.imageAlt.type === "required" &&
                                <span className="text-red-500">این فیلد الزامی می باشد</span>

                            }
                        </div>

                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="" className="text-sm">
                            بیوند تصویر
                        </label>
                        <input
                            {
                            ...register("link", {
                                required: true,
                                minLength: 11,
                            })
                            }
                            defaultValue={defaultValue?.link}
                            
                            name="link"
                            type="text"
                            className="h-11 outline-none px-2 border border-zinc-400 rounded-full" />
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
                        <select {...register("situation")} name="situation" className="outline-none px-2 bg-white-100 py-3">
                            <option defaultValue value={true}>فعال</option>
                            <option value={false}>غیرفعال</option>
                        </select>
                    </div>
                    <div className="my-12">
                        <button type="submit" className="bg-indigo-800 rounded-sm text-white w-24 h-11 transition duration-500 hover:bg-indigo-950 bakh-light">
                            به روزرسانی
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}