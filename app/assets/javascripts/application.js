// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require turbolinks
//= require_tree .


/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) {

// BEGIN: Vuex store to contain ajax call for houses (to use globally)
  const store = new Vuex.Store({
    state: {
      facilities: []
    },

    getters: {
       facilities: state => state.facilities
     },

    actions: {
      getList: function ({ commit }) {
        let uri = window.location.search.substring(1); 
        let params = new URLSearchParams(uri);
        axios.get('/api/v1/houses/' + params.get("user_location") + '.json').then((response) => {
          commit('setHousesList', { list: response.data })
        }, (err) => {
          console.log(err)
        })
      },

      getHouses() {
        let uri = window.location.search.substring(1); 
        let params = new URLSearchParams(uri);
        // getting location from url and using location string to filter json
        return new Promise((resolve, reject) => {
          axios.get('/api/v1/houses.json')
            .then(response => resolve(response))
            .catch(err => reject(error))
        });
      }
    },

    mutations: {
      setHousesList: (state, { list }) => {
        state.facilities = list
      }
    }

  })
// END: Vuex store to contain ajax call for houses (to use globally)

// const sapp = new Vue({
//   store,
//   el: '#sapp',
//   // load todos on start
//   created () {
//     this.$store.dispatch('getList')
//   },
//   // be able to get the data
//   computed: {
//     facilities () {
//       console.log(this.$store.getters.facilities)
//       return this.$store.getters.facilities
//     }
//   }
// })

// BEGIN: houses display for right column & filter methods
  var app = new Vue({
    store,
    el: '#app',
    data: {
      houses: [],
      sortAttribute: 'name',
      sortAscending: true,
      priceFilter: '',
      distanceFilter: '',
      femaleFilter: false,
      maleFilter: false,
      coedFilter: false,
      parkingFilter: false,
      internetFilter: false,
      poolFilter: false,
      adultFilter: false,
      youthFilter: false,
      seniorFilter: false,
      hottubFilter: false,
      laundryFilter: false,
      dogsFilter: false,
      catsFilter: false,
      smokingFilter: false,
      vapingFilter: false
    },

    mounted: function() {
      $.get('/api/v1/houses.json', function(result) {
        this.houses = result;
      }.bind(this));
    },

    methods: {
      filterHouses: function(house) {
      // define filter array
        var filterArray = house.filters.map(function (filter) {
          return filter.filter;
        });
        var isValid = true;

        if(this.catsFilter === true && isValid){
          if(!filterArray.includes("Cats")) {
           isValid = false;
          }
        }

        if(this.dogsFilter === true && isValid){
          if(!filterArray.includes("Dogs")) {
           isValid = false;
          }
        }

        if(this.femaleFilter === true && isValid){
          if(!filterArray.includes("Female")) {
           isValid = false;
          }
        }

        if(this.maleFilter === true && isValid){
          if(!filterArray.includes("Male")) {
           isValid = false;
          }
        }

        if(this.coedFilter === true && isValid){
          if(!filterArray.includes("Coed")) {
           isValid = false;
          }
        }

        if(this.parkingFilter === true && isValid){
          if(!filterArray.includes("Parking")) {
           isValid = false;
          }
        }

        if(this.internetFilter === true && isValid){
          if(!filterArray.includes("Internet (wi-fi)")) {
           isValid = false;
          }
        }

        if(this.smokingFilter === true && isValid){
          if(!filterArray.includes("Smoking Allowed in Designated Areas")) {
           isValid = false;
          }
        }

        if(this.vapingFilter === true && isValid){
          if(!filterArray.includes("Vaping Allowed in Designated Areas")) {
           isValid = false;
          }
        }

        if(this.poolFilter === true && isValid){
          if(!filterArray.includes("Pool")) {
           isValid = false;
          }
        }

        if(this.adultFilter === true && isValid){
          if(!filterArray.includes("Adult (18+)")) {
           isValid = false;
          }
        }

        if(this.youthFilter === true && isValid){
          if(!filterArray.includes("Youth")) {
           isValid = false;
          }
        }

        if(this.seniorFilter === true && isValid){
          if(!filterArray.includes("Senior(65+)")) {
           isValid = false;
          }
        }

        if(this.hottubFilter === true && isValid){
          if(!filterArray.includes("Hot Tub")) {
           isValid = false;
          }
        }

        if(this.laundryFilter === true && isValid){
          if(!filterArray.includes("Laundry Onsite")) {
           isValid = false;
          }
        }

        return isValid;
    },

      setSortAttribute: function(inputAttribute) {
        if(inputAttribute !== this.sortAttribute) {
          this.sortAscending = true;
        } else {
          this.sortAscending = !this.sortAscending;
        }
        this.sortAttribute = inputAttribute;
       },

      formatPrice: function(value) {
        let val = (value/1).toFixed(2)
        return val;
      }
    },

    computed: {
      modifiedHouses: function() {
        return this.houses.sort(function(house1, house2) {
          if (this.sortAscending) {
            return house1[this.sortAttribute].localeCompare(house2[this.sortAttribute]);
          } else {
            return house2[this.sortAttribute].localeCompare(house1[this.sortAttribute]);
          }
        }.bind(this));
      }
     }
  });
// END: houses display for right column & filter methods


// BEGIN: markers for map from houses json
  let vm = new Vue({
    store,
    el: '#markers',
    data: {
      homes: [],
      locations: []
    },

    // created () {
    //   this.$store.dispatch('getList')
    //   var homes = facilities()
    //   console.log(homes)
    // },
    // // be able to get the data

    // computed: {
    //   facilities () {
    //     console.log(this.$store.getters.facilities)
    //     this.homes = this.$store.getters.facilities
    //     return homes 
    //     // return this.$store.getters.facilities
    //   }
    // }

    // created () {
    //   this.$store.dispatch('getList')
    // },
    // // be able to get the data
    // computed: {
    //   facilities () {
    //     return this.$store.getters.facilities
    //   }
    // }

    // created () {
    //   this.$store.dispatch('getList')
    //   var facilities = this.$store.getters.facilities
    //       for(var i = 0; i < this.facilities.length; i++) {
    //       var details = {};
    //       details.title = this.facilities[i].property_description;
    //       details.lat = this.facilities[i].latitude;
    //       details.lng = this.facilities[i].longitude;
    //       details.imageUrl = this.facilities[i].images[0].image
    //       details.id = this.facilities[i].id; 
    //       details.price = this.facilities[i].price; 
    //       details.description = this.facilities[i].name;
    //       this.$set(this.locations, [i], details);
    //     }
    // },

    // computed: {
    //   facilities () {
    //     console.log(this.$store.getters.facilities)
    //     return this.$store.getters.facilities
    //   }
    // }

    // created () {
    //   this.$store.dispatch('getList').then(res => {
    //     this.homes = res.data
    //   })
    //   console.log(this.homes)
    // }
    

    created () {
      this.$store.dispatch('getHouses').then(res => { 
        this.homes = res.data
        console.log(this.$store.getters.facilities)
        for(var i = 0; i < this.$store.getters.facilities.length; i++) {
          var details = {};
          details.title = this.$store.getters.facilities[i].property_description;
          details.lat = this.$store.getters.facilities[i].latitude;
          details.lng = this.$store.getters.facilities[i].longitude;
          details.imageUrl = this.$store.getters.facilities[i].images[0].image
          details.id = this.$store.getters.facilities[i].id; 
          details.price = this.$store.getters.facilities[i].price; 
          details.description = this.$store.getters.facilities[i].name;
          this.$set(this.locations, [i], details);
        }
      })
    },

    computed: {
      facilities () {
        return this.$store.getters.facilities
      }
    }

  });
// END: markers for map from houses json



// BEGIN: map display & define markers
  Vue.component('vue-map', {
    template: '#map',
    props: {
      markers: {
        type: Array,
        default: []
      },
      option: {
        type: Object,
        default: {
          zoom: 12,
          center: {lat: 37.769436, lng: -122.447662},
        }
      }
    },
    data: function() {
      return {
        map: {}
      }
    },
    mounted: function() {
      let el = this.$el;
      let bounds = new google.maps.LatLngBounds();
      this.map = new google.maps.Map(el, this.option);
      for (let i = 0; i < this.markers.length; i++) {
        let position = new google.maps.LatLng(this.markers[i].lat, this.markers[i].lng);
        bounds.extend(position);
        this.setMarker(this.markers[i]);
      }

      this.map.fitBounds(bounds);
    },
    methods: {
      // set marker
      // @param {Object} pos
      formatPrice: function(value) {
        let val = (value/1).toFixed(2)
        return val;
      },

      setMarker(pos) {
        let latlng = new google.maps.LatLng(pos.lat, pos.lng);
        let marker = new google.maps.Marker({
          position: latlng,
          map: this.map,
          title: pos.title,
          icon: {
              url: 'http://localhost:3000/icon/z_house.png',
              scaledSize: new google.maps.Size(30, 30), // scaled size
            },
          description: pos.description
        })
        let infoWindow = new google.maps.InfoWindow();
        infoWindow.setContent('<div class="map__info"><a href="houses/' + pos.id + '"> <img width="120" height="90" src=' + pos.imageUrl + '> </a> <p>' + pos.description + '<br>' + this.formatPrice(pos.price) + '</p> </div>');

        // // Setup event for marker
        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
        });

        // google.maps.event.addListener(marker, 'mouseout', () => {
        //   infoWindow.close(this.map, marker);
        // });

        google.maps.event.addListener(marker, 'click', () => {
          console.log("abc");
        });
      }
    }
  })
// END: map display & define markers


});