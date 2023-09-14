import React, { useEffect, useRef, useState } from 'react';

type Props = {
    text:string,
    bufferTop: number,
    bufferBottom: number,
    colorBefore: string,
    colorAfter: string
}

export default function ScrollTextComponent(props: Props) {

    const words = props.text.split(" ");
    const bufferTop = props.bufferTop ? props.bufferTop : 100;
    const bufferBottom = props.bufferBottom ? props.bufferBottom : 100;

    const [scrollPercentage, setScrollPercentage] = useState(0);
    const componentRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!componentRef.current) return;
            const componentRect = componentRef.current.getBoundingClientRect();
            const rTop = 0 - bufferTop;
            const windowHeight = window.innerHeight;
            const rBottom = windowHeight + bufferBottom;
            const rectY = componentRect.y;

            // const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            // const rectPos = docHeight - rectY;

            const mappedPercent = 100 * (1 - (rectY - rTop) / (rBottom - rTop));
            // console.log(`rTop: ${rTop},  rBottom: ${rBottom},  rectY: ${rectY},  val: ${mappedPercent}  windowH: ${windowHeight}`);
            setScrollPercentage(mappedPercent);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <span ref={componentRef}>
            {words.map((word, index) => (
                <span
                    key={index}
                    className={`transition-colors ${scrollPercentage >= (100 / (words.length - 1)) * index ? props.colorAfter : props.colorBefore
                        }`}
                >
                    {word}{' '}
                </span>
            ))}
        </span>
    );
};
