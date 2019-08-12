import React from 'react';
import Button from "@material-ui/core/Button";
import {getDomainPackageClass} from "./index";
import {buttonsMargin} from "./index";

export default function Links(props) {
    const {object} = props;
    let linksCollection = [];
    if (object.hasOwnProperty("_links")) {
        const links = object._links;
        for (let key in links) {
            for (let i = 0; i < links[key].length; i++) {
                if (links[key][i].hasOwnProperty("href")) {
                    let buttonText = getDomainPackageClass(links[key][i].href);
                    linksCollection.push(<div>
                        <Button
                            size={"small"}
                            style={buttonsMargin}
                            variant={"contained"}
                            color={"secondary"}
                            onClick={() => setNewState(links[key][i].href)}>{key}: {buttonText}</Button>
                    </div>);
                }
            }

        }
    }
    return <div>{linksCollection}</div>;
}