

interface CheckMarkProps {
    width: number,
    height: number,
    color: string,
    class?: string
}

export default function CheckMarkSVG(props: CheckMarkProps) {
    
    const cls = props.class ? props.class : "";
    return (
        <svg className={cls} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" width={props.width} height={props.height}>
            <path fill={props.color} d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z" />
        </svg>
    )
}
