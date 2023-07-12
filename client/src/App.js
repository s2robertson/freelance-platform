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

const httpLink = new HttpLink({ uri: '/graphql' });
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
