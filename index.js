const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators

const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"

//Action is an object having different properties. Action creator is a function which returns the action (an object)

const orderCake = () => {
    return {
        type: CAKE_ORDERED,
        quantity: 1
    }
}

const restockCake = (qty) => {
    return {
        type: CAKE_RESTOCKED,
        quantity: qty
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
        
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.quantity
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

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(5))

const actions = bindActionCreators({orderCake, restockCake}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(5)

//It is not really necessary.

unsubscribe()
