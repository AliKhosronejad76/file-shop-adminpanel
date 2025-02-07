import {Routes , Route } from "react-router-dom";
import MiddleBanner from "../Pages/MiddleBanner";
import MainBannerSlider from "../Pages/MainBannerSlider";
import Articles from "../Pages/Articles";



export default function Router(){
    return(
        <Routes>
            <Route path="/middle-banner" element={<MiddleBanner/>}/>
            <Route path="/main-banner-slider" element={<MainBannerSlider/>}/>
            <Route path="/articles" element={<Articles/>} />
        </Routes>

    )
}