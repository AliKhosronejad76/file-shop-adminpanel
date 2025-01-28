import { useContext , createContext, useState } from "react";


const UiContext = createContext();

export default function UiContextProvider({children}){
    const [show , setShow] = useState(false);
    const [deleteBox , setDeleteBox] = useState(false);
    const [mainsliderUpdateModal , setMainSliderUpdateModal] = useState(false);
    const [mainSliderDeleteModal  , setMainSliderDeleteModal] = useState(false);
   
    return(
        <UiContext.Provider value={{ 
            show ,
            setShow ,
            deleteBox ,
            setDeleteBox ,
            mainsliderUpdateModal , 
            setMainSliderUpdateModal ,
            mainSliderDeleteModal,
            setMainSliderDeleteModal,
           
            }}>

        {children}
        </UiContext.Provider>
    );


}

export const  useUiContext = ()=> useContext(UiContext);