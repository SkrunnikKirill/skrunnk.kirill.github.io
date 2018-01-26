const store = new Vuex.Store({
  strict: true,
  state: {
    theRecord: {
      head: {
        eventName: 'Новый год',
        year: '2018'
      },
      address: {
        city: 'Харьков',
        places: [ 
          "площадь Свободы",
          "ул. Сумская",
          "пл. Конституции",
          "проспект Науки"
        ]
      }
    }
  },
  mutations: {
    updateEvent: function ( state, new_event ) {
      state.theRecord.head.eventName = new_event
    },
    updateYear: function ( state, new_year ) {
      state.theRecord.head.year = new_year
    },
    updateCity: function ( state, new_city ) {
      state.theRecord.address.city = new_city
    },
    updatePlaces: function ( state, params ) {
      state.theRecord.address.places.splice( params.index, 1, params.value )
    },
  }
})
