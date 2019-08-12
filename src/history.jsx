import React from 'react';
import Button from "@material-ui/core/Button";
import {getDomainPackageClass} from "./index";
import {buttonsMargin} from "./index";

export default function History(props) {
    const {historyCollection} = props;
    let historyButtons = [];
    for (let i = 0; i < historyCollection.length; i++) {
        let historyButtonText = getDomainPackageClass(historyCollection[i]);
        historyButtons.push(<div><Button
            size={"small"}
            style={buttonsMargin}
            variant={"contained"}
            color={"primary"}
            onClick={() => resetHistory(historyCollection[i])}>Steg {i}: {historyButtonText}</Button></div>);
    }
    return historyButtons;
}