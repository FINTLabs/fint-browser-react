import {isArray} from "../../utils/json_extracting_helpers";
import React from "react";
import ObjectTable from "./object-table";

const ObjectTableContainer = (props) => {
    let collection = [];
    const {entries} = props;

    for (let i = 0; i < entries.length; i) {

        let tempCollection = [];

        tempCollection.push(entries[i]);

        while (isArray(entries[++i])) {
            tempCollection.push(entries[i]);
        }

        collection.push(<ObjectTable data={tempCollection}/>);
    }

    return collection;
};


export default ObjectTableContainer;
