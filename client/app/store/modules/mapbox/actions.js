/* eslint-disable import/prefer-default-export */
import * as mutations from './mutation-types';
import { stores } from '../../../services/vitrinoApi';

export const loadMarkersInRadius = ({ commit, state }, position) => stores.getStoresInRadius(position.lat, position.lng, position.markerRadius, (error, response) => {
    if (error) {
        return console.error(error.stack);
    }

    response.forEach((store) => {
        const type = 'marker-' + store.company.category;

        if (!state.markers[type]) {
            commit(mutations.CLEAR_MARKERS, type);
        }

        const marker = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [
                    store.address.lng,
                    store.address.lat,
                ],
            },
            properties: {
                id: store.id,
                name: store.name,
                icon: type,
            },
        };

        commit(mutations.ADD_MARKER, {
            type,
            marker,
        });
    });

    return commit(mutations.LAST_MARKER_UPDATE_AT);
});
