import StoreWindow from './components/StoreWindow';
import Mapbox from './components/Mapbox';

export default [
  {
    path: '/store/window/:id',
    components: {
      main: StoreWindow,
      map: Mapbox,
    },
  },
  {
    path: '/',
    components: {
      map: Mapbox,
    },
  },
];
