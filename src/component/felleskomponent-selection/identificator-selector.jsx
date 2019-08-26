import React from 'react';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    textField: {
        margin: theme.spacing(1),
    },
}));

const IdentificatorSelector = (props) => {
    const classes = useStyles();
    const {values, onChange} = props;
    return (
        <TextField
            label="Identifikator"
            className={classes.textField}
            value={values.identificator}
            onChange={onChange("identificator")}
            margin="normal"
            variant="outlined"
        />
    );
};

export default IdentificatorSelector;