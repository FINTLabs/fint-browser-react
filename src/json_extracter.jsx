import React from 'react';

export default function JsonExtractor(props) {
    let collection = [];
    const {object} = props;
    const styleIdentifiers = {
        paddingLeft: 10
    }
    const styleValues = {
        paddingLeft: 30
    }

    function fillCollection(key, data) {
        if (!isArray(data[key]) && !isObject(data[key])) {
            if (isArray(data)) {
                collection.push(<div style={styleValues}>{data[key]}</div>);
            } else {
                collection.push(<div style={styleValues}>{key}: {data[key]}</div>);
            }
        } else {
            if (typeof key !== "number") {
                collection.push(<div style={styleIdentifiers}>{key}</div>);
            }
            for (const entry in data[key]) {
                fillCollection(entry, data[key]);
            }
        }
    }

    function getData(json) {
        if (json) {
            console.log(json);
            Object.keys(json).forEach(key => {
                if (key !== "_links") {
                    if (foundEndValues(key, json)) {
                        fillCollection(key, json);
                    } else {
                        collection.push(<div style={styleIdentifiers}>{key}</div>);
                        getData(json[key]);
                    }
                }
            });
        }
    }

    function foundEndValues(key, data) {
        if (isArray(data[key]) || isObject(data[key])) {
            for (const entry in data[key]) {
                if (isArray(data[key][entry]) || isObject(data[key][entry])) {
                    return false;
                }
            }
            return true;
        } else return true;
    }

    function isArray(data) {
        return Array.isArray(data);
    }

    function isObject(data) {
        return typeof data === "object";
    }

    getData(object);
    return collection;
}