import {isArray} from "./json-extracting-helpers";

export function getListOfContainers(json) {
    let list = [];
    if (isArray(json)) {
        list.push(json.map(entry => {
            return entry.path;
        }));
    }
    return list;
}

export function createURL(values) {
    return ("https://play-with-fint.felleskomponent.no" + values.component + "/" + values.object + "/" + values.identificator + "/" + values.identificatorValue);
}

function uniq(array) {
    return array.reduce(function(a,b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
    },[]);
}

export function getIdentificators(json, object) {
    for (let key in json) {
        if (key === object) {
            if (json[key].hasOwnProperty("oneUrl")) {
                return uniq((json[key].oneUrl.map(oneUrl => {
                    let split = oneUrl.split("/");
                    return split[split.length - 2];
                })));
            }
        }
    }
}