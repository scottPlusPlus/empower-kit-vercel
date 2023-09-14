import { useState } from "react";
import JarvisButton from "../agnostic/components/JarvisButton";
import { useRouter } from "next/navigation";


type Props = {
    initialSearch?:string|null,
    onSubmit:(arg:string)=>void,
}
export default function SearchBarComponent(props:Props) {

    const router = useRouter();
    const initialTerm = (props.initialSearch ?? "").trim();

    const [inputText, setInputText] = useState<string>(initialTerm);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        var val = event.target.value;
        setInputText(val);
        //props.onSubmit(val);
    };

    function doSearch(){
        var searchText = inputText.trim();
        if (searchText.length < 2){
            router.push("/");
            return;
        }

        const encoded = encodeURIComponent(searchText);
        console.log("let's go to: " + encoded);
        router.push("/?search="+encoded);
    }

    function searchButtonText():string {
        if (inputText.trim().length == 0 && initialTerm.length > 0){
            return "Clear";
        }
        return "Search";
    }

    return (
    <div className="flex py-4 gap-4">
    <input
        className="w-full p-2  border border-gray-300 text-black"
        placeholder="Search:"
        value={inputText}
        onChange={handleInputChange}
    />
        <JarvisButton onClick={doSearch} disabled={inputText==initialTerm}>{searchButtonText()}</JarvisButton>
    </div>
)
}