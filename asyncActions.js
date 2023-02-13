const redux = require('redux')
const createStore = redux.createStore

const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: '',
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

//ACTION CREATORS
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

//REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        
        case FETCH_USERS_SUCCEEDED:
            return {
                loading: false,
                users: action.payload,
                error: '',
            }
        
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }
    }
}


//Creating an action creator. But here we would not return an object, but we would return a function itself. this happens by virtue of thunkmiddleware
const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest())

        axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
            const users = response.data.map((user) => user.id)
            dispatch(fetchUsersSuccess(users))
        }).catch((error) => {
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

//STORE
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers())