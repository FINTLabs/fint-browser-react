import React, {useEffect, useState} from 'react';
import {Box, Card, MuiThemeProvider} from "@material-ui/core";
import TopBanner from "./component/banner/top-banner";
import History from "./component/history/history";
import ObjectContainer from "./component/table/object-container";
import Divider from "@material-ui/core/Divider";
import LinkContainer from "./component/relation/link-container";
import BottomBanner from "./component/banner/bottom-banner";
import {createMuiTheme} from "@material-ui/core";

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
    const [url, setURL] = useState('https://play-with-fint.felleskomponent.no/utdanning/elev/person/fodselsnummer/18010197461');
    let [json, setJson] = useState('');
    let [history, addHistory] = useState([url]);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                    setJson(result);
                }
            )
    }, [url]);

    function setNewState(href) {
        let newHistory = history.concat(href);
        addHistory(newHistory);
        setURL(href);
    }

    function resetHistory(string) {
        setURL(string);
        addHistory([string]);
    }

    return (
        <MuiThemeProvider theme={theme}>
            <TopBanner/>
            <History style={{background: '#333333', margin: 'auto'}} historyCollection={history}
                     onClick={resetHistory}/>
            <Box m={2}>
                <Card>
                    <ObjectContainer rawJson={json}/>
                    <Divider/>
                    <Box m={2}>
                        <LinkContainer object={json} onClick={setNewState}/>
                    </Box>
                </Card>
            </Box>
            <BottomBanner/>
        </MuiThemeProvider>
    );
};

export default App;