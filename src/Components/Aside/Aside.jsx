import Item from "./Item";
import { items } from "./data";

export default function Aside(){
    return(
        <aside className="bg-[rgb(4,0,25)]  w-[20%] text-base  h-screen  sticky top-[2.25rem] bottom-0 right-0 z-[99] text-white">
            <ul className="h-full w-full pt-16">
                {items.map((item)=> <Item key={item.id} data={item}/>)}
            </ul>
        </aside>
    );
}