const initialState = {
    currentQuantity: 1
}

const quantityReducer = (state = initialState, action) => {
    if(action.type === 'quantity/amount'){
        return {...state, currentQuantity: action.payload}
    }

    return state
}

export default quantityReducer