export const removeMultipleSlashes = (str: string):string => str.replace(/\/+/g, '/');

export const removeMultipleSpaces = (str: string):string => str.replace(/\s\s+/g, ' ');

export const convertToDefaultAttrs = (str: string):string => str.replace(/-or-|-is-/g, '-');