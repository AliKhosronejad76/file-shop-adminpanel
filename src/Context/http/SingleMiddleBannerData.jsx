import axios from "axios";
import { useContext  , createContext , useEffect , useState } from "react";
import { baseUrl } from "../../api/api";



const SingleMiddleBannerContext = createContext();



export default function SingleMiddleBannerData({children}){
    const [data , setData] = useState({});
    const [id , setId] = useState("");
    const [open , setOpen] = useState(false)
    console.log(baseUrl);
    
    useEffect(()=>{
        if(id == undefined){
            return
        }else {
        axios.get(`${baseUrl}/single-middle-banner/${id}`)
        .then(res=>{
            console.log(res.data)
            setData(res.data.data)
            console.log(data);
        })
        .catch(e=>console.log(e));
    }
    },[id , open]);


    return(
        <SingleMiddleBannerContext.Provider value={{data , id , setId , open , setOpen}}>
            {children}
        </SingleMiddleBannerContext.Provider>
    );
}

export const useGetSingleMiddleBanner = ()=> useContext(SingleMiddleBannerContext);