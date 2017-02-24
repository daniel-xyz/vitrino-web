import StoreWindow from './components/StoreWindow';
import Map from './components/Map';

export default [
  {
    path: '/store/window/:id',
    components: {
      layer: StoreWindow,
      main: Map,
    },
  },
  {
    path: '/',
    components: {
      main: Map,
    },
  },
];
