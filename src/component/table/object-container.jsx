import React from 'react';
import {isArray, isObject, isStringANumber, isValue} from "../../utils/json-extracting-helpers";
import ObjectTableContainer from "./object-table-container";

export default function ObjectContainer(props) {
    const {rawJson} = props;

    function buildEntryArray(json) {
        if (json._embedded){
            json = json._embedded;
            if (json._entries){
                json = json._entries;
            }
        }
        const array = [];
        if (isValue(json)) {
            pushValue(json);
        } else if (isArray(json) || isObject(json)) {
            handleEntry(json);
        }
        return array;

        function pushValue(json) {
            if (typeof json === "boolean") {
                if (json) {
                    array.push("true");
                } else {
                    array.push("false");
                }
            } else {
                array.push(json);
            }
        }
        function handleEntry(json) {
            Object.keys(json).forEach(key => {
                if (key !== "_links") {
                    if (!isStringANumber(key)) {
                        array.push(key);
                    }
                    array.push(buildEntryArray(json[key]));
                }
            });
        }
    }

    return <ObjectTableContainer entries={buildEntryArray(rawJson)}/>;
}