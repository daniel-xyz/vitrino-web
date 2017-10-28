import * as mutations from './mutation-types';

export const loadMarkers = ({ commit, state }, stores) => {
    stores.forEach((store) => {
        const type = 'marker-' + store.company.category.key;

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
};
