import gql from 'graphql';

export const GET_ME = gql`
{
    me {
        _id
        username
        email
        bookcount
        savedBooks {
            bookId
            authors
            title
            description
            link
            image
        }
    }
}
`;
