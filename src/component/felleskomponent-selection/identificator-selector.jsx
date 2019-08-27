import React from 'react';
import {makeStyles} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(theme => ({
    identificatorControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

}));

const IdentificatorSelector = (props) => {
    const classes = useStyles();
    const {inputLabelIdentificator, identificatorLabelWidth, onChange, values, componentObjectIdentificators} = props;
    return (
        <FormControl variant="outlined" className={classes.identificatorControl}>
            <InputLabel ref={inputLabelIdentificator} htmlFor="outlined-identificator-simple">
                Identifikator
            </InputLabel>
            <Select
                value={values.identificator}
                onChange={onChange}
                input={<OutlinedInput
                    labelWidth={identificatorLabelWidth}
                    name="identificator"
                    id="outlined-identificator-simple"/>}
            >
                {
                    componentObjectIdentificators
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

export default IdentificatorSelector;