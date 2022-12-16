import '@styles/globals.scss';
import type {AppProps} from 'next/app';
import {getApolloClient} from '@services/graphql/conf/apolloClient';
import React from "react";
import { ApolloProvider } from '@apollo/client';
import {wrapper} from "@store/store";
import {Provider} from "react-redux";

export const SettingsContext = React.createContext<any>({});
export const MenuContext = React.createContext<any>({});


export default function App({Component, ...rest}: AppProps) {
    const apolloClient = getApolloClient();
    const {store, props} = wrapper.useWrappedStore(rest);

    return (
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <Component {...props.pageProps} />
            </ApolloProvider>
        </Provider>
    );
}