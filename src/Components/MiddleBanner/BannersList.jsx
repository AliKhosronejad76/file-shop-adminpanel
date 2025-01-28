import { useEffect , useState } from "react";
import axios from "axios";
import UpdateBannerModal from "./UpdateBannerModal";
import BannerActions from "./BannerActions";
import DeleteModal from "./DeleteModal";
// import { useGetSingleMiddleBanner } from "../../Context/http/SingleMiddleBannerData";


export default function BannersList(){
    const [reload , setReload] = useState(false);
    const [bannersData , setBannersData] = useState([]);
    const [pageinate , setPageinage] = useState(1);
    const [bannersSize , setBannersSize] = useState(0);
    const [pageinatebtn , setpageinagebtn] = useState([0]);
    
   const handler = (data)=>{
        setPageinage(data+1);
        window.scrollTo({top:0 , behavior:"smooth"})
    }

    useEffect(()=>{
        setReload(false);
        const fetch = async()=>{
            const res = await axios.get(`http://localhost:4000/api/middle-banners?pn=${pageinate}`)  
            setBannersData(res.data.data);
            setBannersSize(res.data.bannersSize);
            setpageinagebtn(Array.from(Array(Math.ceil(res.data.bannersSize / 10 )).keys()))
            
        }
        fetch();
        
    },[pageinate , reload])


    return(
        <div className="relative flex flex-col gap-4 text-gray-700">
            <div className="w-full h-auto flex flex-wrap justify-between">
                {bannersData?.map((banner)=> <BannerBox  setReload={setReload} key={banner.id} banner={banner}/>)}
            </div>
            <UpdateBannerModal setReload={setReload}/>
        
            <div className="flex justify-center gap-2 w-full py-3">
                {bannersData && pageinatebtn.map((int , i)=>(
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
    );
}

function BannerBox({banner , setReload}){
    const [modal , setModal] = useState(false);
  
    return(
        <div className="w-[49%] relative bg-white shadow-md rounded-lg p-1 mb-9">
          
            <DeleteModal banner={banner} setReload={setReload}/>
            <div className="relative flex w-full items-center justify-start">
                <div onClick={()=>setModal(prev=> !prev)} className="flex flex-col gap-1 px-3 py-3 cursor-pointer">
                    <div className="w-[0.2rem] h-[0.2rem] bg-zinc-900 rounded-full"></div>
                    <div className="w-[0.2rem] h-[0.2rem] bg-zinc-900 rounded-full"></div>
                    <div className="w-[0.2rem] h-[0.2rem] bg-zinc-900 rounded-full"></div>
                </div>
            </div>
            <BannerActions bannerId={banner._id}  display={modal} setDisplay={setModal} />
            <img className="min-h-56 object-fill rounded-xl" src={banner.image} alt={banner.Alt}/>
            <h3 className="text-md py-3 px-2">{banner.imageAlt}</h3>
            
            <div className="px-4 py-3  w-full flex items-cetner justify-betwee text-base">
                <div className="w-1/2 flex justify-start">
                    <span>وضعیت:{banner.situation == true ? <span>روشن</span> : <span>خاموش</span>}</span>
                </div>

                <div className="w-1/2 flex justify-end">
                     <span>{banner.date}</span>
                </div>
            </div>

        </div>
    )
}