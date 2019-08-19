import React from 'react';
import Button from "@material-ui/core/Button";
import {buttonsMargin, getDomainPackageClass} from "./index";
import {Container} from "@material-ui/core";
import List from "@material-ui/core/List";

export default function Links(props) {
    const {object} = props;
    const {onClick} = props;
    let linksCollection = [];
    if (object.hasOwnProperty("_links")) {
        const links = object._links;
        linksCollection = <List>{links.map(subject => {
            subject.map(entry => {

            })
        })}</List>;
        /*for (let key in links) {
            for (let i = 0; i < links[key].length; i++) {
                if (links[key][i].hasOwnProperty("href")) {
                    let buttonText = getDomainPackageClass(links[key][i].href);
                    linksCollection.push(<div>
                        <Button
                            size={"small"}
                            style={buttonsMargin}
                            variant={"contained"}
                            color={"secondary"}
                            onClick={() => onClick(links[key][i].href)}>{key}: {buttonText}</Button>
                    </div>);
                }
            }

        }*/
    }
    return <Container>{linksCollection}</Container>;
}