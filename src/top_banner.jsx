import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Logo from './assets/fint_logo.png';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    logo: {
        width: '8%',
        height: '8%',
    },
    appBar: {
        padding: theme.spacing(1),
    },
})

const TopBanner = (props) => {
    const {classes} = props;
    return <AppBar className={classes.appBar} position="static"><img className={classes.logo} src={Logo}/></AppBar>;
}
export default withStyles(styles)(TopBanner);