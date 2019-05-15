import * as actionTypes from '../actions/actionTypes'

const initialState = {
  width: 0,
  height: 0,
  cells: 0,
  plants: [],
  plans: [],
  isAuth: false,
  userId: 1,
  plan: null
}
const cellCalc = (width,height) => {
  const cells = height * width
  let a = {}
  for (let i = 1; i < (cells + 1); i++) {
    a[i] = []
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
    case actionTypes.PLANS_FETCH:
    return {
      ...state,
      plans: action.plans
    }
    case actionTypes.PLAN_FETCH:
    return {
      ...state,
      plan: action.plan,
      width: action.plan.width,
      height: action.plan.height,
      cells: cellCalc(action.plan.width,action.plan.height)
    }
    case actionTypes.NEW_PLAN:
    return {
      ...state,
      plan: null
    }
    default:
    return state
  }
}

export default reducer
