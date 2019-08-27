import React from 'react';
import {getDomainPackageClass} from "../../utils/link-converter";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import {Box, Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export default function History(props) {
    const {historyCollection, onClick} = props;

    return (
        <Card><Box justifyContent="center" m={3}>
            <Breadcrumbs aria-label="breadcrumb" maxItems={4} component='nav'>

                {historyCollection.map((entry, index) => {
                        if (entry !== '') {
                            let historyButtonText = getDomainPackageClass(entry);
                            if (entry === historyCollection[historyCollection.length - 1]) {
                                return <Typography key={index} color="textPrimary">{historyButtonText}</Typography>;
                            } else {
                                return (
                                    <Link
                                        key={index}
                                        component={"button"}
                                        color={"inherit"}
                                        onClick={() => onClick(entry)}
                                    >
                                        {historyButtonText}
                                    </Link>
                                );
                            }
                        }
                        return null;
                    }
                )}

            </Breadcrumbs>
        </Box></Card>
    );

}