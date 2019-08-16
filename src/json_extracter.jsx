import React from 'react';
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import {TableRow} from "@material-ui/core";
import Container from "@material-ui/core/Container";

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
            <Card style={{width: 'auto', display:'inline-block', margin: 10, verticalAlign:'text-top'}}><Table size={"small"} style={{width: 'auto'}}>{
                data.map(entry => {
                       return createCellsAndRow(entry,0);
                    }
                )
            }</Table></Card>);
    }

    function createCellsAndRow(data, depth) {
        if (isArray(data)){
            return data.map(entry => {
                return <TableRow>{createCellsAndRow(entry, ++depth)}</TableRow>;
            })
        }else{
            if (depth===0){
                return <TableCell><b>{data}</b></TableCell>;
            }else{
                return <TableCell>{data}</TableCell>;
            }
        }
    }

    console.log("Min Collection:", collection);
    let collectionToSend = [];
    for (let i = 0; i < collection[0].length; i) {
        console.log("i:", i);
        let newCollection = [];
        newCollection.push(collection[0][i]);
        while(isArray(collection[0][++i])){
            newCollection.push(collection[0][i]);
        }
        collectionToSend.push(createTable(newCollection));
    }

    console.log("CollectionToSend", collectionToSend);
    return <Container>{collectionToSend}</Container>;
}