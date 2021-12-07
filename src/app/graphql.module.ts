import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, split} from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws'
import {HttpLink} from 'apollo-angular/http';
import { getMainDefinition } from '@apollo/client/utilities';

const uri = 'https://api-staging.csgoroll.com/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const http = httpLink.create({uri, withCredentials: true });

  const ws = new WebSocketLink({
    uri: `ws://api-staging.csgoroll.com/graphql`,
    options: {
      reconnect: true,
    },
  });

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const {kind, operation}: any = getMainDefinition(query);
      return (
        kind === 'OperationDefinition' && operation === 'subscription'
      );
    },
    ws,
    http,
  );

  return {
    link,
    cache: new InMemoryCache()
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
