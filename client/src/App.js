import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  concat
} from '@apollo/client';
import { authMiddleware } from './utils/auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import './index.css';

import Nav from './components/Nav';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Projects from './pages/Project/';
import Profile from './pages/Profile';
import Project from './pages/Project/';

const httpLink = new HttpLink({ uri: '/graphql' });
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route
              path='/'
              element={<Dashboard />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/signup'
              element={<Signup />}
            />
            <Route
              path='/projects'
              element={<Projects />}
            />
            <Route
              path='/project/:projectId'
              element={<Project />}
            />
            <Route
              path='/profile'
              element={<Profile />}
            />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
