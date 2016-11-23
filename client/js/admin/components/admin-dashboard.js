/* eslint-disable */

Vue.component('admin-dashboard', {
  data: function () {
    return {
      users: [],
      companies: [],
      products: []
    }
  },

  methods: {
    verifyCompany: function (id) {
      var that = this;

      VitrinoLib.Api.companies.verify(id, function (error, response) {
        var item, index;

        if (error) {
          return console.error(error.stack);
        }

        item = that.companies.find(function(company) {
          return company.id === id;
        });

        index = that.companies.indexOf(item);

        if (index !== -1) {
          Vue.set(that.companies, index, response)
        }
      });
    },
    verifyProduct: function (id) {
      var that = this;

      VitrinoLib.Api.products.verify(id, function (error, response) {
        var item, index;

        if (error) {
          return console.error(error.stack);
        }

        item = that.products.find(function(product) {
          return product.id === id;
        });

        index = that.products.indexOf(item);

        if (index !== -1) {
          Vue.set(that.products, index, response)
        }
      });
    }
  },

  created: function() {
    var that = this;

    VitrinoLib.Api.users.getAll(function (error, response) {

      if (error) {
        return console.error(error.stack);
      }

      that.users = response;
    });

    VitrinoLib.Api.companies.getAll(function (error, response) {

      if (error) {
        return console.error(error.stack);
      }

      that.companies = response;
    });

    VitrinoLib.Api.products.getAll(function (error, response) {

      if (error) {
        return console.error(error.stack);
      }

      that.products = response;
    });
  }
});