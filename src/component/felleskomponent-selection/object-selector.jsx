import React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    objectControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

}));

const ObjectSelector = (props) => {
    const classes = useStyles();
    const {inputLabelObject, objectLabelWidth, onChange, values, objectList, disabled} = props;

    return (
        <FormControl disabled={disabled} variant="outlined" className={classes.objectControl}>
            <InputLabel ref={inputLabelObject} htmlFor="outlined-object-simple">
                Objekt
            </InputLabel>
            <Select
                value={values.object}
                onChange={onChange}
                input={<OutlinedInput
                    labelWidth={objectLabelWidth}
                    name="object"
                    id="outlined-object-simple"/>}
            >
                {
                    objectList
                        .map(entry => {
                            return (
                                <MenuItem key={entry} value={entry}>{entry}</MenuItem>
                            );
                        })

                }

            </Select>
        </FormControl>
    );
};

export default ObjectSelector;