const CAKE_ORDERED = "CAKE_ORDERED"

//Action is an object having different properties. Action creator is a function which returns the action (an object)

function orderCake () {
    return {
        type: CAKE_ORDERED,
        quantity: 1
    }
}