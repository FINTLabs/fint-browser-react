import React from 'react';
import {createRGB, isArray, isValidUrl} from "../../utils/json-extracting-helpers";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from "@material-ui/core";
import capitalize from "capitalize";
import Link from "@material-ui/core/Link";


const useStyles = makeStyles(theme => ({
    tableCellHeader: {
        fontWeight: 'bold',
        fontsize: 18,
    },
}));

const AttributeRow = (props) => {
    const classes = useStyles();
    let {data, depth, navigate} = props;

    if (isArray(data)) {
        return data.map((entry, index) => {
                if (isArray(entry)) {
                    return (
                        <AttributeRow navigate={navigate} key={index} data={entry} depth={depth + 1}/>
                    )
                } else {
                    return (<TableRow key={index}>
                        <AttributeRow navigate={navigate} key={index} data={entry} depth={depth + 1}/>
                    </TableRow>);
                }
            }
        );
    } else {
        if (depth === 0) {
            return (
                <TableRow>
                    <TableCell className={classes.tableCellHeader}>
                        {capitalize(data)}
                    </TableCell>
                </TableRow>
            );
        } else if (data === 'href' || data === '_links') {
            return null;
        } else if (isValidUrl(data)) {
            return (
                <TableCell
                    style={{
                        width: '100%',
                        paddingLeft: depth * 15,
                    }}>
                    <Link
                        onClick={() => {
                            navigate(data)
                        }
                        }
                        component="button"
                    >
                        {data}
                    </Link>
                </TableCell>
            );
        } else {
            return (<TableCell
                style={{
                    width: '100%',
                    paddingLeft: depth * 15,
                    color: createRGB(depth)
                }}>
                {data}
            </TableCell>);
        }
    }
};

export default AttributeRow;