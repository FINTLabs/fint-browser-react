import {isArray} from "./json-extracting-helpers";

export function getListOfContainers(json) {
    let list = [];
    if (isArray(json)) {
        json.forEach(entry => {
            if (entry.inPlayWithFint) {
                list.push(entry.path);
            }
        });
    }
    return list;
}

export function createURL(values) {
    return ("https://play-with-fint.felleskomponent.no" + values.component + "/" + values.object + "/" + values.identificator + "/" + values.identificatorValue);
}

function uniq(array) {
    return array.reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
    }, []);
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
export function isObjectDisabled(values) {
    return !(values.component !== '');
}

export function isIdentificatorDisabled(values) {
    return !(values.object !== '' && values.component !== '');
}

export function isIdentificatorValueInputDisabled(values) {
    return !(values.object !== '' && values.component !== '' && values.identificator !== '');
}

export function isButtonDisabled(values) {
    return !(values.object !== '' && values.component !== '' && values.identificator !== '' && values.identificatorValue !== '');
}
