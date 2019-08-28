import React from 'react';
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import {makeStyles} from "@material-ui/core";
import AttributeRow from "./attribute-row";

const useStyles = makeStyles(theme => ({
    card: {
        width: 'auto',
        display: 'inline-block',
        margin: 10,
        verticalAlign: 'text-top',
    },
    table: {
        width: 'auto',
    },
}));

const ObjectTable = (props) => {
    const {data} = props;
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <Table
                size={"small"}
                className={classes.table}
            >
                <tbody>
                {data.map((entry, index) => <AttributeRow key={index} data={entry} depth={0}/>)}
                </tbody>
            </Table>
        </Card>
    );
};

export default ObjectTable;