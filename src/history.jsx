import React from 'react';
import {getDomainPackageClass} from "./index";
import {Container} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

export default function History(props) {
    const {historyCollection} = props;
    const {onClick} = props;
    let breadCrumbsHistory = <Breadcrumbs aria-label="breadcrumb" maxItems={4} separator={'=>'}>{historyCollection.map(entry => {
        let historyButtonText = getDomainPackageClass(entry);
        if (entry === historyCollection[historyCollection.length - 1]) {
            return <Link component={"button"} color={"textPrimary"} onClick={() => onClick(entry)}>{historyButtonText}</Link>;
        } else {
            return <Link component={"button"} color={"inherit"} onClick={() => onClick(entry)}>{historyButtonText}</Link>;
        }
    })}</Breadcrumbs>

    return <Container  style={{margin: 'auto'}}>{breadCrumbsHistory}</Container>;
}