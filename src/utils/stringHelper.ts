export const removeMultipleSlashes = (str: string):string => str.replace(/\/+/g, '/');

export const removeMultipleSpaces = (str: string):string => str.replace(/\s\s+/g, ' ');

export const convertToDefaultAttrs = (str: string):string => str.replace(/-or-|-is-/g, '-');

export const joinFilterItems = (arrItems: string[]):string[] => {
    const resultArray:string[] = [];

    arrItems.map((item, i, arr) => {
        if (i === 1)
        {
            resultArray.push(`-is-${item}`);
        }
        else if (i > 1)
        {
            resultArray.push(`-or-${item}`);
        }
        else {
            resultArray.push(item);
        }
    })

    return resultArray;
}