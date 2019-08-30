import React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    componentControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const ComponentSelector = (props) => {
    const classes = useStyles();
    const {inputLabelComponent, componentLabelWidth, onChange, values, componentList, disabled} = props;

    return (
        <FormControl disabled={disabled} variant="outlined" className={classes.componentControl}>
            <InputLabel ref={inputLabelComponent} htmlFor="outlined-component-simple">
                Komponent
            </InputLabel>
            <Select
                value={values.component}
                onChange={onChange}
                input={<OutlinedInput
                    labelWidth={componentLabelWidth}
                    name="component"
                    id="outlined-component-simple"/>}
            >
                {componentList.map(entry => {
                    return (
                        <MenuItem key={entry} value={entry}>{entry}</MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default ComponentSelector;