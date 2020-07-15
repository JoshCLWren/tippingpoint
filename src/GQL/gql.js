import { gql } from 'apollo-boost';

export const GET_LOCATIONS = gql`
      {
        locations {
          id
          slug
          gps
        }
      }
    `;

export const DELETE_LOCATIONS = gql`
  mutation deleteLocation($id: String!){
    deleteLocation(
      input:{id: $id}){
    location{
      id
      slug
      gps
    }
  }
}
`;

export const CREATE_LOCATION = gql`
mutation CreateLocation($slug: String!, $gps: String!){
  createLocation(
    input:{slug: $slug, gps: $gps}){
  location {
    slug
    gps
  }
  }
}
`;

export const UPDATE_LOCATION = gql`
  mutation updateLocation($id: String!){
    updateLocation(
      input:{id: $id, slug: $slug, gps: $gps}){
        location{
          id
          slug
          gps
        }
      }
  }
`;

export const CREATE_ROUTE = gql`
  mutation CreateRoute($name: String!, $description: String!){
    createRoute(
      input:{name: $name, description: $description}){
        route {
          name
          description
        }
      }
  }
`;