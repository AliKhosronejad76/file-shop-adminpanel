import { useEffect , useState } from "react";
import { baseUrl } from "../../api/api";
import axios from "axios";
import { useGetSingleMiddleBanner } from "../../Context/http/SingleMiddleBannerData";
import { toast , ToastContainer } from "react-toastify";
import { useUiContext } from "../../Context/UiContextProvider";

export default function DeleteModal({banner , setReload}){ 
    const {deleteBox , setDeleteBox } = useUiContext();
    const { refetch , setReFetch } = useGetSingleMiddleBanner();
    const {data , id} = useGetSingleMiddleBanner();
    const notify = toast();
    
    const deleteHandler = ()=>{
        axios.post(`${baseUrl}/delete-one-middle-banner`,{goalId:id})
        .then(res=>{
            console.log(res);
            setDeleteBox(false);
            setReFetch(true);
            setReload(true);
            toast.success("بنر با موفقیت حذف شد");
        }).catch(e=>{
            console.log(e);
            setReFetch(false);
            setReload(false);
            toast.warning("مشکلی به وجود آمده است");

        })
    }
    
    return(
        <div className={`fixed z-[110] w-full h-full flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.5)] ${deleteBox ? "opacity-100 visible":"opacity-0 invisible"}`}>
                <ToastContainer/>
                <div className="bg-white w-[30%] h-max rounded-xl p-2 flex flex-col justify-around gap-10 ">
                    <div className="w-full flex flex-col items-center gap-4">
                        <img 
                         src={data?.image} 
                         className="w-[70%] h-32 rounded-xl"
                        />
                        <p>{data?.imageAlt}</p>
                        <p>{banner.id}</p>
                        <p className="text-rose-700">{data?._id}</p>
                    </div>
                
                
                    <p className="px-2 text-zinc-700 text-sm bakh-heavy">
                        آیا از حذف این بنر اطمینان دارید؟
                    </p>
                    <div className="w-full  text-white items-center justify-between flex px-5 bakh-light">
                        <button onClick={deleteHandler} className="bg-violet-800 rounded-md h-11 w-28 text-sm">بله حذف شود</button>
                        <button onClick={()=>setDeleteBox(false)} className="bg-rose-800 rounded-md h-11 w-28 text-sm">کنسل</button>
                    </div>
                
                </div>
        </div>
        
    )
}