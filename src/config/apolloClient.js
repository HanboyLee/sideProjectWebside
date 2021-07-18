import { ApolloClient, InMemoryCache, createHttpLink, HttpLink, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { ServerStyleSheets } from '@material-ui/styles';

const errorLink = onError(({ graphqlErrors, networkError }) => {
    console.log(graphqlErrors);
    if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }) => {
            return console.error(`[Graphql error]:message: ${message},location:${location}, path:${path}`);
        });
    }
    if (networkError) console.error(`[Network error] : ${networkError}`);
});

const serverLink1 = createHttpLink({
    uri: 'http://localhost:6969/graphql',
    credentials: 'include',
    fetchOptions: {
        mode: 'cors',
    },
});
// const serverLink1 = createUploadLink({ uri: 'http://localhost:6969/graphql', credentials: 'same-origin' });

const middlewareAuthLink = new ApolloLink((operation, forward) => {
    operation.setContext(() => {
        const token = localStorage.getItem('accessToken');
        return {
            headers: {
                authorization: token ? `Bearer ${token}` : null,
            },
        };
    });
    if (forward) return forward(operation);
    else return null;
});
const httpLinkWithAuthToken = middlewareAuthLink.concat(serverLink1);

const link = ApolloLink.from([errorLink, httpLinkWithAuthToken]);
const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
});

export default client;
