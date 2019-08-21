import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import History from "./component/history/history";
import LinkContainer from "./component/relation/link-container";
import ObjectContainer from "./component/table/object_container";
import {Box, Card, createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import TopBanner from "./top_banner";
import Divider from "@material-ui/core/Divider";

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

function NavigationApp() {
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
        </MuiThemeProvider>
    );
}

ReactDOM.render(<NavigationApp/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();