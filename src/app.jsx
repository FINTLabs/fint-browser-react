import React, {useEffect, useState} from 'react';
import {Box, Card, createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import TopBanner from "./component/banner/top-banner";
import History from "./component/history/history";
import ObjectContainer from "./component/table/object-container";
import Divider from "@material-ui/core/Divider";
import LinkContainer from "./component/relation/link-container";
import BottomBanner from "./component/banner/bottom-banner";
import ManualSelection from "./component/felleskomponent-selection/manual-selection";
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
    const [url, setURL] = useState('');
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

    function addToHistory(href) {
        setHistory(history.concat(href));
        setURL(href);
    }

    function resetHistory(url) {
        setURL(url);
        setHistory([url]);
    }

    return (
        <MuiThemeProvider theme={theme}>
            <TopBanner/>
            <Box m={2}>
                <ManualSelection onClick={resetHistory} rawList={rawComponentList}/>
                <History historyCollection={history}
                         onClick={resetHistory}/>
            </Box>
            <Box m={2}>
                <Card>
                    <ObjectContainer rawJson={json} navigate={addToHistory}/>
                    <Divider/>
                    <Box m={2}>
                        <LinkContainer object={json} onClick={addToHistory}/>
                    </Box>
                </Card>
            </Box>
            <BottomBanner/>
        </MuiThemeProvider>
    );
};

export default App;