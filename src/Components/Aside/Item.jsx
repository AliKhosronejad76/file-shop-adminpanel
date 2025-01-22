import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Item({data}){
    const {pathname} = useLocation();
    // console.log(path)
    return(
        <li className="w-full flex items-center my-1.5">
            <Link className={`${pathname == data.path ?"bg-violet-800":""} flex items-center gap-4 w-full  px-4 py-3 hover:bg-violet-800 transition duration-500`} to={data.path}>
                <div className="text-xl ">
                 {<data.icon/>}
                </div>
                <span className="text-sm">
                  {data.title}
                </span>
                
            </Link> 
         </li>
    );
}