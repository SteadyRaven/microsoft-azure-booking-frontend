/**
 * api to set value in localstorage
 * @param field string
 * @param item json
 * @returns 
 */
export function setJSONStorage (field:string, item:any) {
    if(!item) return; 
    localStorage.setItem(field, JSON.stringify(item));
}

/**
 * api to set value in localstorage
 * @param field string
 * @param item string
 * @returns 
 */export function setStringStorage (field : string, item: string) {
    if(!item || item === '') return;
    localStorage.setItem(field, item);
}
/**
 * api to get value from localstorage
 * @param field string
 * @returns JSON
 */
export function getJSONStorage(field: string) {
    let result = localStorage.getItem(field);

    if(!result || result === '') return {};

    return JSON.parse(result);
}
/**
 * api to get value from localstorage
 * @param field string
 * @returns string
 */
export function getStringStorage(field: string) {
    let result = localStorage.getItem(field);

    if(!result) return '';

    return result;
}