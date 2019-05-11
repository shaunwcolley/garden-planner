const initialState = {
  width: 0,
  height: 0,
  cells: 0
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
    case 'SIZE_SAVE' :
    return {
      ...state,
      width: action.dimensions.width,
      height: action.dimensions.height,
      cells: cellCalc(action.dimensions.width,action.dimensions.height)
    }
    default:
    return state
  }
}

export default reducer
