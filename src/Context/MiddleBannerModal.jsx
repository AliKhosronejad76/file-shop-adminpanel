import { useContext , createContext, useState } from "react";


const UpdateModal = createContext();

export default function MiddleBannerModal({children}){
    const [show , setShow] = useState(false);
    const [deleteBox , setDeleteBox] = useState(false);
    return(
        <UpdateModal.Provider value={{ show , setShow , deleteBox , setDeleteBox }}>
            {children}
        </UpdateModal.Provider>
    );


}

export const  useMiddleBannerUpdateModal = ()=> useContext(UpdateModal);