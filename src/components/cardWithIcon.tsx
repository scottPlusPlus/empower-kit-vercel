import Image from 'next/image'

type Props = {
    iconSrc: string,
    title: string,
    body: string,
    textCss: string,
}


export default function CardWithIcon(props: Props) {
    return (

        <div
            className="relative md:px-9 after:hidden md:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-16 after:bg-slate-200 last:after:hidden"
            data-aos="fade-up"
            data-aos-delay="100"
        >
            <div className="mb-3">
                <Image alt="" width="56" height="56" src={props.iconSrc}></Image>
            </div>
            <h4 className="text-xl font-bold mb-1">{props.title}</h4>
            <p className={props.textCss}>
                {props.body}
            </p>
        </div>
    )
}