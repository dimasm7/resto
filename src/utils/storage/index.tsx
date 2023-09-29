export const storeData = (key:string, value:any) => {
    const jsonValue = JSON.stringify(value)
    localStorage.setItem(key, jsonValue)
}
export const getData = (key:string) => {
    let jsonValue;
    if (typeof window !== 'undefined') {
        const local = localStorage.getItem(key)
        jsonValue = local != null ? JSON.parse(local) : null;
    }
    return jsonValue;
}
export const addRowData = (key:string, value:any) => {
    let oldJson;
    if (typeof window !== 'undefined') {
        oldJson = JSON.parse(localStorage.getItem(key) ?? '') || [];
    }
    oldJson.push(value)
    localStorage.setItem(key, JSON.stringify(oldJson))
}
export const removeRowData = (key:string, index:any) => {
    const data = getData(key)
    const newData = [...data];
    newData.splice(index, 1);
    storeData(key, newData);
}
export const removeData = (key:string) => {
    localStorage.removeItem(key)
}