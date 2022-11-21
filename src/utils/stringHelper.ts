export const removeMultipleSlashes = (str: string):string => str.replace(/\/+/g, '/');

export const convertToDefaultAttrs = (str: string):string => str.replace(/-or-|-is-/g, '-');