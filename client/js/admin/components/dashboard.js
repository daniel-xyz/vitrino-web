/* eslint-disable */

Vue.component('admin-dashboard', {
  data: function () {
    return {
      products: []
    }
  },
  created: function() {
    var that = this;

    this.$http.get('/products')
      .then(function(response) {
        console.log(response.body);
        that.products = response.body;
      });
  }
});
