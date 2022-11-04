import '@styles/globals.scss';
import type {AppProps} from 'next/app';
import {getApolloClient} from '@services/graphql/conf/apolloClient';
import React from "react";
import { ApolloProvider } from '@apollo/client';

export const SettingsContext = React.createContext<any>({});
export const MenuContext = React.createContext<any>({});


export default function App({Component, pageProps}: AppProps) {
    const apolloClient = getApolloClient();

    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}