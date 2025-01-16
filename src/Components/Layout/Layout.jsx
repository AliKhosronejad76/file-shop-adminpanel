import Aside from "../Aside/Aside";



export  default function Layout({children}){
    return(
        <div className="">
            <div className="flex items-center h-9 z-[100]  fixed top-0 left-0 right-0 bg-zinc-950 text-white text-base px-4">
               ggg
            </div>
            <div className="w-full flex items-start">
                <Aside />
                <main className="w-[80%] px-5 pt-16">
                    {children}
                </main>
            </div>
         
        </div>
    );
}