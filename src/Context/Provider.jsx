import UiContextProvider from "./UiContextProvider";
import SingleMiddleBannerData from "./http/SingleMiddleBannerData";


export default function Provider({children}){
    return(
        <>
            <UiContextProvider>
                <SingleMiddleBannerData>
                    {children}
                </SingleMiddleBannerData>
            </UiContextProvider>
        </>
    );
}
