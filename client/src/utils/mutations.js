import { gql } from '@apollo/client';

// mutation for adding a user
export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $isEmployer: Boolean!
    $skills: [Service]
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      isEmployer: $isEmployer
      skills: $skills
    ) {
      token
      user {
        _id
      }
    }
  }
`

// mutation for updating a user
export const UPDATE_USER = gql`
  mutation updateUser(
    $userId: ID!
    $username: String!
    $email: String!
    $password: String!
    $isEmployer: Boolean!
    $skills: [Service]
  ) {
    updateUser(
      _id: $userId
      username: $username
      email: $email
      password: $password
      isEmployer: $isEmployer
      skills: $skills
    ) {
      user {
        _id
      }
    }
  }
`

// mutation for adding a project
export const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $description: String!
    $owner: User!
    $freelancers: [User]
    $dueDate: String
    $budget: Int
    $servicesNeeded: [Service]
  ) {
    addProject(
      name: $name
      description: $description
      owner: $owner
      freelancers: $freelancers
      dueDate: $dueDate
      budget: $budget
      servicesNeeded: $servicesNeeded
    ) {
      project {
        _id
      }
    }
  }
`

// export const UPDATE_PROJECT = gql``


// mutation for adding a service
export const ADD_SERVICE = gql`
  mutation addService($name: String!) {
    addService(name: $name) {
      service {
        _id
      }
    }
  }
`

// mutation for updating a service
export const UPDATE_SERVICE = gql`
  mutation updateService($serviceId: ID!, $name: String!) {
    addService(_id: $serviceId, name: $name) {
      service {
        _id
      }
    }
  }
`

//TODO: iron out differences between definitions here and in typeDefs
//TODO: should we use the sender and receiver ID?
// export const SEND_MESSAGE = gql``

//TODO: return types are defined as booleans -> not sure how to implenent this, or if this is even how we should be doing it
// export const DELETE_PROJECT = gql`
//   mutation deleteProject() {
//   }
// `

// export const DELETE_SERVICE = gql`
//   mutation deleteService() {
//   }
// `

// mutation for logging a user in
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    token
    user {
      _id
    }
  }
`