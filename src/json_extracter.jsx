import React from 'react';

export default function JsonExtractor(props) {
    let collection = [];
    const {object} = props;

    function getData(json) {
        let array = [];
            console.log(json);
            if (typeof json === "string" || typeof json === "number" || typeof json === "boolean") {
                if (typeof json === "boolean"){
                    if (json){
                        array.push("true");
                    }else {array.push("false")}
                }
                array.push(json);
            } else if (isArray(json) || isObject(json)) {
                Object.keys(json).forEach(key => {
                    if (key !== "_links") {
                        if (!isStringANumber(key)) {
                            console.log("key:", key)
                            array.push(key);
                        }
                        array.push(getData(json[key]));
                    }
                });
            }
        return array;
    }

    collection.push(getData(object, collection));
    console.table(collection);

    function addDivToValuesInArray(array, depth) {
        const myColor = ['black', 'red', 'blue', 'green', 'orange', 'purple', 'black', 'red', 'blue', 'orange', 'green'];
        const myStyle = {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: depth * 25,
            color: myColor[depth - 1]
        };
        for (let i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                addDivToValuesInArray(array[i], depth + 1);
            } else {
                array[i] = <p style={myStyle}>{array[i]}</p>;
            }
        }
        return array;
    }

    collection = addDivToValuesInArray(collection, 0);

    function isArray(data) {
        return Array.isArray(data);
    }

    function isObject(data) {
        return typeof data === "object";
    }

    function isStringANumber(string) {
        return /^\d+$/.test(string);
    }

    return collection;
}