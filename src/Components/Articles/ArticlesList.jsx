import { useState , useEffect } from "react";
import { baseUrl } from "../../api/api";
import axios from "axios";
import ArticleItem from "./ArticleItem";
import DeleteModal from "./Deletemodal";
import UpdateModal from "./UpdateModal";

export default function ArticlesList(){
    const [posts , setPosts] = useState([]);
    const [reload , setReload] = useState(false);
    const [selectedItemId , setSelectedItemId] = useState("");
   
   
    useEffect(()=>{
        axios.get(`${baseUrl}/get-all-posts`)
        .then(res=>{
            setPosts(res.data.data);
        })
        .catch((e)=>{
            console.log(e);
        })
    },[reload]);


    return(
       <div className="relative flex flex-col gap-4 text-gray-700">
             <DeleteModal setReload={setReload} selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId}/>
             <div className="w-full h-auto flex flex-wrap justify-between">
                {posts?.map((post)=><ArticleItem  setSelectedItemId={setSelectedItemId} setReload={setReload} key={post.id} article={post}/>)}
             </div>
             <UpdateModal setReload={setReload} selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId}/>
            
        </div>
    )
}