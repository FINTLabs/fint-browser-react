import React from 'react';
import {getDomainPackageClass} from "../../utils/link_converter";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export default function History(props) {
    const {historyCollection} = props;
    const {onClick} = props;

    return (
        <Box justifyContent="center" m={3}>
            <Breadcrumbs aria-label="breadcrumb" maxItems={4}>

                {historyCollection.map(entry => {
                    let historyButtonText = getDomainPackageClass(entry);
                    if (entry === historyCollection[historyCollection.length - 1]) {
                        return <Typography color="textPrimary">{historyButtonText}</Typography>;
                    } else {
                        return (
                            <Link
                                component={"button"}
                                color={"inherit"}
                                onClick={() => onClick(entry)}
                            >
                                {historyButtonText}
                            </Link>
                        );
                    }
                })}

            </Breadcrumbs>
        </Box>
    );

}