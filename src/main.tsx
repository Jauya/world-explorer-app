import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com',
    cache: new InMemoryCache(),
})
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    </React.StrictMode>
)
