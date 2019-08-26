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

export function getIdentificators(json, object) {
    return Object.keys(json).map(key => {
        if (key === object) {
            if (json[key].hasOwnProperty("oneUrl")){
                return json[key].oneUrl.map(oneUrl => {
                    let split = oneUrl.split("/");
                    return split[split.length-2];
                })
            }
        }
    })
}