export function isArray(data) {
    return Array.isArray(data);
}

export function isObject(data) {
    return typeof data === "object";
}

export function isStringANumber(string) {
    return /^\d+$/.test(string);
}

export function createRGB(opacityLevel) {
    let opacity = 1.0 - 0.30 * opacityLevel;
    if (opacity < 0.5) {
        opacity = 0.5;
    }
    return 'rgb(0,0,0,' + opacity + ')';
}

export function isValue(data) {
    return (typeof data === "string" || typeof data === "number" || typeof data === "boolean");
}
export function isValidUrl(string){
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}