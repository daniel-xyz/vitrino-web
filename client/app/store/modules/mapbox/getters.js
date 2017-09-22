/* eslint-disable */

export const storeType = state => (categoryId) => state.markerNames[categoryId - 1];
export const markers = state => state.markers;
export const addedMarkers = state => state.addedMarkers;
