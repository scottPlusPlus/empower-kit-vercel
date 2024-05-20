import { removePrefix } from "@/src/agnostic/utils/stringUtils";
import React, { useState } from "react";

type SearchTerm = {
    term: string,
    priority: number
}
type HandleChangeFunction = (terms: SearchTerm[]) => void;

export default function SearchInputField(props: { searchTerms: SearchTerm[], onChange: HandleChangeFunction }) {

    const searchTermStrings = props.searchTerms.map(term => term.term).filter(term => {
        return term.trim().length > 0;
    });
    const searchPrefix = "🔍 ";
    const searchTermsAsString = searchTermStrings.join(" OR ");

    function inputToSearchTerms(str: string): SearchTerm[] {
        str =  removePrefix(str, searchPrefix);
        const termStrings = str.split("OR");
        return termStrings.map(termStr => {
            return {
                term: termStr.trim(),
                priority: 100
            }
        });
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const newTerms = inputToSearchTerms(value);
        props.onChange(newTerms);
    };

    const handleRemoveFields = (index: number) => {
        const terms = [...props.searchTerms];
        terms.splice(index, 1);
        props.onChange(terms);
    };

    return (
        <div className="flex w-full items-center text-black">
            <input
                type="text"
                placeholder="🔍 Filter"
                name="field1"
                value={searchTermsAsString}
                onChange={handleInputChange}
                className="py-1 border rounded-md w-full"
            />
        </div>
    );
};