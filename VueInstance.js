new Vue({
  el: '#sample',
  store: store,
  data: function () {
      return {
        localdata: this.$store.state.theRecord
      }
  },
  computed: {
    record () {
      return this.$store.state.theRecord
    }
  },
  components: {
    'change-year': changeYear,
    'change-event': changeEvent,
    'change-city': changeCity,
    'change-places': changePlaces
  }
})