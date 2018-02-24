/* eslint-disable */
import * as mutations from './mutation-types';

export const loadMarkers = async function ({ commit, state }) {
    const vitrins = await this.$firestore.collection("vitrins").get();

    vitrins.forEach((vitrin) => {
        const data = vitrin.data();

        console.log(data);

        const type = 'marker-art';

        if (!state.markers[type]) {
            commit(mutations.CLEAR_MARKERS, type);
        }

        const marker = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [
                    data.geo.longitude,
                    data.geo.latitude,
                ],
            },
            properties: {
                id: vitrin.id,
                name: data.title,
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

export const setMapLoaded = ({ commit }) => {
    return commit(mutations.SET_MAP_LOADED);
};
