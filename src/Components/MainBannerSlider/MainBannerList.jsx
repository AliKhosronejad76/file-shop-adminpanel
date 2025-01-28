import { useState , useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../api/api";
import DeleteModal from "./DeleteModal";
import Actions from "./Actions";
import UpdateModal from "./UpdateModal";




export default function MainBannerList(){
    const [reload , setReload] = useState(false);
    const [data, setData] = useState([]);
    const [pageinate , setPageinage] = useState(1);
    const [bannersSize , setBannersSize] = useState(0);
    const [pageinatebtn , setpageinagebtn] = useState([0]);
    const [selectedItemId , setSelectedItemId] = useState("");
    const handler = (data)=>{
        setPageinage(data+1);
        window.scrollTo({top:0 , behavior:"smooth"})
    }

    useEffect(()=>{
        setReload(false);
        const fetch = async()=>{
            const res = await axios.get(`${baseUrl}/get-all-main-slider-items`)
            setData(res.data.data);
            setBannersSize(res.data.bannersSize);
            setpageinagebtn(Array.from(Array(Math.ceil(res.data.bannersSize / 10 )).keys()))


        }
        fetch();
    },[pageinate , reload])
    return(
       <div className="relative flex flex-col gap-4 text-gray-700">
                   <div className="w-full h-auto flex flex-wrap justify-between">
                       {data?.map((slide)=> <BannerBox setSelectedItemId={setSelectedItemId} setReload={setReload} key={slide.id} slide={slide}/>)}
                   </div>
                    <UpdateModal setReload={setReload} selectedItemId={selectedItemId}/>
                    <DeleteModal setReload={setReload} selectedItemId={selectedItemId} />

                   <div className="flex justify-center gap-2 w-full py-3">
                       {data && pageinatebtn.map((int , i)=>(
                           <div 
                               className={`w-8 h-8  bg-white  rounded-full shadow-[0px_0px_10px_10px_rgba(0,0,0,0.10)]  flex  cursor-pointer items-center justify-center leading-loose text-xl`}
                               key={i} 
                               onClick={()=>handler(int)}
                           >
                               {int+1}
                           </div>
                       ))}
                   </div>
        </div>
    )
}



function BannerBox({slide , setReload , setSelectedItemId }){
    const [modal , setModal] = useState(false);
    
    return(
        <div className="w-[49%] relative bg-white shadow-md rounded-lg p-1 mb-9">
           
            
            <div className="relative flex w-full items-center justify-start">
                <div onClick={()=>setModal(prev=> !prev)} className="flex flex-col gap-1 px-3 py-3 cursor-pointer">
                    <div className="w-[0.2rem] h-[0.2rem] bg-zinc-900 rounded-full"></div>
                    <div className="w-[0.2rem] h-[0.2rem] bg-zinc-900 rounded-full"></div>
                    <div className="w-[0.2rem] h-[0.2rem] bg-zinc-900 rounded-full"></div>
                </div>
            </div>
            <Actions setSelectedItemId={setSelectedItemId} slideId={slide._id}  display={modal} setDisplay={setModal} />
            <img className="min-h-56 object-fill rounded-xl" src={slide.image} alt={slide.Alt}/>
            <h3 className="text-md py-3 px-2">{slide.imageAlt}</h3>
            
            <div className="px-4 py-3  w-full flex items-cetner justify-betwee text-base">
                <div className="w-1/2 flex justify-start">
                    <span>وضعیت:{slide.situation == true ? <span>روشن</span> : <span>خاموش</span>}</span>
                </div>

                <div className="w-1/2 flex justify-end">
                     <span>{slide.date}</span>
                </div>
            </div>

        </div>
    )
}