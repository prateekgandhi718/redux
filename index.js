const redux = require('redux')
const createStore = redux.createStore

const CAKE_ORDERED = "CAKE_ORDERED"

//Action is an object having different properties. Action creator is a function which returns the action (an object)

function orderCake () {
    return {
        type: CAKE_ORDERED,
        quantity: 1
    }
}

const initialState = {
    numOfCakes: 10
}

//REDUCERS in its simplest form can be defined as (previousState, action) => newState

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state, //this is to copy the initial state object first before making changes. because it can have more than one property.
                numOfCakes: state.numOfCakes - action.quantity
            }
    
        default:
            return state
    }
}

const store = createStore(reducer) // since reducer accepts initial state as an argument, this essentially means our store also has initial state
console.log('Initial state :', store.getState())

const unsubscribe = store.subscribe(() => {
    console.log('Updated state :', store.getState())
})

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

unsubscribe()
