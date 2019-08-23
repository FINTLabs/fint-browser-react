import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {BottomNavigation} from "@material-ui/core";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import HomeIcon from "@material-ui/icons/Home";

const styles = theme => ({
    root: {
        width: '100%',
        background: theme.palette.primary.main,
        position: 'fixed',
        bottom: 0,
    },
    contact: {
        color: 'white',
    },
    information: {
        width: '40%',
        color: 'white',
        marginTop: 'auto',
        marginBottom: 'auto',
        textAlign: 'center',
    },
    homepage: {
        color: 'white',
    },

});

const BottomBanner = (props) => {
    const {classes} = props;
    return (
        <BottomNavigation
            className={classes.root}
        >
            <BottomNavigationAction
                className={classes.contact}
                label="Kontakt oss"
                icon={<ContactSupportIcon/>}
                showLabel
                href="mailto:post@fintlabs.no"
            />
            <BottomNavigationAction
                className={classes.information}
                label="Fint forvaltes av Vigo IKS på vegne av fylkeskommunene"
                showLabel
            />
            <BottomNavigationAction
                className={classes.homepage}
                icon={<HomeIcon/>}
                label="www.vigoiks.no"
                showLabel
                href="http://www.vigoiks.no"

            />
        </BottomNavigation>
    );
};
export default withStyles(styles)(BottomBanner);