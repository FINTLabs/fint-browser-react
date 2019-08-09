import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Button from '@material-ui/core/Button';
import ObjectViewer from "./object_viewer";

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

    function Links() {
        let linksCollection = [];
        if (json.hasOwnProperty("_links")) {
            const links = json._links;
            for (let key in links) {
                for (let i = 0; i < links[key].length; i++) {
                    if (links[key][i].hasOwnProperty("href")) {
                        linksCollection.push(<div>
                            <Button color={"secondary"}
                                       onClick={() => setNewState(links[key][i].href)}>{key}: {links[key][i].href.slice(42)}</Button>
                        </div>);
                    }
                }

            }
        }
        return <div>{linksCollection}</div>;
    }

    function resetHistory(string) {
        setURL(string);
        addHistory([string]);
    }

    function History() {
        let historyButtons = [];
        for (let i = 0; i < history.length; i++) {
            const historyButtonText = history[i].slice(42);
            historyButtons.push(<Button color={"primary"}
                                        onClick={() => resetHistory(history[i])}>Steg {i}: {historyButtonText}</Button>);
        }
        return historyButtons;
    }

    return (<div>
        <History></History>
        <ObjectViewer object={json}/>
        <Links></Links>
    </div>);
}

ReactDOM.render(<NavigationApp/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();