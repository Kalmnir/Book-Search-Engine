import gql from 'graphql';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            useername
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            titles
            descriptions
            link
            image
        }
    }
}
`;

export const DELETE_BOOK = gql`
mutation deleteBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
        username
        savedBooks {
            title
            authors
        }
    }
}
`;