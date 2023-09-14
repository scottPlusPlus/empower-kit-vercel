"use client"

import { useEffect, useState } from "react";
import { overideTailwindCssClasses } from "../utils/cssUtils";

type Props = {
    children: React.ReactNode,
    showBelowPageYOffset: number,
    cssOverride?: string,
}

export default function FloatingFooter(props: Props) {

    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.pageYOffset > props.showBelowPageYOffset);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    if (!show) {
        return null;
    }

    const defaultCss = "fixed bottom-0 left-0 w-full bg-gray-800 text-white z-50";
    const css = overideTailwindCssClasses(defaultCss, props.cssOverride);

    return (
        <footer className={css}>
            {props.children}
        </footer>
    );
}