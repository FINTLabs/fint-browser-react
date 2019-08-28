import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {createURL, getIdentificators, getListOfContainers} from "../../utils/component-selection-helpers";
import ComponentSelector from "./component-selector";
import ObjectSelector from "./object-selector";
import IdentificatorSelector from "./identificator-selector";
import IdentificatorValueInput from "./identificator-value-input";
import handleFetchError from "../../utils/handle-fetch-error";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing(2),
    },
}));


const UserSelection = (props) => {
        const [values, setValues] = useState({
            component: '',
            object: '',
            identificator: '',
            identificatorValue: '',
        });
        const [selectedComponent, setSelectedComponent] = useState('');
        const [objectList, setObjectList] = useState([]);
        const [identificatorList, setIdentificatorList] = useState([]);
        const [objectSelectionHidden, setObjectSelectHidden] = useState(true);
        const [identificationFieldsHidden, setIdentificationFieldsHidden] = useState(true);
        const [componentLabelWidth, setComponentLabelWidth] = useState(0);
        const [objectLabelWidth, setObjectLabelWidth] = useState(0);
        const [identificatorLabelWidth, setIdentificatorLabelWidth] = useState(0);
        const [identificatorValueDisabled, setIdentificatorValueDisabled] = useState(true);

        const inputLabelObject = useRef(null);
        const inputLabelComponent = useRef(null);
        const inputLabelIdentificator = useRef(null);
        let {rawList, onClick} = props;
        let componentList = getListOfContainers(rawList).sort();
        const classes = useStyles();

        useEffect(() => {
                setComponentLabelWidth(inputLabelComponent.current.offsetWidth);
                if (!objectSelectionHidden) {
                    setObjectLabelWidth(inputLabelObject.current.offsetWidth);
                }
                fetch("https://play-with-fint.felleskomponent.no" + selectedComponent + "/")
                    .then(handleFetchError)
                    .then(res => res.json())
                    .then((result) => {
                            setObjectList(Object.keys(result));
                        }
                    )
                    .catch(error=> console.log(error));
            }, [selectedComponent, objectSelectionHidden]
        )
        ;

        function handleComponentSelectChange(event) {
            setObjectSelectHidden(false);
            setSelectedComponent(event.target.value);
            setIdentificationFieldsHidden(true);
            setIdentificatorList([]);
            setIdentificatorValueDisabled(true);

            setValues(oldValues => ({
                ...oldValues,
                identificator: '',
                identificatorValue: '',
                object:'',
                [event.target.name]: event.target.value,
            }));
        }

        function handleObjectSelectChange(event) {
            setValues(oldValues => ({
                ...oldValues,
                identificator: '',
                identificatorValue: '',
                [event.target.name]: event.target.value,
            }));
            setIdentificationFieldsHidden(false);
            setIdentificatorValueDisabled(true);
            fetch("https://play-with-fint.felleskomponent.no" + selectedComponent + "/")
                .then(handleFetchError)
                .then(res => res.json())
                .then((result) => {
                        setIdentificatorList(getIdentificators(result, event.target.value));
                    }
                )
                .catch(error=> console.log(error));
        }
        function handleSelectIdentificatorChange(event) {
            setIdentificatorLabelWidth(inputLabelIdentificator.current.offsetWidth);
            setValues(oldValues => ({
                ...oldValues,
                [event.target.name]: event.target.value,
            }));
            setIdentificatorValueDisabled(event.target.value === '');
        }

        const handleTextChange = name => event => {
            setValues({...values, [name]: event.target.value});
        };
        return (
            <Card>

                <ComponentSelector
                    inputLabelComponent={inputLabelComponent}
                    componentLabelWidth={componentLabelWidth}
                    onChange={handleComponentSelectChange}
                    values={values}
                    componentList={componentList}
                />
                {!objectSelectionHidden &&
                <ObjectSelector
                    inputLabelObject={inputLabelObject}
                    objectLabelWidth={objectLabelWidth}
                    onChange={handleObjectSelectChange}
                    values={values}
                    objectList={objectList}
                />}
                {!identificationFieldsHidden &&
                <IdentificatorSelector
                    inputLabelIdentificator={inputLabelIdentificator}
                    identificatorLabelWidth={identificatorLabelWidth}
                    values={values}
                    onChange={handleSelectIdentificatorChange}
                    componentObjectIdentificators={identificatorList}
                />}
                {!identificationFieldsHidden &&
                <IdentificatorValueInput
                    values={values}
                    onChange={handleTextChange}
                    identificatorDisabled={identificatorValueDisabled}
                />}
                {!identificationFieldsHidden &&
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => onClick(createURL(values))}
                >
                    Finn
                </Button>}
            </Card>
        );
    }
;

export default UserSelection;