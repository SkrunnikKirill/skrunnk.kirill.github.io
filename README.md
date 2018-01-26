В этом примере мы выносим в компоненты работу с данными, 
включая коммиты мутаций состояния Vuex-store

Свойство data экземпляра Vue содержит объект localdata, 
инициализированный при создании экземпляра со значением 
из Vuex-store:
localdata: this.$store.state.theRecord

По факту, localdata - это ссылка на объект theRecord, 
который находится в хранилище Vuex

Мы не будем менять свойства этого объекта, поскольку 
тогда мы нарушим священное правило №1 - изменим состояние 
хранилища, минуя мутации

В компоненты мы передаем значения свойств localdata 
(через props в компоненте и v-bind при его вызове)

<change-city :the_city="localdata.address.city">
</change-city>

Когда мы передаем не объект и не массив, то передается 
значение, а не ссылка, и внутри компонента это будет новая 
локальная переменная, изменение значения которой не 
отразится на родительском экземпляре (тем более, что 
мы не используем директиву v-model)

Поэтому с чистой совестью отправляем это значение в input 
(в template компонента, конечно)

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
        this.$root.$store.commit('updateCity', 
                          event.target.value )
    }
  }
})

Из кода видно, что обработчиком события input назначен 
метод changeStoreValue, который активирует мутацию 
состояния Vuex-store

Несколько сложнее работа со свойством places, поскольку это 
массив, а значит, передается по ссылке

Массивы, как и объекты, передаются по ссылке

<change-places :the_places="localdata.address.places">
</change-places>

Иными словами, в компоненте мы получим не сам массив, а 
ссылку the_places на массив localdata.address.places, который, 
в свою очередь, является ссылкой на theRecord.address.places в
хранилище Vuex (поскольку localdata является ссылкой на theRecord)

const changePlaces = ( 'change-places', {
  props:['the_places'],
  ...
})

В темплейте компонента с помощью диретивы v-for мы создаем элементы 
input для каждого элемента массива the_places

template: `
    <fieldset>
      <legend>Места: </legend>
      <input type="text" 
            v-for = "(place, index) in the_places"
            :value = "place"
            @input = "changeStoreValue (index)"/>
      <button class = "plus-button"
            @click="addNewStoreValue">
      </button>
    </fieldset>
  `

input-элементы не связаны с элементами массива (нет директивы v-model)
Таким образом, изменение значения свойства value элемента input не 
представляет угрозы для реактивной системы Vue (родительский экземпляр 
это не затронет)
Однако обработчик changeStoreValue события input, которому мы передаем 
индекс измененного элемента массива

@input="changeStoreValue (index)"

будет активировать мутацию updatePlaces состояния Vuex-store

methods: {
    changeStoreValue: function ( index ) {
        this.$root.$store.commit ( 'updatePlaces', {
          index: index,
          value: event.target.value
        } )
    },
    ...
}

Мутации updatePlaces будет передан в качестве параметра объект с индексом 
изменяемого элемента массива и значением свойства value элемента input:

{
    index: index,
    value: event.target.value
}

и которая, в свою очередь, изменит массив theRecord.address.places

mutations: {
    ...,
    updatePlaces: function ( state, params ) {
      var ind = params.index
      var new_value = params.value
      state.theRecord.address.places.splice( params.index, 1, params.value )
    },
}

Все корректно, чисто, никакой контрабанды ;)




