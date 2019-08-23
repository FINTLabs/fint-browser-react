import {isArray} from "../../utils/json-extracting-helpers";
import React from "react";
import ObjectTable from "./object-table";

const ObjectTableContainer = (props) => {
    let collection = [];
    const {entries} = props;

    for (let i = 0; i < entries.length; i) {

        let tempCollection = [];

        if (isArray(entries[i])) {
                tempCollection = [];
            for (let j = 0; j < entries[i].length; j) {
                tempCollection.push(entries[i][j]);

                while (isArray(entries[i][++j])) {
                    tempCollection.push(entries[i][j]);
                }
            }
                collection.push(<ObjectTable data={tempCollection}/>);
            i++;
        } else {
            tempCollection.push(entries[i]);

            while (isArray(entries[++i])) {
                tempCollection.push(entries[i]);
            }
            collection.push(<ObjectTable data={tempCollection}/>);
        }
    }
    return collection;
};


export default ObjectTableContainer;
