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

      this.$http.post('/api/companies/' + id + '/verify')
        .then(function(response) {
          var item = that.companies.find(function(company) {
            return company.id === id;
          });

          var index = that.companies.indexOf(item);

          if (index !== -1) {
            Vue.set(that.companies, index, response.data)
          }
        }).catch(function (err) {
        console.error(err.stack);
      });
    },
    verifyProduct: function (id) {
      var that = this;

      this.$http.post('/api/products/' + id + '/verify')
        .then(function(response) {
          var item = that.products.find(function(product) {
            return product.id === id;
          });

          var index = that.products.indexOf(item);

          if (index !== -1) {
            Vue.set(that.products, index, response.data)
          }
        }).catch(function (err) {
        console.error(err.stack);
      });
    }
  },

  created: function() {
    var that = this;

    this.$http.get('/api/users')
      .then(function(response) {
        that.users = response.data;
      }).catch(function (err) {
      console.error(err.stack);
    });

    this.$http.get('/api/companies')
      .then(function(response) {
        that.companies = response.data;
      }).catch(function (err) {
      console.error(err.stack);
    });

    this.$http.get('/api/products')
      .then(function(response) {
        that.products = response.data;
      }).catch(function (err) {
      console.error(err.stack);
    });
  }
});