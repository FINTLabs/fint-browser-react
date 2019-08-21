import React from 'react';
import {createRGB, isArray} from "../../utils/json-extracting-helpers";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from "@material-ui/core";
import capitalize from "capitalize";


const useStyles = makeStyles(theme => ({
    tableCellHeader: {
        fontWeight: 'bold',
        fontsize: 18,
    },
}));

const AttributeRow = (props) => {
    const classes = useStyles();
    const {data, depth} = props;

    if (isArray(data)) {
        return data.map(entry =>
            <TableRow>
                <AttributeRow data={entry} depth={depth + 1}/>
            </TableRow>
        );
    } else {
        if (depth === 0) {
            return (
                <TableCell className={classes.tableCellHeader}>
                    {capitalize(data)}
                </TableCell>
            );
        } else {
            return (
                <TableCell
                    style={{
                        width: '100%',
                        paddingLeft: depth * 15,
                        color: createRGB(depth)
                    }}>
                    {data}
                </TableCell>
            );
        }
    }
};

export default AttributeRow;