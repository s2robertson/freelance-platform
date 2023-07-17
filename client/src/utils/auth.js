import decode from 'jwt-decode';
import { ApolloLink } from '@apollo/client';

const LS_ITEM_NAME = 'id_token';

export function getToken() {
  return localStorage.getItem(LS_ITEM_NAME);
}

export function setToken(token) {
  localStorage.setItem(LS_ITEM_NAME, token);
}

export function clearToken() {
  localStorage.removeItem(LS_ITEM_NAME);
}

export function loggedIn() {
  const token = getToken();
  return !!token && !isTokenExpired(token);
}

export function isTokenExpired(token) {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export function getCurrentUser() {
  try {
    const token = getToken();
    if (!token) {
      return null;
    }

    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return null;
    }

    return decoded.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    let token = getToken();
    if (token && isTokenExpired(token)) {
      clearToken();
      token = null;
    }

    let result = {
      headers: {
        ...headers
      }
    };
    if (token) {
      result.headers.authorization = `Bearer ${token}`;
    }
    return result;
  });

  return forward(operation);
})