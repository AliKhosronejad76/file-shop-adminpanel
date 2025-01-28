import { useEffect  , useState } from "react";
import { useUiContext } from "../../Context/UiContextProvider";
import { ToastContainer , toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../api/api";

export default function DeleteModal({ setReload ,slide, selectedItemId}){
    const {mainSliderDeleteModal , setMainSliderDeleteModal} = useUiContext()
    const [data , setData] = useState({});
    const notify = toast();
    console.log(data)
    console.log(selectedItemId);
    
    useEffect(()=>{
        axios.get(`${baseUrl}/single-main-slider-item/${selectedItemId}`)
        .then(res=>{
            setData(res.data.data);
            console.log(res.data.data);
            
        }).catch(err=>{
            console.log(err);
        })
    },[mainSliderDeleteModal]);

    const deleteHandler = ()=>{
          axios.post(`${baseUrl}/delete-main-slider-item`,{goalId:selectedItemId})
          .then(res=>{
            console.log(res);
            setReload(true);
            setMainSliderDeleteModal(false);
            toast.success("با موفقیت حذف شد");
          })
          .catch(e=>{
            console.log(e)
            setReload(false);
            toast.warning("مشکلی بیش آمده")

          })
    };

    return(
        <div className={`fixed z-[110] w-full h-full flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.5)] ${mainSliderDeleteModal ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <ToastContainer />
            <div className="bg-white w-[30%] h-max rounded-xl p-2 flex flex-col justify-around gap-10 ">
                <div className="w-full flex flex-col items-center gap-4">
                    <img
                        src={data?.image}
                        className="w-[70%] h-32 rounded-xl"
                    />
                    <p>{data?.imageAlt}</p>
                    <p>{data?._id}</p>
                    <p className="text-rose-700">{slide?._id}</p>
                </div>


                <p className="px-2 text-zinc-700 text-sm bakh-heavy">
                    آیا از حذف این بنر اطمینان دارید؟
                </p>
                <div className="w-full  text-white items-center justify-between flex px-5 bakh-light">
                    <button onClick={deleteHandler} className="bg-violet-800 rounded-md h-11 w-28 text-sm">بله حذف شود</button>
                    <button onClick={() =>setMainSliderDeleteModal(false)} className="bg-rose-800 rounded-md h-11 w-28 text-sm">کنسل</button>
                </div>

            </div>
        </div>
    );
}