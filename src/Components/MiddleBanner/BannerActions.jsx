import { IoEyeOff } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";

export default function BannerActions({display}){
    return(
        <ul className={`${display ?"opacity-100 visible": "opacity-0 invisible"} transition-opacity duration-100 bg-white rounded-sm absolute right-6 top-9  w-28 text-sm shadow-[0px_0px_10px_2px_rgba(0,0,0,0.12)]`}>
           <Item title="غیرفعال" icon={<IoEyeOff/>}/>
           <Item title="حذف" icon={<RiDeleteBin5Line/>}/> 
           <Item title="به روزرسانی" icon={<RxUpdate/>}/>                 
        </ul>
    );
}


function Item({ icon , title  , display}){
    
    return(
        <li  className={` py-3 px-1.5 border-b border-zinc-300 flex items-center gap-2 cursor-pointer transition-all duration-500 hover:bg-gray-100`}>
            <div className="text-xl">
                {icon}
            </div>
            <p>{title}</p>
        </li>
    )
}