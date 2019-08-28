import React, {useEffect, useState} from 'react';
import {Box, Card, createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import TopBanner from "./component/banner/top-banner";
import History from "./component/history/history";
import ObjectContainer from "./component/table/object-container";
import Divider from "@material-ui/core/Divider";
import LinkContainer from "./component/relation/link-container";
import BottomBanner from "./component/banner/bottom-banner";
import UserSelection from "./component/felleskomponent-selection/user_selection";
import handleFetchError from "./utils/handle-fetch-error";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#f05545',
            main: '#b71c1c',
            dark: '#7f0000',
            contrastText: '#fff',
        },
        secondary: {
            light: '#98ee99',
            main: '#66bb6a',
            dark: '#338a3e',
            contrastText: '#000',
        },
    },
});

const App = () => {
    const [url, setURL] = useState('https://play-with-fint.felleskomponent.no/utdanning/elev/elev/brukernavn/Yougung');
    const componentListURL = 'https://admin.fintlabs.no/api/components/configurations';
    const [rawComponentList, setRawList] = useState('');
    let [json, setJson] = useState('');
    let [history, setHistory] = useState([url]);

    useEffect(() => {
        fetch(url)
            .then(handleFetchError)
            .then(res => res.json())
            .then((result) => {
                    setJson(result);
                }
            )
            .catch(error => console.log(error));

        fetch(componentListURL)
            .then(handleFetchError)
            .then(res => res.json())
            .then((result) => {
                setRawList(result);
            })
            .catch(error => console.log(error));
    }, [url]);

    function navigate(href) {
        setHistory(history.concat(href));
        setURL(href);
    }

    function reset(url) {
        setURL(url);
        setHistory([url]);
    }

    return (
        <MuiThemeProvider theme={theme}>
            <TopBanner/>
            <Box m={2}>
                <UserSelection onClick={reset} rawList={rawComponentList}/>
                <History historyCollection={history}
                         onClick={reset}/>
            </Box>
            <Box m={2}>
                <Card>
                    <ObjectContainer rawJson={json}/>
                    <Divider/>
                    <Box m={2}>
                        <LinkContainer object={json} onClick={navigate}/>
                    </Box>
                </Card>
            </Box>
            <BottomBanner/>
        </MuiThemeProvider>
    );
};

export default App;