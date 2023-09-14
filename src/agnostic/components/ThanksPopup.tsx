import { useEffect, useState } from "react";
import { Signal } from "../utils/Signal";

type ThanksPopupProps = {
    openSignal: Signal,
    popupColor:string,
}

export function ThanksPopup(props: ThanksPopupProps) {

    const [show, setShow] = useState(false);

    function doClose() {
        setShow(false);
    };

    function doOpen() {
        console.log("Thanks Popup triggered");
        setShow(true);
        let timer: NodeJS.Timeout;
        timer = setTimeout(() => {
            setShow(false);
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }

    useEffect(() => {
        props.openSignal.registerHandler(doOpen)
    }, []);

    if (!show) {
        return null;
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-1000"></div>
            <div className="fixed inset-x-0 top-10 flex items-center justify-center" data-aos="fade-up" data-aos-delay="100">
                <div className={`flex m-4 p-4 ${props.popupColor} text-white rounded-lg shadow-lg z-1500`}>
                    <p>Thanks!</p>
                    <button
                        onClick={doClose}
                        className="pl-4 text-white hover:text-gray-200 focus:text-gray-200"
                    >X
                    </button>
                </div>
            </div>
        </>

    )
}