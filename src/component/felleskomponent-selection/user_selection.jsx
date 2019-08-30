import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {
    createURL,
    getIdentificators,
    getListOfContainers,
    isButtonDisabled, isIdentificatorDisabled, isIdentificatorValueInputDisabled, isObjectDisabled
} from "../../utils/component-selection-helpers";
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
        // TODO: Prøve å behandle InputlabelWidth inne i react-componenten og ikke her.
        // TODO: Prøv å legge kun staten til listen her.
        const [selectedComponent, setSelectedComponent] = useState('');
        const [componentJson, setComponentJson] = useState('');
        const [objectList, setObjectList] = useState([]);
        const [identificatorList, setIdentificatorList] = useState([]);
        const [componentLabelWidth, setComponentLabelWidth] = useState(0);
        const [objectLabelWidth, setObjectLabelWidth] = useState(0);
        const [identificatorLabelWidth, setIdentificatorLabelWidth] = useState(0);

        const inputLabelObject = useRef(null);
        const inputLabelComponent = useRef(null);
        const inputLabelIdentificator = useRef(null);
        let {rawList, onClick} = props;
        let componentList = getListOfContainers(rawList).sort();
        const classes = useStyles();

        useEffect(() => {
                setComponentLabelWidth(inputLabelComponent.current.offsetWidth);
                    setObjectLabelWidth(inputLabelObject.current.offsetWidth);
                fetch("https://play-with-fint.felleskomponent.no" + selectedComponent + "/")
                    .then(handleFetchError)
                    .then(res => res.json())
                    .then((result) => {
                        setComponentJson(result);
                            setObjectList(Object.keys(result));
                        }
                    )
                    .catch(error => console.log(error));
            }, [selectedComponent, componentJson]
        );

        function handleComponentSelectChange(event) {
            setSelectedComponent(event.target.value);
            setIdentificatorList([]);
            setValues({
                identificator: '',
                identificatorValue: '',
                object: '',
                [event.target.name]: event.target.value,
            });
        }

        function handleObjectSelectChange(event) {
            setValues(oldValues => ({
                ...oldValues,
                identificator: '',
                identificatorValue: '',
                [event.target.name]: event.target.value,
            }));
            setIdentificatorList(getIdentificators(componentJson, event.target.value));
        }

        function handleSelectIdentificatorChange(event) {
            setIdentificatorLabelWidth(inputLabelIdentificator.current.offsetWidth);
            setValues(oldValues => ({
                ...oldValues,
                [event.target.name]: event.target.value,
            }));
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
                <ObjectSelector
                    disabled={isObjectDisabled(values)}
                    inputLabelObject={inputLabelObject}
                    objectLabelWidth={objectLabelWidth}
                    onChange={handleObjectSelectChange}
                    values={values}
                    objectList={objectList}
                />
                <IdentificatorSelector
                    disabled={isIdentificatorDisabled(values)}
                    inputLabelIdentificator={inputLabelIdentificator}
                    identificatorLabelWidth={identificatorLabelWidth}
                    values={values}
                    onChange={handleSelectIdentificatorChange}
                    componentObjectIdentificators={identificatorList}
                />
                <IdentificatorValueInput
                    disabled={isIdentificatorValueInputDisabled(values)}
                    values={values}
                    onChange={handleTextChange}
                />
                <Button
                    disabled={isButtonDisabled(values)}
                    variant="contained"
                    className={classes.button}
                    onClick={() => onClick(createURL(values))}
                >
                    Finn
                </Button>
            </Card>
        );
    }
;

export default UserSelection;