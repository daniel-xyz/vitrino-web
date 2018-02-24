import Vuex from 'vuex';
import auth from './modules/auth';
import navigation from './modules/navigation';
import storefilters from './modules/storefilters';
import mapbox from './modules/mapbox';
import storewindow from './modules/storewindow';

const createStore = () => new Vuex.Store(
    {
        modules: {
            auth,
            navigation,
            storefilters,
            storewindow,
            mapbox,
        },
    },
);

export default createStore;
