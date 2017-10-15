import { createNetworkInterface } from 'apollo-client';

export default () => createNetworkInterface({ uri: process.env.API_ENDPOINT });
