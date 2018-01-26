const changeYear = ( 'change-year', {
  props:[ 'the_year' ],
  template: `
    <fieldset>
      <legend>Год: </legend>
      <input type="number" :value="the_year"
            @input="changeStoreValue"
            style="width:50px"/>
    </fieldset>
  `,
  methods: {
    changeStoreValue: function () { 
        this.$root.$store.commit('updateYear', event.target.value )
    }
  }
})

const changeEvent = ( 'change-event', {
  props:['the_event'],
  template: `
    <fieldset>
      <legend>Событие: </legend>
      <input type="text" :value="the_event"
            @input="changeStoreValue" 
            style="width:90%"/><br/>
    </fieldset>
  `,
  methods: {
    changeStoreValue: function () { 
        this.$root.$store.commit('updateEvent', event.target.value )
    }
  }
})

const changeCity = ( 'change-city', {
  props:['the_city'],
  template: `
    <fieldset>
      <legend>Город: </legend>
      <input type="text" :value="the_city"
            @input="changeStoreValue"/><br/>
    </fieldset>
  `,
  methods: {
    changeStoreValue: function () { 
        this.$root.$store.commit('updateCity', event.target.value )
    }
  }
})

const changePlaces = ( 'change-places', {
  props:['the_places'],
  template: `
    <fieldset>
      <legend>Места: </legend>
      <input type="text" 
            style="width:90%"
            v-for = "(place, index) in the_places"
            :value="place"
            @input="changeStoreValue (index)"/>
      <button class="plus-button"
            @click="addNewStoreValue">
      </button>
    </fieldset>
  `,
  methods: {
    changeStoreValue: function ( index ) {
        this.$root.$store.commit ( 'updatePlaces', {
          index: index,
          value: event.target.value
        } )
    },
    addNewStoreValue: function () {
        this.$root.$store.commit ( 'updatePlaces', {
          index: this.the_places.length,
          value: '...'
        } )
    }
  }
})





