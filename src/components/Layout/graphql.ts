import {gql} from "@apollo/client";

export const GetMenu = gql`
    query GetMenu($location: MenuLocationEnum!, $lang: String!) {
          menus(where: {location: $location, language: $lang}) {
                nodes {
                      menuItems (where: {parentDatabaseId: 0}) {
                            nodes {
                                  url
                                  cssClasses
                                  label
                                  acfmenu {
                                        icon {
                                            altText
                                            sourceUrl
                                        }
                                  }
                                  childItems (where: {parentId: ""}) {
                                        nodes {
                                            url
                                            cssClasses
                                            label
                                            childItems (where: {parentId: ""}) {
                                                nodes {
                                                    url
                                                    cssClasses
                                                    label
                                                }
                                            }
                                        }
                                  }
                            }
                      }
                }
          }
    }
`;
