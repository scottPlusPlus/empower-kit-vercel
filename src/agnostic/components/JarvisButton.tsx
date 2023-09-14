type Props = {
    children: React.ReactNode,
    disabled?: boolean,
    onClick?: () => void,

}
export default function JarvisButton(props: Props) {
    return (
        <button
            className={`px-4 rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                }`}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};