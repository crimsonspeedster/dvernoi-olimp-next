interface langProps {
    slug: string,
    lang: string
}

export interface menuItemProp {
    acfmenu: acfMenuProps,
    cssClasses: string[],
    label: string,
    url: string,
    childItems: menuNodesProps
}

interface menuNodesProps {
    nodes: menuItemProp[]
}

export interface acfMenuProps {
    icon?: acfIconProps
}

export interface acfIconProps {
    altText: string
    sourceUrl: string
}

