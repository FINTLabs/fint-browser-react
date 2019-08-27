import React from 'react';
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    textField: {
        margin: theme.spacing(1),
    },
}));

const IdentificatorValueInput = (props) => {
    const classes = useStyles();
    const {values, onChange, identificatorDisabled} = props;
    return (
        <TextField
            label="Identifikatorverdi"
            className={classes.textField}
            value={values.identificatorValue}
            onChange={onChange("identificatorValue")}
            margin="normal"
            variant="outlined"
            required="true"
            disabled={identificatorDisabled}
        />
    );
};

export default IdentificatorValueInput;