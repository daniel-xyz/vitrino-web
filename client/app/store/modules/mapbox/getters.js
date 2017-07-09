/* eslint-disable */

export const storeType = state => (categoryId) => {
  return state.markerNames[categoryId - 1];
};
