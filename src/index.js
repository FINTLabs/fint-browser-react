import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import History from "./history";
import Links from "./links";
import JsonExtractor from "./json_extracter";
import {styled} from '@material-ui/styles';
import {Container, createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import TopBanner from "./top_banner";

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

export const buttonsMargin = {
    margin: 10
};

function NavigationApp() {
    const [url, setURL] = useState('https://play-with-fint.felleskomponent.no/utdanning/elev/person/fodselsnummer/18010197461');
    let [json, setJson] = useState('');
    let [history, addHistory] = useState([url]);

    const MyHistoryContatiner = styled(Container)({
        //background: '#FFFFFF',
        color: 'white',
        padding: '0 30px',
    });
    const MyJsonContatiner = styled(Container)({
        color: 'white',
        padding: '0 30px',
    });

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

    return (<MuiThemeProvider theme={theme}>
            <TopBanner/>
            <MyHistoryContatiner>
                <History historyCollection={history} onClick={resetHistory}/>
            </MyHistoryContatiner>
            <MyJsonContatiner>
                <JsonExtractor object={json}/>
            </MyJsonContatiner>
            <Links object={json} onClick={setNewState}/>
        </MuiThemeProvider>
    );
}

export function getDomainPackageClass(path) {
    let newPath = "";
    let pathParts = path.split("/");
    for (let j = pathParts.length - 3; j < pathParts.length; j++) {
        newPath = newPath + pathParts[j] + "/";
    }
    return newPath;
}

ReactDOM.render(<NavigationApp/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();