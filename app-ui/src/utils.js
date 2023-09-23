export function toHumanReadableFormat(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function isStringSnakeCase(string) {
    return string === string.toLowerCase().replace(/[^a-z0-9]+/g, '_');
}

export function checkScreenSize() {
    this.isDesktop = window.innerWidth > 600;
}
