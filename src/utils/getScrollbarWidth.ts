import { isBrowser } from './isBrowser'

export const getScrollbarWidth = ():string => isBrowser() && `${window.innerWidth - document.documentElement.clientWidth}px` || '';