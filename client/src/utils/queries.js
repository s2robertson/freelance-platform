import { gql } from "@apollo/client";

// Defining GraphQL queries using the gql function

// Query to retrieve all users
export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      name
      email
      isEmployer
      skills {
        _id
        name
      }
    }
  }
`;

export const QUERY_USER_BY_ID = gql`
  query UserById($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      email
      isEmployer
      profileDescription
      skills {
        _id
        name
      }
    }
  }
`;

// Query to retrieve all projects
export const QUERY_ALL_PROJECTS = gql`
  query getProjects {
    projects {
      _id
      name
      description
      owner {
        _id
        name
        email
      }
      freelancers {
        _id
        name
        email
      }
      dueDate
      budget
      servicesNeeded {
        _id
        name
      }
    }
  }
`;

// Query to retrieve a specific project by ID
export const QUERY_PROJECT = gql`
  query getProject($projectId: ID!) {
    project(_id: $projectId) {
      _id
      name
      description
      owner {
        _id
        name
        email
      }
      freelancers {
        _id
        name
        email
      }
      dueDate
      budget
      servicesNeeded {
        _id
        name
      }
    }
  }
`;

// Query to retrieve all services
export const QUERY_ALL_SERVICES = gql`
  query getServices {
    services {
      _id
      name
    }
  }
`;

// Query to retrieve a specific service by ID
export const QUERY_SERVICE = gql`
  query getService($serviceId: ID!) {
    service(Id: $serviceId) {
      _id
      name
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query getMessages {
    messages {
      _id
      subject
      text
      sender {
        _id
        username
        email
      }
      receiver {
        _id
        username
        email
      }
      dateSent
    }
  }
`;

// Query to retrieve messages for a specific user
/*export const QUERY_USER_MESSAGES = gql`
  query getUserMessages($userId: ID!) {
    user(_Id: $userId) {
      _id
      name
      messages {
        _id
        text
        sender {
          _id
          name
          email
        }
        receiver {
          _id
          name
          email
        }
        dateSent
      }
    }
  }
`;*/
