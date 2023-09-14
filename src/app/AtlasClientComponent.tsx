'use client'

import { AtlasCreatorT } from "@/shared/atlasApiShema"
import AtlasCreatorViewComponent from "./AtlasCreatorViewComponent";
import { useEffect, useState } from "react";
import LoadingText from "@/agnostic/components/LoadingText";
import { submitAnalytics } from "../frontCode/dataUtils";
import SearchBarComponent from "./SearchBarComponent";

type AtlasClientProps = {
    projects: Array<AtlasCreatorT>,
    junk: string,
    searchText?:string|null
}

const AtlasClientComponent = (props: AtlasClientProps) => {
    // console.log(`Atlas Client Component has ${props.projects.length} projects`);
    // console.log("junk: " + props.junk);
    useEffect(() => {
        submitAnalytics('visit-indie-atlas', '');
    }, [])

    //const ITEM_GRID_COLS = "grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6";
    const ITEM_GRID_COLS = "grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6";


    const [inputText, setInputText] = useState<string>("");

    const searchTerm = inputText.toLowerCase();

    const filteredProjects = props.projects.filter(item => {
        return matchesTerm(searchTerm, item);
    })

    function matchesTerm(term: string, project: AtlasCreatorT): boolean {
        // if (project.twitterProfile.includes(term)) {
        //     return true;
        // }
        if (project.project.title.toLowerCase().includes(term)) {
            return true;
        }
        if (project.project.summary.toLowerCase().includes(term)) {
            return true;
        }
        return false;
    }



    function loading() {
        if (props.projects.length == 0) {
            return (
                <div className="text-white">
                    <LoadingText></LoadingText>
                </div>
            )
        }
        return null;
    }

    return (
        <>

            <header className="fixed top-0 left-0 right-0 w-full flex justify-center bg-indigo-900 shadow-md z-50">
                <div className={`flex flex-col w-full 5xl:px-0 max-w-4xl`}>
                    <SearchBarComponent onSubmit={setInputText} initialSearch={props.searchText}></SearchBarComponent>
                </div>
            </header>

            <div className="p-12"></div>
            {loading()}
            {props.projects.length > 0 && (
                <>
                    <p className="mb-4 text-white">matching {filteredProjects.length} of {props.projects.length} projects:</p>
                    <div className={ITEM_GRID_COLS}>
                        {filteredProjects.map((item, index) => {
                            return (
                                <AtlasCreatorViewComponent key={index} info={item}></AtlasCreatorViewComponent>
                            )
                        })}
                    </div>
                </>
            )}
            <div className="p-4"></div>
        </>
    )
}

export default AtlasClientComponent;