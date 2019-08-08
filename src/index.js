import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Link from "@material-ui/core/Link";
import Button from '@material-ui/core/Button';

function NavigationApp() {
    const [url, setURL] = useState('https://play-with-fint.felleskomponent.no/utdanning/elev/person/fodselsnummer/14029923273');
    const [json, setJson] = useState('');

    useEffect(() => {
        console.log("useEffect Triggered");
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                    setJson(result);
                }
            )
    }, [url]);

    const DataField = ({data}) => {
        let propertyKeys = [];
        if (Array.isArray(data)) {
            for (let entry in data) {
                propertyKeys.push(entry);
            }
            if (propertyKeys.length === 0) {
                return <p>{data}</p>
            }
            return (<div>{propertyKeys.map((entry) => {
                    return <div>
                        <DataField data={data[entry]}/>
                    </div>
                }
            )}
            </div>);
        } else if (typeof data === 'object' && data !== null) {
            propertyKeys = Object.keys(data);
            if (propertyKeys.length === 0) {
                return <p>{data}</p>
            }
            return (<div>{propertyKeys.map((key) => {
                    return <div>
                        <p>{key}</p>
                        <DataField data={data[key]}/>
                    </div>
                }
            )}
            </div>);
        } else {
            if (typeof data === 'string' && validURL(data)) {
                return <Link onClick={() => setURL(data)}>{data}</Link>
            }
            return <p><b>{data}</b></p>;
        }
    };

    return (
        <div>
            <Header/>
            <DataField data={json}/>
        </div>
    );
}


function Header() {
    return (
        <div>
            <h1>Velkommen til play-with-fint navigasjon</h1>
        </div>
    );
}

function NavigationApp2() {
    const [url, setURL] = useState('https://play-with-fint.felleskomponent.no/utdanning/elev/person/fodselsnummer/14029923273');
    const [json, setJson] = useState('');

    useEffect(() => {
        console.log("useEffect Triggered");
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                    setJson(result);
                }
            )
    }, [url]);

    function Data() {
        let collection = [];

        function getData(json) {
            for (const key in json) {
                if (key != "_links") {
                    if (Array.isArray(json[key])) {
                        console.log(key + json[key]);
                        collection.push(key);
                        for (const entry in json[key]) {
                            collection.push(<div>{getData(json[key])}</div>)
                        }
                    } else if (typeof json[key] == "object") {
                        collection.push(<div>{key}</div>);
                        collection.push(<div>{getData(json[key])}</div>);
                    } else {
                        (!Array.isArray(json)) ?
                            collection.push(<div>{key}: {json[key]}</div>) : collection.push(<div>{json[key]}</div>);
                    }
                }
            }
        }

        getData(json);
        return collection;
    }


    function Links() {
        let linksCollection = [];
        if (json.hasOwnProperty("_links")) {
            const links = json._links;
            for (let key in links) {
                for (let i = 0; i < links[key].length; i++) {
                    if (links[key][i].hasOwnProperty("href")) {
                        linksCollection.push(<div>
                            <p><Button color={"secondary"}
                                       onClick={() => setURL(links[key][i].href)}>{key}: {links[key][i].href}</Button>

                            </p>
                        </div>);
                    }
                }

            }
        }
        return <div>{linksCollection}</div>;

    }


    return (<div>
        <Data></Data>
        <Links></Links>
    </div>);
}

ReactDOM.render(<NavigationApp2/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' + //
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    return !!pattern.test(str);
}
