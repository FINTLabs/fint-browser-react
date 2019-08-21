import React from 'react';
import {Box, Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Links from "./links";


export default function LinkContainer(props) {
    return (
        <Box>
            <Typography title="title" component="h5">
                Relasjoner
            </Typography>
            <Box mt={1} mb={1}>
                <Divider/>
            </Box>
            <Links object={props.object} onClick={props.onClick}/>
        </Box>
    );
}



