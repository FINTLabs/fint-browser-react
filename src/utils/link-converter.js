export function getDomainPackageClass(path) {
    let newPath = "";
    let pathParts = path.split("/");

    for (let j = pathParts.length - 3; j < pathParts.length; j++) {

        if (j + 1 === pathParts.length) {
            newPath = newPath + pathParts[j];
        } else{
            newPath = newPath + pathParts[j] + "/";
        }

    }

    return newPath;
}