import * as actionTypes from '../actions/actionTypes'

const initialState = {
  width: 0,
  height: 0,
  cells: 0,
  plants: []
}
const cellCalc = (width,height) => {
  const cells = height * width
  let a = {}
  let b = 't'
  for (let i = 1; i < (cells + 1); i++) {
    a[b+i] = []
  }
  return a
}


const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SIZE_SAVE :
    return {
      ...state,
      width: action.dimensions.width,
      height: action.dimensions.height,
      cells: cellCalc(action.dimensions.width,action.dimensions.height)
    }
    case actionTypes.PLANTS_FETCH :
    return {
      ...state,
      plants: action.plants
    }
    default:
    return state
  }
}

export default reducer
