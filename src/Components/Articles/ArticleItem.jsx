import { useEffect, useState } from "react";
import {RiDeleteBin5Line} from "react-icons/ri";
import {RxUpdate} from "react-icons/rx";
import { useUiContext } from "../../Context/UiContextProvider";

export default function ArticleItem({article , selectedItemId  , setSelectedItemId}){
    const [actionModal , setActionModal] = useState(false);
    const {
        setArticleDeleteModal, 
        setArticleUpdateModal , 
        articleUpdateModal , 
    } = useUiContext();

    useEffect(()=>{
        setSelectedItemId(article._id);
    },[
        selectedItemId , 
        actionModal,
    ]);

    const deleteItem = ()=>{ 
        setArticleDeleteModal(true);
   
    }

    const getUpdateItem = ()=>{
        setArticleUpdateModal(true);
        console.log(articleUpdateModal);
        console.log("click");
    } 
    


    
    return(
        <div className="w-[49%] relative bg-white shadow-md rounded-lg p-1 mb-9">
            {/* aciosnmodal */}
                 <ul className={`${actionModal ?"opacity-100 visible": "opacity-0 invisible"} transition-opacity duration-100 bg-white rounded-sm absolute right-6 top-9  w-28 text-sm shadow-[0px_0px_10px_2px_rgba(0,0,0,0.12)]`}>                          
                    {/* <Item title="غیرفعال" icon={<IoEyeOff/>}/> */}
                    <Item action={()=>deleteItem()} title="حذف" icon={<RiDeleteBin5Line/>}/> 
                    <Item action={()=>getUpdateItem()} title="به روزرسانی" icon={<RxUpdate/>}/>                 
                 </ul>
            {/* aciosnmodal */}


            <div className="relative flex w-full items-center justify-start">
                <div onClick={() => setActionModal(prev => !prev)} className="flex flex-col gap-1 px-3 py-3 cursor-pointer">
                    <div className="w-[0.2rem] h-[0.2rem] bg-zinc-900 rounded-full"></div>
                    <div className="w-[0.2rem] h-[0.2rem] bg-zinc-900 rounded-full"></div>
                    <div className="w-[0.2rem] h-[0.2rem] bg-zinc-900 rounded-full"></div>
                </div>
            </div>
            {/* <Actions setSelectedItemId={setSelectedItemId} slideId={slide._id} display={modal} setDisplay={setModal} /> */}
            <img className="min-h-56 object-fill rounded-xl" src={article.image} />
            <h3 className="text-md py-3 px-2">{article.title}</h3>

            <div className="px-4 py-3  w-full flex items-cetner justify-betwee text-base">
                <div className="w-1/2 flex justify-start">
                    <div className="flex items-center text-sm gap-3 bakh-bold">وضعیت:{article.published == true ? <div className="bg-green-500 text-white rounded text-wrap w-20 min-h-10 max-h-auto text-center flex items-center justify-center ">منتشر شده</div> : <div className="bg-rose-600 text-white rounded text-wrap w-20 min-h-10 max-h-auto text-center flex items-center justify-center ">در صف انتشار</div>}</div>
                </div>

                <div className="w-1/2 flex justify-end">
                    <span>{article.date}</span>
                </div>
            </div>

        </div>
    );
}



function Item({ icon , title  , action }){
    
    return(
        <li  onClick={action} className={`py-3 px-1.5 border-b border-zinc-300 flex items-center gap-2 cursor-pointer transition-all duration-500 hover:bg-gray-100`}>
            <div className="text-xl">
                {icon}
            </div>
            <p>{title}</p>
        </li>
    )
}