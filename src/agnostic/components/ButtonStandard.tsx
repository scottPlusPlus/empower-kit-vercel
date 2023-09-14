import { overideTailwindCssClasses } from "../utils/cssUtils";

type Props = {
    children: React.ReactNode,
    cssOverrides?: string,
    disabled?: boolean,
    onClick?: () => void,

}
export default function ButtonStandard(props: Props) {

    const cssOrig = `py-2 px-4 rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`;
    var myCss = cssOrig;
    if (props.cssOverrides){
        myCss = overideTailwindCssClasses(myCss, props.cssOverrides);
    }

    return (
        <button
            className={myCss}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};