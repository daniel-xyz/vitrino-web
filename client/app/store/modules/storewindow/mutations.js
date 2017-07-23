/* eslint-disable */
import * as types from './mutation-types';

export default {
  [types.CURRENT_URL] (state, url) {
    state.url = url;
  },
  [types.CURRENT_COMPANY] (state, company) {
    state.company = company;
  },
  [types.YID] (state, yid) {
    state.yid = yid;
  },
  [types.COMPANY_ADD_CATEGORY] (state, category) {
    state.company.categories.push(category.title);
  },
  [types.COMPANY_IS_OPEN] (state, open) {
    state.company.is_open_now = open;
  },
  [types.COMPANY_NAME] (state, name) {
    state.company.name = name;
  },
  [types.COMPANY_PHOTOS] (state, photo) {
    state.company.photos.push(photo);
  },
  [types.COMPANY_OPENING_HOURS] (state, hours) {
    state.company.openingHours.push(hours);
  },
};
