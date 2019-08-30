import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {
    createURL,
    getIdentificators,
    getListOfContainers,
    isButtonDisabled,
    isIdentificatorDisabled,
    isIdentificatorValueInputDisabled,
    isObjectDisabled
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


const ManualSelection = (props) => {
        const [values, setValues] = useState({
            component: '',
            object: '',
            identificator: '',
            identificatorValue: '',
        });
        const [componentJson, setComponentJson] = useState('');
        const [identificatorList, setIdentificatorList] = useState([]);
        const {rawList, onClick} = props;
        const componentList = getListOfContainers(rawList).sort();
        const objectList = Object.keys(componentJson);
        const classes = useStyles();

        useEffect(() => {
                fetch("https://play-with-fint.felleskomponent.no" + values.component + "/")
                    .then(handleFetchError)
                    .then(res => res.json())
                    .then((result) => {
                            setComponentJson(result);
                        }
                    )
                    .catch(error => console.log(error));
            }, [values]
        );

        function handleComponentSelectChange(event) {
            setIdentificatorList([]);
            setValues({
                component: event.target.value,
                identificator: '',
                identificatorValue: '',
                object: '',
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
                    onChange={handleComponentSelectChange}
                    values={values}
                    componentList={componentList}
                />
                <ObjectSelector
                    disabled={isObjectDisabled(values)}
                    onChange={handleObjectSelectChange}
                    values={values}
                    objectList={objectList}
                />
                <IdentificatorSelector
                    disabled={isIdentificatorDisabled(values)}
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

export default ManualSelection;