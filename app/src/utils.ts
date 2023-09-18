export function camelToSnake(str: string) {
    return str.replace(/[A-Z]/g, (c: string) => '_' + c.toLowerCase());
}

export function snakeToCamel(str: string) {
    return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

export function toHumanReadableFormat(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}
