import React from 'react';
import {isArray, isObject, isStringANumber, isValue} from "../../utils/json_extracting_helpers";
import ObjectTableContainer from "./object_table_container";

export default function ObjectContainer(props) {
    const {rawJson} = props;


    function buildEntryArray(json) {
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

    console.log("e", buildEntryArray(rawJson));
    return <ObjectTableContainer entries={buildEntryArray(rawJson)}/>;
}