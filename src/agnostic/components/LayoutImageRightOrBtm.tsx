type Props = {
    children: React.ReactNode,
    imageSrc: string,
    imageAlt: string,
}


export default function LayoutImageRightOrBtm(props: Props) {

    return (
        <section>
            <div className={"grid grid-cols-1 lg:grid-cols-2"}>

                {/* Left column */}
                {props.children}

                {/* Right column.. full bleed image */}
                <div className="flex">
                    <div className="min-h-[200px]"> </div>
                    <ImageFill src={props.imageSrc} alt={props.imageAlt} />
                </div>
            </div>
        </section>

    )
}

function ImageFill(props: { src: string, alt?: string }) {
    return (
        <div
            className="relative w-full h-full "
        >
            <div className="w-200 h-200"></div>
            <img
                src={props.src}
                alt={props.alt ? props.alt : "image"}
                className="absolute top-0 left-0 w-full h-full object-cover"
            />
        </div>
    );
}