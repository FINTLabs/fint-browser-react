import React from 'react';

export default function ObjectViewer(props) {

    let collection = [];

    const {object} = props;

    /*if (json.hasOwnProperty("_embedded")){
        if (json._embedded.hasOwnProperty("_entries")){
            json = json._entries;
        }
    }*/

    function getData(json) {
        if (json) {
            Object.keys(json).forEach(key => {
                if (key !== "_links") {
                    onArray(key, json);
                    onObject(key, json);
                    onValue(key, json);
                }
            });
        }
    }

    function onObject(key, object) {
        if (typeof object[key] === "object") {
                collection.push(<div>{key}: </div>);
                collection.push(<div>{getData(object[key])}</div>);
        }
    }

    function onArray(key, json) {
        if (Array.isArray(json[key])) {
            for (const entry in json[key]) {
                if (Array.isArray(json[key][entry]) || typeof json[key][entry] === 'object') {
                    collection.push(<div>{getData(json[key][entry])}</div>)
                }
            }
        }
    }

    function onValue(key, json) {
        if (Array.isArray(json[key]) && json[key].length > 0) {
            for (const entry in json[key]) {
                collection.push(<div>{key}: {json[key][entry]}</div>);
            }
        } else if (!Array.isArray(json) && typeof json[key] !== "object") {
            collection.push(<div>{key}: {json[key]}</div>);
        }
    }

    getData(object);
    return collection;
}