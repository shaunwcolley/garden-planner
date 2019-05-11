const initialState = {
  width: 0,
  height: 0
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SIZE_SAVE' :
    return {
      ...state,
      width: action.dimensions.width,
      height: action.dimensions.height
    }
    default:
    return state
  }
}

export default reducer
