import { useEffect, useState } from "react";
import titleImageG from "@/public/images/empower_title_g.png";
import titleImageP from "@/public/images/empower_title_p.png";
import { AB_FLAGS, getAbFlag } from "@/src/shared/abUtils";

type Props = {
    ipab:number,
    css: CssProps,
}

type CssProps = {
    navButton:string,
    navColor:string,
}

export default function ActivistNavHeader(props: Props) {

    const [inFocus, setInFocus] = useState(true);
    const inFocusPosition = 230;

    useEffect(() => {
        const handleScroll = () => {
            setInFocus(window.pageYOffset < inFocusPosition);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const topImage = getAbFlag(props.ipab, AB_FLAGS.COLOR) ? titleImageP : titleImageG;
    const myCss = props.css;

    function actualNavigation() {
        return (
            <div className="px-4 lg:px-8 flex justify-between">
                <div className="flex items-left">
                    <a href="#top" className="text-white text-xl font-semibold">Empower-Kit.com</a>
                </div>
                <div className="flex items-center">
                    <a href="./feedback?r=activists" className={myCss.navButton}>Feedback</a>
                    <a href="#top" className={myCss.navButton}>Back to Top</a>
                </div>
            </div>
        )
    }

    function conditionalNavBar() {
        if (inFocus) {
            return null;
        }
        return (
            <div className="flex flex-col">
                <nav className={"fixed top-0 left-0 w-full py-4 z-10 shadow-xl " + myCss.navColor}>
                    {actualNavigation()}
                </nav>
                {/* <div className="py-16"></div> */}
            </div>
        )
    }


    return (
        <>
            {conditionalNavBar()}
            <div className={"top-0 left-0 w-full py-4 shadow-md " + myCss.navColor}>
                <div className={"flex justify-center"}>
                    <div className="py-32"> </div>
                    <div className="flex">
                        <img src={topImage.src} className="max-h-[12rem] self-center"></img>
                    </div>
                </div>
            </div>
            <div className="py-4"></div>
        </>
    );


}