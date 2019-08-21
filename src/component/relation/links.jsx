import React from 'react';
import {getDomainPackageClass} from "../../utils/link-converter";
import {Box, makeStyles, Typography} from "@material-ui/core";
import {capitalize} from "@material-ui/core/utils";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
    relationLabel: {
        marginRight: theme.spacing(1),
    },
    link: {
        fontSize: '0.75rem',
    },
}));

const Links = (props) => {
    const {object, onClick} = props;
    const classes = useStyles();
    let linksCollection = [];

    if (object.hasOwnProperty("_links")) {
        const links = object._links;

        for (let key in links) {
            for (let i = 0; i < links[key].length; i++) {
                if (links[key][i].hasOwnProperty("href")) {
                    let buttonText = getDomainPackageClass(links[key][i].href);
                    linksCollection.push(
                        <Box alignItems="baseline" display="flex">
                            <Typography variant="caption" className={classes.relationLabel}>
                                {capitalize(key)}:
                            </Typography>
                            <Link component="button"
                                  className={classes.link}
                                  onClick={() => onClick(links[key][i].href)}
                            >
                                {buttonText}
                            </Link>
                        </Box>
                    );
                }
            }
        }
    }
    return linksCollection;
};

export default Links;