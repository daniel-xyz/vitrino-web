import * as mutations from './mutation-types';
import { stores } from '../../../services/vitrinoApi';

export const position = ({ commit, dispatch }, payload) => {
    // { log:'52.500511', lat: '13.444584', zoom: '2000' }
    commit(mutations.POSITION, payload);
    dispatch('loadAllMarkers', payload);
};

export const loadAllMarkers = ({ commit, state }, pos) => {
    stores.getStoresInRadius(pos.lat, pos.lng, pos.meters, (error, response) => {
        if (error) {
            return console.error(error.stack); // eslint-disable-line no-console
        }

        response.businesses.forEach((store) => {
            const markerType = state.markerNames[0]; // self.getStoreType(store['product_category']);
                                                     // // eslint-disable-line dot-notation

            if (!state.markers[markerType]) {
                commit(mutations.CLEAR_MARKER, markerType);
            }

            const marker = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [
                        store.coordinates.longitude,
                        store.coordinates.latitude,
                    ],
                },
                properties: {
                    yid: store.id,
                    name: store.name,
                    icon: markerType,
                },
            };
            commit(mutations.ADD_MARKER, {
                type: markerType,
                marker,
            });
        });

        commit(mutations.ADDED_MARKER);
        return null;
    });
};
