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

export const GET_ROUTE = gql`
      query getRoute($id: ID!){
        route(id: $id){
          id
          name
          description
          locationsCount
          routeLocations{
            id
            locationId
            routeId
          }
          locations{
            id
            slug
            gps
          }
        }
      }
`;
export const GET_ROUTE_LOCATION = gql`
query getRouteLocation($id: ID!){
  route(id: $id){
    id
    routeId
    locationId
}}
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

export const DELETE_ROUTE_LOCATIONS = gql`
  mutation deleteRouteLocation($id: String!){
    deleteRouteLocation(
      input:{id: $id}){
    routeLocation{
      id
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
          description,
          locations{
            slug
          }
        }
      }
  }
`;

export const DELETE_ROUTE = gql`
  mutation deleteRoute($id: ID!){
    deleteRoute(
      input:{id: $id}){
    route{
      id
      name
      description
    }
  }
}
`;

export const GET_ROUTES = gql`
{
  routes {
    id,
    name,
    description,
    locationsCount,
    routeLocations{
      id
      locationId
      routeId
    }
    locations{
      id
      slug
      gps
    }
  }
}
`;

export const CREATE_ROUTE_LOCATION = gql`
  mutation CreateRouteLocation($routeId: ID!, $locationId: ID!){
    createRouteLocation(
      input:{routeId: $routeId, locationId: $locationId}){
        routeLocation {
          id
          routeId
          locationId
        }
      }
  }
`;