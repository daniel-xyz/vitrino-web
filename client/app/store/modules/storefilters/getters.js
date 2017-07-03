/* eslint-disable */

export const getFilter = state => (payload) => {
  return state.filters.find((f) => {
    return f.name === payload;
  });
};
export const getAllFilters = state => {
  return state.filters;
};
