/* eslint-disable */

Vue.component('store-filter', {
  data: function () {
    return {
      show: false,
      filter: {
        child: true,
        parfume: true,
        colors: true,
        hobby: true,
        building: true,
        shirt: true,
        gift: true,
        necklace: true
      }
    }
  }
});