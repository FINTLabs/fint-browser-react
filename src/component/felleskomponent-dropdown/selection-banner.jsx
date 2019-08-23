import React, {useEffect, useRef, useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {isArray} from "../../utils/json-extracting-helpers";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    componentControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    objectControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textField: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(2),
    },
}));

function getListOfContainers(json) {
    let list = [];
    if (isArray(json)) {
        list.push(json.map(entry => {
            return entry.path;
        }));
    }
    return list;
}

const SelectionBanner = (props) => {
        const [values, setValues] = useState({
            component: '',
            object: '',
            identificator: '',
            identificatorValue: '',
        });
        const [objectSelectionHidden, setObjectSelectHidden] = useState(true);
        const [identificationFieldsHidden, setIdentificationFieldsHidden] = useState(true);
        const [selectedComponent, setSelectedComponent] = useState('');
        const inputLabelComponent = useRef(null);
        const inputLabelObject = useRef(null);

        const [objectLabelWidth, setObjectLabelWidth] = useState(0);
        const [componentLabelWidth, setComponentLabelWidth] = useState(0);

        let {rawList, onClick} = props;
        let componentList = getListOfContainers(rawList);
        //const [componentObjectList, setListWithObjects] = useState([]);
        const [componentObjectList, setListWithObjects] = useState([]);

        useEffect(() => {
                console.log("UseEffect() kjøres.....");
                setComponentLabelWidth(inputLabelComponent.current.offsetWidth);
                if (!objectSelectionHidden) {
                    setObjectLabelWidth(inputLabelObject.current.offsetWidth);
                }
                if (selectedComponent !== '') {
                    /*fetch("https://play-with-fint.felleskomponent.no" + selectedComponent)
                        .then(res => res.json())
                        .then((result) => {
                                console.log("Her er resultat: ", result);
                            }
                        );*/
                    let json = '';
                    if (selectedComponent === "/administrasjon/personal") {
                        json = require("../../assets/administrasjon-personal.json");
                    } else if (selectedComponent === "/utdanning/elev") {
                        json = require("../../assets/utdanning-elev.json");
                    }
                    setListWithObjects(Object.keys(json));
                }
            }, [selectedComponent, objectSelectionHidden]
        );

        function handleComponentSelectChange(event) {
            if (event.target.value === "/administrasjon/personal" || event.target.value === "/utdanning/elev") {
                setObjectSelectHidden(false);
                setSelectedComponent(event.target.value);
            }
            setValues(oldValues => ({
                ...oldValues,
                [event.target.name]: event.target.value,
            }));
        }

        function handleObjectSelectChange(event) {
            setValues(oldValues => ({
                ...oldValues,
                [event.target.name]: event.target.value,
            }));
            setIdentificationFieldsHidden(false);
        }

        const handleTextChange = name => event => {
            setValues({...values, [name]: event.target.value});
        };
        const classes = useStyles();
        return (
            <Card>
                <FormControl variant="outlined" className={classes.componentControl}>
                    <InputLabel ref={inputLabelComponent} htmlFor="outlined-component-simple">
                        Komponent
                    </InputLabel>
                    <Select
                        value={values.component}
                        onChange={handleComponentSelectChange}
                        input={<OutlinedInput
                            labelWidth={componentLabelWidth}
                            name="component"
                            id="outlined-component-simple"/>}
                    >
                        {componentList.map(entry => {
                            entry.sort();
                            return (entry.map(listItem => {
                                return (
                                    <MenuItem value={listItem}>{listItem}</MenuItem>
                                );
                            }));

                        })}
                    </Select>
                </FormControl>
                {!objectSelectionHidden && <FormControl variant="outlined" className={classes.objectControl}>
                    <InputLabel ref={inputLabelObject} htmlFor="outlined-object-simple">
                        Objekt
                    </InputLabel>
                    <Select
                        value={values.object}
                        onChange={handleObjectSelectChange}
                        input={<OutlinedInput
                            labelWidth={objectLabelWidth}
                            name="object"
                            id="outlined-object-simple"/>}
                    >
                        {
                            componentObjectList
                                .map(entry => {
                                    return (
                                        <MenuItem value={entry}>{entry}</MenuItem>
                                    );
                                })

                        }

                    </Select>
                </FormControl>}
                {!identificationFieldsHidden && <TextField
                    id="outlined-identificator"
                    label="Identifikator"
                    className={classes.textField}
                    value={values.identificator}
                    onChange={handleTextChange('identificator')}
                    margin="normal"
                    variant="outlined"
                />}
                {!identificationFieldsHidden && <TextField
                    id="outlined-identificatorValue"
                    label="Identifikatorverdi"
                    className={classes.textField}
                    value={values.identificatorValue}
                    onChange={handleTextChange('identificatorValue')}
                    margin="normal"
                    variant="outlined"
                />}
                {!identificationFieldsHidden &&
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => onClick("https://play-with-fint.felleskomponent.no" + values.component + "/" + values.object + "/" + values.identificator + "/" + values.identificatorValue)}
                >
                    Finn
                </Button>}
            </Card>
        );
    }
;

export default SelectionBanner;