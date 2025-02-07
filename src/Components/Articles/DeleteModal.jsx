import { useUiContext } from "../../Context/UiContextProvider";
import { useEffect  , useState } from "react";
import { ToastContainer , toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../api/api";



export default function DeleteModal({selectedItemId , setReload}){
    const [data , setData] = useState({});
    const {articleDeleteModal , setArticleDeleteModal} = useUiContext();  
    const notify = toast();
    useEffect(()=>{
        setReload(false);
    })

    useEffect(()=>{
        axios.get(`${baseUrl}/get-single-post/${selectedItemId}`)
        .then(res=>{
            setData(res.data.data);
            console.log(data);
            console.log(selectedItemId);
        }).catch(e=>{
            console.log(e);
            console.log(selectedItemId);

        })
    },[selectedItemId , articleDeleteModal])

    const deleteHandler = ()=>{
        axios.post(`${baseUrl}/delete-post/${selectedItemId}`)
        .then(res=>{
            if(res.status === 200){
                toast.success("مقاله با موفقیت حذف شد");
                setArticleDeleteModal(false);
                setReload(true);

            }else{
                setReload(false);
            }


        }).catch((er)=>{
            console.log(er);
        })
    
    }


    return(
        <div className={`fixed z-[150] w-full h-full flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.7)] ${articleDeleteModal ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <ToastContainer />
          
            <div className="bg-white w-[30%] h-auto rounded-xl p-2 flex flex-col justify-around gap-10 overflow-ellipsis">
                <div className="w-full flex flex-col items-center gap-4">
                    <img
                        src={data?.image}
                        className="w-[70%] h-32 rounded-xl"
                    />
                    
                    <p>{data?._id}</p>
                    <p className="text-sm static">{data?.slug}</p>

                </div>

                <p className="px-2 text-zinc-700 text-sm bakh-heavy">
                    آیا از حذف این بنر اطمینان دارید؟
                </p>
                <div className="w-full  text-white items-center justify-between flex px-5 bakh-light">
                    <button onClick={deleteHandler} className="bg-violet-800 rounded-md h-11 w-28 text-sm">بله حذف شود</button>
                    <button onClick={() =>setArticleDeleteModal(false)} className="bg-rose-800 rounded-md h-11 w-28 text-sm">کنسل</button>
                </div>

            </div>
        </div>
    );
}