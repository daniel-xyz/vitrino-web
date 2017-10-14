/* eslint-disable */

export const getFilter = state => (payload) => state.filters.find((f) => f.name === payload);
export const getAllFilters = state => state.filters;
