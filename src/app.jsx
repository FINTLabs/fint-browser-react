import React, {useEffect, useState} from 'react';
import {Box, Card, createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import TopBanner from "./component/banner/top-banner";
import History from "./component/history/history";
import ObjectContainer from "./component/table/object-container";
import Divider from "@material-ui/core/Divider";
import LinkContainer from "./component/relation/link-container";
import BottomBanner from "./component/banner/bottom-banner";
import SelectionBanner from "./component/felleskomponent-dropdown/selection-banner";

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
    const [componentListURL] = useState('https://admin.fintlabs.no/api/components/configurations');
    const [rawComponentList, setRawList] = useState('');
    let [json, setJson] = useState('');
    let [history, setHistory] = useState([url]);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                    setJson(result);
                }
            );
        fetch(componentListURL)
            .then(res => res.json())
            .then((result) => {
                setRawList(result);
            });
    }, [url, rawComponentList, componentListURL]);

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
            <SelectionBanner onClick={reset} rawList={rawComponentList}/>
            <History style={{background: '#333333', margin: 'auto'}} historyCollection={history}
                     onClick={reset}/>
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