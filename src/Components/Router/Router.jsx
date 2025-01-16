import {Routes , Route } from "react-router-dom";
import MiddleBanner from "../Pages/MiddleBanner";


export default function Router(){
    return(
        <Routes>
            <Route path="/middle-banner" element={<MiddleBanner/>}/>
        </Routes>
    )
}