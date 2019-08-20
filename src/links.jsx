import React from 'react';
import {Container} from "@material-ui/core";
import {getDomainPackageClass} from "./index";
import Link from "@material-ui/core/Link";


export default function Links(props) {
    const {object} = props;
    const {onClick} = props;
    let linksCollection = [];
    if (object.hasOwnProperty("_links")) {
        const links = object._links;

        for (let key in links) {
            for (let i = 0; i < links[key].length; i++) {
                if (links[key][i].hasOwnProperty("href")) {
                    let buttonText = getDomainPackageClass(links[key][i].href);
                    linksCollection.push(<div>
                        <Link
                            variant={"contained"}
                            color={"default"}
                            onClick={() => onClick(links[key][i].href)}>{key}: {buttonText}</Link>
                    </div>);
                }
            }
        }
    }
    return <Container>{linksCollection}</Container>;
}