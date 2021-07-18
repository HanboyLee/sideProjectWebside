import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import client from './config/apolloClient';
import { CustomizedDialogs } from './config/globalAlertTemplate';
//alert
import { Provider as AlertProvider, positions } from 'react-alert';
//config
import theme from './config/theme';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
// hooks
import { UserProvider } from './hooks/userProvider';

const options = {
    position: positions.MIDDLE,
};
ReactDOM.render(
    <ApolloProvider client={client}>
        <UserProvider>
            <ThemeProvider theme={theme}>
                <AlertProvider template={CustomizedDialogs} options={options}>
                    <CssBaseline />
                    <App />
                </AlertProvider>
            </ThemeProvider>
        </UserProvider>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
