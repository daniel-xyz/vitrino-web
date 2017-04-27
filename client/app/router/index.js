import Vue from 'vue';
import Router from 'vue-router';
import MainLayer from '../components/MainLayer';
import StoreWindow from '../components/StoreWindow';
import Imprint from '../pages/Imprint';
import DataProtection from '../pages/DataProtection';

Vue.use(Router);

export default [
  {
    path: '/store/:yid',
    components: {
      layer: MainLayer,
    },
    children: [
      {
        path: '',
        component: StoreWindow,
      },
    ],
  },
  {
    path: '/imprint',
    components: {
      layer: MainLayer,
    },
    children: [
      {
        path: '',
        component: Imprint,
      },
    ],
  },
  {
    path: '/data',
    components: {
      layer: MainLayer,
    },
    children: [
      {
        path: '',
        component: DataProtection,
      },
    ],
  },
];
