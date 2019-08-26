export function getDomainPackageClass(path) {
    let url = new URL(path);
    return url.pathname;
}