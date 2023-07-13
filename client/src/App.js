import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  concat
} from '@apollo/client';
import { authMiddleware } from './utils/auth';

import logo from './logo.svg';
import './App.css';
import './index.css';

import Nav from './components/Nav';

const httpLink = new HttpLink({ uri: '/graphql' });
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Nav />
    </ApolloProvider>
  );
}

export default App;
