import MiddleBannerModal from "./MiddleBannerModal";
import SingleMiddleBannerData from "./http/SingleMiddleBannerData";


export default function Provider({children}){
    return(
        <>
            <MiddleBannerModal>
                <SingleMiddleBannerData>
                    {children}
                </SingleMiddleBannerData>
            </MiddleBannerModal>
        </>
    );
}
