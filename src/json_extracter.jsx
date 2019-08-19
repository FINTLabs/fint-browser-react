import React from 'react';
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import {TableRow} from "@material-ui/core";
import capitalize from "capitalize";

export default function JsonExtractor(props) {
    let collection = [];
    const {object} = props;

    function getData(json) {
        let array = [];
        //console.log(json);
        if (typeof json === "string" || typeof json === "number" || typeof json === "boolean") {
            if (typeof json === "boolean") {
                if (json) {
                    array.push("true");
                } else {
                    array.push("false")
                }
            }
            array.push(json);
        } else if (isArray(json) || isObject(json)) {
            Object.keys(json).forEach(key => {
                if (key !== "_links") {
                    if (!isStringANumber(key)) {
                        //console.log("key:", key)
                        array.push(key);
                    }
                    array.push(getData(json[key]));
                }
            });
        }


        return array;
    }

    collection.push(getData(object, collection));

    const myColor = ['black', 'red', 'blue', 'green', 'orange', 'purple', 'black', 'red', 'blue', 'orange', 'green'];

    function addDivToValuesInArray(array, depth) {
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


    function isArray(data) {
        return Array.isArray(data);
    }

    function isObject(data) {
        return typeof data === "object";
    }

    function isStringANumber(string) {
        return /^\d+$/.test(string);
    }

    function createTable(data) {
        return (
            <Card style={{width: 'auto', display: 'inline-block', margin: 10, verticalAlign: 'text-top'}}><Table
                size={"small"} style={{width: 'auto'}}>{
                data.map(entry => {
                        return createCellsAndRow(entry, 0);
                    }
                )
            }</Table></Card>);
    }

    function createCellsAndRow(data, depth) {
        if (isArray(data)) {
            return data.map(entry => {
                return <TableRow>{createCellsAndRow(entry, depth + 1)}</TableRow>;
            })
        } else {
            if (depth === 0) {
                return <TableCell style={{fontWeight:'bold', fontSize:18}}>{capitalize.words(data)}</TableCell>;
            } else {
                return <TableCell
                    style={{width: '100%', paddingLeft: depth * 15, color: createRGB(depth)}}>{capitalize.words(data)}</TableCell>;
            }
        }
    }

    function createRGB(opacityLevel) {
        let opacity = 1.0 - 0.30 * opacityLevel;
        if (opacity < 0.5)
            opacity = 0.5
        return 'rgb(0,0,0,' + opacity + ')';
    }

    console.log("Min Collection:", collection);
    let collectionToSend = [];
    for (let i = 0; i < collection[0].length; i) {
        console.log("i:", i);
        let newCollection = [];
        newCollection.push(collection[0][i]);
        while (isArray(collection[0][++i])) {
            newCollection.push(collection[0][i]);
        }
        console.log("NewColl:", newCollection);
        collectionToSend.push(createTable(newCollection));
    }

    console.log("CollectionToSend", collectionToSend);
    return <Card>{collectionToSend}</Card>;
}